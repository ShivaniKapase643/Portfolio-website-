// Server-only: live GitHub data for the projects section. Every failure path
// returns null so the page renders without these numbers instead of breaking.

export type RecentRepo = {
  name: string;
  description: string | null;
  language: string | null;
  url: string;
  pushedAt: string;
};

export type ContributionDay = { date: string; count: number };

export type GitHubSummary = {
  publicRepos: number;
  languages: { name: string; repos: number }[];
  recent: RecentRepo[];
  // Only available when GITHUB_TOKEN is configured (GraphQL requires auth).
  contributions?: { total: number; weeks: ContributionDay[][] };
};

type ApiRepo = {
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  pushed_at: string;
  fork: boolean;
  size: number;
};

const REVALIDATE_SECONDS = 60 * 60 * 24;

function headers(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: "application/vnd.github+json",
    "User-Agent": "shivani-kapase-portfolio",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function getJson<T>(url: string, init?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(url, {
      ...init,
      headers: { ...headers(), ...init?.headers },
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

async function getContributions(username: string): Promise<GitHubSummary["contributions"]> {
  if (!process.env.GITHUB_TOKEN) return undefined;
  const query = `query($login: String!) { user(login: $login) { contributionsCollection { contributionCalendar {
    totalContributions weeks { contributionDays { date contributionCount } } } } } }`;
  type Gql = {
    data?: {
      user?: {
        contributionsCollection: {
          contributionCalendar: {
            totalContributions: number;
            weeks: { contributionDays: { date: string; contributionCount: number }[] }[];
          };
        };
      };
    };
  };
  const json = await getJson<Gql>("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify({ query, variables: { login: username } }),
    headers: { "Content-Type": "application/json" },
  });
  const calendar = json?.data?.user?.contributionsCollection.contributionCalendar;
  if (!calendar) return undefined;
  return {
    total: calendar.totalContributions,
    weeks: calendar.weeks.map((w) => w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount }))),
  };
}

export async function getGitHubSummary(username: string): Promise<GitHubSummary | null> {
  const [user, repos, contributions] = await Promise.all([
    getJson<{ public_repos: number }>(`https://api.github.com/users/${username}`),
    getJson<ApiRepo[]>(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`),
    getContributions(username),
  ]);
  if (!user || !Array.isArray(repos)) return null;

  // Skip forks, empty placeholders and the profile README repository.
  const own = repos.filter((r) => !r.fork && r.size > 0 && r.name.toLowerCase() !== username.toLowerCase());

  const counts = new Map<string, number>();
  for (const r of own) {
    if (r.language) counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
  }
  const languages = [...counts.entries()]
    .map(([name, n]) => ({ name, repos: n }))
    .sort((a, b) => b.repos - a.repos)
    .slice(0, 6);

  const recent = [...own]
    .sort((a, b) => Date.parse(b.pushed_at) - Date.parse(a.pushed_at))
    .slice(0, 4)
    .map((r) => ({
      name: r.name,
      description: r.description,
      language: r.language,
      url: r.html_url,
      pushedAt: r.pushed_at,
    }));

  return { publicRepos: user.public_repos, languages, recent, contributions };
}

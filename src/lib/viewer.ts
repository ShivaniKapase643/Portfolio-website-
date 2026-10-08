import type { Achievement } from "@/lib/data/achievements";
import type { CertificateAssetId } from "@/lib/data/assets";
import { certificates, type Certificate } from "@/lib/data/certificates";

// Plain data passed from server components to the client lightbox.
export type ViewerItem = {
  id: string;
  title: string;
  subtitle: string;
  date?: string;
  asset: CertificateAssetId;
  credentialId?: string;
};

export function certificateItem(c: Certificate): ViewerItem | null {
  if (!c.asset) return null;
  return { id: c.id, title: c.title, subtitle: c.issuer, date: c.date, asset: c.asset, credentialId: c.credentialId };
}

export function certificateItemByAsset(asset: CertificateAssetId): ViewerItem | null {
  const c = certificates.find((cert) => cert.asset === asset);
  return c ? certificateItem(c) : null;
}

export function achievementItem(a: Achievement): ViewerItem | null {
  if (!a.asset) return null;
  return { id: a.id, title: a.title, subtitle: a.event, date: a.date, asset: a.asset, credentialId: a.credentialId };
}

export function compact<T>(items: (T | null)[]): T[] {
  return items.filter((i): i is T => i !== null);
}

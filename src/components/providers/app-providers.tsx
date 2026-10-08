"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { CertificateViewerProvider } from "@/components/certificates/certificate-viewer";
import { ProjectDialogProvider } from "@/components/projects/project-dialog";

// reducedMotion="user": framer-motion skips transform/layout animations when
// the OS asks for reduced motion (opacity fades remain).
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ProjectDialogProvider>
        <CertificateViewerProvider>{children}</CertificateViewerProvider>
      </ProjectDialogProvider>
    </MotionConfig>
  );
}

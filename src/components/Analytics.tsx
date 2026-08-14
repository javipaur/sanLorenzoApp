"use client";

import { useEffect } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { track, detectAppMode, setAppMode } from "@/lib/analytics";
import { initPostHog, trackPostHog, setPostHogAppMode } from "@/lib/posthog";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    initPostHog();

    const appMode = detectAppMode();
    setAppMode(appMode);
    setPostHogAppMode(appMode);

    // Fuente única de tracking de instalación: estos eventos solo se registran
    // aquí (montado en el layout raíz). InstallPWA solo gestiona la UI.
    const onBeforeInstallPrompt = () => {
      track("pwa_install_prompt");
    };
    const onAppInstalled = () => {
      track("pwa_installed");
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onAppInstalled);

    if (appMode === "standalone") {
      track("pwa_standalone_use");
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, []);

  useEffect(() => {
    if (pathname) trackPostHog("$pageview");
  }, [pathname]);

  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}

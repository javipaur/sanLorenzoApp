"use client";

import posthog from "posthog-js";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com";

let inicializado = false;

export function initPostHog() {
  if (typeof window === "undefined") return;
  if (!POSTHOG_KEY) return;
  if (inicializado) return;
  inicializado = true;

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    capture_pageview: false,
    capture_pageleave: false,
    autocapture: false,
    persistence: "localStorage",
  });
}

export function trackPostHog(
  eventName: string,
  params: Record<string, unknown> = {}
) {
  if (typeof window === "undefined") return;
  if (!POSTHOG_KEY) return;
  posthog.capture(eventName, params);
}

export function setPostHogAppMode(appMode: "standalone" | "browser") {
  if (typeof window === "undefined") return;
  if (!POSTHOG_KEY) return;
  posthog.setPersonProperties({ app_mode: appMode });
}

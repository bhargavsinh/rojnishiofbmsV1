import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { AppShell } from "@/components/layout/app-shell";
import { registerPwa } from "@/lib/pwa";
import appCss from "../styles.css?url";

const APP_NAME = "Rojnishi Of Bms";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: APP_NAME },
      { name: "theme-color", content: "#6D28D9" },
      {
        name: "description",
        content: "રોજનિશી — દૈનિક નોંધ, વિદ્યા, કાર્ય, લેખન અને શ્રી દેવદમન પ્રભુ સેવા અભિલેખાગાર.",
      },
      { name: "apple-mobile-web-app-capable", content: "yes" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/icon-192.png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+Gujarati:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  useEffect(() => {
    registerPwa();
  }, []);
  return (
    <html lang="gu" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="antialiased">
        <PreviewHostBridge />
        <AuthProvider>
          <AppShell>
            <Outlet />
          </AppShell>
          <Toaster
            position="bottom-center"
            toastOptions={{
              className: "glass-card !text-fg",
            }}
          />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}

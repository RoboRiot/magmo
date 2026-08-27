import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.css";
import "../styles/theme.css";
import Layout from "../components/Layout";
import { AuthUserProvider, useAuth } from "../context/AuthUserContext";
import { ThemeProvider, useTheme } from "../context/ThemeContext";

const PUBLIC_ROUTES = new Set(["/", "/404", "/500"]);
const IS_TEST_ENV = process.env.NEXT_PUBLIC_DEPLOY_ENV === "test";
const INITIAL_THEME_SCRIPT = `(function () {
  try {
    var theme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("data-bs-theme", theme);
    document.documentElement.style.colorScheme = theme;
  } catch (error) {
    document.documentElement.setAttribute("data-theme", "light");
    document.documentElement.setAttribute("data-bs-theme", "light");
  }
})();`;

function ThemeHead() {
  const { theme } = useTheme();
  return (
    <Head>
      <script
        key="magmo-initial-theme"
        dangerouslySetInnerHTML={{ __html: INITIAL_THEME_SCRIPT }}
      />
      <meta
        name="theme-color"
        content={theme === "dark" ? "#0a0f1c" : "#f4f6fb"}
      />
    </Head>
  );
}

function AuthGate({ children }) {
  const router = useRouter();
  const { authUser, loading } = useAuth();
  const isPublicRoute = PUBLIC_ROUTES.has(router.pathname);

  useEffect(() => {
    if (!router.isReady || isPublicRoute || loading) return;
    if (authUser) return;

    const destination =
      typeof router.asPath === "string" && router.asPath.trim()
        ? router.asPath
        : "/";
    router.replace(`/?redirect=${encodeURIComponent(destination)}`);
  }, [authUser, isPublicRoute, loading, router]);

  if (isPublicRoute) return children;
  if (loading) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <h3>Loading...</h3>
      </div>
    );
  }
  if (!authUser) return null;

  return children;
}

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Load Bootstrap JS once
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;
    const onLoad = () => {
      navigator.serviceWorker.register("/sw.js").catch((error) => {
        console.warn("Service worker registration failed:", error);
      });
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  // NEW: On initial client mount, check if the browser URL (window.location.pathname)
  // is different from what Next's router thinks (which will be "/" when served via index.html).
  // If so, replace the route so that Next loads the proper dynamic page.
  useEffect(() => {
    if (typeof window !== "undefined" && router.isReady) {
      const actualPath = window.location.pathname;
      // Only if the current browser path is not "/" but the router shows "/"
      // (which happens because Firebase Hosting serves index.html for every route),
      // then navigate to the actual path.
      if (actualPath !== "/" && router.asPath === "/") {
        router.replace(actualPath + window.location.search);
      }
    }
  }, [router.isReady, router.asPath]);

  return (
    <AuthUserProvider>
      <ThemeProvider>
        <ThemeHead />
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        {IS_TEST_ENV && <meta name="robots" content="noindex,nofollow,noarchive" />}
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="application-name"
          content={IS_TEST_ENV ? "Magmo Test Bay" : "Magmo Inventory"}
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Magmo" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>
      <Layout>
        <AuthGate>
          <Component {...pageProps} />
        </AuthGate>
      </Layout>
      {IS_TEST_ENV && (
        <div
          aria-label="Magmo test environment using shared Firebase data"
          style={{
            position: "fixed",
            right: "12px",
            bottom: "12px",
            zIndex: 2147483647,
            padding: "7px 10px",
            borderRadius: "999px",
            background: "#b42318",
            color: "#fff",
            boxShadow: "0 4px 14px rgba(0, 0, 0, 0.3)",
            fontSize: "12px",
            fontWeight: 800,
            letterSpacing: "0.06em",
          }}
        >
          TEST BAY · SHARED DATA
        </div>
      )}
      </ThemeProvider>
    </AuthUserProvider>
  );
}

export default MyApp;

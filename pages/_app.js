import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.css";
import Layout from "../components/Layout";
import { AuthUserProvider } from "../context/AuthUserContext";

// Setup pdfjs (if used) - only on client side
let pdfjs = null;
if (typeof window !== "undefined") {
  // Only import on client side
  try {
    const { pdfjs: pdfjsModule } = require("react-pdf");
    pdfjs = pdfjsModule;
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
  } catch (error) {
    console.warn("PDF.js not available:", error);
  }
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
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="application-name" content="Magmo Inventory" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Magmo" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthUserProvider>
  );
}

export default MyApp;

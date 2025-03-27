import React, { useEffect } from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.css";
import Layout from "../components/Layout";
import { AuthUserProvider } from "../context/AuthUserContext";

// Setup pdfjs (if used)
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Load Bootstrap JS once
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
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
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthUserProvider>
  );
}

export default MyApp;

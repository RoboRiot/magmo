module.exports = {
  // Allow multiple local test servers to run without sharing Next's dev lock.
  // Production builds keep using the default .next directory.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  trailingSlash: false,
  async rewrites() {
    return {
      fallback: [
        {
          source: "/__/:path*",
          destination: "https://magmo-ac10c.firebaseapp.com/__/:path*",
        },
      ],
    };
  },
};

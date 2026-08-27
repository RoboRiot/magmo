module.exports = {
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

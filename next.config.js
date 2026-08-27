const webpack = require("webpack");

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
  webpack: (config, { isServer, defaultLoaders }) => {
    // Bypass Terser
    config.optimization.minimize = false;

    // Next 10 does not run CommonJS files through Babel by default. Several
    // shared browser/server helpers use modern syntax, so transpile local CJS.
    config.module.rules.push({
      test: /\.cjs$/,
      exclude: /node_modules/,
      use: defaultLoaders.babel,
    });

    // Ignore pdfjs-dist and other client-side only modules on server
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        "pdfjs-dist": "commonjs pdfjs-dist",
        "react-pdf": "commonjs react-pdf",
        "@react-pdf/renderer": "commonjs @react-pdf/renderer",
      });
    }

    // Ignore pdfjs-dist
    config.plugins.push(new webpack.IgnorePlugin(/pdfjs-dist/));

    return config;
  },
};

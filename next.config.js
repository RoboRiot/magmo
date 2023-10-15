const webpack = require('webpack');

module.exports = {
  future: {
    webpack5: true
  },
  webpack: (config) => {
    // Bypass Terser
    config.optimization.minimize = false;

    // Ignore pdfjs-dist
    config.plugins.push(
      new webpack.IgnorePlugin(/pdfjs-dist/)
    );

    return config;
  }
};

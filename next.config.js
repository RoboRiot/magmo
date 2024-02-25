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

// const webpack = require('webpack');

// module.exports = {
//   webpack: (config) => {
//     // Ignore pdfjs-dist
//     config.plugins.push(
//       new webpack.IgnorePlugin({
//         resourceRegExp: /pdfjs-dist/,
//       })
//     );

//     // Fix for react-pdf issue
//     config.module.rules.push({
//       test: /react-pdf\/.*\.js$/,
//       loader: 'null-loader'
//     });

//     // Exclude react-pdf from being processed by webpack
//     config.externals.push('react-pdf');

//     return config;
//   }
// };


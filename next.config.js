require('dotenv').config();
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['money-pie.up.railway.app', 'production-moneypie.up.railway.app']
  },
  webpack(config, options) {
    config.module.rules.push({
      loader: '@svgr/webpack',
      issuer: /\.[jt]sx?$/,
      options: {
        prettier: false,
        svgo: true,
        svgoConfig: {
          plugins: [{
            name: 'preset-default',
            params: {
              override: {
                removeViewBox: false
              }
            }
          }],
        },
        titleProp: true,
      },
      test: /\.svg$/,
    });

    return config;
  },
};

const withTM = require('next-transpile-modules')(['react-haiku']);
const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = withTM({
  reactStrictMode: true,
  compiler: {
    styledComponents: {
      ssr: true,
    },
  },
  i18n,
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
});

module.exports = nextConfig;

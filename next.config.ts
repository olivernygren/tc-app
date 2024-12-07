const withTM = require('next-transpile-modules')(['react-haiku']); // Add react-haiku to the transpile list
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
});

module.exports = nextConfig;

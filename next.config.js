const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    config.resolve.plugins.push(new TsconfigPathsPlugin());
    return config;
  },
};

module.exports = nextConfig;

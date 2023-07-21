/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // declare here all your variables
    API_BASE_URL: process.env.REACT_APP_API_FULL_URL,
  },
};

module.exports = nextConfig;

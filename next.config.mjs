/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DRONE_ID: process.env.DRONE_ID || process.env.NEXT_PUBLIC_DRONE_ID,
    API_URL: process.env.API_URL || process.env.NEXT_PUBLIC_API_URL,
    CONFIG_PATH: process.env.CONFIG_PATH || '/configs',
    STATUS_PATH: process.env.STATUS_PATH || '/status',
    LOG_PATH: process.env.LOG_PATH || '/logs',
  },
};

export default nextConfig;

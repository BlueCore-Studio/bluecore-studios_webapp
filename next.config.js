/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/research", destination: "/blog", permanent: true },
      { source: "/research/:slug", destination: "/blog/:slug", permanent: true },
    ];
  },
};

module.exports = nextConfig;

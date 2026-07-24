/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
    ],
  },
  // Silence hydration warnings from browser extensions
  reactStrictMode: true,
  // Next.js 15: opt in to static params being synchronous (avoids async-param migration)
  experimental: {
    staleTimes: {
      dynamic: 0,
    },
  },
};

export default nextConfig;

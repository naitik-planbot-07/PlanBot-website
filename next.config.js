/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',        // Static HTML export — required for Firebase Hosting
  trailingSlash: true,     // Generates /about/index.html instead of /about.html
                           // Firebase Hosting serves directories correctly
  images: {
    unoptimized: true,     // next/image optimization requires a server — disable for static
  },
  // Redirects do NOT work in static export — handle in firebase.json instead
  // Remove any redirects from here
};

module.exports = nextConfig;

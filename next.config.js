/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',        // Static HTML export — required for Firebase Hosting
  trailingSlash: false,    // Generates /about.html instead of /about/index.html
                           // Firebase Hosting with cleanUrls will serve it at /about
  images: {
    unoptimized: true,
  },
  // Redirects do NOT work in static export — handle in firebase.json instead
  // Remove any redirects from here
};

module.exports = nextConfig;

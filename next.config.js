/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,     // Generates /about/index.html instead of /about.html
                           // Firebase Hosting serves directories correctly
  images: {
  },
  // Redirects do NOT work in static export — handle in firebase.json instead
  // Remove any redirects from here
};

module.exports = nextConfig;

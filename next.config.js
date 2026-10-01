/** @type {import('next').NextPolicy} */
const nextConfig = {
  output: 'export', // <-- DIESE ZEILE HINZUFÜGEN
  
  // Falls du Images (<Image />) von Next nutzt, musst du sie für den statischen Export unoptimiert lassen:
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig; // bzw. export default nextConfig bei .mjs

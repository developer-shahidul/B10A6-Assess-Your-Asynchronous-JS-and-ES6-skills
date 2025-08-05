/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js}", // তোমার ফাইল গুলো এখানে ঠিকভাবে দিতে হবে
  ],
  theme: {
    extend: {
      backgroundImage: {
        "dots-pattern": "url('/images/dots.png')", // ইমেজের রিলেটিভ পাথ
      },
    },
  },
  plugins: [],
};

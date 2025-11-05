module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "var(--color-primary-100)", // indigo-100
          200: "var(--color-primary-200)", // indigo-200
          300: "var(--color-primary-300)", // indigo-300
          400: "var(--color-primary-400)", // indigo-400
          500: "var(--color-primary-500)", // indigo-500
          600: "var(--color-primary-600)", // indigo-600
          700: "var(--color-primary-700)", // indigo-700
          800: "var(--color-primary-800)", // indigo-800
          900: "var(--color-primary-900)", // indigo-900
        },
        background: "var(--color-background)", // gray-50
        lightGrayBackground: "var(--color-gray-100)", // gray-300
        surface: "var(--color-surface)", // white
        border: "var(--color-border)", // gray-200
        success: "var(--color-success)", // emerald-600
        warning: "var(--color-warning)", // amber-500
        error: "var(--color-error)", // rose-600
        info: "var(--color-info)", // blue-500
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["Inter", "ui-sans-serif", "system-ui"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "65ch",
            color: "var(--color-text-primary)",
            a: {
              color: "var(--color-primary-600)",
              "&:hover": {
                color: "var(--color-primary-700)",
              },
            },
          },
        },
      },
    },
  },
  plugins: [],
};

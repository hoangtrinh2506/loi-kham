module.exports = {
  darkMode: ["selector", '[zaui-theme="dark"]'],
  purge: {
    enabled: true,
    content: ["./src/**/*.{js,jsx,ts,tsx,vue}"],
  },
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        "primary-dark": "var(--primary-dark)",
        "primary-ink": "#0b4a40",
        "primary-gradient": "var(--primary-gradient)",
        highlight: "var(--highlight)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        subtle: "#3f5a55",
        line: "#d9e3e0",
        field: "#b9c9c5",
        disabled: "var(--disabled)",
        "disabled-bg": "#e6ecea",
        danger: {
          DEFAULT: "#c62828",
          text: "#a31f1f",
          dark: "#7a1616",
          ink: "#3b0f0f",
          muted: "#5c2a2a",
          soft: "#fdecea",
          line: "#e9b5b0",
        },
        warning: {
          text: "#7a4f00",
          ink: "#6b4400",
          soft: "#fff1cc",
          bg: "#fff8e3",
        },
        success: {
          DEFAULT: "#1b6b3a",
          soft: "#e3f3e8",
        },
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', "system-ui", "sans-serif"],
      },
      spacing: {
        st: "var(--safe-top)",
        sb: "var(--safe-bottom)",
      },
      fontSize: {
        "4xs": ["10px", "14px"],
        "3xs": ["11px", "16px"],
        "2xs": ["12px", "16px"],
        xs: ["13px", "18px"],
        sm: ["14px", "18px"],
        base: ["15px", "20px"],
        lg: ["16px", "22px"],
        xl: ["18px", "24px"],
      },
    },
  },
};

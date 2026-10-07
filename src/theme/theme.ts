import { createTheme, responsiveFontSizes } from "@mui/material/styles";

import { COLORS } from "@/theme/colors";
let theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: COLORS.red, // Brand Red — RGB 254, 0, 52
      light: COLORS.redLight,
      dark: COLORS.redDark,
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: COLORS.yellow, // Brand Yellow — RGB 255, 229, 31
      light: "#FFEC5C",
      dark: COLORS.yellowDark,
      contrastText: "#000000",
    },
    success: {
      main: "#10B981",
      light: "#34D399",
      dark: "#059669",
    },
    info: {
      main: "#2563EB",
      light: "#60A5FA",
      dark: "#1D4ED8",
    },
    warning: {
      main: "#F59E0B",
      light: "#FBBF24",
      dark: "#D97706",
    },
    error: {
      main: "#EF4444",
      light: "#F87171",
      dark: "#DC2626",
    },
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
    },
    text: {
      primary: COLORS.ink,
      secondary: COLORS.textSecondary,
      disabled: COLORS.disabled,
    },
    divider: COLORS.border,
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontWeight: 800,
      letterSpacing: "-0.025em",
      lineHeight: 1.15,
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 700,
      letterSpacing: "-0.015em",
      lineHeight: 1.25,
    },
    h4: {
      fontWeight: 600,
      letterSpacing: "-0.01em",
      lineHeight: 1.3,
    },
    h5: {
      fontWeight: 600,
      letterSpacing: "-0.005em",
      lineHeight: 1.35,
    },
    h6: {
      fontWeight: 600,
      lineHeight: 1.4,
    },
    subtitle1: {
      fontWeight: 500,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      lineHeight: 1.6,
    },
    body2: {
      lineHeight: 1.55,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
      letterSpacing: "0.01em",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "none",
          padding: "8px 18px",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(254, 0, 52, 0.15)",
          },
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${COLORS.red} 0%, ${COLORS.redLight} 100%)`,
          "&:hover": {
            background: `linear-gradient(135deg, ${COLORS.redDark} 0%, ${COLORS.red} 100%)`,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
          transition: "all 0.25s ease-in-out",
          "&:hover": {
            boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 9999,
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: "1240px !important",
          paddingLeft: "16px",
          paddingRight: "16px",
          "@media (min-width: 600px)": {
            paddingLeft: "24px",
            paddingRight: "24px",
          },
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;

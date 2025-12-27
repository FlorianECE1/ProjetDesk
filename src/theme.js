import { MD3DarkTheme } from "react-native-paper";

// Neon brand palette
const brandColors = {
  primary: "#9B59FF", // vibrant purple
  secondary: "#00E5FF", // cyan neon
  background: "#000000",
  surface: "#0A0A0A",
  neonText: "#39FF14", // neon green for text/highlights
};

const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: brandColors.primary,
    secondary: brandColors.secondary,
    background: brandColors.background,
    surface: brandColors.surface,
    onSurface: brandColors.neonText,
    text: brandColors.neonText,
    // keep onPrimary white for contrast
    onPrimary: "#000000",
  },
  roundness: 8,
};

export { brandColors };
export default theme;

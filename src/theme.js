import { MD3DarkTheme } from "react-native-paper";

// Palette de marque (style néon)
const brandColors = {
  primary: "#9B59FF", // violet bien punchy
  secondary: "#00E5FF", // cyan néon
  background: "#000000",
  surface: "#0A0A0A",
  neonText: "#39FF14", // vert néon pour le texte / les accents
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
    // onPrimary en blanc pour garder du contraste
    onPrimary: "#000000",
  },
  roundness: 8,
};

export { brandColors };
export default theme;

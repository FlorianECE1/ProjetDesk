import { StyleSheet, Dimensions } from "react-native";
import theme from "./theme";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  screen: {
    flex: 1,
    backgroundColor: "#070A16",
    paddingHorizontal: 18,
    paddingTop: 6,
  },

  appbarHeader: {
    backgroundColor: "#070A16",
    elevation: 0,
    paddingBottom: 6,
  },
  topBarRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },

  appbarLeft: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
    height: 56,
  },
  appbarRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  appLogo: {
    width: 50,
    height: 50,
    marginLeft: 6,
  },
  logoButton: {
    marginRight: 8,
  },
  appTitleLeft: {
    color: "#6CF0FF",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.8,
  },

  // HOME
  brandBlock: {
    alignItems: "center",
    marginTop: 4,
    marginBottom: 6,
  },
  brandLogo: {
    width: 320,
    height: 140,
  },
  brandLogoTitle: {
    width: 320,
    height: 120,
  },
  centerWrap: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 20,
  },
  heroCard: {
    borderRadius: 22,
    padding: 16,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: "rgba(120, 220, 255, 0.18)",
    shadowColor: "#00E5FF",
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 3,
  },
  heroImageWrap: {
    borderRadius: 18,
    overflow: "hidden",
    height: 220,
    backgroundColor: "rgba(0,0,0,0.25)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    marginBottom: 14,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },

  /* Carousel (landing) */
  carouselWrap: {
    width: 260,
    height: 200,
    borderRadius: 14,
    overflow: "hidden",
    marginRight: 12,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  carouselImage: {
    width: "100%",
    height: "100%",
  },
  carouselDesc: {
    color: "rgba(255,255,255,0.78)",
    fontSize: 14,
    marginHorizontal: 18,
    marginBottom: 8,
  },
  productTitle: {
    textAlign: "center",
    color: "#A98CFF",
    fontSize: 26,
    fontWeight: "800",
    marginTop: 2,
  },
  productPrice: {
    textAlign: "center",
    color: "#FF4FD8",
    fontSize: 26,
    fontWeight: "900",
    marginTop: 8,
    marginBottom: 14,
  },
  buyButton: {
    borderRadius: 16,
    backgroundColor: "#5B6CFF",
  },
  buyButtonLabel: {
    fontWeight: "900",
    letterSpacing: 1.2,
  },

  // CONTROL
  controlHeader: {
    marginTop: 8,
    marginBottom: 14,
    alignItems: "center",
  },
  controlTitle: {
    color: "#6CF0FF",
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: 0.8,
  },
  controlStack: {
    flex: 1,
    gap: 14,
    paddingBottom: 18,
  },
  glassCard: {
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: "rgba(120, 220, 255, 0.18)",
    overflow: "hidden",
  },
  cardContentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  cardTitle: {
    color: "rgba(255,255,255,0.92)",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 4,
  },
  cardSub: {
    color: "rgba(255,255,255,0.62)",
    fontSize: 13,
    fontWeight: "600",
  },
  swatchRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
    flexWrap: "wrap",
  },
  swatch: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
  },
  colorRingWrap: {
    width: 92,
    alignItems: "center",
    justifyContent: "center",
  },
  colorRingOuter: {
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 6,
    borderColor: "rgba(255,255,255,0.14)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#6CF0FF",
    shadowOpacity: 0.16,
    shadowRadius: 14,
    elevation: 2,
  },
  colorRingInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
  },
  heightTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  heightValue: {
    color: "#6CF0FF",
    fontSize: 16,
    fontWeight: "900",
  },
  heightLegendRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  heightLegend: {
    color: "rgba(255,255,255,0.45)",
    fontWeight: "700",
  },
  audioRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  audioButton: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 1,
    borderColor: "rgba(120, 220, 255, 0.22)",
    backgroundColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },

  simpleCard: {
    marginTop: 18,
    borderRadius: 22,
    padding: 16,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: "rgba(120, 220, 255, 0.18)",
  },
  brandTitleWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  brandTitleMain: {
    color: "#6CF0FF",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    textShadowColor: "rgba(108, 240, 255, 0.65)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },

  brandBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "rgba(169, 140, 255, 0.18)",
    borderWidth: 1,
    borderColor: "rgba(169, 140, 255, 0.55)",
  },

  brandBadgeText: {
    color: "#A98CFF",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.6,
  },

  sectionTitle: {
    color: "rgba(255,255,255,0.92)",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 10,
  },

  grid: {
    flexDirection: "column",
    gap: 12,
  },

  productCard: {
    width: "100%",
    borderRadius: 20,
    padding: 14,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: "rgba(120, 220, 255, 0.18)",
    marginBottom: 14,
  },

  productImageWrap: {
    height: 300,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0,0.25)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    marginBottom: 12,
  },

  productImage: {
    width: "100%",
    height: "100%",
  },

  productName: {
    color: "rgba(255,255,255,0.92)",
    fontWeight: "800",
    fontSize: 13,
    marginBottom: 4,
  },

  productPriceSmall: {
    color: "#FF4FD8",
    fontSize: 14,
    fontWeight: "900",
    marginBottom: 10,
  },

  productBuyButton: {
    borderRadius: 14,
    backgroundColor: "#5B6CFF",
  },

  productBuyLabel: {
    fontWeight: "900",
    letterSpacing: 1,
    fontSize: 11,
  },

  detailsImageWrap: {
    height: 320,
    width: Dimensions.get("window").width,
    marginLeft: -18,
    borderRadius: 0,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    backgroundColor: "rgba(0,0,0,0.25)",
  },

  detailsImage: {
    width: "100%",
    height: "100%",
  },

  detailsTitle: {
    marginTop: 14,
    color: "rgba(255,255,255,0.95)",
    fontSize: 26,
    fontWeight: "900",
  },

  detailsPrice: {
    marginTop: 6,
    color: "#FF4FD8",
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 12,
  },

  detailsCard: {
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: "rgba(120, 220, 255, 0.18)",
  },

  detailsSectionTitle: {
    color: "#6CF0FF",
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 6,
  },

  detailsText: {
    color: "rgba(255,255,255,0.70)",
    fontSize: 14,
    lineHeight: 20,
  },

  featureRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 8,
  },

  featureBullet: {
    color: "#A98CFF",
    fontSize: 16,
    fontWeight: "900",
    width: 18,
    marginTop: -1,
  },

  featureText: {
    flex: 1,
    color: "rgba(255,255,255,0.80)",
    fontSize: 14,
    lineHeight: 20,
  },

  cartItemCard: {
    marginTop: 12,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: "rgba(120, 220, 255, 0.18)",
  },

  cartItemRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },

  cartThumb: {
    width: 70,
    height: 70,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },

  cartName: {
    color: "rgba(255,255,255,0.92)",
    fontWeight: "900",
    fontSize: 14,
  },

  cartPrice: {
    color: "#FF4FD8",
    fontWeight: "900",
    marginTop: 4,
  },

  cartQtyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },

  qtyBtn: {
    borderRadius: 12,
    borderColor: "rgba(255,255,255,0.25)",
  },

  qtyText: {
    color: "rgba(255,255,255,0.9)",
    fontWeight: "900",
    minWidth: 18,
    textAlign: "center",
  },

  lineTotal: {
    color: "#6CF0FF",
    fontWeight: "900",
    marginLeft: 6,
  },

  cartSummaryCard: {
    marginTop: 14,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: "rgba(120, 220, 255, 0.18)",
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  summaryLabel: {
    color: "rgba(255,255,255,0.7)",
    fontWeight: "900",
    fontSize: 14,
  },

  summaryValue: {
    color: "#6CF0FF",
    fontWeight: "900",
    fontSize: 18,
  },

  paySubtitle: {
    marginTop: 6,
    color: "rgba(255,255,255,0.60)",
    fontWeight: "700",
  },

  visaCard: {
    marginTop: 10,
    borderRadius: 22,
    padding: 16,
    backgroundColor: "rgba(91,108,255,0.16)",
    borderWidth: 0,
    borderColor: "transparent",
    shadowColor: "#6CF0FF",
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 3,
  },

  visaCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  visaChip: {
    color: "rgba(255,255,255,0.7)",
    fontWeight: "900",
    letterSpacing: 2,
  },

  visaBrand: {
    color: "#6CF0FF",
    fontWeight: "900",
    letterSpacing: 2,
    fontSize: 16,
  },

  visaNumberPreview: {
    marginTop: 18,
    color: "rgba(255,255,255,0.92)",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 2,
  },

  visaCardBottom: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  visaLabel: {
    color: "rgba(255,255,255,0.55)",
    fontWeight: "900",
    fontSize: 10,
    letterSpacing: 1.2,
  },

  visaValue: {
    marginTop: 4,
    color: "rgba(255,255,255,0.90)",
    fontWeight: "900",
    fontSize: 12,
    letterSpacing: 1,
  },

  payInput: {
    marginTop: 12,
    backgroundColor: "rgba(0,0,0,0.18)",
  },

  payRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  payButton: {
    marginTop: 14,
    borderRadius: 16,
    backgroundColor: "#5B6CFF",
  },

  payBackBtn: {
    marginTop: 10,
    borderRadius: 16,
    borderColor: "rgba(255,255,255,0.25)",
  },
  footerBar: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 12,
    height: 64,
    borderRadius: 16,
    backgroundColor: "rgba(11,16,30,0.95)",
    borderWidth: 1,
    borderColor: "rgba(108,240,255,0.08)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 6,
    paddingVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.45,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 10,
  },
});

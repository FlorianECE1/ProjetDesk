import * as React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import theme from "./src/theme";
import {
  Provider as PaperProvider,
  Appbar,
  Text,
  Button,
  IconButton,
  Card,
} from "react-native-paper";

import Slider from "@react-native-community/slider";

import {
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const navigationRef = createNavigationContainerRef();
const Tab = createBottomTabNavigator();

const logoSource = require("./assets/logo.png");
const logoTitle = require("./assets/nom_logoV2.png");
const deskImage = {
  uri: "https://images.unsplash.com/photo-1616627986047-49bb82a651c3?auto=format&fit=crop&w=1200&q=80",
};
import { ScrollView } from "react-native"; // <- ajoute ça en haut si pas déjà

function HomeScreen() {
  const PRODUCTS = [
    // --- GAMING (3)
    {
      id: "g1",
      category: "Gaming Desks",
      name: "Neon Edge Gaming",
      price: 299,
      image:
        "https://images.unsplash.com/photo-1541558869434-2840c3c9b236?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "g2",
      category: "Gaming Desks",
      name: "RGB Pro Arena",
      price: 349,
      image:
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "g3",
      category: "Gaming Desks",
      name: "Carbon Strike XL",
      price: 399,
      image:
        "https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&w=1200&q=80",
    },

    // --- ART DECO (3)
    {
      id: "a1",
      category: "Art Deco Desks",
      name: "Brass & Walnut Deco",
      price: 459,
      image:
        "https://images.unsplash.com/photo-1519710887729-3f6d0a9898f1?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "a2",
      category: "Art Deco Desks",
      name: "Velvet Line Deco",
      price: 499,
      image:
        "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "a3",
      category: "Art Deco Desks",
      name: "Marble Glow Deco",
      price: 549,
      image:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
    },

    // --- WORK (3)
    {
      id: "w1",
      category: "Work Desks",
      name: "Minimal Work Station",
      price: 279,
      image:
        "https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "w2",
      category: "Work Desks",
      name: "Ergo Standing Desk",
      price: 369,
      image:
        "https://images.unsplash.com/photo-1582582621959-48d27397dc8b?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "w3",
      category: "Work Desks",
      name: "Oak Productivity Pro",
      price: 329,
      image:
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const grouped = React.useMemo(() => {
    const map = new Map();
    for (const p of PRODUCTS) {
      if (!map.has(p.category)) map.set(p.category, []);
      map.get(p.category).push(p);
    }
    return Array.from(map.entries()); // [ [category, products], ... ]
  }, []);

  const ProductCard = ({ item }) => (
    <View style={styles.productCard}>
      <View style={styles.productImageWrap}>
        <Image
          source={{ uri: item.image }}
          style={styles.productImage}
          resizeMode="cover"
        />
      </View>

      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPriceSmall}>${item.price}</Text>

      <Button
        mode="contained"
        onPress={() =>
          navigationRef.isReady() && navigationRef.navigate("Cart")
        }
        contentStyle={{ height: 44 }}
        style={styles.productBuyButton}
        labelStyle={styles.productBuyLabel}
      >
        BUY NOW
      </Button>
    </View>
  );

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingBottom: 22 }}
    >
      {/* Logo central (celui que tu as remplacé) */}
      <View style={styles.brandBlock}>
        <Image
          source={logoTitle}
          style={styles.brandLogoTitle}
          resizeMode="contain"
        />
      </View>

      {/* Sections */}
      {grouped.map(([category, items]) => (
        <View key={category} style={{ marginTop: 14 }}>
          <Text style={styles.sectionTitle}>{category}</Text>

          <View style={styles.grid}>
            {items.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

function DeskControlScreen() {
  const [lightingColor, setLightingColor] = React.useState("#35E0FF");
  const [heightIn, setHeightIn] = React.useState(30);
  const [audioOn, setAudioOn] = React.useState(true);

  const swatches = ["#35E0FF", "#7C4DFF", "#FF4FD8", "#FFB300", "#40FF8A"];

  return (
    <View style={styles.screen}>
      <View style={styles.controlHeader}>
        <Text style={styles.controlTitle}>Desk Control</Text>
      </View>

      <View style={styles.controlStack}>
        {/* Lighting */}
        <Card style={styles.glassCard} mode="contained">
          <Card.Content style={styles.cardContentRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Lighting</Text>

              <View style={styles.swatchRow}>
                {swatches.map((c) => (
                  <TouchableOpacity
                    key={c}
                    onPress={() => setLightingColor(c)}
                    style={[
                      styles.swatch,
                      {
                        backgroundColor: c,
                        borderColor:
                          lightingColor === c
                            ? "rgba(255,255,255,0.9)"
                            : "rgba(255,255,255,0.15)",
                        transform: [{ scale: lightingColor === c ? 1.07 : 1 }],
                      },
                    ]}
                  />
                ))}
              </View>
            </View>

            {/* Cercle */}
            <View style={styles.colorRingWrap}>
              <View style={styles.colorRingOuter}>
                <View
                  style={[
                    styles.colorRingInner,
                    { backgroundColor: lightingColor },
                  ]}
                />
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Height */}
        <Card style={styles.glassCard} mode="contained">
          <Card.Content>
            <View style={styles.heightTopRow}>
              <Text style={styles.cardTitle}>Height</Text>
              <Text style={styles.heightValue}>{Math.round(heightIn)}in</Text>
            </View>

            <View style={{ marginTop: 10 }}>
              <Slider
                value={heightIn}
                onValueChange={setHeightIn}
                minimumValue={24}
                maximumValue={48}
                step={1}
                minimumTrackTintColor={theme.colors.primary}
                maximumTrackTintColor={"rgba(255,255,255,0.18)"}
                thumbTintColor={theme.colors.primary}
              />
            </View>

            <View style={styles.heightLegendRow}>
              <Text style={styles.heightLegend}>24in</Text>
              <Text style={styles.heightLegend}>48in</Text>
            </View>
          </Card.Content>
        </Card>

        {/* Audio */}
        <Card style={styles.glassCard} mode="contained">
          <Card.Content style={styles.audioRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Audio</Text>
              <Text style={styles.cardSub}>
                {audioOn ? "Sound enabled" : "Sound muted"}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => setAudioOn((v) => !v)}
              style={styles.audioButton}
            >
              <IconButton
                icon={audioOn ? "music-note" : "music-note-off"}
                iconColor={theme.colors.primary}
                size={28}
              />
            </TouchableOpacity>
          </Card.Content>
        </Card>

        <Button
          mode="outlined"
          onPress={() =>
            navigationRef.isReady() && navigationRef.navigate("Home")
          }
          style={{ marginTop: 6, borderColor: "rgba(255,255,255,0.25)" }}
          textColor={theme.colors.text}
        >
          Back to Shop
        </Button>
      </View>
    </View>
  );
}

function CartScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.simpleCard}>
        <Text style={styles.cardTitle}>Cart</Text>
        <Text style={styles.cardSub}>Votre panier est vide.</Text>

        <Button
          mode="contained"
          onPress={() =>
            navigationRef.isReady() && navigationRef.navigate("Home")
          }
          style={{ marginTop: 14 }}
        >
          Retour à l'accueil
        </Button>
      </View>
    </View>
  );
}

function AccountScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.simpleCard}>
        <Text style={styles.cardTitle}>Account</Text>
        <Text style={styles.cardSub}>Zone Compte utilisateur.</Text>

        <Button
          mode="outlined"
          onPress={() =>
            navigationRef.isReady() && navigationRef.navigate("Home")
          }
          style={{ marginTop: 14, borderColor: "rgba(255,255,255,0.25)" }}
          textColor={theme.colors.text}
        >
          Retour à l'accueil
        </Button>
      </View>
    </View>
  );
}

function NotificationsScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.simpleCard}>
        <Text style={styles.cardTitle}>Notifications</Text>
        <Text style={styles.cardSub}>Aucune notification.</Text>

        <Button
          mode="outlined"
          onPress={() =>
            navigationRef.isReady() && navigationRef.navigate("Home")
          }
          style={{ marginTop: 14, borderColor: "rgba(255,255,255,0.25)" }}
          textColor={theme.colors.text}
        >
          Retour à l'accueil
        </Button>
      </View>
    </View>
  );
}

export default function App() {
  const [routeName, setRouteName] = React.useState("Home");

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />

        {/* ✅ Appbar FIXE - le bouton paramètres n’apparaît que sur Home */}
        <Appbar.Header style={styles.appbarHeader}>
          <View style={styles.appbarLeft}>
            <TouchableOpacity
              onPress={() =>
                navigationRef.isReady() && navigationRef.navigate("Home")
              }
              style={styles.logoButton}
            >
              <Image
                source={logoSource}
                style={styles.appLogo}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <View style={styles.brandTitleWrap}>
              <Text style={styles.brandTitleMain}>10 12 14</Text>
              <View style={styles.brandBadge}>
                <Text style={styles.brandBadgeText}>DESK</Text>
              </View>
            </View>
          </View>

          <View style={styles.appbarRight}>
            {/* ✅ IMPORTANT : afficher le bouton paramètres sur toutes les pages sauf "DeskControl" */}
            {routeName !== "DeskControl" && (
              <Appbar.Action
                icon="tune-variant"
                onPress={() =>
                  navigationRef.isReady() &&
                  navigationRef.navigate("DeskControl")
                }
              />
            )}

            <Appbar.Action
              icon="cart"
              onPress={() =>
                navigationRef.isReady() && navigationRef.navigate("Cart")
              }
            />
            <Appbar.Action
              icon="account"
              onPress={() =>
                navigationRef.isReady() && navigationRef.navigate("Account")
              }
            />
            <Appbar.Action
              icon="bell"
              onPress={() =>
                navigationRef.isReady() &&
                navigationRef.navigate("Notifications")
              }
            />
          </View>
        </Appbar.Header>

        <NavigationContainer
          ref={navigationRef}
          onStateChange={() => {
            const current = navigationRef.getCurrentRoute();
            if (current?.name) setRouteName(current.name);
          }}
        >
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarStyle: { display: "none" },
            }}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="DeskControl" component={DeskControlScreen} />
            <Tab.Screen name="Cart" component={CartScreen} />
            <Tab.Screen name="Account" component={AccountScreen} />
            <Tab.Screen name="Notifications" component={NotificationsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  screen: {
    flex: 1,
    backgroundColor: "#070A16",
    paddingHorizontal: 18,
    paddingTop: 14,
  },

  appbarHeader: {
    backgroundColor: "#070A16",
    elevation: 0,
  },
  appbarLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  appbarRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  appLogo: {
    width: 36,
    height: 36,
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
    marginTop: 6,
    marginBottom: 14,
  },
  brandLogo: {
    width: 210,
    height: 70,
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
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  productCard: {
    width: "48%",
    borderRadius: 18,
    padding: 12,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: "rgba(120, 220, 255, 0.18)",
  },

  productImageWrap: {
    height: 110,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0,0.25)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    marginBottom: 10,
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
});

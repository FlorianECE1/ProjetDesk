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
  return (
    <View style={styles.screen}>
      {/* Logo haut */}
      <View style={styles.brandBlock}>
        <Image
          source={logoTitle}
          style={styles.brandLogoTitle}
          resizeMode="contain"
        />
      </View>

      {/* Card produit */}
      <View style={styles.centerWrap}>
        <View style={styles.heroCard}>
          <View style={styles.heroImageWrap}>
            <Image
              source={deskImage}
              style={styles.heroImage}
              resizeMode="cover"
            />
          </View>

          <Text style={styles.productTitle}>Gaming Desk</Text>
          <Text style={styles.productPrice}>$299</Text>

          <Button
            mode="contained"
            onPress={() =>
              navigationRef.isReady() && navigationRef.navigate("Cart")
            }
            contentStyle={{ height: 52 }}
            style={styles.buyButton}
            labelStyle={styles.buyButtonLabel}
          >
            BUY NOW
          </Button>

          {/* ✅ SUPPRIMÉ : plus de lien ici, accès uniquement via bouton en haut à droite */}
        </View>
      </View>
    </View>
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
});

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system/legacy";
import * as ImageManipulator from "expo-image-manipulator";
import * as React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Alert,
} from "react-native";
import theme from "./src/theme";
import styles from "./src/styles";

import Slider from "@react-native-community/slider";

import {
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Disable native screens to avoid passing iOS-specific detent strings
// (some Expo runtimes/native versions may not accept values like 'large')
import { enableScreens } from "react-native-screens";
enableScreens(false);

import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

const navigationRef = createNavigationContainerRef();
const Tab = createBottomTabNavigator();

const logoSource = require("./assets/logo.png");
const logoTitle = require("./assets/nom_logoV2.png");
const OPENAI_API_KEY = "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";
const deskImages = {
  neonEdge: require("./assets/neon.png"),
  rgbPro: require("./assets/rgb.png"),
  carbonXL: require("./assets/carbon.png"),

  brassWalnut: require("./assets/brass.png"),
  velvetLine: require("./assets/velvet.png"),
  marbleGlow: require("./assets/marble.png"),

  minimalWork: require("./assets/minimal.png"),
  ergoStanding: require("./assets/ergo.png"),
  oakProductivity: require("./assets/aok.png"),
};

import {
  Provider as PaperProvider,
  Appbar,
  Text,
  Button,
  IconButton,
  Card,
  TextInput,
  HelperText,
  Menu,
} from "react-native-paper";

function LandingScreen() {
  // Shared carousel index to synchronize all carousels
  const [carouselIndex, setCarouselIndex] = React.useState(0);
  const CAROUSEL_COUNT = 3; // each category has 3 images

  // Global autoplay: advance all carousels together
  React.useEffect(() => {
    const id = setInterval(() => {
      setCarouselIndex((i) => (i + 1) % CAROUSEL_COUNT);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const Carousel = ({ items, title, currentIndex, onIndexChange }) => {
    const scrollRef = React.useRef(null);
    const [containerWidth, setContainerWidth] = React.useState(null);
    const windowWidth = Dimensions.get("window").width;
    const gap = 12; // must match styles.carouselWrap.marginRight
    const itemWidth = containerWidth ? containerWidth : windowWidth - 36; // fallback
    const slideWidth = itemWidth + gap;

    const n = items.length;
    const data = [items[n - 1], ...items, items[0]]; // cloned edges for infinite loop

    // When logical index (0..n-1) changes, animate to displayed index = logical+1
    React.useEffect(() => {
      if (!scrollRef.current || !containerWidth) return;
      const displayed = currentIndex + 1; // account for leading clone
      scrollRef.current.scrollTo({ x: displayed * slideWidth, animated: true });
    }, [currentIndex, slideWidth, containerWidth]);

    const handleMomentumEnd = (e) => {
      const off = e.nativeEvent.contentOffset.x;
      const displayed = Math.round(off / slideWidth);

      if (displayed === 0) {
        // landed on leading clone -> jump to real last
        if (scrollRef.current)
          scrollRef.current.scrollTo({ x: n * slideWidth, animated: false });
        onIndexChange(n - 1);
        return;
      }

      if (displayed === n + 1) {
        // landed on trailing clone -> jump to real first
        if (scrollRef.current)
          scrollRef.current.scrollTo({ x: slideWidth, animated: false });
        onIndexChange(0);
        return;
      }

      // normal
      onIndexChange(displayed - 1);
    };

    return (
      <View
        style={{ marginBottom: 8 }}
        onLayout={(e) => {
          const w = Math.max(0, e.nativeEvent.layout.width - 36); // subtract horizontal padding
          if (w > 0 && w !== containerWidth) setContainerWidth(w);
        }}
      >
        <Text style={styles.sectionTitle}>{title}</Text>
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={slideWidth}
          snapToAlignment="start"
          decelerationRate="fast"
          onMomentumScrollEnd={handleMomentumEnd}
          contentContainerStyle={{ paddingHorizontal: 18 }}
        >
          {data.map((src, i) => (
            <View key={i} style={[styles.carouselWrap, { width: itemWidth }]}>
              <Image
                source={src}
                style={[
                  styles.carouselImage,
                  { backgroundColor: "transparent" },
                ]}
                resizeMode="cover"
              />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingBottom: 140 }}
    >
      <View style={{ alignItems: "center", marginTop: 12 }}>
        <Image
          source={logoTitle}
          style={styles.brandLogoTitle}
          resizeMode="contain"
        />
      </View>
      {/* Carrousels par catégorie (Gaming / Art Deco / Work) */}
      <View style={{ marginTop: 12 }}>
        {/* Gaming */}
        <Carousel
          title="Gaming Desks"
          items={[deskImages.neonEdge, deskImages.rgbPro, deskImages.carbonXL]}
          currentIndex={carouselIndex}
          onIndexChange={setCarouselIndex}
        />

        {/* Description block moved under first carousel */}
        <Card style={[styles.detailsCard, { marginTop: 8 }]} mode="contained">
          <Card.Content>
            <Text style={styles.detailsSectionTitle}>Welcome</Text>
            <Text style={styles.detailsText}>
              We design and sell premium desks thought for comfort, durability
              and design. Discover our gaming, art deco and work collections.
            </Text>

            <View style={{ height: 10 }} />

            <Button
              mode="contained"
              style={{
                marginTop: 8,
                borderRadius: 12,
                backgroundColor: "#5B6CFF",
              }}
              onPress={() =>
                navigationRef.isReady() && navigationRef.navigate("Home")
              }
            >
              Enter in the shop
            </Button>
          </Card.Content>
        </Card>

        {/* (Desk Control card will be placed after the Art Deco carousel) */}

        {/* short description between carousels */}
        <View style={{ height: 12 }} />
        <Text style={styles.detailsText}>
          Explore our Art Deco designs below.
        </Text>
        <View style={{ height: 8 }} />

        {/* Art Deco */}
        <Carousel
          title="Art Deco Desks"
          items={[
            deskImages.brassWalnut,
            deskImages.velvetLine,
            deskImages.marbleGlow,
          ]}
          currentIndex={carouselIndex}
          onIndexChange={setCarouselIndex}
        />

        {/* Quick access to Desk Control (moved) */}
        <Card style={[styles.detailsCard, { marginTop: 12 }]} mode="contained">
          <Card.Content>
            <Text style={styles.detailsSectionTitle}>Control your desk</Text>
            <Text style={styles.detailsText}>
              Access settings and control the lighting or demo height for direct
              comfort experimentation.
            </Text>

            <View style={{ height: 10 }} />

            <Button
              mode="contained"
              style={{
                marginTop: 8,
                borderRadius: 12,
                backgroundColor: "#6CF0FF",
              }}
              onPress={() =>
                navigationRef.isReady() && navigationRef.navigate("DeskControl")
              }
            >
              Open Desk Control
            </Button>
          </Card.Content>
        </Card>

        <View style={{ height: 8 }} />
        <Text style={styles.detailsText}>
          Working solutions designed for productivity.
        </Text>
        <View style={{ height: 8 }} />

        {/* Work */}
        <Carousel
          title="Work Desks"
          items={[
            deskImages.minimalWork,
            deskImages.ergoStanding,
            deskImages.oakProductivity,
          ]}
          currentIndex={carouselIndex}
          onIndexChange={setCarouselIndex}
        />

        {/* Photo suggestion block (UI only) */}
        <View style={{ height: 12 }} />
        <Card style={[styles.detailsCard, { marginTop: 8 }]} mode="contained">
          <Card.Content>
            <Text style={styles.detailsSectionTitle}>Need some advice?</Text>
            <Text style={styles.detailsText}>
              Take a photo of your space and our app will suggest the most
              suitable desk soon. (Coming soon)
            </Text>
            <View style={{ height: 10 }} />
            <Button
              mode="contained"
              style={{ borderRadius: 12, backgroundColor: "#FFB300" }}
              onPress={() => Alert.alert("Functionality", "Coming soon")}
            >
              Take a photo
            </Button>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}

function HomeScreen() {
  const { sortOrder, setSortOrder } = React.useContext(SortContext);
  const { filter, setFilter } = React.useContext(FilterContext);
  const PRODUCTS = [
    // --- GAMING
    {
      id: "g1",
      category: "Gaming Desks",
      name: "Neon Edge Gaming",
      price: 299,
      image: deskImages.neonEdge,
      description:
        "Designed for competitive gaming, Neon Edge Gaming combines a rigid steel frame with RGB-ready cable management and a large mousepad surface for fast movements.",
      features: [
        "RGB edge-ready cable routing",
        "Carbon-textured top (scratch resistant)",
        "Large 140cm surface for dual screens",
        "Headset + cup holder included",
        "Reinforced steel legs (zero wobble)",
      ],
    },
    {
      id: "g2",
      category: "Gaming Desks",
      name: "RGB Pro Arena",
      price: 349,
      image: deskImages.rgbPro,
      description:
        "A premium arena-style desk made for streamers: clean setup, hidden power strip zone, and a pro monitor riser to keep posture perfect.",
      features: [
        "Hidden power strip compartment",
        "Monitor riser for ergonomic viewing",
        "RGB ambience compatibility (LED strip slot)",
        "Full cable-tray under the desk",
        "Anti-slip feet + stability crossbar",
      ],
    },
    {
      id: "g3",
      category: "Gaming Desks",
      name: "Carbon Strike XL",
      price: 399,
      image: deskImages.carbonXL,
      description:
        "The XL model for intense setups: extra depth, heavy-duty frame and premium matte surface that reduces reflections for a cleaner look on stream.",
      features: [
        "XL depth for keyboard + mixer space",
        "Matte anti-reflection surface",
        "Heavy-duty frame (high load capacity)",
        "Side hooks for backpack/controller",
        "Cable grommets + under-tray routing",
      ],
    },

    // --- ART DECO
    {
      id: "a1",
      category: "Art Deco Desks",
      name: "Brass & Walnut Deco",
      price: 459,
      image: deskImages.brassWalnut,
      description:
        "A timeless Art Deco desk mixing walnut wood and brass accents. Perfect for elegant interiors and creative work with a warm atmosphere.",
      features: [
        "Walnut finish with brass detailing",
        "Soft-close drawer for accessories",
        "Rounded corners (premium feel)",
        "Stain-resistant protective coating",
        "Designed for warm ambient lighting",
      ],
    },
    {
      id: "a2",
      category: "Art Deco Desks",
      name: "Velvet Line Deco",
      price: 499,
      image: deskImages.velvetLine,
      description:
        "Velvet Line Deco is made for stylish offices: refined lines, gold touches and a smooth surface ideal for writing, sketching and laptop work.",
      features: [
        "Art Deco lines with gold accents",
        "Smooth writing-friendly top",
        "Compact but spacious layout",
        "Hidden cable hole (rear)",
        "Premium finish (easy to clean)",
      ],
    },
    {
      id: "a3",
      category: "Art Deco Desks",
      name: "Marble Glow Deco",
      price: 549,
      image: deskImages.marbleGlow,
      description:
        "Luxury look with marble effect and a clean gold frame. Designed to elevate any room while staying practical for everyday productivity.",
      features: [
        "Marble-effect top (premium look)",
        "Gold frame with anti-rust finish",
        "Easy-clean surface",
        "Stable structure with cross support",
        "Ideal for minimalist luxury setups",
      ],
    },

    // --- WORK
    {
      id: "w1",
      category: "Work Desks",
      name: "Minimal Work Station",
      price: 279,
      image: deskImages.minimalWork,
      description:
        "A simple and efficient workstation with clean design. Perfect for daily study/work with enough space for monitor + laptop.",
      features: [
        "Minimal design (clean workspace)",
        "Compact footprint for small rooms",
        "Cable hole for clean setup",
        "Durable laminated top",
        "Fast assembly system",
      ],
    },
    {
      id: "w2",
      category: "Work Desks",
      name: "Ergo Standing Desk",
      price: 369,
      image: deskImages.ergoStanding,
      description:
        "Ergonomic standing desk built for comfort and health. Adjust your posture throughout the day and reduce back strain.",
      features: [
        "Height-adjustable system",
        "Sturdy legs (anti-wobble)",
        "Cable management channel",
        "Smooth edges for comfort",
        "Ideal for long work sessions",
      ],
    },
    {
      id: "w3",
      category: "Work Desks",
      name: "Oak Productivity Pro",
      price: 329,
      image: deskImages.oakProductivity,
      description:
        "Oak Productivity Pro balances warmth and efficiency with built-in drawers and a clean surface for focused work.",
      features: [
        "Oak finish for warm workspace",
        "Integrated storage drawers",
        "Large surface for notebook + monitor",
        "Scratch-resistant top",
        "Stable base for daily use",
      ],
    },
  ];

  const filteredProducts = React.useMemo(() => {
    const map = {
      GAMING: "Gaming Desks",
      ARTDECO: "Art Deco Desks",
      WORK: "Work Desks",
    };

    // 1) Filtre
    let list = PRODUCTS;
    if (filter !== "ALL") {
      list = PRODUCTS.filter((p) => p.category === map[filter]);
    }

    // 2) Tri
    const sorted = [...list];
    if (sortOrder === "ASC") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "DESC") {
      sorted.sort((a, b) => b.price - a.price);
    }

    return sorted;
  }, [filter, sortOrder]);

  const grouped = React.useMemo(() => {
    const map = new Map();
    for (const p of filteredProducts) {
      if (!map.has(p.category)) map.set(p.category, []);
      map.get(p.category).push(p);
    }
    return Array.from(map.entries());
  }, [filteredProducts]);

  const ProductCard = ({ item }) => (
    <View style={styles.productCard}>
      <View style={styles.productImageWrap}>
        <Image
          source={item.image}
          style={styles.productImage}
          resizeMode="cover"
        />
      </View>

      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPriceSmall}>${item.price}</Text>

      <Button
        mode="contained"
        onPress={() =>
          navigationRef.isReady() &&
          navigationRef.navigate("ProductDetails", { product: item })
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
      contentContainerStyle={{ paddingBottom: 140 }}
    >
      {/* Logo central (celui que tu as remplacé) */}
      <View style={styles.brandBlock}>
        <Image
          source={logoTitle}
          style={styles.brandLogoTitle}
          resizeMode="contain"
        />
      </View>

      {/* Boutons Tri + Filtre en haut (page shopping) */}
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <IconButton
          icon="sort"
          iconColor="rgba(255,255,255,0.90)"
          size={24}
          onPress={() =>
            Alert.alert("Sort", "Choose the order", [
              { text: "Ascending price", onPress: () => setSortOrder("ASC") },
              { text: "Descending price", onPress: () => setSortOrder("DESC") },
              { text: "No sort", onPress: () => setSortOrder("NONE") },
              { text: "Cancel", style: "cancel" },
            ])
          }
        />
        <IconButton
          icon="filter-variant"
          iconColor="rgba(255,255,255,0.90)"
          size={24}
          onPress={() =>
            Alert.alert("Filter", "Choose a category", [
              { text: "All", onPress: () => setFilter("ALL") },
              { text: "Gaming", onPress: () => setFilter("GAMING") },
              { text: "Art Deco", onPress: () => setFilter("ARTDECO") },
              { text: "Work", onPress: () => setFilter("WORK") },
              { text: "Cancel", style: "cancel" },
            ])
          }
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
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingBottom: 180 }}
    >
      <View style={styles.controlHeader}>
        <Text style={styles.controlTitle}>Desk Control</Text>
      </View>

      <View style={[styles.controlStack, { flex: 0 }]}>
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
          mode="contained"
          onPress={() =>
            navigationRef.isReady() && navigationRef.navigate("Home")
          }
          style={{ marginTop: 14 }}
        >
          Go Home
        </Button>
      </View>
    </ScrollView>
  );
}

function CartScreen() {
  const { cartState, dispatch } = React.useContext(CartContext);
  const { user } = React.useContext(AuthContext);

  const lines = Object.values(cartState.items);

  const total = lines.reduce(
    (sum, line) => sum + line.product.price * line.qty,
    0
  );

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingBottom: 140 }}
    >
      <Text style={styles.controlTitle}>Cart</Text>

      {lines.length === 0 ? (
        <View style={styles.simpleCard}>
          <Text style={styles.cardSub}>Your cart is empty.</Text>
          <Button
            mode="contained"
            onPress={() =>
              navigationRef.isReady() && navigationRef.navigate("Home")
            }
            style={{ marginTop: 14 }}
          >
            Go shopping
          </Button>
        </View>
      ) : (
        <>
          {lines.map(({ product, qty }) => (
            <Card key={product.id} style={styles.cartItemCard} mode="contained">
              <Card.Content style={styles.cartItemRow}>
                <Image source={product.image} style={styles.cartThumb} />

                <View style={{ flex: 1 }}>
                  <Text style={styles.cartName}>{product.name}</Text>
                  <Text style={styles.cartPrice}>${product.price}</Text>

                  <View style={styles.cartQtyRow}>
                    <Button
                      mode="outlined"
                      compact
                      onPress={() => dispatch({ type: "DEC", id: product.id })}
                      style={styles.qtyBtn}
                      textColor={theme.colors.text}
                    >
                      −
                    </Button>

                    <Text style={styles.qtyText}>{qty}</Text>

                    <Button
                      mode="outlined"
                      compact
                      onPress={() => dispatch({ type: "INC", id: product.id })}
                      style={styles.qtyBtn}
                      textColor={theme.colors.text}
                    >
                      +
                    </Button>
                  </View>
                </View>

                <Text style={styles.lineTotal}>${product.price * qty}</Text>
              </Card.Content>
            </Card>
          ))}

          <Card style={styles.cartSummaryCard} mode="contained">
            <Card.Content>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Total</Text>
                <Text style={styles.summaryValue}>${total}</Text>
              </View>

              <Button
                mode="contained"
                style={{
                  marginTop: 12,
                  borderRadius: 16,
                  backgroundColor: "#5B6CFF",
                }}
                contentStyle={{ height: 52 }}
                onPress={() => {
                  if (!user) {
                    navigationRef.isReady() &&
                      navigationRef.navigate("Account", { mode: "login" });
                    return;
                  }
                  navigationRef.isReady() &&
                    navigationRef.navigate("Payment", { total });
                }}
              >
                Checkout
              </Button>
              <Button
                mode="outlined"
                style={{
                  marginTop: 10,
                  borderRadius: 16,
                  borderColor: "rgba(255,255,255,0.25)",
                }}
                textColor={theme.colors.text}
                onPress={() => dispatch({ type: "CLEAR" })}
              >
                Clear cart
              </Button>
            </Card.Content>
          </Card>
        </>
      )}
    </ScrollView>
  );
}

function PaymentScreen({ route }) {
  const total = route?.params?.total ?? 0;

  const { cartState, dispatch } = React.useContext(CartContext);
  const { user } = React.useContext(AuthContext);
  const { notifDispatch } = React.useContext(NotificationsContext);

  const [name, setName] = React.useState("");
  const [card, setCard] = React.useState("");
  const [expiry, setExpiry] = React.useState("");
  const [cvc, setCvc] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const digitsOnly = (s) => (s || "").replace(/\D/g, "");

  const formatCard = (value) => {
    const d = digitsOnly(value).slice(0, 16);
    return d.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (value) => {
    const d = digitsOnly(value).slice(0, 4);
    if (d.length <= 2) return d;
    return `${d.slice(0, 2)}/${d.slice(2)}`;
  };

  const isValidCard = digitsOnly(card).length === 16;
  const isValidName = name.trim().length >= 3;

  const isValidExpiry = (() => {
    const v = expiry.trim();
    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
    const [mmStr, yyStr] = v.split("/");
    const mm = parseInt(mmStr, 10);
    const yy = parseInt(yyStr, 10);
    if (mm < 1 || mm > 12) return false;
    // validation simple: date pas trop absurde
    if (yy < 0 || yy > 99) return false;
    return true;
  })();

  const isValidCvc = (() => {
    const d = digitsOnly(cvc);
    return d.length === 3 || d.length === 4;
  })();

  const canPay = isValidName && isValidCard && isValidExpiry && isValidCvc;

  const onPay = async () => {
    setSubmitted(true);
    if (!canPay) return;

    if (!user) {
      Alert.alert("Sign in required", "You must be signed in to checkout.", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Go to login",
          onPress: () =>
            navigationRef.isReady() &&
            navigationRef.navigate("Account", { mode: "login" }),
        },
      ]);
      return;
    }

    const orderId = `101214-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      // Ajoute une notification
      notifDispatch({
        type: "ADD_NOTIFICATION",
        notification: {
          id: Date.now().toString(),
          title: "Order confirmed",
          message: `Your order ${orderId} has been confirmed. Total paid: $${total}.`,
          date: new Date().toISOString(),
        },
      });

      const lines = Object.values(cartState.items).map(({ product, qty }) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        qty,
      }));

      try {
        await addDoc(collection(db, "orders"), {
          userId: user.uid,
          orderId,
          total,
          items: lines,
          createdAt: serverTimestamp(),
        });
      } catch (firestoreError) {
        // Continue with payment UX even if save fails
        console.log("ORDER SAVE FAILED, but proceeding:", firestoreError);
      }

      // Vide le panier
      dispatch({ type: "CLEAR" });

      //  Va à la page confirmation
      navigationRef.isReady() &&
        navigationRef.navigate("OrderConfirmation", { orderId, total });
    } catch (e) {
      console.log("PAY ERROR", e);
      Alert.alert(
        "Payment error",
        e?.message || "An error occurred during payment."
      );
    }
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingBottom: 140 }}
    >
      <View style={styles.controlHeader}>
        <Text style={styles.controlTitle}>Visa Checkout</Text>
        <Text style={styles.paySubtitle}>Secure payment</Text>
      </View>

      {/* Carte visuelle */}
      <View style={styles.visaCard}>
        <View style={styles.visaCardTop}>
          <Text style={styles.visaChip}>◼︎◼︎</Text>
          <Text style={styles.visaBrand}>VISA</Text>
        </View>

        <Text style={styles.visaNumberPreview}>
          {formatCard(card) || "•••• •••• •••• ••••"}
        </Text>

        <View style={styles.visaCardBottom}>
          <View>
            <Text style={styles.visaLabel}>CARDHOLDER</Text>
            <Text style={styles.visaValue}>{name.trim() || "YOUR NAME"}</Text>
          </View>
          <View>
            <Text style={styles.visaLabel}>EXPIRES</Text>
            <Text style={styles.visaValue}>{expiry || "MM/YY"}</Text>
          </View>
        </View>
      </View>

      {/* Form */}
      <Card style={styles.detailsCard} mode="contained">
        <Card.Content>
          <Text style={styles.detailsSectionTitle}>Card details</Text>

          <TextInput
            mode="outlined"
            label="Cardholder name"
            value={name}
            onChangeText={setName}
            style={{ marginTop: 12 }}
            textColor="white"
            outlineColor="rgba(255,255,255,0.18)"
            activeOutlineColor="#6CF0FF"
            dense
          />
          <HelperText type="error" visible={submitted && !isValidName}>
            Enter a valid name.
          </HelperText>

          <TextInput
            mode="outlined"
            label="Card number"
            keyboardType="number-pad"
            value={card}
            onChangeText={(v) => setCard(formatCard(v))}
            style={{ marginTop: 12 }}
            textColor="white"
            outlineColor="rgba(255,255,255,0.18)"
            activeOutlineColor="#6CF0FF"
            dense
          />
          <HelperText type="error" visible={submitted && !isValidCard}>
            Card number must be 16 digits.
          </HelperText>

          <View style={styles.payRow}>
            <View style={{ flex: 1 }}>
              <TextInput
                mode="outlined"
                label="Expiry (MM/YY)"
                keyboardType="number-pad"
                value={expiry}
                onChangeText={(v) => setExpiry(formatExpiry(v))}
                style={{ marginTop: 12 }}
                textColor="white"
                outlineColor="rgba(255,255,255,0.18)"
                activeOutlineColor="#6CF0FF"
                dense
              />
              <HelperText type="error" visible={submitted && !isValidExpiry}>
                Use MM/YY (ex: 09/27).
              </HelperText>
            </View>

            <View style={{ width: 12 }} />

            <View style={{ width: 120 }}>
              <TextInput
                mode="outlined"
                label="CVC"
                keyboardType="number-pad"
                value={cvc}
                onChangeText={(v) => setCvc(digitsOnly(v).slice(0, 4))}
                style={{ marginTop: 12 }}
                textColor="white"
                outlineColor="rgba(255,255,255,0.18)"
                activeOutlineColor="#6CF0FF"
                dense
              />
              <HelperText type="error" visible={submitted && !isValidCvc}>
                3–4 digits.
              </HelperText>
            </View>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total</Text>
            <Text style={styles.summaryValue}>${total}</Text>
          </View>

          <Button
            mode="contained"
            onPress={onPay}
            disabled={!canPay}
            style={[styles.payButton, { opacity: canPay ? 1 : 0.55 }]}
            contentStyle={{ height: 54 }}
            labelStyle={{ fontWeight: "900", letterSpacing: 1.2 }}
          >
            PAY NOW
          </Button>

          <Button
            mode="outlined"
            onPress={() =>
              navigationRef.isReady() && navigationRef.navigate("Cart")
            }
            style={styles.payBackBtn}
            textColor={theme.colors.text}
          >
            Back to cart
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

function OrderConfirmationScreen({ route }) {
  const { orderId, total } = route?.params ?? { orderId: "N/A", total: 0 };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingBottom: 140 }}
    >
      <View style={styles.controlHeader}>
        <Text style={styles.controlTitle}>Order confirmed </Text>
        <Text style={styles.paySubtitle}>Thank you for your purchase.</Text>
      </View>

      <Card style={styles.detailsCard} mode="contained">
        <Card.Content>
          <Text style={styles.detailsSectionTitle}>Order number</Text>
          <Text style={styles.detailsText}>{orderId}</Text>

          <View style={{ height: 14 }} />

          <Text style={styles.detailsSectionTitle}>Paid total</Text>
          <Text
            style={[
              styles.detailsText,
              { fontWeight: "900", color: "#6CF0FF" },
            ]}
          >
            ${total}
          </Text>

          <View style={{ height: 18 }} />

          <Button
            mode="contained"
            style={{ borderRadius: 16, backgroundColor: "#5B6CFF" }}
            contentStyle={{ height: 52 }}
            onPress={() =>
              navigationRef.isReady() && navigationRef.navigate("Home")
            }
          >
            Continue shopping
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

function AccountScreen({ route }) {
  const { user } = React.useContext(AuthContext);

  const forcedMode = route?.params?.mode; // "login" ou "register"
  const [mode, setMode] = React.useState(
    forcedMode === "register" ? "register" : "login"
  );

  React.useEffect(() => {
    if (forcedMode === "login" || forcedMode === "register") {
      setMode(forcedMode);
    }
  }, [forcedMode]);

  const [orders, setOrders] = React.useState([]);
  const [profile, setProfile] = React.useState(null);

  // login form
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // register form
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [regEmail, setRegEmail] = React.useState("");
  const [regPassword, setRegPassword] = React.useState("");

  const [error, setError] = React.useState("");

  // Load profile + orders when logged in
  React.useEffect(() => {
    const load = async () => {
      if (!user) {
        setProfile(null);
        setOrders([]);
        return;
      }

      // --- Profile (users/{uid})
      try {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);
        setProfile(snap.exists() ? snap.data() : null);
      } catch (e) {
        setProfile(null);
      }

      // --- Orders (orders where userId == uid)
      try {
        const q = query(
          collection(db, "orders"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );
        const snap = await getDocs(q);
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setOrders(list);
      } catch (e) {
        setOrders([]);
      }
    };

    load();
  }, [user]);

  const onRegister = async () => {
    setError("");
    try {
      if (!firstName || !lastName || !regEmail || !regPassword) {
        setError("Please fill all fields.");
        return;
      }

      const cred = await createUserWithEmailAndPassword(
        auth,
        regEmail.trim(),
        regPassword
      );
      const uid = cred.user.uid;

      await setDoc(doc(db, "users", uid), {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
        email: regEmail.trim(),
        createdAt: serverTimestamp(),
      });

      setFirstName("");
      setLastName("");
      setPhone("");
      setRegEmail("");
      setRegPassword("");
    } catch (e) {
      setError(e?.message || "Registration error.");
    }
  };

  const onLogin = async () => {
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      setEmail("");
      setPassword("");
    } catch (e) {
      setError("Invalid credentials.");
    }
  };

  const onLogout = async () => {
    setError("");
    await signOut(auth);
  };

  // ---------------- LOGGED IN UI ----------------
  if (user) {
    const fullName =
      profile?.firstName || profile?.lastName
        ? `${(profile?.firstName || "").trim()} ${(
            profile?.lastName || ""
          ).trim()}`.trim()
        : "—";

    return (
      <ScrollView
        style={styles.screen}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        <View style={styles.simpleCard}>
          <Text style={styles.cardTitle}>My profile</Text>
          <Text style={styles.cardSub}>Your personal information</Text>

          <View style={{ marginTop: 12 }}>
            <Text style={{ color: "rgba(255,255,255,0.9)", fontWeight: "800" }}>
              {fullName}
            </Text>

            <Text style={{ color: "rgba(255,255,255,0.7)", marginTop: 6 }}>
              Phone: {profile?.phone || "—"}
            </Text>

            <Text style={{ color: "rgba(255,255,255,0.7)", marginTop: 6 }}>
              Email: {user.email}
            </Text>
          </View>

          <View style={{ marginTop: 18 }}>
            <Text style={styles.cardTitle}>Order history</Text>

            {orders.length === 0 ? (
              <Text style={styles.cardSub}>No orders yet.</Text>
            ) : (
              orders.map((o) => (
                <Card key={o.id} style={styles.cartItemCard} mode="contained">
                  <Card.Content>
                    <Text style={styles.cardTitle}>{o.orderId || "Order"}</Text>
                    <Text style={styles.cardSub}>Total: ${o.total ?? 0}</Text>
                    <Text style={styles.cardSub}>
                      Items:{" "}
                      {o.items?.reduce((s, it) => s + (it.qty || 0), 0) || 0}
                    </Text>
                  </Card.Content>
                </Card>
              ))
            )}
          </View>

          <Button mode="contained" onPress={onLogout} style={{ marginTop: 18 }}>
            Log out
          </Button>
        </View>
      </ScrollView>
    );
  }

  // ---------------- LOGGED OUT UI ----------------
  return (
    <View style={styles.screen}>
      <View style={styles.simpleCard}>
        <Text style={styles.cardTitle}>Account</Text>

        <View style={{ flexDirection: "row", marginTop: 12 }}>
          <Button
            mode={mode === "login" ? "contained" : "outlined"}
            onPress={() => {
              setError("");
              setMode("login");
            }}
            style={{ marginRight: 8 }}
          >
            Login
          </Button>
          <Button
            mode={mode === "register" ? "contained" : "outlined"}
            onPress={() => {
              setError("");
              setMode("register");
            }}
          >
            Register
          </Button>
        </View>

        {mode === "login" ? (
          <View style={{ marginTop: 12 }}>
            <TextInput
              mode="outlined"
              label="Email"
              value={email}
              onChangeText={setEmail}
              style={{ marginTop: 8 }}
              keyboardType="email-address"
              autoCapitalize="none"
              textColor="white"
            />
            <TextInput
              mode="outlined"
              label="Password"
              value={password}
              onChangeText={setPassword}
              style={{ marginTop: 8 }}
              secureTextEntry
              textColor="white"
            />
            {error ? <HelperText type="error">{error}</HelperText> : null}
            <Button
              mode="contained"
              onPress={onLogin}
              style={{ marginTop: 12 }}
            >
              Sign in
            </Button>
          </View>
        ) : (
          <View style={{ marginTop: 12 }}>
            <TextInput
              mode="outlined"
              label="First name"
              value={firstName}
              onChangeText={setFirstName}
              textColor="white"
            />
            <TextInput
              mode="outlined"
              label="Last name"
              value={lastName}
              onChangeText={setLastName}
              style={{ marginTop: 8 }}
              textColor="white"
            />
            <TextInput
              mode="outlined"
              label="Phone"
              value={phone}
              onChangeText={setPhone}
              style={{ marginTop: 8 }}
              keyboardType="phone-pad"
              textColor="white"
            />
            <TextInput
              mode="outlined"
              label="Email"
              value={regEmail}
              onChangeText={setRegEmail}
              style={{ marginTop: 8 }}
              keyboardType="email-address"
              autoCapitalize="none"
              textColor="white"
            />
            <TextInput
              mode="outlined"
              label="Password"
              value={regPassword}
              onChangeText={setRegPassword}
              style={{ marginTop: 8 }}
              secureTextEntry
              textColor="white"
            />
            {error ? <HelperText type="error">{error}</HelperText> : null}
            <Button
              mode="contained"
              onPress={onRegister}
              style={{ marginTop: 12 }}
            >
              Create account
            </Button>
          </View>
        )}

        <Button
          mode="outlined"
          onPress={() =>
            navigationRef.isReady() && navigationRef.navigate("Home")
          }
          style={{ marginTop: 14 }}
          textColor={theme.colors.text}
        >
          Go Home
        </Button>
      </View>
    </View>
  );
}

function NotificationsScreen() {
  const { notifState, notifDispatch } = React.useContext(NotificationsContext);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingBottom: 180 }}
    >
      <Text style={styles.controlTitle}>Notifications</Text>

      {notifState.items.length === 0 ? (
        <View style={styles.simpleCard}>
          <Text style={styles.cardSub}>No notifications.</Text>
        </View>
      ) : (
        <>
          {notifState.items.map((n) => (
            <Card key={n.id} style={styles.cartItemCard} mode="contained">
              <Card.Content>
                <Text style={styles.cardTitle}>{n.title}</Text>
                <Text style={styles.cardSub}>{n.message}</Text>
              </Card.Content>
            </Card>
          ))}

          <Button
            mode="outlined"
            style={{
              marginTop: 12,
              borderRadius: 16,
              borderColor: "rgba(255,255,255,0.25)",
            }}
            textColor={theme.colors.text}
            onPress={() => notifDispatch({ type: "CLEAR_NOTIFICATIONS" })}
          >
            Clear notifications
          </Button>
        </>
      )}
    </ScrollView>
  );
}

export default function App() {
  const [routeName, setRouteName] = React.useState("Home");
  const [cartState, dispatch] = React.useReducer(cartReducer, { items: {} });

  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const [notifState, notifDispatch] = React.useReducer(notificationsReducer, {
    items: [],
  });

  const [filter, setFilter] = React.useState("ALL");
  const [sortOrder, setSortOrder] = React.useState("NONE"); // NONE | ASC | DESC
  const [filterMenuVisible, setFilterMenuVisible] = React.useState(false);

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      <SortContext.Provider value={{ sortOrder, setSortOrder }}>
        <AuthContext.Provider value={{ user }}>
          <CartContext.Provider value={{ cartState, dispatch }}>
            <NotificationsContext.Provider
              value={{ notifState, notifDispatch }}
            >
              <PaperProvider theme={theme}>
                <SafeAreaView style={styles.safeArea}>
                  <StatusBar barStyle="light-content" />

                  <Appbar.Header style={styles.appbarHeader}>
                    <View style={styles.appbarLeft}>
                      <TouchableOpacity
                        onPress={() =>
                          navigationRef.isReady() &&
                          navigationRef.navigate("Landing")
                        }
                        style={styles.logoButton}
                      >
                        <Image
                          source={logoSource}
                          style={[styles.appLogo, { borderRadius: 10 }]}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.appbarRight}>
                      {/* Only keep notifications in the top bar (logo stays left) */}
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
                      initialRouteName="Landing"
                    >
                      <Tab.Screen name="Landing" component={LandingScreen} />
                      <Tab.Screen name="Home" component={HomeScreen} />
                      <Tab.Screen
                        name="DeskControl"
                        component={DeskControlScreen}
                      />
                      <Tab.Screen name="Cart" component={CartScreen} />
                      <Tab.Screen name="Account" component={AccountScreen} />
                      <Tab.Screen
                        name="Notifications"
                        component={NotificationsScreen}
                      />
                      <Tab.Screen
                        name="ProductDetails"
                        component={ProductDetailsScreen}
                      />
                      <Tab.Screen
                        name="OrderConfirmation"
                        component={OrderConfirmationScreen}
                      />
                      <Tab.Screen name="Payment" component={PaymentScreen} />
                    </Tab.Navigator>
                  </NavigationContainer>
                  {/* Footer bar with actions anchored to the bottom (logo and bell remain in header) */}
                  <View style={styles.footerBar} pointerEvents="box-none">
                    {/* Sort button removed from footer for now — kept here commented for later
                    <IconButton
                      icon="sort"
                      iconColor="rgba(255,255,255,0.9)"
                      size={22}
                      onPress={() =>
                        Alert.alert("Sort", "Choose the order", [
                          {
                            text: "Ascending price",
                            onPress: () => setSortOrder("ASC"),
                          },
                          {
                            text: "Descending price",
                            onPress: () => setSortOrder("DESC"),
                          },
                          {
                            text: "No sort",
                            onPress: () => setSortOrder("NONE"),
                          },
                          { text: "Cancel", style: "cancel" },
                        ])
                      }
                    />
                    */}

                    <IconButton
                      icon="home"
                      iconColor="rgba(255,255,255,0.95)"
                      size={24}
                      onPress={() =>
                        navigationRef.isReady() &&
                        navigationRef.navigate("Landing")
                      }
                    />

                    <IconButton
                      icon="store"
                      iconColor="rgba(255,255,255,0.9)"
                      size={22}
                      onPress={() =>
                        navigationRef.isReady() &&
                        navigationRef.navigate("Home")
                      }
                    />

                    {/* <IconButton
                      icon="filter-variant"
                      iconColor="rgba(255,255,255,0.9)"
                      size={22}
                      onPress={() =>
                        Alert.alert("Filter", "Choose a category", [
                          { text: "All", onPress: () => setFilter("ALL") },
                          {
                            text: "Gaming",
                            onPress: () => setFilter("GAMING"),
                          },
                          {
                            text: "Art Deco",
                            onPress: () => setFilter("ARTDECO"),
                          },
                          { text: "Work", onPress: () => setFilter("WORK") },
                          { text: "Cancel", style: "cancel" },
                        ])
                      }
                    /> */}

                    <IconButton
                      icon="tune-variant"
                      iconColor="rgba(255,255,255,0.9)"
                      size={22}
                      onPress={() =>
                        navigationRef.isReady() &&
                        navigationRef.navigate("DeskControl")
                      }
                    />

                    <IconButton
                      icon="cart"
                      iconColor="rgba(255,255,255,0.9)"
                      size={22}
                      onPress={() =>
                        navigationRef.isReady() &&
                        navigationRef.navigate("Cart")
                      }
                    />

                    <IconButton
                      icon="account"
                      iconColor="rgba(255,255,255,0.9)"
                      size={22}
                      onPress={() =>
                        navigationRef.isReady() &&
                        navigationRef.navigate("Account")
                      }
                    />
                  </View>
                </SafeAreaView>
              </PaperProvider>
            </NotificationsContext.Provider>
          </CartContext.Provider>
        </AuthContext.Provider>
      </SortContext.Provider>
    </FilterContext.Provider>
  );
}

function ProductDetailsScreen({ route }) {
  const { product } = route.params;
  const { dispatch } = React.useContext(CartContext);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingBottom: 140 }}
    >
      <View style={styles.detailsImageWrap}>
        <Image
          source={product.image}
          style={styles.detailsImage}
          resizeMode="cover"
        />
      </View>

      <Text style={styles.detailsTitle}>{product.name}</Text>
      <Text style={styles.detailsPrice}>${product.price}</Text>

      <Card style={styles.detailsCard} mode="contained">
        <Card.Content>
          <Text style={styles.detailsSectionTitle}>Description</Text>
          <Text style={styles.detailsText}>{product.description}</Text>

          <Text style={[styles.detailsSectionTitle, { marginTop: 14 }]}>
            Features
          </Text>

          {product.features.map((f, idx) => (
            <View key={idx} style={styles.featureRow}>
              <Text style={styles.featureBullet}>•</Text>
              <Text style={styles.featureText}>{f}</Text>
            </View>
          ))}
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        uppercase={false}
        labelStyle={{ letterSpacing: 0 }}
        onPress={() => {
          dispatch({ type: "ADD", product });
          navigationRef.isReady() && navigationRef.navigate("Cart");
        }}
      >
        Add to Cart
      </Button>

      <Button
        mode="outlined"
        style={{
          marginTop: 10,
          borderRadius: 16,
          borderColor: "rgba(255,255,255,0.25)",
        }}
        textColor={theme.colors.text}
        onPress={() =>
          navigationRef.isReady() && navigationRef.navigate("Home")
        }
      >
        Back to Shop
      </Button>
    </ScrollView>
  );
}

// Simple auth context (demo only)
const AuthContext = React.createContext(null);

const CartContext = React.createContext(null);

const NotificationsContext = React.createContext(null);

const FilterContext = React.createContext(null);
const SortContext = React.createContext(null);

function notificationsReducer(state, action) {
  switch (action.type) {
    case "ADD_NOTIFICATION": {
      return {
        ...state,
        items: [action.notification, ...state.items],
      };
    }
    case "CLEAR_NOTIFICATIONS": {
      return { ...state, items: [] };
    }
    default:
      return state;
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const p = action.product;
      const existing = state.items[p.id];
      const qty = existing ? existing.qty + 1 : 1;
      return {
        ...state,
        items: {
          ...state.items,
          [p.id]: { product: p, qty },
        },
      };
    }

    case "INC": {
      const id = action.id;
      const current = state.items[id];
      if (!current) return state;
      return {
        ...state,
        items: { ...state.items, [id]: { ...current, qty: current.qty + 1 } },
      };
    }

    case "DEC": {
      const id = action.id;
      const current = state.items[id];
      if (!current) return state;

      const nextQty = current.qty - 1;
      if (nextQty <= 0) {
        const copy = { ...state.items };
        delete copy[id];
        return { ...state, items: copy };
      }
      return {
        ...state,
        items: { ...state.items, [id]: { ...current, qty: nextQty } },
      };
    }

    case "CLEAR":
      return { items: {} };

    default:
      return state;
  }
}
//commit

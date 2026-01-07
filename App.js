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
} from "react-native";
import theme from "./src/theme";

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

const navigationRef = createNavigationContainerRef();
const Tab = createBottomTabNavigator();

const logoSource = require("./assets/logo.png");
const logoTitle = require("./assets/nom_logoV2.png");

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
} from "react-native-paper";

function HomeScreen() {
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
          mode="contained"
          onPress={() =>
            navigationRef.isReady() && navigationRef.navigate("Home")
          }
          style={{ marginTop: 14 }}
        >
          Go Home
        </Button>
      </View>
    </View>
  );
}

function CartScreen() {
  const { cartState, dispatch } = React.useContext(CartContext);

  const lines = Object.values(cartState.items);

  const total = lines.reduce(
    (sum, line) => sum + line.product.price * line.qty,
    0
  );

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingBottom: 30 }}
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
            Go Home
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
                onPress={() =>
                  navigationRef.isReady() &&
                  navigationRef.navigate("Payment", { total })
                }
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

  const { dispatch } = React.useContext(CartContext);
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

  const onPay = () => {
    setSubmitted(true);
    if (!canPay) return;

    const orderId = `101214-${Math.floor(100000 + Math.random() * 900000)}`;

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

    // Vide le panier
    dispatch({ type: "CLEAR" });

    //  Va à la page confirmation
    navigationRef.isReady() &&
      navigationRef.navigate("OrderConfirmation", { orderId, total });
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingBottom: 28 }}
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
      contentContainerStyle={{ paddingBottom: 28 }}
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

function AccountScreen() {
  const { auth, setAuth } = React.useContext(AuthContext);
  const [mode, setMode] = React.useState("login"); // 'login' or 'register'

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

  const onRegister = () => {
    setError("");
    if (!firstName || !lastName || !regEmail || !regPassword) {
      setError("Please fill all fields.");
      return;
    }
    const user = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phone.trim(),
      email: regEmail.trim(),
      password: regPassword,
    };
    // Save registered user and sign in
    setAuth({ user, registered: user });
  };

  const onLogin = () => {
    setError("");
    const stored = auth.registered;
    if (!stored) {
      setError("No account found. Please register first.");
      return;
    }
    if (stored.email !== email.trim() || stored.password !== password) {
      setError("Invalid credentials.");
      return;
    }
    setAuth({ ...auth, user: stored });
  };

  const onLogout = () => setAuth({ ...auth, user: null });

  if (auth.user) {
    const u = auth.user;
    return (
      <View style={styles.screen}>
        <View style={styles.simpleCard}>
          <Text style={styles.cardTitle}>My profile</Text>
          <Text style={styles.cardSub}>Your personal information</Text>

          <View style={{ marginTop: 12 }}>
            <Text style={{ color: "rgba(255,255,255,0.9)", fontWeight: "800" }}>
              {u.firstName} {u.lastName}
            </Text>
            <Text style={{ color: "rgba(255,255,255,0.7)", marginTop: 6 }}>
              Phone: {u.phone || "—"}
            </Text>
            <Text style={{ color: "rgba(255,255,255,0.7)", marginTop: 6 }}>
              Email: {u.email}
            </Text>
          </View>

          <Button mode="contained" onPress={onLogout} style={{ marginTop: 18 }}>
            Log out
          </Button>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.simpleCard}>
        <Text style={styles.cardTitle}>Account</Text>

        <View style={{ flexDirection: "row", marginTop: 12 }}>
          <Button
            mode={mode === "login" ? "contained" : "outlined"}
            onPress={() => setMode("login")}
            style={{ marginRight: 8 }}
          >
            Login
          </Button>
          <Button
            mode={mode === "register" ? "contained" : "outlined"}
            onPress={() => setMode("register")}
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
              onChangeText={(v) => setPhone(v.replace(/\D/g, ""))}
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
      contentContainerStyle={{ paddingBottom: 30 }}
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

  const [auth, setAuth] = React.useState({ user: null, registered: null });

  const [notifState, notifDispatch] = React.useReducer(notificationsReducer, {
    items: [],
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <CartContext.Provider value={{ cartState, dispatch }}>
        <NotificationsContext.Provider value={{ notifState, notifDispatch }}>
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
                      style={[styles.appLogo, { borderRadius: 10 }]}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.appbarRight}>
                  {/* ✅ IMPORTANT : afficher le bouton paramètres sur toutes les pages sauf "DeskControl" */}

                  <Appbar.Action
                    icon="tune-variant"
                    onPress={() =>
                      navigationRef.isReady() &&
                      navigationRef.navigate("DeskControl")
                    }
                  />

                  <Appbar.Action
                    icon="cart"
                    onPress={() =>
                      navigationRef.isReady() && navigationRef.navigate("Cart")
                    }
                  />
                  <Appbar.Action
                    icon="account"
                    onPress={() =>
                      navigationRef.isReady() &&
                      navigationRef.navigate("Account")
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
            </SafeAreaView>
          </PaperProvider>
        </NotificationsContext.Provider>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}

function ProductDetailsScreen({ route }) {
  const { product } = route.params;
  const { dispatch } = React.useContext(CartContext);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingBottom: 30 }}
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

const styles = StyleSheet.create({
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
});
/*
 */

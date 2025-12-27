import * as React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import theme from "./src/theme";
import {
  Provider as PaperProvider,
  Appbar,
  TextInput,
  Button,
  List,
  Checkbox,
  HelperText,
  Text,
} from "react-native-paper";
import {
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const navigationRef = createNavigationContainerRef();
const Tab = createBottomTabNavigator();

function HomeScreen() {
  // moved hooks and handlers inside the component
  const [tasks, setTasks] = React.useState([]);
  const [newTask, setNewTask] = React.useState("");
  const [showError, setShowError] = React.useState(false);

  const handleAddTask = () => {
    if (!newTask.trim()) {
      setShowError(true); // show error under the field
      return;
    }
    setTasks((prev) => [
      ...prev,
      { id: Date.now().toString(), text: newTask.trim(), completed: false },
    ]);
    setNewTask("");
    setShowError(false); // clear error on successful add
  };

  const handleToggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <View style={styles.container}>
      {/* Intro text */}
      <View style={styles.introContainer}>
        <Text style={styles.introTitle}>Bienvenue sur 10 12 14 Desk</Text>
        <Text style={styles.introText}>
          10 12 14 Desk est une plateforme de vente dédiée aux bureaux haut de
          gamme. Les clients peuvent visualiser des modèles en 3D, personnaliser
          les matériaux, couleurs et dimensions, et prévisualiser leur choix en
          temps réel avant d'acheter. Nous proposons également des options de
          livraison et d'installation pour un service complet.
        </Text>
      </View>
      {/* Carousel */}
      <View style={styles.carouselContainer}>
        <Carousel />
      </View>
      {/* Main content under the app bar */}
      <View style={styles.content}>
        {/* Input row */}
        <View style={styles.inputRow}>
          <TextInput
            mode="outlined"
            label="Add a new task" //Accessibility Prompt
            style={styles.textInput}
            value={newTask}
            onChangeText={setNewTask}
          />

          <Button
            mode="contained"
            style={styles.addButton}
            onPress={handleAddTask}
          >
            Add
          </Button>
        </View>
        <View style={{ marginBottom: 8 }}>
          <HelperText type="error" visible={showError}>
            Task cannot be empty.
          </HelperText>
        </View>
        {/* List area */}
        <List.Section>
          <List.Subheader style={{ color: theme.colors.text }}>
            Today's tasks
          </List.Subheader>
          {tasks.map((task) => (
            <List.Item
              key={task.id}
              title={task.text}
              titleStyle={
                task.completed
                  ? { textDecorationLine: "line-through", color: "#444" }
                  : { color: theme.colors.text }
              }
              left={(props) => (
                <View style={styles.checkboxWrapper}>
                  <Checkbox
                    {...props}
                    status={task.completed ? "checked" : "unchecked"}
                    onPress={() => handleToggleTask(task.id)}
                    color={theme.colors.secondary}
                  />
                </View>
              )}
            />
          ))}
        </List.Section>
      </View>
    </View>
  );
}

function CartScreen() {
  return (
    <View style={styles.container}>
      <Text style={{ color: theme.colors.text, padding: 16 }}>
        Votre panier est vide.
      </Text>
    </View>
  );
}

function AccountScreen() {
  return (
    <View style={styles.container}>
      <Text style={{ color: theme.colors.text, padding: 16 }}>
        Zone Compte utilisateur.
      </Text>
    </View>
  );
}

function NotificationsScreen() {
  return (
    <View style={styles.container}>
      <Text style={{ color: theme.colors.text, padding: 16 }}>
        Aucune notification.
      </Text>
    </View>
  );
}

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.safeArea}>
        <Appbar.Header style={styles.appbarHeader}>
          <Appbar.Content title="10 12 14 Desk" titleStyle={styles.appTitle} />
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
              navigationRef.isReady() && navigationRef.navigate("Notifications")
            }
          />
        </Appbar.Header>

        <NavigationContainer ref={navigationRef}>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarStyle: { display: "none" },
            }}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Cart" component={CartScreen} />
            <Tab.Screen name="Account" component={AccountScreen} />
            <Tab.Screen name="Notifications" component={NotificationsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </PaperProvider>
  );
}

function Carousel() {
  const images = [
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1200&auto=format&fit=crop&q=80",
  ];
  const scrollRef = React.useRef(null);
  const [index, setIndex] = React.useState(0);
  const { width } = Dimensions.get("window");
  const height = 320;

  React.useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % images.length;
        if (scrollRef.current) {
          scrollRef.current.scrollTo({ x: next * width, animated: true });
        }
        return next;
      });
    }, 3500);
    return () => clearInterval(id);
  }, [images.length, width]);

  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      ref={scrollRef}
      style={{ width }}
    >
      {images.map((uri) => (
        <Image
          key={uri}
          source={{ uri }}
          style={{ width, height, resizeMode: "cover" }}
        />
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background, // from Material theme (dark)
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  textInput: {
    flex: 1,
    marginRight: 8,
  },
  addButton: {
    justifyContent: "center",
    borderRadius: 12,
    height: 48,
    marginTop: 8,
  },
  checkboxWrapper: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 4,
    padding: 1,
  },
  appTitle: {
    color: theme.colors.primary,
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 1,
    textShadowColor: theme.colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
    textAlign: "center",
  },
  appbarHeader: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
  },
  appbarContent: {
    alignItems: "center",
  },
  introContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    alignItems: "center",
  },
  introTitle: {
    color: theme.colors.primary,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  introText: {
    color: theme.colors.text,
    textAlign: "center",
    opacity: 0.9,
  },
  carouselContainer: {
    marginTop: 12,
  },
});

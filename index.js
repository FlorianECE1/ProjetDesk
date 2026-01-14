import { registerRootComponent } from "expo";

import App from "./App";

// registerRootComponent appelle AppRegistry.registerComponent('main', () => App);
// Ça permet aussi de s'assurer que l'environnement est bien initialisé,
// que l'app soit lancée via Expo Go ou via un build natif.
registerRootComponent(App);

// Must be imported first — required by React Navigation drawer gestures
import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';

import App from './src/App';

// Registers the root component for Expo Go and native builds
registerRootComponent(App);

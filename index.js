/**
 * @format
 */

import {AppRegistry} from 'react-native';

import {name as appName} from './app.json';
import Navigation from './src/screens/Navigation';
import 'react-native-url-polyfill/auto';

AppRegistry.registerComponent(appName, () => Navigation);

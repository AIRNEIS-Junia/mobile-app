import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen/HomeScreen.tsx';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {APP_COLOR} from '../constants/color.ts';
import ProfileScreen from './ProfileScreen/ProfileScreen.tsx';
import OrderCartScreen from './OrderScreen/CartScreen/CartScreen.tsx';

const Tab = createBottomTabNavigator();

const BottomBar = () => {
  return (
    <Tab.Navigator
      initialRouteName="Accueil"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}>
      <Tab.Screen
        name="Accueil"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="house" size={20} color={APP_COLOR.primary} />
          ),
        }}
      />
      <Tab.Screen
        name="Panier"
        component={OrderCartScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="basket-shopping" size={20} color={APP_COLOR.primary} />
          ),
        }}
      />
      <Tab.Screen
        name="Mon compte"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="user" size={20} color={APP_COLOR.primary} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomBar;

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomBar from './BottomBar.tsx';
import ProductDetailScreen from './ProductScreen/DetailScreen/DetailScreen.tsx';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {OrderCartProvider} from '../contexts/OrderCartContext.tsx';
import LoginScreen from './LoginScreen/LoginScreen.tsx';
import RegisterScreen from './RegisterScreen/RegisterScreen.tsx';

const Stack = createNativeStackNavigator();

const queryClient = new QueryClient();

function Navigation() {
  return (
    <OrderCartProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="BottomBar"
              component={BottomBar}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetailScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </OrderCartProvider>
  );
}

export default Navigation;

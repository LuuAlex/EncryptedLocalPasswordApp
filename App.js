import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import InitialLand from "./screens/initialLand";
import NewDB from "./screens/newDB";
import Home from "./screens/home";
import New from "./screens/new";
import ExistingDB from "./screens/existingDB"

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="InitialLand" component={InitialLand} />
          <Stack.Screen name="NewDB" component={NewDB} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="New" component={New} />
          <Stack.Screen name="ExistingDB" component={ExistingDB} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

// Colors: https://www.color-hex.com/color-palette/3307

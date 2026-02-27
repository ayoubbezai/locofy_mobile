import React, { useEffect ,useState} from "react";
import { StatusBar, Text, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import SplashScreen from "../screens/SplashScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from './navigations/BottomTabs'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();
function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [isReady, setIsReady] = useState(false);


  if (!isReady) {
    return <SplashScreen onFinish={() => setIsReady(true)} />;
  }
 

  return (
    <SafeAreaProvider>
          <QueryClientProvider client={queryClient}>

      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator  screenOptions={{ headerShown: false }}>
          <Stack.Screen name='main' component={BottomTabs}/>


        </Stack.Navigator>

      </NavigationContainer>
          </QueryClientProvider>
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <Text>App is Ready!</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;


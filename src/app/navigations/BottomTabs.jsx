
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomTabBar from "./CustomTabBar";
import HomeScreen from "../../screens/HomeScreen";

const Tab = createBottomTabNavigator();
export default function BottomTabs(){

    return (
        <Tab.Navigator
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <CustomTabBar {...props} />} 
        >
          <Tab.Screen name='Explore' component={HomeScreen}/>
          <Tab.Screen name='Flights' component={HomeScreen}/>
          <Tab.Screen name='Itinerary' component={HomeScreen}/>
          <Tab.Screen name='Offers' component={HomeScreen}/>
          <Tab.Screen name='Profile' component={HomeScreen}/>
        </Tab.Navigator>
    )
}
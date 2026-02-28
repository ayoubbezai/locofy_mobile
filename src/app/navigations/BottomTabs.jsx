
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomTabBar from "./CustomTabBar";
import HomeScreen from "../../screens/HomeScreen";
import CommingSoon from "../../screens/CommingSoon";
import ProfileScreen from "../../screens/ProfileScreen";

const Tab = createBottomTabNavigator();
export default function BottomTabs(){

    return (
        <Tab.Navigator
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <CustomTabBar {...props} />} 
        >
          <Tab.Screen name='Explore' component={HomeScreen}/>
          <Tab.Screen name='Flights' component={CommingSoon}/>
          <Tab.Screen name='Itinerary' component={CommingSoon}/>
          <Tab.Screen name='Offers' component={CommingSoon}/>
          <Tab.Screen name='Profile' component={ProfileScreen}/>
        </Tab.Navigator>
    )
}
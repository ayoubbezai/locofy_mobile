import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

import ExploreIcon from "../../../assets/images/tab/explore.svg";
import SearchFlightsIcon from "../../../assets/images/tab/Search-flights.svg";
import ItineraryIcon from "../../../assets/images/tab/itinerary.svg";
import OffersIcon from "../../../assets/images/tab/offers.svg";
import UserProfileIcon from "../../../assets/images/tab/userprofile.svg";

import ExploreIconFocused from "../../../assets/images/tab/explore-focused.svg";
import SearchFlightsIconFocused from "../../../assets/images/tab/Search-flights-focused.svg";
import ItineraryIconFocused from "../../../assets/images/tab/itinerary-focused.svg";
import OffersIconFocused from "../../../assets/images/tab/offers-focused.svg";
import UserProfileIconFocused from "../../../assets/images/tab/userprofile-focused.svg";

import { colors, spacing, typography } from "../../theme";

const icons = {
  Explore: ExploreIcon,
  Flights: SearchFlightsIcon,
  Itinerary: ItineraryIcon,
  Offers: OffersIcon,
  Profile: UserProfileIcon,
};

const iconsFocused = {
  Explore: ExploreIconFocused,
  Flights: SearchFlightsIconFocused,
  Itinerary: ItineraryIconFocused,
  Offers: OffersIconFocused,
  Profile: UserProfileIconFocused,
};

export default function CustomTabBar({ state, navigation }) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const Icon = isFocused ? iconsFocused[route.name] : icons[route.name];

        const onPress = () => {
          navigation.navigate(route.name);
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tab}
            activeOpacity={0.8}
          >
            {Icon && (
            <Icon
            width={20}
            height={20}
            />
            )}

            <Text
              style={[
                styles.title,
                { color: isFocused ? '#1A6EB4' : colors.lightGray },
              ]}
            >
              {route.name}
            </Text>

          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: colors.whiteBg,
    padding: spacing.xxl,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 18,
    elevation: 8,
  },

  tab: {
    alignItems: "center",
    width: 60,
    gap: spacing.md,
  },

  title: {
    fontSize: typography.xs,
    fontFamily: typography.robotoRegular,
  },


});
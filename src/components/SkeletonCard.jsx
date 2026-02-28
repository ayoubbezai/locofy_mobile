import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { spacing } from '../theme/spacing';
import { colors } from '../theme/color';

export default function SkeletonCard() {
    const opacity = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, { toValue: 1, duration: 800, useNativeDriver: true }),
                Animated.timing(opacity, { toValue: 0.3, duration: 800, useNativeDriver: true }),
            ])
        ).start();
    }, []);

    return (
        <Animated.View style={[styles.container, { opacity }]}>
            {/* matches <Image> in DestinationCard */}
            <View style={styles.image} />

            {/* matches placeData row */}
            <View style={styles.placeData}>
                {/* left: city + country */}
                <View style={styles.placeNameContainer}>
                    <View style={styles.cityLine} />
                    <View style={styles.countryLine} />
                </View>
                {/* right: flight code badge */}
                <View style={styles.flightCodeContainer}>
                    <View style={styles.flightCodeLine} />
                </View>
            </View>
        </Animated.View>
    );
}

const S = '#E0E0E0';

const styles = StyleSheet.create({
    container: {
        width: 150,
        borderRadius: 8,
        padding: spacing.sm,
        gap: spacing.sm,
        backgroundColor: colors.whiteBg,
    },
    image: {
        width: '100%',
        height: 100,        
        borderRadius: 6,
        backgroundColor: S,
    },
    placeData: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    placeNameContainer: { gap: 4 },
    cityLine: { width: 70, height: 12, borderRadius: 4, backgroundColor: S },
    countryLine: { width: 50, height: 10, borderRadius: 4, backgroundColor: S },
    flightCodeContainer: {
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 4,
        backgroundColor: '#F8F9FB',
    },
    flightCodeLine: { width: 30, height: 10, borderRadius: 4, backgroundColor: S },
});
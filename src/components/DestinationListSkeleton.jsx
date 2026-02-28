import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { spacing, colors } from '../theme';

export default function DestinationListSkeleton() {
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
            <View style={styles.image} />
            <View style={styles.content}>
                <View style={styles.topRow}>
                    <View style={styles.locationInfo}>
                        <View style={styles.cityLine} />
                        <View style={styles.countryLine} />
                    </View>
                    <View style={styles.badge} />
                </View>
                <View style={styles.tagsRow}>
                    <View style={styles.tag} />
                    <View style={styles.tag} />
                </View>
            </View>
        </Animated.View>
    );
}

const SKELETON = '#E0E0E0';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: colors.whiteBg,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: spacing.lg,
        height: 110,
    },
    image: {
        width: 110,
        height: 110,
        backgroundColor: SKELETON,
    },
    content: {
        flex: 1,
        padding: spacing.md,
        justifyContent: 'space-between',
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    locationInfo: {
        flex: 1,
        gap: 4,
    },
    cityLine: {
        width: 100,
        height: 16,
        borderRadius: 4,
        backgroundColor: SKELETON,
    },
    countryLine: {
        width: 70,
        height: 12,
        borderRadius: 4,
        backgroundColor: SKELETON,
    },
    badge: {
        width: 50,
        height: 24,
        borderRadius: 6,
        backgroundColor: SKELETON,
    },
    tagsRow: {
        flexDirection: 'row',
        gap: spacing.xs,
    },
    tag: {
        width: 60,
        height: 20,
        borderRadius: 4,
        backgroundColor: SKELETON,
    },
});

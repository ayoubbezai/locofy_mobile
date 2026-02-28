import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Des1 from '../../../assets/images/destinations/destination1.png';
import Des2 from '../../../assets/images/destinations/destination2.png';
import Des3 from '../../../assets/images/destinations/destination3.png';
import Des4 from '../../../assets/images/destinations/destination4.png';

export default function DestinationListCard({ item, index }) {
    const images = [Des1, Des2, Des3, Des4];
    const imageSource = images[index % images.length];

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.8}>
            <Image 
                source={imageSource} 
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.content}>
                <View style={styles.topRow}>
                    <View style={styles.locationInfo}>
                        <Text style={styles.cityText}>{item.city_name}</Text>
                        <View style={styles.countryRow}>
                            <Ionicons name="location-outline" size={14} color={colors.lightGray} />
                            <Text style={styles.countryText}>{item.country}</Text>
                        </View>
                    </View>
                    <View style={styles.flightCodeBadge}>
                        <Text style={styles.flightCodeText}>{item.flight_code}</Text>
                    </View>
                </View>
                
                {item.types && item.types.length > 0 && (
                    <View style={styles.tagsRow}>
                        {item.types.slice(0, 2).map((type, idx) => (
                            <View key={idx} style={styles.tag}>
                                <Text style={styles.tagText}>{type}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: colors.whiteBg,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: spacing.lg,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
        height: 110,
    },
    image: {
        width: 110,
        height: 110,
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
        marginBottom: spacing.xs,
    },
    locationInfo: {
        flex: 1,
        gap: 4,
    },
    cityText: {
        fontFamily: typography.interBold,
        fontSize: typography.md,
        fontWeight: typography.bold,
        color: colors.blackColor,
    },
    countryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    countryText: {
        fontFamily: typography.interRegular,
        fontSize: typography.sm,
        color: colors.lightGray,
    },
    flightCodeBadge: {
        backgroundColor: '#F8F9FB',
        borderRadius: 6,
        paddingHorizontal: spacing.sm,
        paddingVertical: 4,
        height: 24,
    },
    flightCodeText: {
        fontFamily: typography.interMedium,
        fontSize: typography.xs,
        color: colors.primary,
        fontWeight: typography.medium,
    },
    tagsRow: {
        flexDirection: 'row',
        gap: spacing.xs,
        flexWrap: 'wrap',
    },
    tag: {
        backgroundColor: '#F0F4FF',
        borderRadius: 4,
        paddingHorizontal: spacing.sm,
        paddingVertical: 4,
    },
    tagText: {
        fontFamily: typography.interRegular,
        fontSize: typography.xs,
        color: colors.primary,
    },
});

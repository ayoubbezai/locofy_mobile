import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { spacing } from '../theme/spacing';
import { colors } from '../theme/color';
import { typography } from '../theme/typography';
import Des1 from '../../assets/images/destinations/destination1.png'
import Des2 from '../../assets/images/destinations/destination2.png'
import Des3 from '../../assets/images/destinations/destination3.png'
import Des4 from '../../assets/images/destinations/destination4.png'

export default function DestinationCard({ item , index }) {
    const images = [Des1,Des2,Des3,Des4];
    const imageSource = images[index % images.length];
    
    if (!item || !item.city_name) {
        return null;
    }
    
    return (
        <View style={styles.container}>
            <Image 
                source={imageSource}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.placeData}>
                <View style={styles.placeNameContainer}>
                    <Text style={styles.cityText}>{item.city_name}</Text>
                    <Text style={styles.countryText}>{item.country || ''}</Text>
                </View>
                <View style={styles.flightCodeContainer}>
                    <Text style={styles.flightCodeText}>{item.flight_code || ''}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 150,
        borderRadius: 8,
        padding: spacing.sm,
        gap: spacing.sm,
        backgroundColor: colors.whiteBg,
        shadowColor : '#000000',
        shadowOpacity : '0.08',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius : 15,
        elevation : 4
    },
    image: {
        width: '100%',
        height: 100,
        borderRadius: 6,
    },
    placeData: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    placeNameContainer: {
        gap: 4,
    },
    cityText: {
        fontFamily: typography.primary,
        fontSize: typography.sm,
        fontWeight: typography.bold,
        color: colors.blackColor,
    },
    countryText: {
        fontFamily: typography.primary,
        fontSize: typography.xs,
        fontWeight: typography.regular,
        color: colors.lightGray,
    },
    flightCodeContainer: {
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 4,
        backgroundColor: '#F8F9FB',
    },
    flightCodeText: {
        fontFamily: typography.primary,
        fontSize: typography.xs,
        fontWeight: typography.medium,
        color: colors.primary,
    },
});

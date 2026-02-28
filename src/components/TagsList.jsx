import { FlatList, StyleSheet, View, Text } from "react-native";
import Hotel from '../../assets/images/tags/Hotel.svg';
import Attractions from '../../assets/images/tags/Atractions.svg';
import Eats from '../../assets/images/tags/Eats.svg';
import Flight from '../../assets/images/tags/Flight.svg';
import Train from '../../assets/images/tags/Train.svg';

const Tags = [
    { id: 1, label: 'Hotel', Icon: Hotel },
    { id: 2, label: 'Attractions', Icon: Attractions },
    { id: 3, label: 'Eats', Icon: Eats },
    { id: 4, label: 'Flight', Icon: Flight },
    { id: 5, label: 'Train', Icon: Train },
];

export default function TagList() {
    return (
        <FlatList
            style={{  marginRight:  -20 }}
            data={Tags}
            horizontal
            contentContainerStyle={styles.container}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            pagingEnabled
            decelerationRate="fast"
            snapToAlignment="start"
            scrollEventThrottle={16}
            renderItem={({ item }) => {
                const { Icon, label } = item;
                return (
                    <View style={styles.tag}>
                        <Icon width={52} height={52} />
                        <Text style={styles.label}>{label}</Text>
                    </View>
                );
            }}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        gap : 20,
        flexDirection : 'row',
        paddingRight: 20,
    },
    tag: {
        alignItems: 'center',
        gap: 12,
        paddingLeft : 12 , 
    },
    label: {
        fontSize: 12,
    },
});
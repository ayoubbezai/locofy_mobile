import { View , StyleSheet, Text } from "react-native"
import { colors , typography } from '../theme';

export default  function CommingSoon  (){
    return (
        <View style={styles.continer}>
            <Text style={styles.text}>
                Comming Soon 
            </Text>

        </View>
    )
}

const styles = StyleSheet.create({
    continer :{
        flex : 1,
        backgroundColor : colors.background,
        justifyContent : 'center',
        alignItems : 'center',
    },
    text : {
        fontSize : typography.xl,
        fontFamily : typography.robotoBold,
        color : colors.blackColor,

    }
})
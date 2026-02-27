// src/screens/SplashScreen.jsx
import React, { useEffect } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

export default function SplashScreen({ onFinish }) {

    useEffect(()=>{
        const timeout = setTimeout(()=>(
        onFinish()
        ),2000);

        return () => clearTimeout(timeout);

    },[])

    return(
        <ImageBackground
        source={require('../../assets/images/splash/splash.png')}
        style={styles.background}
        resizeMode='cover'
        />
    )

}


const styles = StyleSheet.create({
    background : {
        flex : 1,
        width : '100%',
        height : '100%',
    }
})
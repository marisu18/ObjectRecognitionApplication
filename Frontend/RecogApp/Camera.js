import React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, PermissionsAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {launchCamera} from 'react-native-image-picker';


export default async function Camera() {
    const permission = await PermissionsAndroid.request(
                       PermissionsAndroid.PERMISSIONS.CAMERA,
                        {
                        title: "Camera Permission",
                        message: "App requires access to your camera",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                        }
    );


    if (permission === PermissionsAndroid.RESULTS.DENIED){
        alert("Grant Application Access To Use Camera.");
        return;
    }



    const image = await launchCamera({
                            includeBase64: true,
                        });

    //alert(JSON.stringify(image));

    return image;


}
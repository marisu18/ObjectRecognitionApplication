import React from 'react';
import type {Node} from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';
import { useEffect, useState } from 'react';
import NetInfo from "@react-native-community/netinfo";


import Navigator from './Navigator';
import ReadInformation from './async_storage/ReadInformation';
import ReadMultipleInformation from './async_storage/ReadMultipleInformation';
import RabbitMq from './RabbitMq';
import updateModels from './updateModels'
import BackgroundTimer from 'react-native-background-timer';
import styles from './styles';
import IdGenerator from './IdGenerator';
import CheckForModels from './CheckForModels';


export default function App() {

    const HOURS = 24;
    const MIN = 60;
    const SEC = 60;
    const MS = 1000;

    useEffect(() => {
        BackgroundTimer.runBackgroundTimer(() => {
            updateModels();
        }, HOURS * MIN * SEC * MS);

        BackgroundTimer.stopBackgroundTimer();
    }, []);



    useEffect(() => {
      const interval = setInterval(() => {
          CheckForModels();
      }, 5000);
      return () => clearInterval(interval);
    }, []);

    /*
    const _activityIndicator = () => (

        <View style={[styles.activityContainer, styles.horizontal]}>
            <ActivityIndicator
                animating={activityOn}
                size="large"
                color="#fff"
            />
        </View>
    );

    const Render = () => (
            { activityOn == true ? <_ActivityIndicator /> : <Navigator /> }
    );
    */
    return (
        <Navigator/>
    );
}

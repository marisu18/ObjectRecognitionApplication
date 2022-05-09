import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import { Text, View, TextInput, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function ReadMultipleInformation(keys){
    objects = [];
    for (let i = 0; i < keys.length; i++) {
        let object = await AsyncStorage.getItem(keys[i]);
        objects.push(object);
    };
    //alert(objects);
    return objects;
};
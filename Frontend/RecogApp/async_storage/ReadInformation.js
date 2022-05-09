import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import { Text, View, TextInput, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function ReadInformation(key){
    const object = await AsyncStorage.getItem(key);
    return object;
};

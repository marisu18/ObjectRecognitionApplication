import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import { Text, View, TextInput, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function WriteData(key, data){
        await AsyncStorage.setItem(key, data);
}


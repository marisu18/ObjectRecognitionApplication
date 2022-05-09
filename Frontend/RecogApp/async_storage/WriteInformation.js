import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import { Text, View, TextInput, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
//add functionality that only writes new information when updated.

export default async function WriteInformation(Object){
        //alert(JSON.stringify(Object));
        Object_classes = Object['modelData'];

        var _object_classes = [];
        var key = "object_classes"
        for (let object_class in Object_classes){
            var _objects = [];
            for (let object of Object_classes[object_class].objects){
                //alert('hello' + object.name);
                await AsyncStorage.setItem(object.name, JSON.stringify(object));
                _objects.push({name: object.name});
            };

            const jsonValue = JSON.stringify(_objects);
            await AsyncStorage.setItem(Object_classes[object_class].key, jsonValue);

            _object_classes.push({alias: Object_classes[object_class].alias,
                                  type: Object_classes[object_class].type,
                                  key: Object_classes[object_class].key,
                                  dim: Object_classes[object_class].dim,
                                  model: Object_classes[object_class].model
                                  });
        };

        const jsonValue = JSON.stringify(_object_classes);
        await AsyncStorage.setItem(key, jsonValue);
        await AsyncStorage.setItem('models', JSON.stringify(Object['models']))

    }


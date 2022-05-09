import React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useState } from 'react';


import ReadInformation from '../async_storage/ReadInformation';
import styles from '../styles';
import Separator from '../CustomComponents';
export default function SelectModelTab() {
    const route = useRoute();
    const object_classes = route.params.object_classes;
    //https://github.com/react-navigation/react-navigation/issues/1416
    const [selectedModel, setSelectedModel] = useState(route.params.currentModel);


    //https://stackoverflow.com/questions/60491580/how-to-pass-data-back-to-previous-screen-in-react-native-navigation-v5

    const RenderClasses = ({ _key, alias, type }) => (
        <View style={styles.object}>
            <TouchableOpacity onPress={function(event){ route.params.onSelect(_key, alias, type); setSelectedModel(alias);}}>
                <Text style={alias == selectedModel ? styles.selectedButtonText : [styles.buttonText, {color: 'rgb(255,140,0)'}]}>{ alias }</Text>
            </TouchableOpacity>
        </View>
    );

    //https://reactnative.dev/docs/flatlist
    return (
        <View style={styles.container}>
            <View style={styles.border}>
                <Text> Object Class Tab </Text>
                <Text style={[styles.text, {fontSize: 30}]}> Selected Model: </Text>
                <Text style={[styles.text, {fontSize: 25,}]}> {selectedModel} </Text>
                <Separator />
            </View>
            <Separator />
            <Separator />
            <FlatList
                data={object_classes}
                renderItem={({ item }) => <RenderClasses _key={item.key} alias={item.alias} type={item.type} />}
                keyExtractor={item => item.alias}
            />
        </View>
    );
}
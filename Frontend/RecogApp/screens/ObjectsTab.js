import React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useRoute, useNavigation } from '@react-navigation/native';

import ReadInformation from '../async_storage/ReadInformation';
import CombineArrays from '../CombineArrays';
import styles from '../styles';
import Separator from '../CustomComponents';

export default function ObjectsTab() {
    const route = useRoute();
    const navigation = useNavigation();
    //var _object = [{"name": "airplane", "information": "something", "image":"image"}, {"name": "bus", "information": "nothing", "image":"image"}];
    //var confidence = ['0', '0'];


    function navigateToInformationTab(name) {
        ReadInformation(name).then(
            function(object) {navigation.navigate("Information", {"object": CombineArrays([object], [0])}); },
            function(error) { alert("Something went wrong."); }
        );
    }

    const objects = route.params.objects;
    const type = route.params.type;


    const RenderObjects = ({ name, information }) => (
        <View style={styles.object}>
            <TouchableOpacity onPress={() => navigateToInformationTab(name) }>
                <Text style={[styles.buttonText, {color: 'rgb(255,140,0)'}]}> {name} </Text>
            </TouchableOpacity>
        </View>
    )


    return (
        <View style={styles.container}>
            <View style={styles.border}>
                <Text> Object Class Tab </Text>
                <Text style={[styles.text, {fontSize: 30}]}> {type} </Text>
                <Separator />
            </View>
            <FlatList
                data={objects}
                renderItem={({ item }) => <RenderObjects name={item.name} information={item.information} />}
                keyExtractor={item => item.name}
            />
        </View>

    );
}

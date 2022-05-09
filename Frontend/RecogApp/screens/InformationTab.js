import React from 'react';
import { Image, Text, View, StyleSheet, FlatList } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import styles from '../styles';
import Separator from '../CustomComponents'

export default function InformationTab() {
    const route = useRoute();
    // this can be improved memory-wise/ram-wise by dividing the data into two sets,
    // the first is data with just the names of species, the second is data with information on each individual fish.
    // that way, the information accessed when seeing the list of species will not be more that the just the species. no images or information.

    //https://www.tutorialspoint.com/how-to-handle-the-error-text-strings-must-be-rendered-within-a-text-component-in-reactnative
    //handle text component error ^
    function RenderImage(image, format) { return <Image source={{uri: 'data:image/' + format + ';base64,' + image}} style={styles.imageList}/> };
    function RenderNoImage() { return <Text style={[styles.text, {fontSize: 20, textShadowRadius: 30, color: 'rgb(255,100,0)'}]}>No Image Available</Text> };
    function RenderConfidence(confidence) { return <Text style={[styles.text, {fontSize: 20, textShadowRadius: 30}]}>Confidence: { confidence }</Text> };
    function RenderInformation(information) { return <Text style={[styles.text, {fontSize: 15, textShadowRadius: 30}]}> { information } </Text> };

    const RenderObjects = ({ name, information, image, format, confidence }) => (
        <View style={[styles.header, {alignItems: 'center'}]}>
            <View style={styles.border}>
                <Text style={[styles.text,{ textTransform: "uppercase", fontSize: 35, textShadowRadius: 35}]}> {name} </Text>
            </View>
            <Separator/>
            { image.length < 10 ? RenderNoImage() : RenderImage(image, format) }
            { confidence == '0' ? null : RenderConfidence(confidence)}
            { information.length < 10 ? null : RenderInformation(information) }
        </View>
    );
    const objects = route.params.object;
    //alert(objects[0]["format"]);
    return (
        <View style={styles.container}>
            <FlatList
                data={objects}
                renderItem={({ item }) => <RenderObjects name={item.name} information={item.information} image={item.image} format={item.format} confidence={item.confidence} />}
                keyExtractor={item => item.name}
            />
            <View style={styles.largeSeparator}/>

        </View>

        );
}

import React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import NetInfo from "@react-native-community/netinfo";


import styles from '../styles';
import Separator from '../CustomComponents';
import WriteInformation from '../async_storage/WriteInformation';
import ReadInformation from '../async_storage/ReadInformation';
import ReadMultipleInformation from '../async_storage/ReadMultipleInformation';
import Camera from '../Camera';
import { Objects } from '../RetrieveDataOnObjects';
import RabbitMq from '../RabbitMq';
import IdGenerator from '../IdGenerator';

export default function MainMenuTab() {
    //https://www.javatpoint.com/react-native-passing-value-between-screen
    //passing values between screens.
    const navigation = useNavigation();
    const [object_class, setObject_class] = useState({key: "none", alias: 'No Model Selected', type: "Objects"});
    useEffect(() => {
       setModel();
    }, []);
    //https://reactjs.org/docs/hooks-intro.html
    //https://www.w3schools.com/react/react_usestate.asp

    function navigateToTakePhotoTab() {
        Camera().then(
            function(image) { if (!image.didCancel){ navigation.navigate("Take Photo", {"model": object_class.key, "image": image.assets[0]}) }; },
            function(error) { alert("Something went wrong."); }
        );
    }

    function navigateToObjectsTab(key) {
        ReadInformation(key).then(
            function(object) { navigation.navigate("Objects", {"objects": JSON.parse(object), "type": object_class.type}); },
            function(error) { alert("Something went wrong."); }
        );
    }

    function navigateToSelectModelTab() {
        ReadInformation("object_classes").then(
            function(object) { navigation.navigate("Select Model", {'currentModel': object_class.alias, "object_classes": JSON.parse(object),
                               onSelect: (key, alias, type) => setObject_class({key: key, alias: alias, type: type})}) },
            function(error) { alert("Something went wrong."); }
        );
    }

    function navigateToAboutTheAppTab() {
        navigation.navigate("About The App");
    }

    // should ask server for new updates every n hours
    // and everytime it goes from no internet to internet.
    function setModel(){
        ReadInformation("object_classes").then(
            function(object) {
                object = JSON.parse(object);
                if (object != null){ setObject_class({key: object[0].key, alias: object[0].alias, type: object[0].type})}
            },
            function(error) { alert("Something went wrong."); }
        );
    }


    function updateModels(){
        NetInfo.fetch().then(state => {
            if (state.isConnected){
                //ReadInformation('models').then(

                const keys = ["models", "object_classes"];
                //alert(JSON.stringify(keys));
                ReadMultipleInformation(keys).then(

                    function(object) {
                        let models = object[0];
                        let object_classes = object[1];
                        models = JSON.parse(models);
                        object_classes = JSON.parse(object_classes);

                        if (models == null || object_classes == null){ object = 'none'};
                        object = {action: 2, models: object};
                        let queue_name = IdGenerator();
                        let exchange_name = IdGenerator();
                        RabbitMq(JSON.stringify(object), 2, queue_name, exchange_name);
                    },
                    function(error) { alert("Something went wrong."); }
                );
            }
            else{
                alert('No Internet Connection')
            }
        });
    }

    return (
        <View style={styles.container}>
            <View style={[styles.border, {top: -150}]}>
                <Text style={[styles.text, {fontSize: 25}]}> Image Recognition </Text>
            </View>

           <Separator />


            <View style={styles.buttonList}>
                <TouchableOpacity style={styles.button} onPress={() => navigateToTakePhotoTab() }>
                    <Text style={styles.buttonText}> Take Photo </Text>
                </TouchableOpacity>

                <Separator />

                <TouchableOpacity style={styles.button} onPress={() => navigateToObjectsTab(object_class.key) }>
                    <Text style={styles.buttonText}> {object_class.type} </Text>
                </TouchableOpacity>

                <Separator />

                <TouchableOpacity style={styles.button} onPress={() => navigateToSelectModelTab() }>
                    <Text style={styles.buttonText}> Select Model </Text>
                </TouchableOpacity>

                <Separator />

                <TouchableOpacity style={styles.button} onPress={() => navigateToAboutTheAppTab()}>
                    <Text style={styles.buttonText}> About The App </Text>
                </TouchableOpacity>


            </View>
        </View>
    );
}

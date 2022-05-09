import React from 'react';
import { ImageBackground, ActivityIndicator, Text, View, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import NetInfo from "@react-native-community/netinfo";


import styles from '../styles';
import RabbitMq from '../RabbitMq';
import ReadInformation from '../async_storage/ReadInformation';
import ReadMultipleInformation from '../async_storage/ReadMultipleInformation';
import WriteData from '../async_storage/WriteData';
import CombineArrays from '../CombineArrays';
import IdGenerator from '../IdGenerator';

export default function TakePhotoTab() {
    //https://reactnative.dev/docs/activityindicator
    const route = useRoute();
    const image = route.params.image;
    const model = route.params.model;
    const navigation = useNavigation();

    const _data = {action: 1, model: model, image_type: image.type, image_base64: image.base64};
    const [data, setData] = useState('none');
    const [activityOn, setActivityOn] = useState(true);
    WriteData('data', 'none');
    //alert(image.base64);
     function navigateToInformationTab() {
        try{
            data_parsed = JSON.parse(data);}
        catch{
            return }
        ReadMultipleInformation(data_parsed.label).then(
            function(object) { navigation.navigate("Information", {"object": CombineArrays(object, data_parsed.confidence)}); },
            function(error) { alert("Something went wrong."); }
        );
     }

    useEffect(() => {
        NetInfo.fetch().then(state => {
            state.isConnected ? RabbitMq(JSON.stringify(_data), _data.action) : alert('No Internet Connection');
        });
        let queue_name = IdGenerator();
        let exchange_name = IdGenerator();

        RabbitMq(JSON.stringify(_data), _data.action, queue_name, exchange_name);
        return function cleanup(){
            WriteData('data', 'none');
            setData('none');
        };
    }, []);

    useEffect(() => {
        var interval = setInterval(function(){
            var mounted = true;

            ReadInformation('data').then(
                function(_data) { if (mounted){setData(_data);}; },
                function(error) {alert("Something went wrong."); }

            );
            if (data != 'none'){
                switch(data){
                    case "ConnectionError":
                        alert("Error when connecting to server.")
                        break;

                    case '"noModel"':
                        alert('This model is currently not available.');
                        break;

                    case '"nothing"':
                        alert('Nothing was detected.');
                        break;

                    case '"error"':
                        alert('Unexplainable Error');
                        break;

                    default:
                        navigateToInformationTab();
                }

                WriteData('data', 'none');
                setData('none');
                setActivityOn(false);
                clearInterval(interval);

            }
        }, 1000);

        return () => {
            mounted = false;
            WriteData('data', 'none');
            setData('none');
        };
    },[data]);

    function _activityIndicator(){
        return(
            <View style={[styles.activityContainer, styles.horizontal]}>
                <ActivityIndicator
                    animating={activityOn}
                    size="large"
                    color="#fff"
                />
            </View>
        )
    }
    return (
        <View style={styles.imageContainer}>
            <ImageBackground
                //source={{uri: image.uri}}
                source={{uri: 'data:image/JPEG;base64,' + image.base64}}
                style={styles.image}
            >
            {_activityIndicator()}
            </ImageBackground >

        </View>
    );
}


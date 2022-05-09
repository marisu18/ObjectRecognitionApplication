import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainMenuTab from './screens/MainMenuTab';
import AboutTheAppTab from './screens/AboutTheAppTab';
import ObjectsTab from './screens/ObjectsTab';
import TakePhotoTab from './screens/TakePhotoTab';
import InformationTab from './screens/InformationTab';
import SelectModelTab from './screens/SelectModelTab';


const AppStack = createNativeStackNavigator();


export default function Navigator(){
    return (
        <NavigationContainer theme={Theme}>
            <AppStack.Navigator initialRouteName={'MainMenuTab'}>
                <AppStack.Screen name="Main Menu" component={MainMenuTab} />
                <AppStack.Screen name="About The App" component={AboutTheAppTab} />
                <AppStack.Screen name="Objects" component={ObjectsTab} />
                <AppStack.Screen name="Take Photo" component={TakePhotoTab} />
                <AppStack.Screen name="Information" component={InformationTab} />
                <AppStack.Screen name="Select Model" component={SelectModelTab} />
            </AppStack.Navigator>
        </NavigationContainer>
    );

}

const Theme = {
  dark: true,
  colors: {
    primary: 'black',
    background: 'black',
    card: 'black',
    text: 'orange',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};


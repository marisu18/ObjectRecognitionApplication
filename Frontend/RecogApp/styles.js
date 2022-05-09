import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
    },
  text: {
      color: "orange",
      fontWeight: "bold",
      alignSelf: "center",
      //textShadowColor: 'orangered',

  },
  activityContainer: {

      flex: 1,
      justifyContent: "center"
    },

  imageContainer: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
  },

  buttonList: {
    justifyContent: 'space-between',
  },

  separator: {
    width: 10,
    height: 10,
  },

  largeSeparator: {
      width: 80,
      height: 80,
  },

  button: {
      elevation: 8,
      backgroundColor: 'black',
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 90,
      borderWidth: 2,
      borderColor: 'chocolate',
  },
    buttonText: {
    fontSize: 20,
    color: "orange",
    alignSelf:'center',
    fontWeight: "bold",
    textTransform: "uppercase",
    //textShadowRadius: 20,
    //textShadowColor: 'orangered',

    },


  selectedButtonText: {
    fontSize: 20,
    //color: 'rgb(0,255,0)',
    color: "lime",
    fontWeight: "bold",
    alignSelf:'center',
    textTransform: "uppercase",
    textShadowRadius: 20,
    textShadowColor: 'rgb(0,255,0)',
    //textShadowColor: 'lime',

  },

 object: {
      paddingLeft: 15,
      paddingTop: 10,
      paddingBottom: 10
    },

 objectList: {
    flex: 1,
    backgroundColor: '#fff',
 },

 header: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    paddingTop: 30,
 },
//https://stackoverflow.com/questions/34992122/full-screen-background-image-in-react-native-app
 imageList: {
    width: 250,
    height: 200,
    resizeMode: 'contain',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
 },

  image: {
     width: '98%',
     height: '98%',
     resizeMode: 'contain'

  },
 horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
 }, //https://stackoverflow.com/questions/49234412/react-navigation-styling-tabnavigator-text
 border: {
    borderBottomWidth: 1,
    borderBottomColor: 'wheat',
 }

});

/*
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  activityContainer: {
      flex: 1,
      justifyContent: "center"
    },

  imageContainer: {
      flex: 1,
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
  },

  buttonList: {
    justifyContent: 'space-between',
  },

  separator: {
    width: 10,
    height: 10,
  },

  button: {
  elevation: 8,
  backgroundColor: 'royalblue',
  borderRadius: 10,
  paddingVertical: 10,
  paddingHorizontal: 90,

  },

  buttonText: {
  fontSize: 20,
  color: "lightblue",
  fontWeight: "bold",
  alignSelf: "center",
  textTransform: "uppercase"
  },

  selectedButtonText: {
    fontSize: 20,
    color: "lightgreen",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },

 object: {
      paddingLeft: 15,
      paddingTop: 10,
      paddingBottom: 10
    },

 objectList: {
    flex: 1,
    backgroundColor: '#fff',
 },

 header: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 30,
 },
//https://stackoverflow.com/questions/34992122/full-screen-background-image-in-react-native-app
 image: {
    width: '98%',
    height: '98%',
    resizeMode: 'contain'
 },
 horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
 }


});*/

export default styles;
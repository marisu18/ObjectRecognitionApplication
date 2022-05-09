import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import { Text, View, TextInput, StyleSheet } from 'react-native'

export const Objects = {
    models: [{modelId: 'fish_species', versionNr: '1.0.1'}, {modelId: 'fish_species', versionNr: '1.0.1'}],

    modelData: {
    fish_species:{objects: [
        {name: 'Anchovy', information: "info1", image: 'image'}, {name: 'Bass', information: "info2", image: 'image'}, {name: 'Bluefish', information: "info3", image: 'image'}, {name: 'Buffalo Fish', information: "info4", image: 'image'}, {name: 'Butterfish', information: "info5", image: 'image'},
        {name: 'Calamari', information: "info6", image: 'image'}, {name: 'Carp', information: "info7", image: 'image'}, {name: 'Catfish', information: "info8", image: 'image'}, {name: 'Chilean Sea Bass', information: "info9", image: 'image'}, {name: 'Clam', information: "info10", image: 'image'},
       ],
        alias: "Fish Species",
        type: "Fish Species",
        key: "fish_species",
        model: "model",
        },

    coco_dataset: {objects: [
            {name: 'person', information: "info", image: 'image'}, {name: 'bicycle', information: "info", image: 'image'}, {name: 'car', information: "info", image: 'image'}, {name: 'motorcycle', information: "info", image: 'image'}, {name: 'airplane', information: "info", image: 'image'},
            {name: 'bus', information: "info", image: 'image'}, {name: 'train', information: "info", image: 'image'}, {name: 'truck', information: "info", image: 'image'}, {name: 'boat', information: "info", image: 'image'}, {name: 'traffic light', information: "info", image: 'image'},
            {name: 'fire hydrant', information: "info", image: 'image'}, {name: 'stop sign', information: "info", image: 'image'}, {name: 'parking meter', information: "info", image: 'image'}, {name: 'bench', information: "info", image: 'image'}, {name: 'bird', information: "info", image: 'image'},
            {name: 'cat', information: "info", image: 'image'}, {name: 'dog', information: "info", image: 'image'}, {name: 'horse', information: "info", image: 'image'}, {name: 'sheep', information: "info", image: 'image'}, {name: 'cow', information: "info", image: 'image'},

            {name: 'elephant', information: "info", image: 'image'}, {name: 'bear', information: "info", image: 'image'}, {name: 'zebra', information: "info", image: 'image'}, {name: 'giraffe', information: "info", image: 'image'}, {name: 'backpack', information: "info", image: 'image'},
            {name: 'umbrella', information: "info", image: 'image'}, {name: 'handbag', information: "info", image: 'image'}, {name: 'tie', information: "info", image: 'image'}, {name: 'suitcase', information: "info", image: 'image'}, {name: 'frisbee', information: "info", image: 'image'},
            {name: 'skis', information: "info", image: 'image'}, {name: 'snowboard', information: "info", image: 'image'}, {name: 'sports ball', information: "info", image: 'image'}, {name: 'kite', information: "info", image: 'image'}, {name: 'baseball bat', information: "info", image: 'image'},
            {name: 'baseball glove', information: "info", image: 'image'}, {name: 'skateboard', information: "info", image: 'image'}, {name: 'surfboard', information: "info", image: 'image'},{name: 'hair drier', information: "info", image: 'image'}, {name: 'toothbrush', information: "info", image: 'image'},

            {name: 'tennis racket', information: "info", image: 'image'}, {name: 'bottle', information: "info", image: 'image'}, {name: 'wine glass', information: "info", image: 'image'}, {name: 'cup', information: "info", image: 'image'}, {name: 'fork', information: "info"},
            {name: 'knife', information: "info", image: 'image'}, {name: 'spoon', information: "info", image: 'image'}, {name: 'bowl', information: "info", image: 'image'}, {name: 'banana', information: "info", image: 'image'}, {name: 'apple', information: "info", image: 'image'},
            {name: 'sandwich', information: "info", image: 'image'}, {name: 'orange', information: "info", image: 'image'}, {name: 'broccoli', information: "info", image: 'image'}, {name: 'carrot', information: "info", image: 'image'}, {name: 'hot dog', information: "info", image: 'image'},
            {name: 'pizza', information: "info", image: 'image'}, {name: 'donut', information: "info", image: 'image'}, {name: 'cake', information: "info", image: 'image'}, {name: 'chair', information: "info", image: 'image'}, {name: 'couch', information: "info", image: 'image'},

            {name: 'potted plant', information: "info", image: 'image'}, {name: 'bed', information: "info", image: 'image'}, {name: 'dining table', information: "info", image: 'image'}, {name: 'toilet', information: "info", image: 'image'}, {name: 'tv', information: "info", image: 'image'},
            {name: 'laptop', information: "info", image: 'image'}, {name: 'mouse', information: "info", image: 'image'}, {name: 'remote', information: "info", image: 'image'}, {name: 'keyboard', information: "info", image: 'image'}, {name: 'cell phone', information: "info", image: 'image'},
            {name: 'microwave', information: "info", image: 'image'}, {name: 'oven', information: "info", image: 'image'}, {name: 'toaster', information: "info", image: 'image'}, {name: 'sink', information: "info", image: 'image'}, {name: 'refrigerator', information: "info", image: 'image'},
            {name: 'book', information: "info", image: 'image'}, {name: 'clock', information: "info", image: 'image'}, {name: 'vase', information: "info", image: 'image'}, {name: 'scissors', information: "info", image: 'image'}, {name: 'teddy bear', information: "info", image: 'image'},
            ],
            alias: "Coco Dataset",
            type: "Objects",
            key: "coco_dataset",
            model: "model",
            }
    }
};
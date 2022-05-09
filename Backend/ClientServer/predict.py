import base64
import io
import cv2
from PIL import Image
import onnxruntime as ort
import numpy as np

import database


class Predict:
    def __init__(self, message):
        self.model_name = message["model"]
        self.base64 = message["image_base64"]
        self.image = []
        self.labels = []
        self.functions = []
        self.dimensions = 0
        self.modelPath = ''
        self.response = []

        self.databaseSelection = database.DatabaseSelectionInterface()
        self.db = self.databaseSelection.database
        self.deeplearning()

    def deeplearning(self):
        try:
            self.dimensions, self.modelPath, self.labels = self.db.getModelDataForDetection(self.model_name)
            self.get_functions()
            ##
            #self.modelPath = 'coco_dataset'
            ##
            preprocessingDatabaseOutput = ProcessDatabaseOutput(self.labels, self.dimensions)
            self.labels, self.dimensions = preprocessingDatabaseOutput.labels, preprocessingDatabaseOutput.dimensions
            preprocessingImage = PreprocessImage(self.base64, self.functions, self.dimensions)
            self.image = preprocessingImage.image
        except:
            return 'noModel'
        # image = processImage.preprocess(self.modelName, self.image, dim, functions, labels)
        prediction = self.predict()
        postprocess = Postprocess(prediction, self.labels, self.functions)
        self.response = postprocess.process_prediction()

    def predict(self):
        #self.modelPath = f'./DL-models/{self.model_name}.onnx'
        session = ort.InferenceSession(self.modelPath)
        input_name = session.get_inputs()[0].name
        label_name = session.get_outputs()[0].name
        output = session.run([label_name], {input_name: self.image})[0]
        return output

    def get_functions(self):
        functions = self.db.getScripts(self.model_name)
        function_list = dict()
        for function in functions:
            exec(function[0], globals(), function_list)
            # https://stackoverflow.com/questions/2626582/running-exec-inside-function
        self.functions = function_list


class ProcessDatabaseOutput:
    def __init__(self, labels, dimensions):
        self.labels = labels
        self.dimensions = dimensions
        self.process_input_dimensions()
        self.process_labels()

    def process_input_dimensions(self):
        dimensions = self.dimensions.replace("(", "")
        dimensions = dimensions.replace(")", "")
        dimensions = dimensions.split(sep=', ')
        self.dimensions = list(map(int, dimensions))

    def process_labels(self):
        labels = self.labels.replace("'", "")
        self.labels = labels.split(sep=', ')


class PreprocessImage:
    def __init__(self, base64, functions, dimensions):
        self.base64 = base64
        self.image = ''
        self.functions = functions
        self.dimensions = dimensions
        self.preprocess_image()

    def convert_base64_to_jpeg(self):
        img_bytes = base64.b64decode(self.base64)
        image = Image.open(io.BytesIO(img_bytes))
        image_RGB = cv2.cvtColor(np.array(image), cv2.COLOR_BGR2RGB)
        self.image = image_RGB

    def preprocess_image(self):
        self.convert_base64_to_jpeg()
        preprocessingImage = self.functions['preprocessingImage']
        image = preprocessingImage(self.image, self.dimensions, self.functions)
        self.image = image


class Postprocess:
    def __init__(self, prediction, labels, functions):
        self.prediction = prediction
        self.labels = labels
        self.functions = functions
        self.unique_classes = []
        self.detected_labels = []
        self.confidences = []

    def process_prediction(self):
        processPrediction = self.functions['processPrediction']
        class_ids, confidences = processPrediction(self.prediction[0])

        if len(class_ids) == 0:
            print('nothing')
            return 'nothing'

        self.unique_classes = np.unique(class_ids)
        highest_confidences = self.get_highest_confidences(class_ids, confidences)
        self.extract_labels(highest_confidences)
        self.sort_by_confidence()

        print(self.detected_labels)
        print(self.confidences)
        return {'label': self.detected_labels, 'confidence': self.confidences}

    def sort_by_confidence(self):
        self.confidences, self.detected_labels = zip(*sorted(zip(self.confidences, self.detected_labels), reverse=True))

    def extract_labels(self, highest_confidences):
        for i in range(len(self.unique_classes)):
            self.detected_labels.append(self.labels[self.unique_classes[i]])
            self.confidences.append(str(round(highest_confidences[i], 2)))
            print(self.labels[self.unique_classes[i]], highest_confidences[i])

    def get_highest_confidences(self, class_ids, confidences):
        highest_confidences = [0 for i in range(len(self.unique_classes))]
        for i in range(len(class_ids)):
            for j in range(len(self.unique_classes)):
                if class_ids[i] == self.unique_classes[j]:
                    if confidences[i] > highest_confidences[j]:
                        highest_confidences[j] = confidences[i]
        return highest_confidences

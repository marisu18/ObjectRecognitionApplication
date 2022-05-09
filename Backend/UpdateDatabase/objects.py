import base64
import cv2
import os


class Images:
    def __init__(self, model, labels, format, width):
        self.model = model
        self.labels = labels
        self.format = 'JPG'
        self.width = 420
        self.base64s = []

        self.fetchImages()

    def fetchImages(self):
        for label in self.labels:
            image = self.getImage(label)
            if image != "none":
                image = self.preprocess(image, label)
                self.base64s.append(image)
            else:
                self.base64s.append(image)

    def getImage(self, label):
        try:
            return cv2.imread(f'./files/{self.model}/images/{label}.{self.format}')
        except:
            print(f"No image was found for {label}, if this was wrong delete {label} from database and check label name for spelling errors or format, accepted format: JPG.")

            return "none"

    def saveImage(self, label, image):
        cv2.imwrite(f"./files/{self.model}/resizedImages/{label}.{self.format}", image)

    def resizeImage(self, image):
        h, w, c = image.shape
        ratio = h / w
        return cv2.resize(image, (self.width, int(self.width * ratio)), interpolation=cv2.INTER_AREA)

    def preprocess(self, image, label):
        image = self.resizeImage(image)
        self.saveImage(label, image)
        base64String = self.encode(label)
        return base64String

    def encode(self, label):
        with open(f"./files/{self.model}/resizedImages/{label}.{self.format}", "rb") as img_file:  # img name in dir
            b64_string = base64.b64encode(img_file.read())
        return b64_string


class Labels:
    def __init__(self, model):
        self.model = model
        self.labels = ''

        self.getLabels()
        self.createList()

    def getLabels(self):
        try:
            with open(f'./files/{self.model}/labels.txt') as f:
                self.labels = f.read()
            print(self.labels)
        except:
            print('Error')

    def createList(self):
        labels = self.labels.replace("'", "")
        self.labels = labels.split(sep=', ')


class Information:
    def __init__(self, model, labels):
        self.model = model
        self.labels = labels
        self.information = []
        self.getInformation()

    def getInformation(self):
        for label in self.labels:
            try:
                with open(f'./files/{self.model}/objectInformation/{label}.txt') as f:
                    self.information.append(f.read())
            except:
                print(f"No information was found for {label}, if this was wrong delete {label} from database and check label name for spelling errors.")
                self.information.append("none")

class Scripts:
    def __init__(self, model):
        self.model = model
        self.scripts = []
        self.scriptNames = []
        self.getFileNames()
        self.getScripts()
        self.processScriptStrings()

    def getFileNames(self):
        for filename in os.listdir(f'./files/{self.model}/scripts'):
            self.scriptNames.append(filename)

    def getScripts(self):
        for scriptName in self.scriptNames:
            try:
                with open(f'./files/{self.model}/scripts/{scriptName}') as f:
                    self.scripts.append(f.read())
            except:
                print(f"Something went wrong when fetching script {scriptName}")

    def processScriptStrings(self):
        for i in range(len(self.scripts)):
            script = self.scripts[i].replace("\\n", "\n")
            script = script.replace("\\t", "\t")
            self.scripts[i] = script

class Model:
    def __init__(self, modelInformation, format, exampleImageWidth):
        self.modelInformation = modelInformation
        self.format = format
        self.labels = []
        self.information = []
        self.images = []
        self.scripts = []
        self.scriptNames = []
        self.objects = []
        self.exampleImageWidth = exampleImageWidth

        self.begin()

    def begin(self):
        self.getLabels()
        self.getImages()
        self.getScripts()
        self.getInformation()
        self.assembleData()
        # self.operation = Operation(self.modelInformation, self.scripts, self.scriptNames, self.objects, self.action)

    def assembleData(self):
        for i in range(len(self.labels)):
            self.objects.append({'name': self.labels[i], 'information': self.information[i], 'image': self.images[i],
                                 'format': self.format})

        self.modelInformation["objectList"] = ', '.join(map(str, self.labels))


    def getLabels(self):
        labels = Labels(self.modelInformation["modelName"])
        self.labels = labels.labels

    def getScripts(self):
        scripts = Scripts(self.modelInformation["modelName"])
        self.scripts = scripts.scripts
        self.scriptNames = scripts.scriptNames

    def getInformation(self):
        information = Information(model=self.modelInformation["modelName"], labels=self.labels)
        self.information = information.information

    def getImages(self):
        images = Images(model=self.modelInformation["modelName"], labels=self.labels, format=self.format,
                                width=self.exampleImageWidth)
        self.images = images.base64s
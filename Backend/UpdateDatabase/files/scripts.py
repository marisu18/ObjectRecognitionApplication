class Yolov5ScriptStrings:
    def __init__(self):
        self.getMaximumValues = "def getMaximumValues(image):" \
                                "\n\tmax_width, max_height = 0, 0" \
                                "\n\th, w, c = image.shape" \
                                "\n\tif h > max_height:" \
                                "\n\t\tmax_height = h" \
                                "\n\tif w > max_width:" \
                                "\n\t\tmax_width = w" \
                                "\n\treturn max_width, max_height"

        self.addBorder = "def addBorder(image, max_width, max_height, dim):" \
                         "\n\timport cv2" \
                         "\n\tHEIGHT, WIDTH = dim[0], dim[1]" \
                         "\n\th, w, c = image.shape" \
                         "\n\ttop = int(HEIGHT - h)" \
                         "\n\tbottom = 0" \
                         "\n\tleft = int(WIDTH - w)" \
                         "\n\tright = 0" \
                         "\n\timage = cv2.copyMakeBorder(image, top, bottom, left, right, cv2.BORDER_CONSTANT)" \
                         "\n\treturn image"

        self.resizeImage = "def resizeImage(image, dim):" \
                           "\n\timport cv2" \
                           "\n\tHEIGHT, WIDTH = dim[0], dim[1]" \
                           "\n\th, w, c = image.shape" \
                           "\n\tif w >= h:" \
                           "\n\t\tratio = h / w" \
                           "\n\t\timage = cv2.resize(image, (WIDTH, int(HEIGHT * ratio)), interpolation=cv2.INTER_AREA)" \
                           "\n\telse:" \
                           "\n\t\tratio = w / h" \
                           "\n\t\timage = cv2.resize(image, (int(WIDTH * ratio), HEIGHT), interpolation=cv2.INTER_AREA)" \
                           "\n\treturn image"

        self.fitImagesToDimensions = "def fitImageToDimensions(image, dim, functions):" \
                                     '\n\tgetMaximumValues = functions["getMaximumValues"]' \
                                     '\n\tresizeImage = functions["resizeImage"]' \
                                     '\n\taddBorder = functions["addBorder"]' \
                                     "\n\tmax_width, max_height = getMaximumValues(image)" \
                                     "\n\timage = resizeImage(image, dim)" \
                                     "\n\timage = addBorder(image, max_width, max_height, dim)" \
                                     "\n\treturn image"

        self.preprocessingImage = "def preprocessingImage(image, dim, functions):" \
                                  "\n\timport cv2" \
                                  '\n\tfitImageToDimensions = functions["fitImageToDimensions"]' \
                                  "\n\timage = fitImageToDimensions(image, dim, functions)" \
                                  "\n\timage = cv2.dnn.blobFromImage(image, 1 / 255.0, dim, swapRB=True)" \
                                  "\n\treturn image"

        self.yolov5ProcessPrediction = "def processPrediction(prediction):" \
                                       "\n\tclass_ids = []" \
                                       "\n\tconfidences = []" \
                                       "\n\tfor row in prediction:" \
                                       "\n\t\tconfidence = row[4]" \
                                       "\n\t\tif confidence >= 0.4:" \
                                       "\n\t\t\tclasses_scores = row[5:]" \
                                       "\n\t\t\tmax_index = np.argmax(classes_scores)" \
                                       "\n\t\t\tclass_id = max_index" \
                                       "\n\t\t\tif (classes_scores[class_id] > .25):" \
                                       "\n\t\t\t\tconfidences.append(confidence)" \
                                       "\n\t\t\t\tclass_ids.append(class_id)" \
                                       "\n\treturn class_ids, confidences"

        self.scriptNames = ['getMaximumValues', 'addBorder', 'resizeImage', 'fitImagesToDimensions', 'preprocessingImage']

        self.scripts = [self.getMaximumValues, self.addBorder, self.resizeImage, self.fitImagesToDimensions,
                        self.preprocessingImage]

class ScriptStrings:
    def __init__(self):
        self.scriptStrings = Yolov5ScriptStrings()

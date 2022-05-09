import database
import messageInterface
import json


def get_image(model):
    dbs = database.DatabaseSelectionInterface()
    db = dbs.database
    objects = db.getObjects(key=model)
    return str(objects[0][2])


def predictTest1():
    model = 'coco_dataset'
    image = get_image(model)
    object = {'model': model, 'image_base64': image[2:-1], 'action': 1}
    msgInterface = messageInterface.MessageInterface(object)
    response = msgInterface.response
    print(f'Predict test 1: {response}')


def predictTest2():
    model = 'coco_dataset'
    image = get_image(model)
    object = {'model': 'nonexisting_model', 'image_base64': image[2:-1], 'action': 1}
    msgInterface = messageInterface.MessageInterface(object)
    response = msgInterface.response
    print(f'Predict test 2: {response}')


def predictTest3():
    model = 'coco_dataset'
    image = get_image(model)
    object = {'model': model, 'image_base64': 'noImage', 'action': 1}
    msgInterface = messageInterface.MessageInterface(object)
    response = msgInterface.response
    print(f'Predict test 3: {response}')


def updateTest1():
    object = {'models': [{'modelId': 'coco_dataset', 'versionNr': '0.0.2'}], 'action': 2}
    msgInterface = messageInterface.MessageInterface(object)
    response = msgInterface.response
    response = json.loads(response)
    print(f'Update Test 1: {response["models"]}')


def updateTest2():
    object = {'models': 'none', 'action': 2}
    msgInterface = messageInterface.MessageInterface(object)
    response = msgInterface.response
    response = json.loads(response)
    print(f'Update Test 2: {response["models"]}')


def updateTest3():
    object = {'models': [], 'action': 2}
    msgInterface = messageInterface.MessageInterface(object)
    response = msgInterface.response
    response = json.loads(response)
    print(f'Update Test 3: {response["models"]}')


def updateTest4():
    object = {'models': 'eddjewiodj', 'action': 2}
    msgInterface = messageInterface.MessageInterface(object)
    response = msgInterface.response
    response = json.loads(response)
    print(f'Update Test 4: {response["models"]}')


def updateTest5():
    object = {'models': 244523, 'action': 2}
    msgInterface = messageInterface.MessageInterface(object)
    response = msgInterface.response
    response = json.loads(response)
    print(f'Update Test 5: {response["models"]}')


def updateTest6():
    object = {
        'models': [{'modelId': 'coco_dataset', 'versionNr': '0.0.2'}, {'modelId': 'notExisting', 'versionNr': '0.1.2'}],
        'action': 2}
    msgInterface = messageInterface.MessageInterface(object)
    response = msgInterface.response
    response = json.loads(response)
    print(f'Update Test 6: {response["models"]}')


def testPredict():
    predictTest1()
    predictTest2()
    predictTest3()


def testUpdate():
    updateTest1()
    updateTest2()
    updateTest3()
    updateTest4()
    updateTest5()
    updateTest6()


#testPredict()
testUpdate()
# print(isinstance([], list))

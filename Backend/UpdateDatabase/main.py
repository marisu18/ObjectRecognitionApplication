import databaseOperations
import database

def test1():
    modelInformation = {'modelName': "yolov5", "modelVersion": "1.0.2", "modelAlias": "Yolov5",
                        "modelPath": 'none', "modelInputDimension": "(640, 640)", "objectList": [],
                        "objectType": "Objects"}
    action = "insert"
    imageFormat = "JPG"
    exampleImageWidth = 420
    input = {'modelInformation': modelInformation, 'imageFormat': imageFormat, 'exampleImageWidth': exampleImageWidth}
    # might change to input instead of modelInfo, imageFormat, and exampleImageWidth.

    databaseOperations.Operation(input, action)


def test2():
    input = {'table': 'Models', 'key': 'modelName', 'key_value': 'treeSpecies', 'name': 'treeSpecies'}
    # might change to input instead of modelInfo, imageFormat, and exampleImageWidth.

    databaseOperations.Operation(input, action='delete')


def test3():
    input = {'table': 'Scripts', 'key': 'scriptName', 'key_value': 'GetMinimumValues'}
    # might change to input instead of modelInfo, imageFormat, and exampleImageWidth.
    databaseOperations.Operation(input, action='delete')


def test4():
    input = {'table': 'Objects', 'key': 'objectName', 'key_value': 'tree2'}
    # might change to input instead of modelInfo, imageFormat, and exampleImageWidth.
    databaseOperations.Operation(input, action='delete')


def test5():
    input = {'value': 'yolov5m', 'table': 'Models', 'key': 'modelAlias', 'name': 'yolov5'}
    databaseOperations.Operation(input, action='update')


def test6():
    input = {'value': '', 'table': 'Scripts', 'key': 'scriptData', 'name': 'getMinimumValues'}
    databaseOperations.Operation(input, action='update')


def test7():
    input = {'value': '', 'table': 'Objects', 'key': 'objectImage', 'name': 'tv'}
    databaseOperations.Operation(input, action='update')


def test8():
    input = {'value': '', 'table': 'Objects', 'key': 'objectInfo', 'name': 'oven'}
    databaseOperations.Operation(input, action='update')


def testInsert():
    test1()


def testDeletion():
    test2()
    test3()
    test4()


def testUpdate():
    test5()
    test6()
    test7()
    test8()


# testInsert()
# testUpdate()
# testDeletion()


def check():
    db = database.DatabaseSelectionInterface()
    db.database.cursor.execute("SELECT objectName FROM Objects")
    rows = db.database.cursor.fetchall()
    for row in rows:
        print(row)

    db.database.cursor.execute("DESC Models")
    rows = db.database.cursor.fetchall()
    for row in rows:
        print(row)
check()
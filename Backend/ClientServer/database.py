import mysql.connector


class MysqlDatabaseInterface:
    def __init__(self):
        self.db = None
        self.cursor = None
        self.dbConnect()

    def dbConnect(self):
        dbCon = mysql.connector.connect(
            host="164.92.137.23",
            port="6603",
            user="root",
            password="root",
            database="modelsDB"
        )

        if dbCon.is_closed():
            print("Could not connect to database")
            return 1

        self.db = dbCon
        self.cursor = self.db.cursor()

    def getModelDataForDetection(self, key):

        try:
            self.cursor.execute(f"SELECT modelInputDimension, modelPath, objectList "
                                f"FROM Models "
                                f"WHERE modelName = '{key}'")
            modelData = self.cursor.fetchall()
            return modelData[0]
        except:
            return 'noModel'

    # should also be able to get for those where there is no known key yet,
    # maybe get all the models except those that doesn't require update.
    # get model version and compare in a different function.
    def getNewModelDataForUpdate(self, antiKeys):
        expression = ''

        if antiKeys != []:
            expression += 'WHERE '
        for index, antiKey in enumerate(antiKeys):
            expression += f"NOT modelName = '{antiKey}'"
            if index < len(antiKeys) - 1:
                expression += " AND "

        try:
            self.cursor.execute(
                f"SELECT * "
                f"FROM Models "
                f"{expression}")
            modelData = self.cursor.fetchall()
            return modelData
        except:
            return 'noModels'

    def getOlderModelDataForUpdate(self, key):
        expression = ''

        try:
            self.cursor.execute(
                f"SELECT * "
                f"FROM Models "
                f"WHERE modelName='{key}'")
            modelData = self.cursor.fetchall()
            return modelData
        except:
            return 'noModels'

    def getModelVersion(self, key):

        try:
            self.cursor.execute(f"SELECT modelVersion "
                                f"FROM Models "
                                f"WHERE modelName = '{key}'")
            modelVersion = self.cursor.fetchall()
            return modelVersion[0][0]
        except:
            return 'noModels'

    def getScripts(self, key):

        try:
            self.cursor.execute(f"SELECT Scripts.scriptData "
                                f"FROM Scripts "
                                f"INNER JOIN ScriptsModels USING(scriptName)"
                                f"WHERE modelName = '{key}'")
            scripts = self.cursor.fetchall()
            return scripts
        except:
            return 'noScripts'  # which is fine, some models may not have any preprocessing

    def getObjects(self, key):
        # order it alphabetically?

        try:
            self.cursor.execute(f"SELECT * "
                                f"FROM Objects "
                                f"INNER JOIN ModelsObjects USING(objectName)"
                                f"WHERE modelName = '{key}'"
                                f"ORDER BY objectName ")
            objects = self.cursor.fetchall()
            return objects
        except:
            return 'noObjects'


class DatabaseSelectionInterface:
    def __init__(self):
        self.database = MysqlDatabaseInterface()

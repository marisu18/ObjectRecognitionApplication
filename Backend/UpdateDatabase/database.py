import mysql.connector


class DatabaseSelectionInterface:
    def __init__(self):
        self.database = MysqlDatabaseInterface()


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

    def insertModel(self, model):
        try:
            sql = "INSERT INTO Models(modelName, modelVersion, modelAlias, modelPath, modelInputDimension, objectList, objectType) VALUES (%s, %s, %s, %s, %s, %s, %s)"
            values = [model['modelName'], model["modelVersion"], model["modelAlias"], model["modelPath"],
                      model["modelInputDimension"], model["objectList"], model["objectType"]]
            self.cursor.execute(sql, values)
            self.db.commit()
        except:
            print('Error when inserting model')

    def insertObject(self, object):
        try:
            sql = "INSERT INTO Objects(objectName, objectInfo, objectImage, objectImageFormat) VALUES (%s, %s, %s, %s)"
            values = [object['name'], object['information'], object['image'], object['format']]
            self.cursor.execute(sql, values)
            self.db.commit()
        except:
            print('Error when inserting object')

    def insertModelsObjects(self, modelName, objectName):
        try:
            sql = "INSERT INTO ModelsObjects(modelName, objectName) VALUES (%s, %s)"
            values = [modelName, objectName]
            self.cursor.execute(sql, values)
            self.db.commit()
        except:
            'model is not yet put into Models table'

    def insertScript(self, scriptName, script):

        try:
            sql = "INSERT INTO Scripts(scriptName, scriptData) VALUES (%s, %s)"
            values = [scriptName, script]
            self.cursor.execute(sql, values)
            self.db.commit()
        except:
            print('Error when into inserting Script')

    def insertScriptsModels(self, modelName, scriptName):
        try:
            sql = "INSERT INTO ScriptsModels(modelName, scriptName) VALUES (%s, %s)"
            values = [modelName, scriptName]
            self.cursor.execute(sql, values)
            self.db.commit()
        except:
            'model is not yet put into Models / script'

    def delete(self, table, key, key_value):
        sql = f"DELETE FROM {table} " \
              f"WHERE {key}='{key_value}'"
        self.cursor.execute(sql)
        self.db.commit()

    def updateModel(self, model):
        try:
            sql = f"UPDATE Models " \
                  f"SET {model['key']}='{model['value']}' " \
                  f"WHERE modelName='{model['name']}'"
            self.cursor.execute(sql)
            self.db.commit()

        except:
            print('error')

    def updateObject(self, object):
        try:
            sql = f"UPDATE Objects " \
                  f"SET {object['key']} = %s " \
                  f"WHERE objectName = %s "
            val = (object['value'], object['name'])

            self.cursor.execute(sql, val)
            self.db.commit()

        except:
            print('error')

    def updateScript(self, script):
        try:
            sql = f"UPDATE Scripts " \
                  f"SET {script['key']}='{script['value']}' " \
                  f"WHERE scriptName='{script['name']}'"
            self.cursor.execute(sql)
            self.db.commit()

        except:
            print('error')

    """def updateObject(self, object):
        try:

            sql = f"UPDATE Objects" \
                  f"SET objectImage={object['image']}" \
                  f"WHERE objectName={object['name']}"
            self.cursor.execute(sql)
            self.db.commit()

        except:
            print('error')
"""

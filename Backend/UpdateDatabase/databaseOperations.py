import objects
from files import scripts
import database


class Interface:
    def __init__(self, input, action):
        self.input = input
        self.action = action
        self.processAction()

    def processAction(self):
        if self.action == "insert":
            insert = Insert(self.input)
        elif self.action == "update":
            update = Update(self.input)
        elif self.action == "delete":
            delete = Delete(self.input)


class Update:
    def __init__(self, input):
        self.input = input
        self.databaseSelection = database.DatabaseSelectionInterface()
        self.db = self.databaseSelection.database
        self.update()

    def update(self):
        if self.input['table'] == "Models":
            self.updating_model()

        elif self.input['table'] == "Scripts":
            self.updating_script()

        elif self.input['table'] == "Objects":
            self.updating_object()

        else:
            print(
                'Nothing was deleted, check spelling. Correct spellings for deletion tables: Models, Scripts, Objects')
            return

    def updating_model(self):
        try:
            self.db.updateModel(self.input)
        except:
            print('Deletion failed, check model name')

    def updating_script(self):
        if self.input['key'] == 'scriptData':
            scripts = objects.Scripts('update')
            self.input['value'] = scripts.scripts[0]

        try:
            self.db.updateScript(self.input)
        except:
            print('Deletion failed, check script name or the script may be used by one or more models')

    def updating_object(self):
        if self.input['key'] == 'objectImage':
            images = objects.Images('update', [self.input['name']], 'JPG', 420)
            self.input['value'] = images.base64s[0]

        elif self.input['key'] == 'objectInfo':
            information = objects.Information('update', [self.input['name']])
            self.input['value'] = information.information[0]

        try:
            self.db.updateObject(self.input)
        except:
            print('Deletion failed, check object name or the object may be used by one or more models')


class Insert:
    def __init__(self, input):
        self.input = input
        self.scripts = []
        self.scriptNames = []
        self.objects = []

        self.databaseSelection = database.DatabaseSelectionInterface()
        self.db = self.databaseSelection.database
        self.get_model_data()
        self.insert()

    def get_model_data(self):
        model = objects.Model(self.input["modelInformation"], self.input["imageFormat"],
                      self.input["exampleImageWidth"])
        self.objects, self.scriptNames, self.scripts = model.objects, model.scriptNames, model.scripts

    def insert(self):
        self.db.insertModel(self.input['modelInformation'])

        for object in self.objects:
            self.db.insertObject(object)
            self.db.insertModelsObjects(self.input['modelInformation']['modelName'], object['name'])

        for index, scriptName in enumerate(self.scriptNames):
            self.db.insertScript(scriptName, self.scripts[index])
            self.db.insertScriptsModels(self.input['modelInformation']['modelName'], scriptName)

        print("Insert successful")


class Delete:
    def __init__(self, input):
        self.input = input
        self.databaseSelection = database.DatabaseSelectionInterface()
        self.db = self.databaseSelection.database
        self.delete()

    def delete(self):
        if self.input['table'] == "Models":
            try:
                self.db.delete('ScriptsModels', 'modelName', self.input['key_value'])
                self.db.delete('ModelsObjects', 'modelName', self.input['key_value'])
                self.db.delete(self.input['table'], 'modelName', self.input['key_value'])
            except:
                print('Deletion failed, check model name ')

        elif self.input['table'] == "Scripts":
            try:
                self.db.delete(self.input['table'], 'scriptName', self.input['key_value'])
            except:
                print('Deletion failed, check script name or the script may be used by one or more models')

        elif self.input['table'] == "Objects":
            try:
                self.db.delete(self.input['table'], 'objectName', self.input['key_value'])
            except:
                print('Deletion failed, check object name or the object may be used by one or more models')

        else:
            print('Nothing was deleted, check spelling. Correct spellings for deletion tables: Models, Scripts, Objects')


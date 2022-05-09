import database


class Update:
    def __init__(self, models):
        self.models = models
        self.response = {'models': [], 'modelData': {}}

        self.databaseSelection = database.DatabaseSelectionInterface()
        self.db = self.databaseSelection.database

        self.update()

    def update(self):
        # if self.models != 'none':
        if isinstance(self.models, list):
            self.updateExistingModels()
        self.updateNewModels()

    def compareVersionNumber(self, model):
        clientVersion = model['versionNr']
        serverVersion = self.db.getModelVersion(model["modelId"])
        if serverVersion == 'noModels':
            return 'none'
        if clientVersion != serverVersion:
            return True
        else:
            return False

    def updateExistingModels(self):

        for model in self.models:
            needUpdate = self.compareVersionNumber(model)
            if needUpdate == 'none':
                continue

            elif needUpdate:
                # print(needUpdate)
                modelData = self.db.getOlderModelDataForUpdate(model['modelId'])
                self.response['models'].append({'modelId': model['modelId'], 'versionNr': modelData[0][4]})
                objects = self.db.getObjects(model['modelId'])

                self.response['modelData'][model['modelId']] = {'objects': [], 'alias': modelData[0][1],
                                                                'type': modelData[0][3],
                                                                'key': modelData[0][0], 'dim': modelData[0][2],
                                                                'model': modelData[0][5]}
                for object in objects:
                    image = str(object[2])
                    if image != 'none':
                        image = image[2:-1]
                    self.response['modelData'][model['modelId']]['objects'].append(
                        {'name': object[0], 'information': object[1], 'image': image, 'format': object[3]})
            else:
                self.response['models'].append({'modelId': model['modelId'], 'versionNr': model['versionNr']})
            # also add the ones that doesn't need update to the model list

    def updateNewModels(self):
        existing_models = []
        # if self.models != 'none':
        if isinstance(self.models, list):
            existing_models = [self.models[i]['modelId'] for i in range(len(self.models))]
        new_models = self.db.getNewModelDataForUpdate(existing_models)
        for model in new_models:
            self.response['models'].append({'modelId': model[0], 'versionNr': model[4]})

            objects = self.db.getObjects(model[0])
            self.response['modelData'][model[0]] = {'objects': [], 'alias': model[1], 'type': model[3], 'key': model[0],
                                                    'dim': model[2], 'model': model[5]}
            for object in objects:
                image = str(object[2])
                if image != 'none':
                    image = image[2:-1]
                self.response['modelData'][model[0]]['objects'].append(
                    {'name': object[0], 'information': object[1], 'image': image, 'format': object[3]})

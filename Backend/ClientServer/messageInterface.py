import json
import predict
import update


class MessageInterface:
    def __init__(self, message):
        self.message = message
        self.response = ''
        self.process_message()

    def predict(self):
        try:
            prediction = predict.Predict(self.message)
            self.response = prediction.response
        except:
            self.response = "error"

        if self.response != 'nothing' or self.response != 'noModel':
            self.response = json.dumps(self.response)

    def update(self):
        print(self.message['models'])
        updating = update.Update(self.message['models'])
        self.response = json.dumps(updating.response)

    def process_message(self):
        if self.message["action"] == 1:
            self.predict()
        elif self.message["action"] == 2:
            self.update()



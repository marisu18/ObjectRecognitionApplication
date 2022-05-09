import NetInfo from "@react-native-community/netinfo";
import ReadInformation from './async_storage/ReadInformation';
import ReadMultipleInformation from './async_storage/ReadMultipleInformation';
import RabbitMq from './RabbitMq';
import IdGenerator from './IdGenerator';

export default function updateModels(){
        NetInfo.fetch().then(state => {
            if (state.isConnected){
                const keys = ["models", "object_classes"];
                ReadMultipleInformation(keys).then(

                    function(object) {
                        let models = object[0]
                        let object_classes = object[1]
                        models = JSON.parse(models);
                        object_classes = JSON.parse(object_classes);

                        if (models == null || object_classes == null){ models = 'none'};
                        object = {action: 2, models: models};
                        let queue_name = IdGenerator();
                        let exchange_name = IdGenerator();
                        RabbitMq(JSON.stringify(object), 2, queue_name, exchange_name);
                    },
                    function(error) { alert("Something went wrong."); }
                );
            }
            else{
                alert('No Internet Connection')
            }
        });
    }
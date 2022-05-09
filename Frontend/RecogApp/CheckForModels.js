import ReadMultipleInformation from './async_storage/ReadMultipleInformation';
import updateModels from './updateModels'

export default function CheckForModels(){
        const keys = ["models", "object_classes"];
        ReadMultipleInformation(keys).then(
        //ReadInformation('models').then(
            function(object) {
                let models = object[0];
                let object_classes = object[1];

                models = JSON.parse(models);
                object_classes = JSON.parse(object_classes);

                if (models == null || object_classes == null){
                    updateModels();
                };
            },
            function(error) { alert("Something went wrong."); }
        );
    }
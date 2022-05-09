

export default function CombineArrays(array1, array2){
    //array1 = [{"name": "airplane", "information": "something", "image":"image"}, {"name": "bus", "information": "something", "image":"image"}];
    //array2 = ['0', '0']

        let array = [];
        for (let i = 0; i < array2.length; i++){
            data = JSON.parse(array1[i]);
            confidence = {'confidence': array2[i]};
            object = Object.assign({}, data, confidence);
            //alert(JSON.stringify(object));
            array.push(object);
        };

    return array;
}
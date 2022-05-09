import { Connection, Exchange, Queue } from 'react-native-rabbitmq';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

import WriteInformation from './async_storage/WriteInformation';
import WriteData from './async_storage/WriteData';
import IdGenerator from './IdGenerator';

async function RabbitMq(data, action, queue_name, exchange_name){
    //action == 1, get output from image
    //action == 2, store data/update
    let counter = 0;
    const queues = [];

    function sendMessage(data, action) {

    const config = {
        //host:'10.225.149.107',
        host:'164.92.137.23',
        port: 5672,
        username:'root',
        password:'root',
        virtualhost:'/',
        ttl: 10000, // Message time to live,
        ssl: false // Enable ssl connection, make sure the port is 5671 or an other ssl port
    }

    let connection = new Connection(config);
    connection.connect();
    connection.on('error', (event) => {
        alert('error');
        if (action == 1){
            WriteData("ConnectionError");
        }
        connection.close();
        connection.clear();
        connection.removeon('error');
    });

    connection.on('connected', (event) => {

        counter++;

        if ((!queues.includes(queue_name)) && (typeof(queue_name) != "undefined") && (typeof(exchange_name) != "undefined")){
        queues.push(queue_name);
        let queue = new Queue( connection, {
            name: queue_name,
            passive: false,
            durable: true,
            exclusive: false,
            consumer_arguments: {'x-priority': 1}
        });

        let exchange = new Exchange(connection, {
            name: 'send_request',
            type: 'direct',
            durable: true,
            autoDelete: false,
            internal: false
        });

        // Receive one message when it arrives
        let message = data;
        let routing_key = 'QueueToServer'; //'DLModels';
        let properties = { expiration: 10000, correlation_id: exchange_name, reply_to: queue_name }

        exchange.publish(message, routing_key, properties)
        queue.on('message', (data) => {
            queue.basicAck(data.delivery_tag);
            queue.close();
            queue.delete();

            if (action == 1){
                WriteData('data', data.message);
                connection.removeon('connected');
            }

            else if(action == 2){
                WriteInformation(JSON.parse(data.message));
                connection.removeon('connected');
                 //alert(data.message);
            }
        })

        queue.bind(exchange, queue_name);
        }

    });
    }

    const object = sendMessage(data, action);


}
export default RabbitMq;
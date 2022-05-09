import pika, mysql.connector, json
from ast import literal_eval

import messageInterface


class RabbitMqInterface:
    def __init__(self, queue_name, exchange_name):
        self.queue_name = queue_name
        self.exchange_name = exchange_name

    def on_request(self, ch, method, props, body):
        raw = literal_eval(body.decode('utf8'))

        msgInterface = messageInterface.MessageInterface(raw)
        response = msgInterface.response

        print(f'Received:{raw["action"]}')
        print(props.reply_to)
        print(props.correlation_id)

        ch.basic_publish(exchange='',
                         routing_key=props.reply_to,
                         properties=pika.BasicProperties(correlation_id= \
                                                             props.correlation_id),
                         body=str(response))
        ch.basic_ack(delivery_tag=method.delivery_tag)

    def connect(self):
        credentials = pika.PlainCredentials('root', 'root')

        connection = pika.BlockingConnection(
            pika.ConnectionParameters(host='164.92.137.23',
                                      port=5672,
                                      credentials=credentials))

        channel = connection.channel()
        try:
            channel.queue_purge(queue=self.queue_name)
        finally:
            channel.queue_declare(queue=self.queue_name, durable=True)
            channel.exchange_declare(exchange=self.exchange_name)

            channel.queue_bind(queue=self.queue_name, exchange=self.exchange_name, routing_key=self.queue_name)
            channel.basic_qos(prefetch_count=1)
            channel.basic_consume(queue=self.queue_name, on_message_callback=self.on_request)

            print("Awaiting RPC requests")
            channel.start_consuming()

instance = RabbitMqInterface(queue_name='QueueToServer', exchange_name='QueueToServer')
instance.connect()
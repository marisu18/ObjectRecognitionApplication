import rabbitMq

def main():
    instance = rabbitMq.RabbitMqInterface(queue_name='QueueToServer', exchange_name='QueueToServer')
    instance.connect()

if __name__ == "__main__":
    main()
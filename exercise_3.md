Final thing now remaining in our logic is to update the `PUT` Item route, to send a message to ItemChanged Queue in a running RabbitMQ instance.

In Terminal run the following command to add amqp dependency, that we will use communicating with rabbitMQ

`npm install --save amqp-ts`

then add this import in `item.controller.ts`

`import * as Amqp from "amqp-ts";`

Then add the following snippet to define the connection/Exchange/Queue then connect to it
```
//Assuming it's running locally or docker instance is already running
var connection = new Amqp.Connection('amqp://localhost');
//var connection = new Amqp.Connection(process.env.AMQP_URL);
var exchange = connection.declareExchange("ExchangeName");
var queue = connection.declareQueue("ItemChanged");
queue.bind(exchange);
```

Then we will add the following after the update Statement in the `PUT` item route 
 ```
let updateMessage = new Amqp.Message(item);
exchange.send(updateMessage);
 ```

If you are not going to use docker compose, use the following command to init a RabbitMQ instance
run the following command in terminal 
`docker run -d -p 15672:15672 -p 5672:5672 -p 5671:5671 --hostname my-rabbitmq --name my-rabbitmq-container rabbitmq:3-management`

Now restart your application to make sure that connection is initiated and get an existing Item id and use it in `PUT item` then check status
and go for 
http://localhost:15672/#/ guest/guest and check the Existing Queues and number of messages

If Done, Move on to the next exercise
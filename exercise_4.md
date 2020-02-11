Time for Docker. Now we first create a docker file for our application, that can run provided the Environment variables for RabbitMQ, and MONGO DB.

We will first change connection strings for both, first one is at `main.ts` and the other is at `item.controller.ts` as follows 
 
`const MONGO_URI = 'mongodb://'+ process.env.MONGO_HOSTNAME+':'+process.env.MONGO_PORT +'/item';` 

and 

`var connection = new Amqp.Connection(process.env.AMQP_URL);`

This will make things much easier for us, as we can chang those ENV Vars when ever we want, without changing one line of code.

Now lets create our Docker file, in the root directory of our application, create a file called `Dockerfile` without any exetensions.
Then inside it we will type the following 
```
FROM node:10.13.0-alpine
# Env Vars
ENV NODE_ENV dev
ENV NODE_CONFIG_ENV dev
ENV MONGO_HOSTNAME=db
ENV MONGO_PORT=$MONGO_PORT
ENV MONGO_DB=$MONGO_DB
ENV AMQP_URL=amqp://rabbitmq

# Create Directory for the Container
WORKDIR /usr/src/app
# Only copy the package.json file to work directory
COPY package.json .
# Install all Packages
RUN npm install
# Copy all other source code to work directory
ADD . /usr/src/app
# Start
CMD [ "npm", "start" ]
EXPOSE 8080
```

Now if you have MongoDB and RabbitMQ running, you can provide connection variable while running this docker file. 
```
ENV MONGO_HOSTNAME=db
ENV MONGO_PORT=$MONGO_PORT
ENV MONGO_DB=$MONGO_DB
ENV AMQP_URL=amqp://rabbitmq
```

or  Move to creating docker-compose.yml which will orcestrate everything for you.
create `.env` that you can store any environment variables you wish to persist for the moment we will only add those 
```
MONGO_PORT=27017
MONGO_DB=items
```
Before we start, make sure you killed all running MongoDB/RabbitMQ instances.
tip : `docker rm -f {containerID}`

Create a new file called `docker-compose.yml` in the root app directory.
Then we will add the following :
```
version: "3"
services:
networks:
  app-network:
    driver: bridge

volumes:
  dbdata:
  node_modules:
```
In the services section we will define three services, our application, MongoDB, and RabbitMQ , and connect them together.

we will begin with rabbitMQ 

```
  rabbitmq:
    image: 'rabbitmq:management'
    ports:
      # The standard AMQP protocol port
      - '5672:5672'
      # HTTP management UI
      - '15672:15672'
    networks:
      - app-network

```

Then we will define MongoDB

```
  db:
    image: mongo:4.1.8-xenial
    container_name: db
    restart: unless-stopped
    env_file: .env
    environment:
      - MONGO_INITDB_ROOT_USERNAME=$MONGO_USERNAME
      - MONGO_INITDB_ROOT_PASSWORD=$MONGO_PASSWORD
    volumes:
      - dbdata:/data/db
    networks:
      - app-network
  
```

Finally we will define our app service, which will run from our newly created docker file instead of an already defined image 

```
  nodejs:
    build:
      context: .
      dockerfile: Dockerfile
    image: nodejs
    container_name: nodejs
    restart: unless-stopped
    env_file: .env
    environment:
      - MONGO_HOSTNAME=db
      - MONGO_PORT=$MONGO_PORT
      - MONGO_DB=$MONGO_DB
      - AMQP_URL=amqp://rabbitmq
    ports:
      - "8080:8080"
    volumes:
      - .:/home/node/app
      - node_modules:/home/node/app/node_modules
    depends_on: 
      - db
      - rabbitmq
    tty: true
    networks:
      - app-network

```

Now feel free to explore the endpoints we have.
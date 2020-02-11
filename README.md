# expressWorkshop
A very simple API created using TypeScript, MongoDB and RabbitMQ
### 4 Available Endpoints

* Save Item (takes an Item in Request Body)
* Get Item (By ID)
* List Items (Get All Items from DB)
* Delete Item (Delete from DB by ID)
* Order Item (Mark Item as SOLD, by ID)

### Easy Start

assuming you are already in Workshop folder, open terminal from there,
then type :
`docker-compose up`

docker-compose will simply get instructions from `docker-compose.yml`, which has three images

* Mongodb.
* RabbitMQ.
* backend app.

### Postman Collection

Please import the file postman.json to your postman, to navigate through various templates for requests.

### Hints

Update Item, first check item status, if proper it marks it as sold and send message to ItemChanged Queue, you can check those messages via
`http://localhost:15672/#/` use guest/guest to log in.

### To be Improved, if more time allowed

* Add JOI validation.
* Add Auto Generated Swagger doc.
* Service layer to be added, instead of handling everything in controller.
* RabbitMQ Helper Class to be added.
* Postman  Runner and Tests for a full scenario test

Created Specially for Alten End 2 End With TypeScript workshop.

Good Ref. [Synaptiklabs](https://synaptiklabs.com/posts/express-typescript-and-mongo/).

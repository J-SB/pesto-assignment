
# Pesto Backend Assignment

 



## Microservice Architecture:
Services are divided based on usage and functionality:

## Microservice Architecture:
Services are divided based on usage and functionality:

## Microservice Architecture:
Services are divided based on usage and functionality:

1. User Management: This service is responsible for registering and authenticating users (buyers/merchants). This also allows users to their addresses and payment method to be used at the time of purchase.
2. Product Management:  This service is responsible for adding, listing, and updating product information.

3. Order Management: This service is responsible to process the order, based on availability of product. This lets users to view their orders, track them and update them.


## Features

- Load Balancing has been implemented as a full fledged express server to offload the requests to the order service instances running on different ports. This would ensure high availability and falut tolerancy in the service.
- Rate limiting has been implemented in load balancer to prevent DOS attacks.
- ALL the API endpoints have been made protected to ensure secure interservice communication.
- Pessimistic locking has been implemented in the critical section to avoid RACE condition and to ensure concurrecy access control and data integrity while saving the orders.




## Assumptions

- All the APIs with PUT or POST method will always contain all the correct fields, required for success DB operations.
- Users will have 2 modes - COD, Prepaid.
- Order tracking will be readily available while making API call to create the order.
- Buyers and merchants will have their dedicated dashboard UIs, to view their Products/Order lists and to do other related operations.

## Steps to run each server locall

- Clone the project

```bash
  git clone https://link-to-project
```
- Download MySQL database and create tables using `db_tables.sql`
- create a .env file with below fields and add it to each microservice 

```bash
   DB_HOST=<database_host>
   DB_USER=<database_user>
   DB_DATABASE=<database_name>
   DB_PASSWORD=<database_password>
   SECRET_KEY=<any_secret_key>
```

- Go to the project directory

```bash
  cd my-project
```

- Install dependencies

```bash
  npm install
```

- Start the server

```bash
  npm run start
```


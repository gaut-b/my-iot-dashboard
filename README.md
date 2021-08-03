# My IoT dashboard (Work in progress)
A customizable and agnostic dashboard ready to deploy for IoT projects using the SigFox network (Lora support to come) developped with React and Django.Possibility to create customized views according to the data received and parsed by the platform, according to the user's instructions.

![demo_dashboard](https://user-images.githubusercontent.com/53061088/128064851-fe0a72b9-4aa1-4849-a4da-cd452d887884.gif)


# Frontend
The frontend is an application coded in react. Data visualization is done with D3.js, and the most recent data is retrieved via websocket.
  ## Todo: 
   - React-ace implementation to allow scripting in python to parse raw payloads;
  - Implementation of react-grid to allow customization of the dashboard;
  - Refactoring of the code;

# Backend
The backend is made of an api coded with Django and a PostgreSQL database. The support of websocket is realized with "Channels" which allows to send to the client the last measurement points

  ## Todo: 
  - MongoDB database implementation for user management, device configuration data and dashboards. The PotgreSQL database will be used to store device data;
  - implementation of an endpoint allowing the configuration of a parsing function allowing the user to configure how the backend should interpret the data payload.
  - implementation of a microservices architecture allowing to manage asynchronous tasks such as alerting


# How to deploy
## Dev
```
docker-compose -f docker-compose.yml up -d --build
```
## Prod
*As for now, only the server part is deployed in production* 
```
docker-compose -f docker-compose.prod.yml up -d --build
```

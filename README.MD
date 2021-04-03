## Docker build image with example data

docker build -t drtan/mongodb .

docker run --name my-mongodb -p 27017:27017 -d drtan/mongodb

## Connection String mongo

mongodb://localhost:27017

## Mongo cmd

docker exec -it my-mongodb mongo admin

> show dbs

# clear tcontainer

docker rm -f my-mongodb

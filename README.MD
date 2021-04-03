################################
docker build -t drtan/mongodb .

docker run --name my-mongodb -p 27018:27017 -d drtan/mongodb

docker exec -it my-mongodb sh

docker exec -it my-mongodb24 mongo admin

## Mongo shell Command

show dbs

## Connection String mongo Compass

mongodb://localhost:27017

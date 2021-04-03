## Docker Run

mkdir data
docker run --name my-mongo -d -p 27018:27017 -v ./data:/data/db mongo

## Mongo shell Command

docker exec -it my-mongo mongo admin
show dbs

## Connection String mongo Compass

mongodb://localhost:27018

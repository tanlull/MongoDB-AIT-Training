mongoimport --db company --collection customers --file ./customers.json --jsonArray && \
mongoimport --db company --collection sales --file ./sales.json --jsonArray && \
mongoimport --db company --collection products --file ./products.json --jsonArray
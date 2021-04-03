FROM mongo
WORKDIR /data
COPY ./data .
#RUN ./import.sh
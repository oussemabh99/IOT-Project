FROM python:3.12.9
RUN WORKDIR /app/
ENV BROKER_HOSTNAME 
ENV BROKER_PORT  
ENV TOPIC_NAME
ADD . .
RUN pip3 install -r requiment.txt
ENTRYPOINT ["python3","subscriber.py"]


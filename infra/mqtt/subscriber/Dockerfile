FROM python
RUN WORKDIR /app/
ENV BROKER_HOSTNAME 
ENV PORT  
ENV TOPIC_NAME
ADD . .
RUN pip3 install -r requiment.txt
ENTRYPOINT ["python3","subscriber.py","$BROKER_HOSTNAME","$PORT","$TOPIC_NAME"]


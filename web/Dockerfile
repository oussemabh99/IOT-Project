FROM python:3.12.9
WORKDIR /app/
ADD requiments.txt .
RUN pip install -r requiments.txt
ADD ./src .
ENTRYPOINT ["python3","app.py"]

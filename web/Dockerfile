FROM python:latest
WORKDIR /app/
ADD . .
RUN pip3 install flask pytest
ENTRYPOINT ["flask","--app","app.py","run","--debug","--host=0.0.0.0"]

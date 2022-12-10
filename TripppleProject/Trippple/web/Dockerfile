FROM python:3.8
ENV PYTHONUNBUFFERED 1
RUN mkdir /web_django
WORKDIR /web_django




RUN pip install --upgrade pip
RUN pip install django
RUN pip install djangorestframework
RUN pip install Pillow
RUN pip install django-cors-headers
RUN pip install djangorestframework-jwt
RUN pip install djangorestframework-simplejwt


RUN pip install mysqlclient  
RUN pip install django-mysql


ADD . /web_django/
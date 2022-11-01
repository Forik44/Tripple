import jwt
from django.contrib.auth import user_logged_in
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Product
from .serializers import ProductSerializer

# Create your views here.


@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]
    return Response(routes)

from django.http import JsonResponse

@api_view(['GET'])
def getProducts(request):
    limit = int(request.query_params.get('_limit'))
    page = int(request.query_params.get('_page'))
    products = Product.objects.all()[(page-1)*limit:page*limit]
    serializer = ProductSerializer(products, many=True)
    responce = Response(serializer.data)
    responce["x-total-count"] = len(Product.objects.all())
    return responce

@api_view(['GET'])
def getProduct(request, pk):
    products = Product.objects.get(id=pk)
    serializer = ProductSerializer(products, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getCategory(request, pk):
    limit = int(request.query_params.get('_limit'))
    page = int(request.query_params.get('_page'))
    products = Product.objects.filter(category_id=pk)[(page - 1) * limit:page * limit]
    serializer = ProductSerializer(products, many=True)
    responce = Response(serializer.data, headers={"x-total-count": len(Product.objects.filter(category_id=pk))})
    return responce

from django.contrib.auth.models import User
from .models import CustomUser
from Trippple import settings
from rest_framework_jwt.utils import jwt_payload_handler

@api_view(['POST'])
def login_user(request):
    email = request.data['email']
    password = request.data['password']
    user = User.objects.filter(email=email, password=password)
    if not user:
        return Response("Takogo usera net", status=status.HTTP_400_BAD_REQUEST)
    customUser =CustomUser.objects.get(user=user.id)
    token = customUser.JWT
    user_details = {}
    user_details['name'] = "%s %s" % (user.first_name, user.last_name)
    user_details['token'] = token
    user_logged_in.send(sender=user.__class__, request=request, user=user)

    return Response(user_details, status=status.HTTP_200_OK)



@api_view(['POST'])
def register_user(request):
    email = request.data['email']
    password = request.data['password']
    name = request.data['name']
    surname = request.data['surname']
    phone = request.data['phone']
    user = User.objects.filter(email=email)
    if not user:
        User.objects.create(username=email, email=email, password=password, first_name=name, last_name=surname)
        user = User.objects.get(email=email)
        payload = jwt_payload_handler(user)
        token = jwt.encode(payload, settings.SECRET_KEY)
        CustomUser.objects.create(user=user, JWT=token, phone=phone)
        user_details = {}
        user_details['name'] = "%s %s" % (user.first_name, user.last_name)
        user_details['token'] = token
        return Response(user_details, status=status.HTTP_200_OK)
    else:
        return Response("User yze yest", status=status.HTTP_400_BAD_REQUEST)

    return Response(status=status.HTTP_200_OK)

@api_view(['POST'])
def getUser(request):
    #token = request.headers["token"]
    token = request.data["token"]
    user = CustomUser.objects.filter(JWT=token)
    if user:
        user = CustomUser.objects.get(JWT=token)
        user_details = {}
        user_details['name'] = "%s %s" % (user.user.first_name, user.user.last_name)
        user_details['id'] = user.user.id
        return Response(user_details, status=status.HTTP_200_OK)
    else:
        return Response("JWT is not valide", status=status.HTTP_400_BAD_REQUEST)

    return Response(status=status.HTTP_200_OK)
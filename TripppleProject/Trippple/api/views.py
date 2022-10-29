from django.shortcuts import render
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
    responce["x-total-count"] = len(products)
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
    responce = Response(serializer.data)
    responce["x-total-count"] = len(products)
    return responce
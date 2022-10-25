from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import CPU, GPU
from .serializers import CPUSerializer, GPUSerializer

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

@api_view(['GET'])
def getCategoryItem(request, category_id, pk):

    if(category_id == "1"):
        products = CPU.objects.get(id=pk)
        serializer = CPUSerializer(products, many=False)
        return Response(serializer.data)

    if (category_id == "2"):
        products = GPU.objects.get(id=pk)
        serializer = GPUSerializer(products, many=False)
        return Response(serializer.data)

    return Response()
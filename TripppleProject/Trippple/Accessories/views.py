from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import CPU, GPU, Motherboard, Socket, RAM
from .serializers import CPUSerializer, GPUSerializer, MBSerializer, RAMSerializer

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
        Res = serializer.data
        Res['socket'] = {
                'value': products.socket_id.title,
                'verbose_name': 'Сокет',
        }
        Res['RAMtype'] = {
            'value': products.RAMtype.title,
            'verbose_name': 'Тип оперативной памяти',
        }
        return Response(Res)

    if (category_id == "2"):
        products = GPU.objects.get(id=pk)
        serializer = GPUSerializer(products, many=False)
        Res = serializer.data
        Res['typememory'] = {
            'value': products.typememory_id.title,
            'verbose_name': 'Тип видеопамяти',
        }
        Res['connectiontype'] = {
            'value': products.connectiontype.title,
            'verbose_name': 'Интерфейс подключения',
        }
        return Response(Res)

    if (category_id == "3"):
        products = Motherboard.objects.get(id=pk)
        serializer = MBSerializer(products, many=False)
        Res = serializer.data
        Res['socket'] = {
            'value': products.socket_id.title,
            'verbose_name': 'Сокет',
        }
        Res['chipset'] = {
            'value': products.chipset_id.title,
            'verbose_name': 'Чипсет',
        }
        Res['RAMtype'] = {
            'value': products.RAMtype.title,
            'verbose_name': 'Тип оперативной памяти',
        }
        Res['connectiontype'] = {
            'value': products.connectiontype.title,
            'verbose_name': 'Интерфейс подключения видеокарты',
        }
        return Response(Res)

    if (category_id == "4"):
        products = RAM.objects.get(id=pk)
        serializer = RAMSerializer(products, many=False)
        Res = serializer.data

        Res['RAMtype'] = {
            'value': products.RAMtype.title,
            'verbose_name': 'Тип оперативной памяти',
        }
        return Response(Res)

    return Response()
from django.shortcuts import render
from django.http import HttpResponse

from .models import Shop


def index(request):
    shop = Shop.objects.all()
    return render(request, 'shop/index.html', {'shop':shop, 'title':'Список товаров'})

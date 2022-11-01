from rest_framework.serializers import ModelSerializer
from .models import Product

from rest_framework import serializers
from django.contrib.auth.models import User


class CurrentUserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'password')

class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


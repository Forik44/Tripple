from rest_framework.serializers import ModelSerializer
from .models import Product, CustomUser

class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class UserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'

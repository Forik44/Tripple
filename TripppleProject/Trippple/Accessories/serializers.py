from rest_framework.serializers import ModelSerializer
from .models import CPU, GPU

class CPUSerializer(ModelSerializer):
    class Meta:
        model = CPU
        fields = '__all__'

class GPUSerializer(ModelSerializer):
    class Meta:
        model = GPU
        fields = '__all__'
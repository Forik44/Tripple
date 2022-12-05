from rest_framework.serializers import ModelSerializer
from .models import CPU, GPU, Motherboard, RAM, Memory, SSDMemory, PS
from rest_framework import serializers
from rest_framework.relations import PKOnlyObject

class CPUSerializer(ModelSerializer):
    def to_representation(self, instance):
        ret = {}
        fields = self._readable_fields

        for field in fields:
            try:
                attribute = field.get_attribute(instance)
            except SkipField:
                continue

            check_for_none = attribute.pk if isinstance(attribute, PKOnlyObject) else attribute
            if check_for_none is None:
                value = None
            else:
                value = field.to_representation(attribute)

            ret[field.field_name] = {
                'value': value,
                'verbose_name': field.label,
            }

        return ret

    class Meta:
        model = CPU
        fields = ['manufacturer','CPUmodel','basefrequency','RAMmax', 'RAMcount','CoresCount','TPD','is_graphic']

class GPUSerializer(ModelSerializer):
    def to_representation(self, instance):
        ret = {}
        fields = self._readable_fields

        for field in fields:
            try:
                attribute = field.get_attribute(instance)
            except SkipField:
                continue

            check_for_none = attribute.pk if isinstance(attribute, PKOnlyObject) else attribute
            if check_for_none is None:
                value = None
            else:
                value = field.to_representation(attribute)

            ret[field.field_name] = {
                'value': value,
                'verbose_name': field.label,
            }

        return ret

    class Meta:
        model = GPU
        fields = ['manufacturer','GPUmodel','amountvideomemory','buswidth']


class MBSerializer(ModelSerializer):
    def to_representation(self, instance):
        ret = {}
        fields = self._readable_fields

        for field in fields:
            try:
                attribute = field.get_attribute(instance)
            except SkipField:
                continue

            check_for_none = attribute.pk if isinstance(attribute, PKOnlyObject) else attribute
            if check_for_none is None:
                value = None
            else:
                value = field.to_representation(attribute)

            ret[field.field_name] = {
                'value': value,
                'verbose_name': field.label,
            }

        return ret

    class Meta:
        model = Motherboard
        fields = ['manufacturer','MBmodel','countslotsRAM','maxAmountRAM', 'is_SSD']

class RAMSerializer(ModelSerializer):
    def to_representation(self, instance):
        ret = {}
        fields = self._readable_fields

        for field in fields:
            try:
                attribute = field.get_attribute(instance)
            except SkipField:
                continue

            check_for_none = attribute.pk if isinstance(attribute, PKOnlyObject) else attribute
            if check_for_none is None:
                value = None
            else:
                value = field.to_representation(attribute)

            ret[field.field_name] = {
                'value': value,
                'verbose_name': field.label,
            }

        return ret

    class Meta:
        model = RAM
        fields = ['manufacturer','RAMmodel','countRAM','frequency']

class MemorySerializer(ModelSerializer):
    def to_representation(self, instance):
        ret = {}
        fields = self._readable_fields

        for field in fields:
            try:
                attribute = field.get_attribute(instance)
            except SkipField:
                continue

            check_for_none = attribute.pk if isinstance(attribute, PKOnlyObject) else attribute
            if check_for_none is None:
                value = None
            else:
                value = field.to_representation(attribute)

            ret[field.field_name] = {
                'value': value,
                'verbose_name': field.label,
            }

        return ret

    class Meta:
        model = Memory
        fields = ['manufacturer','MEMmodel','countMEM','speedMEM']

class SSDMemorySerializer(ModelSerializer):
    def to_representation(self, instance):
        ret = {}
        fields = self._readable_fields

        for field in fields:
            try:
                attribute = field.get_attribute(instance)
            except SkipField:
                continue

            check_for_none = attribute.pk if isinstance(attribute, PKOnlyObject) else attribute
            if check_for_none is None:
                value = None
            else:
                value = field.to_representation(attribute)

            ret[field.field_name] = {
                'value': value,
                'verbose_name': field.label,
            }

        return ret

    class Meta:
        model = SSDMemory
        fields = ['manufacturer','MEMmodel','countMEM','speedMEMRead','speedMEMWrite']

class PSSerializer(ModelSerializer):
    def to_representation(self, instance):
        ret = {}
        fields = self._readable_fields

        for field in fields:
            try:
                attribute = field.get_attribute(instance)
            except SkipField:
                continue

            check_for_none = attribute.pk if isinstance(attribute, PKOnlyObject) else attribute
            if check_for_none is None:
                value = None
            else:
                value = field.to_representation(attribute)

            ret[field.field_name] = {
                'value': value,
                'verbose_name': field.label,
            }

        return ret

    class Meta:
        model = PS
        fields = ['manufacturer','PSmodel','power']
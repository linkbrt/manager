from rest_framework import serializers

from .models import Toy, Shop


class ToySerializer(serializers.ModelSerializer):
    class Meta:
        model = Toy
        fields = '__all__'


class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = '__all__'

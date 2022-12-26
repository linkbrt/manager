from django.shortcuts import render, get_object_or_404
from rest_framework import mixins, viewsets, response, filters
from rest_framework.decorators import action
# from django_filters.rest_framework import DjangoFilterBackend

from .models import Toy, Shop
from .serializers import ToySerializer, ShopSerializer


class ToyViewSet(viewsets.ModelViewSet):
    queryset = Toy.objects.all()
    serializer_class = ToySerializer
    filter_backends = [filters.OrderingFilter, filters.SearchFilter]
    ordering_fields = ['title', 'price', 'amount', 'age']
    search_fields = ['title', 'price', 'amount', 'age']


class ShopViewSet(viewsets.ModelViewSet):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer

    @action(detail=True)
    def toys(self, request, pk):
        shop = get_object_or_404(Shop, pk=pk)

        toys = shop.toys.all()
        return response.Response([toy.to_dict() for toy in toys])


def index(request):
    return render(request, 'index.html')

from rest_framework import routers
from django.urls import path
from .views import ToyViewSet, ShopViewSet, index


router = routers.SimpleRouter()


router.register('shops', ShopViewSet)
router.register('toys', ToyViewSet)

urlpatterns = [
    path('', index)
] + router.urls
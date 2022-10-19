from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('shop/', views.getProducts, name="products"),
    path('shop/<str:pk>/', views.getProduct, name="product"),
]
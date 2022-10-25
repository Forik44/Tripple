from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('<str:category_id>/<str:pk>', views.getCategoryItem, name="CategoryItems"),
]
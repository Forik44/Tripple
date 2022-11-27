from django.urls import path
from . import views
from rest_framework_simplejwt import views as jwt_views
from rest_framework_simplejwt.views import TokenVerifyView

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('shop/', views.getProducts, name="products"),
    path('shop/<str:pk>/', views.getProduct, name="product"),
    path('shop/category/<str:pk>/', views.getCategory, name="product"),
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('login', views.login_user, name="login"),
    path('register', views.register_user, name="login"),
    path('check_token', views.getUser, name="GetUser"),
    path('addtobucket', views.addBucket, name="GetUser"),
    path('deletefrombucket', views.deleteBucket, name="GetUser"),
    path('changeamountbucket', views.changeAmountBucket, name="GetUser")
]
from authen.views import UserAPI, UserLoginAPI, UserInfo, UserDeleteAPI, UsersInfo
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("register", UserAPI.as_view()),
    path("login", UserLoginAPI.as_view()),
    path("refresh-token", TokenRefreshView.as_view()),
    path("user-info", UserInfo.as_view()),
    path("user", UserDeleteAPI.as_view()),
    path("users", UsersInfo.as_view()),
]
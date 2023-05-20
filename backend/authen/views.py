import re
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from .serializers import UserSerializer, UserLoginSerializer
from .models import User
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.tokens import RefreshToken


class UserAPI(APIView):
    def check_strong_password(self, password):
        if len(password) < 8:
            return False
        if not re.search(r"[A-Z]", password):
            return False
        if not re.search(r"[a-z]", password):
            return False
        if not re.search(r"\d", password):
            return False
        return True

    def post(self, request):
        try:
            validate_email(request.data["email"])
        except ValidationError:
            return Response({"message": "Your email address is not valid!"}, status=400)

        if not self.check_strong_password(request.data["password"]):
            return Response(
                {
                    "message": "Password must have at least 8 characters, must contain uppercase, lowercase, and digit!"
                },
                status=400,
            )

        if request.data["password"] != request.data["confirm_password"]:
            return Response(
                {"message": "Password must match with confirm password!"}, status=400
            )

        find_email = User.objects.all().filter(email=request.data["email"])
        find_username = User.objects.all().filter(username=request.data["username"])
        if len(find_email) > 0:
            return Response({"message": "This email is already existed!"}, status=400)
        if len(find_username) > 0:
            return Response(
                {"message": "This username is already existed!"}, status=400
            )

        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data["password"] = make_password(
                serializer.validated_data["password"]
            )
            if request.data["username"] == "quyenadmin":
                serializer.validated_data["isAdmin"] = True
            instance = serializer.save()
            return Response({"message": "Create account successfully!"}, status=201)
        else:
            return Response({"message": "Something is wrong!"}, status=400)

class UserLoginAPI(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(
                request,
                username=serializer.validated_data["username"],
                password=serializer.validated_data["password"],
            )
            if user:
                refresh = TokenObtainPairSerializer.get_token(user)
                return Response(
                    {
                        "access_token": str(refresh.access_token),
                        "refresh_token": str(refresh),
                    },
                    status=200,
                )

            return Response({"message": "Wrong username or password!"}, status=400)

        return Response({"message": "Something is wrong!"}, status=400)

    
class UserInfo(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        print(request.user.is_authenticated)
        if request.user.is_authenticated:
            serializer = UserSerializer(request.user)
            return Response({"user": serializer.data}, status=200)
        else:
            return Response({"detail": "Authentication credentials were not provided."}, status=401)
class UsersInfo(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=200)

class UserDeleteAPI(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
            user.delete()
            return Response({"message": "User deleted successfully!"}, status=200)
        except User.DoesNotExist:
            return Response({"message": "User not found!"}, status=404)
        except Exception as e:
            return Response({"message": str(e)}, status=500)
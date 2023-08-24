from user.serializers import UserSerializer
from .models import App_user
from django.contrib.auth import authenticate
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
    HTTP_403_FORBIDDEN,
    HTTP_404_NOT_FOUND,
)


# Create your views here.
class Log_in(APIView):
    def post(self, request):
        request.data["username"] = request.data["email"]
        user = authenticate(**request.data)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"user": UserSerializer(user).data, "token": token.key})
        else:
            return Response("Something went wrong", status=HTTP_400_BAD_REQUEST)


class Register(APIView):
    def post(self, request):
        request.data["username"] = request.data["email"]
        if App_user.objects.filter(email=request.data["email"]).count() > 0:
            return Response("User already exists.", status=HTTP_403_FORBIDDEN)
        user = App_user.objects.create_user(**request.data)
        token = Token.objects.create(user=user)
        return Response(
            {"user": UserSerializer(user).data, "token": token.key},
            status=HTTP_201_CREATED,
        )


class Info(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)


class Log_out(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=HTTP_204_NO_CONTENT)


class Update(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        profile_pic = request.FILES.get("profile_pic")  # Extract the uploaded image
        first_name = request.data.get("first_name")
        last_name = request.data.get("last_name")
        display_name = request.data.get("display_name")

        try:
            user_profile = App_user.objects.get(user=request.user)
        except ObjectDoesNotExist:
            return Response({"message": "User not found"}, status=HTTP_404_NOT_FOUND)
        user_profile.profile_pic = profile_pic
        user_profile.first_name = first_name
        user_profile.last_name = last_name
        user_profile.display_name = display_name
        user_profile.save()

        return Response({"message": "Profile updated successfully"})

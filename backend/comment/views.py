from django.shortcuts import render
from .models import Comment
from user.models import App_user
from .serializers import CommentSerializer, PostSerializer
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
    HTTP_403_FORBIDDEN,
    HTTP_404_NOT_FOUND,
)


# Create your views here.
class Single_comment(APIView):
    def get(self, request, toilet_id):
        comments = Comment.objects.filter(toilet=toilet_id)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=HTTP_200_OK)


class CommentDetailView(APIView):
    def delete(self, request, comment_id):
        try:
            comment = Comment.objects.get(id=comment_id)
        except Comment.DoesNotExist:
            return Response(status=HTTP_404_NOT_FOUND)

        if comment.user != request.user:
            return Response(status=HTTP_403_FORBIDDEN)

        comment.delete()
        return Response(status=HTTP_204_NO_CONTENT)


class All_comments(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, toilet_id):
        comment_data = {
            "commentText": request.data.get("commentText"),
            "user": request.user.id,  # Assuming authenticated users
            "toilet": toilet_id,
        }
        serializer = PostSerializer(data=comment_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

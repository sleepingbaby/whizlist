from .models import Comment
from rest_framework import serializers
from user.serializers import UserSerializer


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Comment
        fields = ["id", "commentText", "user", "toilet", "created_at"]


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["id", "commentText", "user", "toilet"]

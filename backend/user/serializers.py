from .models import App_user
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = App_user
        fields = "__all__"

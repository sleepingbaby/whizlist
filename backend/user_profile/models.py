from django.db import models
from user.models import App_user


# Create your models here.
class User_profile(models.model):
    first_name = models.CharField()
    last_name = models.CharField()
    user = models.OneToOneField(App_user, on_delete=models.CASCADE)

    def __str__(self):
        return f"User: {self.user.username} Name: {self.first_name + self.last_name}"

from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class App_user(AbstractUser):
    email = models.EmailField(unique=True)
    USERNAME_FIELD = "email"
    display_name = models.CharField(unique=True)
    first_name = models.CharField()
    last_name = models.CharField()
    profile_pic = models.ImageField(upload_to="profile_pics/", null=True, blank=True)
    REQUIRED_FIELDS = []

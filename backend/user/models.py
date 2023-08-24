from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class App_user(AbstractUser):
    email = models.EmailField(unique=True)
    USERNAME_FIELD = "email"
    display_name = models.CharField(max_length=255, unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    profile_pic = models.ImageField(upload_to="profile_pics/", null=True, blank=True)
    REQUIRED_FIELDS = []

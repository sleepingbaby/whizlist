from django.db import models
from django.utils import timezone
from user.models import App_user


# Create your models here.
class Comment(models.Model):
    commentText = models.TextField()
    user = models.ForeignKey(App_user, on_delete=models.CASCADE)
    toilet = models.IntegerField()
    created_at = models.DateTimeField(default=timezone.now)

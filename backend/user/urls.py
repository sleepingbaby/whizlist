from django.urls import path
from .views import Log_in, Log_out, Register, Info, Update
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("", Info.as_view()),
    path("register/", Register.as_view()),
    path("logout/", Log_out.as_view()),
    path("login/", Log_in.as_view()),
    path("update-profile/", Update.as_view()),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

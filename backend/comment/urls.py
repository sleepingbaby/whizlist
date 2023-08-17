from django.urls import path
from .views import All_comments, Single_comment, CommentDetailView

urlpatterns = [
    path("<int:toilet_id>/", All_comments.as_view()),
    path("toilet/<int:toilet_id>/", Single_comment.as_view()),
    path("delete/<int:comment_id>/", CommentDetailView.as_view()),
]

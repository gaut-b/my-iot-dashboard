from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_simplejwt.views import TokenRefreshView

from api import views

urlpatterns = [
    path('signup/', views.SignUpView.as_view(), name='sign_up'),
    path('login/', views.LogInView.as_view(), name='log_in'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('users/', views.UserList.as_view()),
    path('data/', views.DataList.as_view()),
    path('devices/', views.DeviceList.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)

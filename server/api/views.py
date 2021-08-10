from django.contrib.auth import get_user_model
from api.models import Device, Data, Parser
from api.serializers import DataSerializer, DeviceSerializer, LogInSerializer, UserSerializer, NestedUserSerializer, ParserSerializer
from rest_framework import generics, permissions
from rest_framework_simplejwt.views import TokenObtainPairView


class UserList(generics.ListAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = NestedUserSerializer
    permission_classes = [permissions.IsAuthenticated, ]

    class Meta:
        ordering = ['-id']


class ParserList(generics.ListCreateAPIView):
    queryset = Parser.objects.all()
    serializer_class = ParserSerializer
    permission_classes = [permissions.IsAuthenticated, ]

class DataList(generics.ListCreateAPIView):
    queryset = Data.objects.all()
    serializer_class = DataSerializer
    permission_classes = [permissions.IsAuthenticated, ]


class DeviceList(generics.ListCreateAPIView):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer
    permission_classes = [permissions.IsAuthenticated, ]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class SignUpView(generics.CreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer


class LogInView(TokenObtainPairView):
    serializer_class = LogInSerializer

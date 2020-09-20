from rest_framework import serializers
from api.models import Device, Data
from django.contrib.auth.models import User


class DeviceSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Device
        fields = ['model', 'deviceId', 'firmware', 'owner']


class DataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Data
        fields = ['deviceId', 'rawData', 'temp', 'pressure', 'humidity', 'luminosity', 'batteryLevel']
        extra_kwargs = {
            'temp': {'read_only': True},
            'pressure': {'read_only': True},
            'luminosity': {'read_only': True},
            'humidity': {'read_only': True},
            'batteryLevel': {'read_only': True}
        }


class UserSerializer(serializers.ModelSerializer):
    devices = serializers.PrimaryKeyRelatedField(many=True, queryset=Device.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username', 'devices']

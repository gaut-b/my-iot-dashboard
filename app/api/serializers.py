from rest_framework import serializers
from api.models import Device, Data
from django.contrib.auth.models import User
import datetime


class DeviceSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Device
        fields = ['model', 'deviceId', 'firmware', 'owner']


class DataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Data
        fields = ['deviceId', 'rawData', 'time', 'temp', 'pressure', 'humidity', 'luminosity', 'batteryLevel']
        read_only_fields = ['temp', 'pressure', 'humidity', 'luminosity', 'batteryLevel']

    def to_internal_value(self, data):
        # Convert the time send by SIGFOX (epoch) into a right format for DateTimeFied
        copiedData = data.copy()
        copiedData['time'] = datetime.datetime.utcfromtimestamp(int(copiedData['time'])).isoformat()
        return super(DataSerializer, self).to_internal_value(copiedData)


class UserSerializer(serializers.ModelSerializer):
    devices = serializers.PrimaryKeyRelatedField(many=True, queryset=Device.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username', 'devices']

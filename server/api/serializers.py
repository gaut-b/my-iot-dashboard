from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from api.models import Device, Data, Parser

import datetime


class DeviceSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = Device
        fields = ['model', 'deviceId', 'firmware', 'owner']

class ParserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parser
        fields = '__all__'

        
class DataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Data
        fields = ['deviceId', 'rawData', 'time', 'data' ]
        # read_only_fields = ['temp', 'pressure', 'humidity', 'luminosity', 'batteryLevel']

    def to_internal_value(self, data):
        # Convert the time send by SIGFOX (epoch) into a right format for DateTimeFied
        copiedData = data.copy()
        copiedData['time'] = datetime.datetime.utcfromtimestamp(int(copiedData['time'])).isoformat()
        return super(DataSerializer, self).to_internal_value(copiedData)


class UserSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError('Passwords must match')
        return data

    def create(self, validated_data):
        data = {
            key: value for key, value in validated_data.items() if key not in ('password1', 'password2')
        }
        data['password'] = validated_data['password1']
        user = self.Meta.model.objects.create_user(**data)
        user.save()
        return user

    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'email', 'password1', 'password2', 'first_name', 'last_name',]
        read_only_fields = ('id',)


class NestedUserSerializer(serializers.ModelSerializer):
    devices = serializers.PrimaryKeyRelatedField(many=True, queryset=Device.objects.all())

    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'devices']
        depth = 1


class LogInSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        user_data = UserSerializer(user).data
        for key, value in user_data.items():
            if key != 'id':
                token[key] = value
        return token

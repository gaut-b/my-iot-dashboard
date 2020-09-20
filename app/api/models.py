from django.db import models
from api.utils.utils import parser


class Device(models.Model):
    model = models.CharField(max_length=20, blank=False, null=False)
    deviceId = models.CharField(max_length=10, blank=False, null=False, unique=True)
    firmware = models.CharField(max_length=10, blank=False, null=False)
    owner = models.ForeignKey('auth.User', related_name='devices', on_delete=models.CASCADE)

    def __str__(self):
        return self.deviceId


class Data(models.Model):
    deviceId = models.ForeignKey('Device', to_field='deviceId', on_delete=models.CASCADE)
    rawData = models.CharField(max_length=24, blank=False, null=False)
    temp = models.DecimalField(max_digits=4, decimal_places=2, default=0)
    humidity = models.PositiveSmallIntegerField(default=0)
    pressure = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    luminosity = models.PositiveSmallIntegerField(default=0)
    batteryLevel = models.PositiveSmallIntegerField(default=0)

    def save(self, *args, **kwargs):
        """
        Use the parser utility functions in utils to decode the payload
        """

        firmware = Device.objects.get(deviceId=self.deviceId).firmware
        parsedData = parser(self.rawData, firmware)
        self.temp = parsedData['temp']
        self.humidity = parsedData['humidity']
        self.pressure = parsedData['pressure']
        self.luminosity = parsedData['luminosity']
        self.batteryLevel = parsedData['batteryLevel']
        # for key, value in parsedData.items():
        # 	print(type(key))
        # 	print(self.__dict__[key])

        super(Data, self).save(*args, **kwargs)

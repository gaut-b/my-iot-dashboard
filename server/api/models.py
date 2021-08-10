from django.contrib.auth.models import AbstractUser
#from django.db import models
from djongo import models
from django.conf import settings
from django.utils.timezone import now
# from api.utils.utils import parser

import django.db.models.options as options

options.DEFAULT_NAMES = options.DEFAULT_NAMES + ('in_db',)

class User(AbstractUser):
    pass

class Device(models.Model):
    class Meta:
        in_db = 'data'
        # abstract = True

    model = models.CharField(max_length=20, blank=False, null=False)
    deviceId = models.CharField(max_length=10, blank=False, null=False, unique=True)
    firmware = models.CharField(max_length=10, blank=False, null=False)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='devices', on_delete=models.CASCADE)

    def __str__(self):
        return self.deviceId

    def save(self, *args, **kwargs):
        super(Device, self).save(*args, **kwargs)

class Parser(models.Model):
    class Meta:
        in_db = 'data'

    deviceId = models.ForeignKey('Device', to_field='deviceId', on_delete=models.CASCADE)
    parser = models.TextField()

    # def __str__(self):
    #     return self.parser

class Data(models.Model):
    class Meta:
        in_db = 'data'

    deviceId = models.ForeignKey('Device', to_field='deviceId', on_delete=models.CASCADE)
    rawData = models.CharField(max_length=24, blank=False, null=False)
    data = models.JSONField(null=True)

    time = models.DateTimeField(null=False, default=now)

    def save(self, *args, **kwargs):
        """
        Use the parser utility functions in utils to decode the payload
        VERY DANGEROUS AS IS
        TODO: Find a way to encapsulate the execution or find another implementation
        """
        ParserObject = Parser.objects.filter(deviceId=self.deviceId).first()
        if ParserObject is not None:
            textParser = ParserObject.parser
            exec(textParser, globals())
            parsedData = parser(self.rawData)
            self.data=parsedData
        else: 
            self.data={}

        super(Data, self).save(*args, **kwargs)

import channels.layers
from asgiref.sync import async_to_sync

from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Data


@receiver(post_save, sender=Data, dispatch_uid='update_data_listeners')
def update_data_listeners(sender, instance, **kwargs):

    message = {}

    for field in instance._meta.get_fields():
        if (field.name == 'time'):
            # Set time string to isoformat to match the data coming directly from DB
            field_value = getattr(instance, field.name).isoformat().replace('+00:00', 'Z')
        else:
            field_value = str(getattr(instance, field.name))

        message[field.name] = field_value

    channel_layer = channels.layers.get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        str(instance.deviceId),
        {
            'type': 'notification_message',
            'message': message
        }
    )

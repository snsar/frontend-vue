from django.db import models
from authen.models import User 
from django.utils import timezone


class Destination(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=3, null=True)
    image = models.ImageField(upload_to="destinations/", null=True)

    def __str__(self):
        return self.name


class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE, default=1)
    comment = models.TextField()
    rating = models.PositiveIntegerField()
    time_commented = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.comment


class Tour(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE, default=1)

    def __str__(self):
        return self.destination.name

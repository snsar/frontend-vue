from rest_framework import serializers
from .models import Destination, Tour, Review
from authen.models import User
from authen.serializers import UserSerializer

class DestinationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destination
        fields = ['id', 'name', 'address', 'description', 'price', 'image']

class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    destination = DestinationSerializer()

    class Meta:
        model = Review
        fields = ['id', 'user', 'destination', 'comment', 'rating', 'timeCommented']

class TourSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField()
    destination_id = serializers.IntegerField()

    class Meta:
        model = Tour
        fields = ['id', 'user_id', 'destination_id']
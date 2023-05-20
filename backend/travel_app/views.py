from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import Review, Tour, Destination
from .serializers import ReviewSerializer, TourSerializer, DestinationSerializer
from rest_framework import status

class ReviewAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        review_id = kwargs.get('pk')
        if review_id:
            try:
                review = Review.objects.get(id=review_id)
                serializer = ReviewSerializer(review)
                return Response(serializer.data)
            except Review.DoesNotExist:
                return Response({"message": "Review not found"}, status=404)
        else:
            reviews = Review.objects.all()
            serializer = ReviewSerializer(reviews, many=True)
            return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def delete(self, request, *args, **kwargs):
        review_id = kwargs.get('pk')
        try:
            review = Review.objects.get(id=review_id)
            review.delete()
            return Response(status=204)
        except Review.DoesNotExist:
            return Response({"message": "Review not found"}, status=404)


class TourAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        tour_id = kwargs.get('pk')

        if tour_id:
            try:
                tour = Tour.objects.get(id=tour_id)
                serializer = TourSerializer(tour)
                return Response(serializer.data)
            except Tour.DoesNotExist:
                return Response({"message": "Tour not found"}, status=404)

        tours = Tour.objects.all()
        serializer = TourSerializer(tours, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = TourSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def delete(self, request, *args, **kwargs):
        tour_id = kwargs.get('pk')
        try:
            tour = Tour.objects.get(id=tour_id)
            tour.delete()
            return Response({"message": "Deleted"}, status=204)
        except Tour.DoesNotExist:
            return Response({"message": "Tour not found"}, status=404)

class DestinationAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        destination_id = kwargs.get('pk')

        if destination_id:
            try:
                destination = Destination.objects.get(id=destination_id)
                serializer = DestinationSerializer(destination)
                return Response(serializer.data)
            except Destination.DoesNotExist:
                return Response({"message": "Destination not found"}, status=404)
        else:
            destinations = Destination.objects.all()
            serializer = DestinationSerializer(destinations, many=True)
            return Response(serializer.data)

    
    def post(self, request, *args, **kwargs):
        serializer = DestinationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            errors = serializer.errors
            return Response({"errors": errors}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        destination_id = kwargs.get('pk')

        try:
            destination = Destination.objects.get(id=destination_id)
            serializer = DestinationSerializer(destination, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=400)
        except Destination.DoesNotExist:
            return Response({"message": "Destination not found"}, status=404)

    def delete(self, request, *args, **kwargs):
        destination_id = kwargs.get('pk')

        try:
            destination = Destination.objects.get(id=destination_id)
            destination.delete()
            return Response({"message": "Destination deleted successfully"})
        except Destination.DoesNotExist:
            return Response({"message": "Destination not found"}, status=404)



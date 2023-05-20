from django.urls import path
from .views import ReviewAPIView, TourAPIView, DestinationAPIView

urlpatterns = [
    path('reviews/', ReviewAPIView.as_view(), name='review_api'),
    path('reviews/<int:pk>/', ReviewAPIView.as_view(), name='review_detail_api'),
    path('tours/', TourAPIView.as_view(), name='tour_api'),
    path('tours/<int:pk>/', TourAPIView.as_view(), name='tour_detail_api'),
    path('destinations/', DestinationAPIView.as_view(), name='destination_api'),
    path('destination/<int:pk>/', DestinationAPIView.as_view(), name='destination_detail_api'),
]
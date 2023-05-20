import instance from "../axios";

// Gọi API lấy danh sách các review
function getReviewsAPI(access_token) {
  return instance.get(`travel/reviews/`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
}

// Gọi API lấy thông tin của một review cụ thể theo ID
function getReviewAPI(access_token, reviewId) {
  return instance.get(`travel/reviews/${reviewId}/`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
}

// Gọi API tạo mới một review
function createReviewAPI(access_token, reviewData) {
  return instance.post(`travel/reviews/`, reviewData, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
}

// Gọi API xóa một review theo ID
function deleteReviewAPI(access_token, reviewId) {
  return instance.delete(`travel/reviews/${reviewId}/`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
}

// Gọi API lấy danh sách các tour
function getToursAPI(access_token) {
  return instance.get(`travel/tours/`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
}

// Gọi API lấy thông tin của một tour cụ thể theo ID
function getTourAPI(access_token, tourId) {
  return instance.get(`travel/tours/${tourId}/`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
}

// Gọi API tạo mới một tour
function createTourAPI(access_token, tourData) {
  return instance.post(`travel/tours/`, tourData, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
}

// Gọi API xóa một tour theo ID
function deleteTourAPI(access_token, tourId) {
  return instance.delete(`travel/tours/${tourId}/`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
}

// Gọi API lấy danh sách các destination
function getDestinationsAPI(access_token) {
  return instance.get(`travel/destinations/`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
}

// Gọi API lấy thông tin của một destination cụ thể theo ID
function getDestinationAPI(access_token, destinationId) {
  return instance.get(`travel/destination/${destinationId}/`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
}

/// Gọi API tạo một destination
function createDestinationAPI(access_token, formData) {
  return instance.post(`travel/destinations/`, formData, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
}

function updateDestinationAPI(access_token, destinationId, formData) {
  return instance.put(`travel/destination/${destinationId}/`, formData, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
}

function deleteDestinationAPI(access_token, destinationId) {
  return instance.delete(`travel/destination/${destinationId}/`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
}
export {
  getReviewsAPI,
  getReviewAPI,
  createReviewAPI,
  deleteReviewAPI,
  getToursAPI,
  getTourAPI,
  createTourAPI,
  deleteTourAPI,
  getDestinationsAPI,
  getDestinationAPI,
  createDestinationAPI,
  updateDestinationAPI,
  deleteDestinationAPI,
};

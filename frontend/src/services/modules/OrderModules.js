import instance from "../axios";
// Function to add a new order
function addOrderAPI(orderRequest) {
  return instance.post(`orders`, orderRequest);
}

// Function to get all orders
function getAllOrdersAPI() {
  return instance.get(`orders`);
}

// Function to get an order by ID
function getOrderByIdAPI(id) {
  return instance.get(`orders/${id}`);
}

// Function to delete an order
function deleteOrderAPI(id) {
  return instance.delete(`orders/${id}`);
}

export { addOrderAPI, getAllOrdersAPI, getOrderByIdAPI, deleteOrderAPI };

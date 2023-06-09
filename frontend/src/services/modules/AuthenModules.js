import instance from "../axios";

function createUserAPI(name, email, password) {
  const data = {
    name: name,
    email: email,
    password: password,
  };

  return instance.post("auth/register", data);
}

function loginAPI(data) {
  return instance.post("auth/login", data);
}

function logoutAPI() {
  return instance.get(`auth/logout`);
}

function getUserAPI(userId) {
  return instance.get(`auth/user_info/${userId}`);
}

// function getUsersAPI() {
//   return instance.get("api/auth/login");
// }

export { createUserAPI, loginAPI, logoutAPI, getUserAPI };

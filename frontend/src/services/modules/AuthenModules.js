import instance from "../axios";

function createUserAPI(
  name,
  address,
  email,
  phone_number,
  username,
  password,
  confirm_password
) {
  const data = {
    name: name,
    address: address,
    email: email,
    phone_number: phone_number,
    username: username,
    password: password,
    confirm_password: confirm_password,
  };

  return instance.post("authen/register", data);
}

function loginAPI(username, password) {
  const data = {
    username: username,
    password: password,
  };

  return instance.post("authen/login", data);
}

function refreshAccessToken(refresh_token) {
  const data = { refresh: refresh_token };

  return instance.post("authen/refresh-token", data);
}

function getUserAPI(access_token) {
  return instance.get("authen/user-info", {
    headers: { Authorization: `Bearer ${access_token}` },
  });
}

function getUsersAPI(access_token) {
  return instance.get("authen/users", {
    headers: { Authorization: `Bearer ${access_token}` },
  });
}

export { createUserAPI, loginAPI, getUserAPI, refreshAccessToken, getUsersAPI };

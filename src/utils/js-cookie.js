/** @format */

import Cookies from "js-cookie";

export function addToken(token, username) {
  Cookies.set("token", token);
  Cookies.set("username", username);
}

export function getToken() {
  return Cookies.get("token");
}

export function getUsername() {
  return Cookies.get("username");
}

export function deleteToken() {
  Cookies.remove("token");
  Cookies.remove("username");
}

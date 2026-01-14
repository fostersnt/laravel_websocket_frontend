import axios from "axios";

export async function login(email, password) {
//   await axios.get("/sanctum/csrf-cookie");
  const response = await axios.post("/login", {
    email,
    password,
  });

  const data = response.data;

console.log(`LOGIN RESPONSE === ${JSON.stringify(data)}`);

  return data;
}

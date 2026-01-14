import Echo from "laravel-echo";
import Pusher from "pusher-js";
import axios from "./api";
import { login } from "./api_requests";
import { PusherDetails } from "../config/pusher";

// await login('fostersnt@gmail.com', 'password');

// window.Pusher = Pusher;

// const echo = new Echo({
//   broadcaster: "pusher",
//   key: PusherDetails.pusherKey,
//   cluster: PusherDetails.pusherCluster,
//   forceTLS: true,
//   authEndpoint: "http://127.0.0.1:8000/broadcasting/auth",
//   auth: {
//     withCredentials: true,
//     headers: {
//       "X-XSRF-TOKEN": decodeURIComponent(
//         document.cookie
//           .split("; ")
//           .find(row => row.startsWith("XSRF-TOKEN"))
//           ?.split("=")[1]
//       )
//     }
//   }
// });

// export default echo;


export function initEcho() {
  return new Echo({
    broadcaster: "pusher",
    key: PusherDetails.pusherKey,
    cluster: PusherDetails.pusherCluster,
    forceTLS: true,
    authEndpoint: "http://127.0.0.1:8000/broadcasting/auth",
    auth: {
      withCredentials: true,
    },
  });
}

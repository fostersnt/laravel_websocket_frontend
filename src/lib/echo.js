import Echo from "laravel-echo";
import Pusher from "pusher-js";
import axios from "./api";
import { login } from "./api_requests";
import { PusherDetails } from "../config/pusher";

export function initEcho(apiToken) {

    return new Echo({
        broadcaster: "pusher",
        key: PusherDetails.pusherKey,
        cluster: PusherDetails.pusherCluster,
        forceTLS: true,
        authEndpoint: "http://localhost:8000/broadcasting/auth",
        auth: {
            headers: {
                Authorization: `Bearer ${apiToken}`,
                Accept: "application/json",
            },
        },
    });
}

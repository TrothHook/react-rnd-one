"use client";
import { authHeader } from "../helpers";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_FULL_URL;

const signUp = async (postData) => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}/user/register`,
      data: postData,
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    console.log("url", `${API_BASE_URL}/user/signUp`);
    console.log("response", response);
    return response;
  } catch (error) {
    // console.log("error", error);
    return error;
  }
};

const signIn = async (postData) => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}/signin`,
      data: postData,
      method: "POST",
      header: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    return error;
  }
};

const authService = {
  signUp,
  signIn
};

export default authService;

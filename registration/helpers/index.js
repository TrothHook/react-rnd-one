"use client"
const authHeader = () => {
  const accessToken = localStorage.getItem("_token");
  if (accessToken !== undefined) {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
  } else {
    return {};
  }
};

export { authHeader };

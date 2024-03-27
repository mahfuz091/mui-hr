"use client";
import { createContext, useEffect, useState } from "react";
import axiosInstance from "@/lib/axios-instance";

export const HrContext = createContext(null);

const HrProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [control, setControl] = useState(false);

  const getUser = async () => {
    const token = localStorage.getItem("accessToken");
    console.log(token);
    const response = await axiosInstance.get("/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data.data;
    setUser(data);
  };

  const hrToolInfo = {
    user,
    control,
    setControl,
    getUser,
  };
  return <HrContext.Provider value={hrToolInfo}>{children}</HrContext.Provider>;
};
export default HrProvider;

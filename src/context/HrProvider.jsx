"use client";
import { createContext, useEffect, useState } from "react";
import axiosInstance from "@/lib/axios-instance";

export const HrContext = createContext(null);

const HrProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [control, setControl] = useState(false);
  const [isEditing, setEditing] = useState(false);

  const getUser = async () => {
    const token = localStorage.getItem("accessToken");

    try {
      const response = await axiosInstance.get("/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.data;
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(user);
  useEffect(() => {
    getUser();
  }, [control]);

  const hrToolInfo = {
    user,
    control,
    setControl,
    getUser,
    setEditing,
    isEditing,
  };
  return <HrContext.Provider value={hrToolInfo}>{children}</HrContext.Provider>;
};
export default HrProvider;

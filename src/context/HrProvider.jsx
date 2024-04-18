"use client";
import { createContext, useEffect, useState } from "react";
import axiosInstance from "@/lib/axios-instance";

export const HrContext = createContext(null);

const HrProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [control, setControl] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [contact, setContact] = useState(null);
  const [authU, setAuthU] = useState(false);
  // console.log(contact);
  const getContact = async () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const response = await axiosInstance.get("/api/profile/contacts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data.data.contacts;
        setContact(data);
        setAuthU(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      return null;
    }
  };

  const getUser = async () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
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
    }
  };

  // console.log(user);
  useEffect(() => {
    getUser();
    getContact();
  }, [control]);

  const hrToolInfo = {
    user,
    control,
    setControl,
    getUser,
    setEditing,
    isEditing,
    contact,
    authU,
    setAuthU,
  };
  return <HrContext.Provider value={hrToolInfo}>{children}</HrContext.Provider>;
};
export default HrProvider;

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
  const [leaves, setLeaves] = useState(null);
  const [userLeaves, setUserLeaves] = useState(null);
  const [myLeaveBalance, setMyLeaveBalance] = useState(null);
  console.log(myLeaveBalance);

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

  const getLeaves = async () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const response = await axiosInstance.get("/api/leave-types", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data.data;
        setLeaves(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getUserLeaves = async () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const response = await axiosInstance.get(
          `/api/leaves?orderBy&orderDirection=&paginate=false&page=1&perPage=2&user_id=${user?.auth?.id}&status`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data.data;
        setUserLeaves(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getMyLeaveBalance = async () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const response = await axiosInstance.get("/api/leaves/available", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data.data;
        setMyLeaveBalance(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getUser();
    getContact();
    getLeaves();
    getUserLeaves();
    getMyLeaveBalance();
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
    userLeaves,
    myLeaveBalance,
    leaves,
  };
  return <HrContext.Provider value={hrToolInfo}>{children}</HrContext.Provider>;
};
export default HrProvider;

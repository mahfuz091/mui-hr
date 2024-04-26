"use client";
import { createContext, useEffect, useState } from "react";
import axiosInstance from "@/lib/axios-instance";

export const HrContext = createContext(null);

const HrProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [control, setControl] = useState(false);
  const [leaveControl, setLeaveControl] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [contact, setContact] = useState(null);
  const [educations, setEducations] = useState([]);
  const [authU, setAuthU] = useState(false);
  const [leaves, setLeaves] = useState(null);
  const [userLeaves, setUserLeaves] = useState(null);
  const [myLeaveBalance, setMyLeaveBalance] = useState(null);
  const [skills, setSkills] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  // console.log(userLeaves);
  // console.log(leaveControl);

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

  const getEducation = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axiosInstance.get("/api/profile/educations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.data;
      setEducations(data);
    } catch (error) {
      console.log(error);
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

  const getUserLeaves = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setUserLeaves(null);
    } else {
      if (!user) {
        setUserLeaves(null);
      } else {
        try {
          const response = await axiosInstance.get(
            `/api/leaves?user_id=${user?.auth?.id}`,
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
    }
  };

  // Get User Skill
  const getUserSkills = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axiosInstance.get(
        "/api/profile/skills",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.data;
      // console.log(data);

      setUserSkills(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSkill = async () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const response = await axiosInstance.get(
          "/api/skills?search=&orderBy&orderDirection=&paginate=false&page=1&perPage=2",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data.data;
        setSkills(data);

        setControl(!control);
      } catch (error) {
        console.log(error);
      }
    } else return;
  };

  useEffect(() => {
    getUser();
    getContact();
    getLeaves();
    getUserLeaves();
    getMyLeaveBalance();
    getEducation();
    getSkill();
    getUserSkills();
  }, [control]);
  useEffect(() => {
    getLeaves();
    getUserLeaves();
    getMyLeaveBalance();
  }, [user, leaveControl]);

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
    educations,
    skills,
    userSkills,
    leaveControl,
    setLeaveControl,
    getSkill,
    getUserSkills,
  };
  return <HrContext.Provider value={hrToolInfo}>{children}</HrContext.Provider>;
};
export default HrProvider;

"use client";
import { createContext, useEffect, useState } from "react";
import axiosInstance from "@/lib/axios-instance";
import useAxiosSecure from "@/app/hooks/useAxiosSecure";
import { useRouter } from "next/navigation";

export const HrContext = createContext(null);

const HrProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(null);
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
  const [axiosSecure] = useAxiosSecure();
  const router = useRouter();
  // console.log(skills);
  // console.log(leaveControl);

  const logOut = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = axiosSecure.post("/api/logout");
      console.log(response.data);
      localStorage.removeItem(token);
      router.push("/users/sign-in");
    } catch (err) {
      console.log(err);
    }
  };

  const getContact = async () => {
    const token = localStorage.getItem("accessToken");
    if (token && loggedUser) {
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

  const getLoggedUser = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token && !loggedUser) {
      setUser(null);
    } else {
      try {
        const response = await axiosInstance.get("/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data.data;
        setLoggedUser(data.auth);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getEducation = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token && !loggedUser) {
      setEducations([]);
    } else {
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
    if (token && loggedUser) {
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
    if (!token && !loggedUser) {
      setUserLeaves(null);
    } else {
      try {
        const response = await axiosInstance.get("/api/leaves", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data.data;
        console.log(data);
        setUserLeaves(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Get User Skill
  const getUserSkills = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token && !loggdUser) {
      setUserSkills([]);
    } else {
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

        setUserSkills(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getSkill = async () => {
    const token = localStorage.getItem("accessToken");

    try {
      const response = await axiosInstance.get("/api/skills", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.data;
      setSkills(data);

      setControl(!control);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSkill();
    getLeaves();
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      getUserLeaves();
      getMyLeaveBalance();
      getLoggedUser;
    }
  }, [loggedUser, leaveControl]);

  const hrToolInfo = {
    loggedUser,
    control,
    setControl,
    getLoggedUser,
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
    getEducation,
    getLeaves,
    getUserLeaves,
    getMyLeaveBalance,
    getContact,
    logOut,
  };
  return <HrContext.Provider value={hrToolInfo}>{children}</HrContext.Provider>;
};
export default HrProvider;

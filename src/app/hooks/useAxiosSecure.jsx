import { HrContext } from "@/context/HrProvider";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

const useAxiosSecure = () => {
  const router = useRouter();
  const logOut = useContext(HrContext);

  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    0;

    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          await logOut();
          router.push("/users/sign-in");
        }
        return Promise.reject(error);
      }
    );
  }, [router, logOut]);

  return [axiosSecure];
};

export default useAxiosSecure;

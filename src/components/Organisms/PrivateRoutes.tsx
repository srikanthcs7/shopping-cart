import React, { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import axiosClient from "../../utils/axiosClient";
import { login } from "../../store/slices/authSlice";

interface PrivateRoutesTypes {
  children: ReactNode;
}

const PrivateRoutes: React.FC<PrivateRoutesTypes> = ({ children }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosClient.get("/auth/me");
        dispatch(
          login({
            name: response.name,
            token: response.token,
            refreshToken: response.refreshToken,
          })
        );
      } catch (error) {
        console.error("Error fetching user:", error);
        // Handle error or redirect to login page
      }
    };

    if (token && !user) {
      fetchUser();
    }
  }, [dispatch, token, user]);

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return <>{children}</>;
};

export default PrivateRoutes;

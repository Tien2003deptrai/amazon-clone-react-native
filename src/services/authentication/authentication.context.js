import { apiBaseUrl, apiVersion } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState, useMemo, useEffect } from "react";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [userLoading, setuserLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const fetchAuthTokenFromStorage = async () => {
      try {
        setuserLoading(true);
        const authTokenString = await AsyncStorage.getItem("@authToken");
        if (authTokenString) {
          const authTokenObject = JSON.parse(authTokenString);
          setAuthToken(authTokenObject);
        }
      } catch (error) {
        alert(error.message);
      } finally {
        setuserLoading(false);
      }
    };

    fetchAuthTokenFromStorage();
  }, []);

  const login = async (email, password) => {
    try {
      setLoginLoading(true);
      if (loginLoading) return;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        throw new Error("Invalid email format.");
      }

      if (password === "") {
        throw new Error("Password can't be empty.");
      }

      const loginUserEndpoint = `${apiBaseUrl}/${apiVersion}/users/login`;
      const response = await fetch(loginUserEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.toLowerCase(),
          password,
        }),
      });

      if (response.status === 404 || response.status === 400) {
        throw new Error("Incorrect credentials");
      }

      const data = await response.json();
      const authTokenStringify = JSON.stringify({
        token: data.token,
        userId: data.userId,
      });
      await AsyncStorage.setItem("@authToken", authTokenStringify);
      setAuthToken({ token: data.token, userId: data.userId });
    } catch (error) {
      alert(error.message || "Internal server error.");
    } finally {
      setLoginLoading(false);
    }
  };

  const contextValue = useMemo(() => {
    return {
      userLoading,
      setuserLoading,
      loginLoading,
      setLoginLoading,
      authToken,
      setAuthToken,
      login,
    };
  }, [userLoading, loginLoading, authToken]);

  if (userLoading) return null;

  return (
    <AuthenticationContext.Provider value={contextValue}>
      {children}
    </AuthenticationContext.Provider>
  );
};

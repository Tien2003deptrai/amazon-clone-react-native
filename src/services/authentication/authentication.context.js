import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState, useEffect, useMemo } from "react";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const getAuthToken = async () => {
      try {
        setIsLoading(true);
        const authToken = await AsyncStorage.getItem("authToken");
        setAuthToken(authToken);
      } catch (error) {
        alert(error?.message);
      } finally {
        setIsLoading(false);
      }
    };

    getAuthToken();
  }, []);

  const contextValue = useMemo(() => {
    return {
      isLoading,
      setIsLoading,
      authToken,
      setAuthToken,
    };
  }, [isLoading, authToken]);

  if (isLoading) return null;

  return (
    <AuthenticationContext.Provider value={contextValue}>
      {children}
    </AuthenticationContext.Provider>
  );
};

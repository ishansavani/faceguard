import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Utils from "../utils/utils";
import constants from "../utils/constants";

export const AppContext = React.createContext();

export const defaultContextValues = {
  isLoading: true,
  userdata: null,
  authToken: null,
  isAdmin: false,
  initialLoadComplete: false,
  headerData: {},
};

export const AppProvider = ({ children }) => {
  const [store, updateStore] = React.useState(defaultContextValues);
  const navigate = useNavigate();
  const shownErrorStatusSet = new Set();

  React.useEffect(() => {
    const cachedVariables = Utils.getCachedVariables();
    setStore(cachedVariables);
  }, []);

  const setStore = (data = {}, cache = false) => {
    updateStore((prevStore) => ({ ...prevStore, ...data }));
    if (cache) {
      for (const key of Object.keys(data)) {
        const value = data?.[key];
        if (value || value === false || value === 0) {
          Utils.cacheStorage.setItem(
            window.btoa(key),
            Utils.isObject(value)
              ? Utils.toBase64Unicode(JSON.stringify(value))
              : window.btoa(value),
          );
        } else {
          Utils.cacheStorage.removeItem(window.btoa(key));
        }
      }
    }
  };

  const apiRequest = async ({
    method = "GET",
    url = "",
    contentType = "multipart/form-data",
    token = store?.authToken || Utils.getCachedVariables("authToken"),
    headers = {},
    data = "",
    loading = true,
    onSuccess = () => {},
    onError = () => {},
  }) => {
    if (loading) {
      setStore({ isLoading: true });
    }
    try {
      const elements_req_obj = {
        method: method?.toUpperCase(),
        url,
        data,
        ...((contentType || token || headers) && {
          headers: {
            "Content-Type": contentType ?? "application/json",
            ...(token && {
              Authorization: token.startsWith("Bearer")
                ? token
                : `Bearer ${token}`,
            }),
            ...headers,
          },
        }),
      };
      const elements_response = await axios(elements_req_obj);
      if (
        [200, 201, 204].includes(elements_response.status) &&
        elements_response
      ) {
        onSuccess(elements_response);
        return elements_response;
      }
    } catch (e) {
      const resetShownErrorStatusSet = () => {
        shownErrorStatusSet.clear();
      };
      if (e?.response?.status === 401 || e?.response?.status === 403) {
        logout();

        shownErrorStatusSet.add(e?.response?.data?.error?.status);
        setTimeout(resetShownErrorStatusSet, 1000);
      } else {
        onError(e?.response ?? false);
      }
    } finally {
      if (loading) {
        setStore({ isLoading: false });
      }
    }
  };

  const logout = async () => {
    try {
      Utils.cacheStorage.clear();
      setStore(
        {
          userdata: null,
          sidebarAction: false,
          headerAction: false,
          bottomNavigationBarAction: false,
        },
        true,
      );
      navigate(constants.route.login);
      window.history.pushState(null, document.title, window.location.href);
      const handlePopState = (event) => {
        if (window.location.href?.includes("login")) {
          window.history.pushState(null, document.title, window.location.href);
        }
      };
      window.addEventListener("popstate", handlePopState);
      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    const cachedVariables = Utils.getCachedVariables();

    setStore(
      {
        ...cachedVariables,
        initialLoadComplete: true,
        isLoading: false,
      },
      true,
    );
  }, []);

  return (
    <AppContext.Provider
      value={{
        setStore,
        logout,
        apiRequest,
        store,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);

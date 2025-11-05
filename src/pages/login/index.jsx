import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/AppIcon";
import FormInput from "./components/FormInput";
import ActionButton from "./components/ActionButton";
import ErrorMessage from "./components/ErrorMessage";
import { Button, Form } from "antd";
import { AppContext } from "../../context/AppContext";
import constants from "../../utils/constants";
import { FaGoogle } from "react-icons/fa6";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const contextValues = useContext(AppContext);
  const [loginError, setLoginError] = useState("");

  const handleSubmit = async (values) => {
    if (values.email === "admin@gmail.com" && values.password === "Admin@123") {
      contextValues.setStore(
        {
          userdata: { name: "Admin User", email: values.email, role: "Admin" },
          authToken: "dummy-auth-token",
          isAdmin: true,
        },
        true,
      );
      navigate(constants.route.dashboard);
    } else {
      setLoginError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-lightGrayBackground">
      <div className="hidden md:flex md:w-1/2 bg-primary-700 text-white p-2 lg:p-6 flex-col justify-between h-screen overflow-y-auto custom-scrollbar sapce-y-2">
        <div className="max-w-2xl m-auto space-y-2 lg:space-y-4">
          <div className="flex">
            <img src="/assets/faceguard-logo.png" alt="Logo" className="w-28" />
          </div>
          <h1 className="text-2xl lg:text-4xl font-bold">
            Welcome to FaceGuard
          </h1>
          <p className="text-base lg:text-md text-primary-100">
            Our platform analyzes image artifacts, generation traces, and model
            fingerprints to tell you whether an image is AI-generated or
            authentic. Get clear, explainable results, keep your data private,
            and act with confidence. Log in to start protecting your content and
            community.
          </p>
          <div className="bg-primary-600 bg-opacity-30 p-4 lg:p-6 rounded-lg border border-primary-500 border-opacity-30 backdrop-blur-sm space-y-2 lg:space-y-3">
            <h2 className="text-sm lg:text-base font-semibold text-primary-200 ">
              Key Features:
            </h2>
            {[
              "Advanced Detection: Cutting-edge algorithms to identify deepfakes",
              "Real-time Analysis: Instant verification of media authenticity",
              "User-friendly Interface: Easy to navigate and use",
              "Comprehensive Reports: Detailed insights on analyzed content",
            ].map((text, i) => {
              const [title, desc] = text.split(":");
              return (
                <div className="flex items-start" key={i}>
                  <div className="mr-2 lg:mr-3">
                    <Icon
                      name="CheckCircle"
                      className="text-primary-300 w-4 h-4 lg:w-5 lg:h-5"
                    />
                  </div>
                  <p className="text-sm lg:text-base text-primary-100">
                    <span className="font-semibold">{title}:</span>
                    {desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right side - Two Step Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-xl space-y-3">
          <h2 className="text-2xl font-bold text-gray-900 ">
            Sign in to your account
          </h2>
          <p className="text-gray-600">
            Login with Google to detect what’s real and what’s AI-generated.
          </p>

          {loginError && (
            <ErrorMessage
              message={loginError}
              onClose={() => setLoginError("")}
            />
          )}

          <Button
            type="primary"
            icon={<FaGoogle className="mr-2 w-5 h-5" />}
            className="!p-2 w-full"
            onClick={() => {
              window.location.href = "/auth/google";
            }}
          >
            Sign in with Google
          </Button>
          <div className="text-center text-sm text-gray-500 place-content-end">
            &copy; {new Date().getFullYear()} FaceGuard. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;

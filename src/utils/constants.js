const apiPort = "http://127.0.0.1:5000";
const constants = {
  SOMETHING_WENT_WRONG: "Something went wrong. Please try again later.",
  GOOGLE_CLIENT_ID:
    "666482273939-9lo9b735msahro0t5ipopq3rhl57olr9.apps.googleusercontent.com",
  api: {
    history: `${apiPort}/history`,
  },

  route: {
    default: "",
    login: "/login",
    deepfakeAnalysis: "/deepfake-analysis",
    history: "/history",
    profile: "/profile",
  },
};
export default constants;

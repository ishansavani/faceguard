const apiPort = "http://localhost:3000/api";
const constants = {
  SOMETHING_WENT_WRONG: "Something went wrong. Please try again later.",
  GOOGLE_CLIENT_ID:
    "666482273939-9lo9b735msahro0t5ipopq3rhl57olr9.apps.googleusercontent.com",
  api: {
    login: `${apiPort}/admin-user/verify`,
    products: `${apiPort}/products`,
  },

  route: {
    default: "",
    login: "/login",
    dashboard: "/dashboard",
    deepfakeAnalysis: "/deepfake-analysis",
    history: "/history",
    profile: "/profile",
  },
};
export default constants;

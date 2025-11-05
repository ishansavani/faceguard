const apiPort = "http://localhost:3000/api";
const constants = {
  SOMETHING_WENT_WRONG: "Something went wrong. Please try again later.",
  api: {
    login: `${apiPort}/admin-user/verify`,
    products: `${apiPort}/products`,
  },

  route: {
    default: "",
    login: "/login",
    dashboard: "/dashboard",
    profile: "/profile",
    products: "/products",
  },
};
export default constants;

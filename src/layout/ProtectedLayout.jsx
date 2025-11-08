import { AuthWrapper } from "../AuthWrapper";
import Layout from "./Layout";

const ProtectedLayout = () => {
  return (
    <AuthWrapper>
      <Layout />
    </AuthWrapper>
  );
};

export default ProtectedLayout;

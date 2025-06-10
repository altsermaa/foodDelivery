import { RightSide } from "../signUp/_components/Right";
import { LoginLeft } from "./_components/LoginLeft";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center h-screen p-5">
      <div className="flex-1/5">
        <LoginLeft />
      </div>

      <div className="flex-2/5 h-full">
        <RightSide />
      </div>
    </div>
  );
};

export default LoginPage;

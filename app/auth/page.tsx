import AuthUI from "../../components/auth/auth";
import LeftSection from "../../components/auth/left";

export default function AuthPage() {
  return (
    <div className="w-screen relative h-screen flex flex-col md:flex-row justify-center md:justify-between items-center">
      <LeftSection />
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center gap-6">
        <AuthUI />
      </div>
    </div>
  );
}

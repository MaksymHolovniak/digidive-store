import signUpBg from "../assets/sign-up-bg.jpg";
import SignSubText from "@/components/auth/SignSubText";
import SignLinks from "@/components/auth/SignLinks";
import SignUpForm from "@/components/auth/SignUpForm";
import SignBanner from "@/components/auth/SignBanner";
import AuthLayout from "@/components/layouts/AuthLayout";
import SignHeader from "@/components/auth/SignHeader";
import SignSwitcher from "@/components/auth/SignSwitcher";

const SignUpPage = () => {
  return (
    <AuthLayout banner={<SignBanner bgImage={signUpBg} />}>
      <SignHeader title="Create an account" />
      <SignUpForm />
      <SignSubText />
      <SignLinks variant="minimal" />
      <SignSwitcher variant="signup" />
    </AuthLayout>
  );
};

export default SignUpPage;

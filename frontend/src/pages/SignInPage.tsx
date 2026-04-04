import signInBg from "../assets/sign-in-bg.jpg";
import SignSubText from "@/components/auth/SignSubText";
import SignLinks from "@/components/auth/SignLinks";
import SignBanner from "@/components/auth/SignBanner";
import SignInForm from "@/components/auth/SignInForm";
import AuthLayout from "@/components/layouts/AuthLayout";
import SignHeader from "@/components/auth/SignHeader";
import SignSwitcher from "@/components/auth/SignSwitcher";

const SignInPage = () => {
  return (
    <AuthLayout banner={<SignBanner bgImage={signInBg} />}>
      <SignHeader title="Log In" />
      <SignInForm />
      <SignSubText />
      <SignLinks />
      <SignSwitcher variant="signin" />
    </AuthLayout>
  );
};

export default SignInPage;

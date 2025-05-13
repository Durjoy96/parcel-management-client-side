import { useContext } from "react";
import { Link } from "react-router-dom";
import GoogleLogin from "../SocialLogin/GoogleLogin";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { AuthContext } from "@/authProvider/AuthProvider";

const Login = () => {
  const { signInWithPassword } = useContext(AuthContext);
  const formHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signInWithPassword(email, password)
      .then(() => {
        toast.success("login Successfully!");
        form.reset();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <>
      <div className="main-container mt-12 md:mt-20 flex justify-center">
        <div className="w-full max-w-md p-4 rounded-md shadow bg-base-100 sm:p-8 dark:bg-[#222222] dark:text-white/90">
          <h2 className="mb-3 text-3xl font-semibold text-center">
            Login to your account
          </h2>
          <p className="text-base text-center dark:text-white/60">
            Dont have account?&nbsp;
            <Link
              to="/register"
              rel="noopener noreferrer"
              className="text-primary focus:underline hover:underline"
            >
              Sign up here
            </Link>
          </p>
          <div className="my-6 space-y-4">
            <GoogleLogin />
          </div>
          <div className="flex items-center w-full my-4">
            <hr className="w-full dark:text-white/60" />
            <p className="px-3 dark:text-white/60">OR</p>
            <hr className="w-full dark:text-white/60" />
          </div>
          <form onSubmit={formHandler} className="space-y-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="leroy@jenkins.com"
                  className="w-full px-3 py-2 border rounded-md dark:border-none dark:bg-[#4e4e4e] dark:text-white/60"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label htmlFor="password" className="text-sm">
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="*****"
                  className="w-full px-3 py-2 border rounded-md dark:border-none dark:bg-[#4e4e4e] dark:text-white/60"
                />
              </div>
            </div>
            <Button className="w-full">Login</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

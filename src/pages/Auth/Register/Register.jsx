import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import GoogleLogin from "../SocialLogin/GoogleLogin";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { AuthContext } from "@/authProvider/AuthProvider";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AxiosPublic from "@/hooks/AxiosPublic/AxiosPublic";

const Register = () => {
  const [imagePath, setImagePath] = useState("");
  const { createUser, updateUser } = useContext(AuthContext);
  const useAxios = AxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    //get image url
    const formData = new FormData();
    formData.append("image", data.imageURL[0]);
    fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbbApiKey}`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => setImagePath(() => data.data.display_url));

    if (imagePath) {
      createUser(data.email, data.password)
        .then(() => {
          console.log(imagePath);
          updateUser(data.name, imagePath);
          reset();
          // console.log(res);
          const user = {
            name: data.name,
            email: data.email,
            role: data.role,
            photo_url: imagePath,
          };
          useAxios.post("/users", user).then((res) => {
            console.log(res.data);
            toast.success("Registration Successful!");
          });
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };
  return (
    <>
      <div className="main-container mt-12 md:mt-20 flex justify-center">
        <div className="w-full max-w-md p-4 rounded-md shadow bg-base-100 sm:p-8 dark:bg-[#222222] dark:text-white/90">
          <h2 className="mb-3 text-3xl font-semibold text-center">
            Register an account
          </h2>
          <p className="text-base text-center dark:text-white/60">
            Already have an account?&nbsp;
            <Link
              to="/login"
              rel="noopener noreferrer"
              className="text-primary focus:underline hover:underline"
            >
              Login here
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  {...register("name", { required: true })}
                  placeholder="Leroy Jenkins"
                  className="w-full px-3 py-2 border rounded-md dark:border-none dark:bg-[#4e4e4e] dark:text-white/60"
                />
                {errors.name && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="space-y-2">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="picture" className="font-normal mb-1">
                    Picture
                  </Label>
                  <Input
                    name="imageURL"
                    {...register("imageURL")}
                    id="picture"
                    type="file"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm">
                  Register as a
                </label>
                <Controller
                  name="role"
                  control={control}
                  defaultValue="user"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full h-10">
                        <SelectValue placeholder="Select Your Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="deliveryMen">
                          Delivery Men
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  {...register("email", { required: true })}
                  placeholder="leroy@jenkins.com"
                  className="w-full px-3 py-2 border rounded-md dark:border-none dark:bg-[#4e4e4e] dark:text-white/60"
                />
                {errors.email && (
                  <span className="text-red-500">This field is required</span>
                )}
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
                  {...register("password", { required: true })}
                  placeholder="*****"
                  className="w-full px-3 py-2 border rounded-md dark:border-none dark:bg-[#4e4e4e] dark:text-white/60"
                />
                {errors.password && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>
            <Button className="w-full">Register Now!</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;

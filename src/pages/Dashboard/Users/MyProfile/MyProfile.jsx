import { AuthContext } from "@/authProvider/AuthProvider";
import LoadingScreen from "@/components/custom/Loading/LoadingScreen";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const MyProfile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [imagePath, setImagePath] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true); //start loading screen
    const formData = new FormData();
    formData.append("image", data.picture[0]);
    fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbbApiKey}`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setImagePath(() => data.data.display_url);
        updateUser(user?.displayName, data.data.display_url)
          .then(() => {
            reset();
            setLoading(false);
            toast.success("Profile Picture Updated!");
          })
          .catch((error) => toast.error(error.message));
      });
  };

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <>
      <div>
        <h2 className="text-xl md:text-2xl font-semibold text-primary border-b pb-3">
          My Profile
        </h2>
        <div className="mt-6 lg:mt-12">
          <div className="w-32">
            <img className="rounded-full" src={user.photoURL} alt="profile" />
          </div>
          <div className="mt-6">
            <h3 className="text-2xl text-base-content font-semibold">
              {user?.displayName}
            </h3>
            <p className="text-base-content">{user?.email}</p>
          </div>
          <Separator className="my-6" />
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-base-content">
              Change Profile Picture
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid w-full max-w-sm items-center gap-1.5 mt-5">
                <Label htmlFor="picture">Picture</Label>
                <Input name="picture" {...register("picture")} type="file" />
              </div>
              <Button className="mt-8">Update</Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;

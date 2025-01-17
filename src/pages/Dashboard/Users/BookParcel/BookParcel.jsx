import { AuthContext } from "@/authProvider/AuthProvider";
import LoadingScreen from "@/components/custom/Loading/LoadingScreen";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AxiosSecure from "@/hooks/AxiosSecure/AxiosSecure";
import { SendHorizonal } from "lucide-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const BookParcel = () => {
  const { user } = useContext(AuthContext);
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const useAxios = AxiosSecure();

  const priceHandler = (e) => {
    const value = Number(e.target.value);
    if (value <= 0) {
      setCalculatedPrice(0);
    } else if (value <= 1) {
      setCalculatedPrice(50);
    } else if (value <= 2) {
      setCalculatedPrice(100);
    } else {
      setCalculatedPrice(150);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    setLoading(true); //start the spinner on the Book Now Button

    const date = new Date();
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    data.bookingDate = date.toLocaleDateString(undefined, options);
    data.price = calculatedPrice;
    data.status = "pending";
    data.deliveryMenId = "";

    useAxios
      .post("/book-parcel", data)
      .then((res) => {
        if (res.data.acknowledged) {
          setLoading(false);
          toast.success("Parcel Added Successfully!");
          reset();
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div>
        <h2 className="text-xl md:text-2xl font-semibold text-primary border-b pb-3">
          Book a Parcel
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* name */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="name" className="text-base-content">
                Your Name
              </Label>
              <Input
                type="name"
                name="name"
                {...register("name")}
                placeholder="John Doe"
                defaultValue={user?.displayName}
                readOnly
              />
            </div>
            {/* email */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email" className="text-base-content">
                Your Email
              </Label>
              <Input
                type="email"
                name="email"
                {...register("email")}
                placeholder="johndoe@gmail.com"
                defaultValue={user?.email}
                readOnly
              />
            </div>
            {/* Phone Number */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="phoneNumber" className="text-base-content">
                Phone Number
              </Label>
              <Input
                type="tel"
                name="phoneNumber"
                {...register("phoneNumber")}
                placeholder="+1 234 567 8901"
              />
            </div>
            {/* Parcel Type */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="type" className="text-base-content">
                Parcel Type
              </Label>
              <Input
                type="text"
                name="type"
                {...register("type")}
                placeholder="Electronics, Documents, Fragile Items"
              />
            </div>
            {/* Parcel Weight */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="weight" className="text-base-content">
                Parcel Weight (Kg)
              </Label>
              <Input
                type="number"
                name="weight"
                {...register("weight")}
                placeholder="2.5"
                onChange={priceHandler}
              />
            </div>
            {/* Receiver’s Name */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="receiversName" className="text-base-content">
                Receiver’s Name
              </Label>
              <Input
                type="text"
                name="receiversName"
                {...register("receiversName")}
                placeholder="Jane Smith"
              />
            </div>
            {/* Receiver's Phone Number */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="ReceiversPhoneNumber" className="text-base-content">
                Receiver's Phone Number
              </Label>
              <Input
                type="text"
                name="ReceiversPhoneNumber"
                {...register("ReceiversPhoneNumber")}
                placeholder="+1 987 654 3210"
              />
            </div>
            {/* Parcel Delivery Address */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="deliveryAddress" className="text-base-content">
                Parcel Delivery Address
              </Label>
              <Input
                type="text"
                name="deliveryAddress"
                {...register("deliveryAddress")}
                placeholder="123 Main Street, Apt 4B, New York, NY 10001"
              />
            </div>
            {/* Requested Delivery Date */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="deliveryDate" className="text-base-content">
                Requested Delivery Date
              </Label>
              <Input
                type="date"
                name="deliveryDate"
                {...register("deliveryDate")}
                placeholder="2025-01-20"
              />
            </div>
            {/* Delivery Address Latitude */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="latitude" className="text-base-content">
                Delivery Address Latitude
              </Label>
              <Input
                type="text"
                name="latitude"
                {...register("latitude")}
                placeholder="40.712776"
              />
            </div>
            {/* Delivery Address longitude */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="longitude" className="text-base-content">
                Delivery Address Longitude
              </Label>
              <Input
                type="text"
                name="longitude"
                {...register("longitude")}
                placeholder="-74.005974"
              />
            </div>
          </div>
          <div className="flex gap-6 items-center mt-12 justify-end">
            <div>
              <span className="text-base-content">
                Delivery Charge :{" "}
                <span className="font-semibold text-primary">
                  {calculatedPrice}TK
                </span>
              </span>
            </div>
            <Button>
              <SendHorizonal /> Book Now!
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BookParcel;

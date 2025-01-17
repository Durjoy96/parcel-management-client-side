import { AuthContext } from "@/authProvider/AuthProvider";
import AxiosSecure from "@/hooks/AxiosSecure/AxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import LoadingScreen from "@/components/custom/Loading/LoadingScreen";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowUpDown } from "lucide-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Update = () => {
  const { id } = useParams();
  const useAxios = AxiosSecure();
  const { user } = useContext(AuthContext);
  const [calculatedPrice, setCalculatedPrice] = useState(0);

  const { data: parcel = [] } = useQuery({
    queryKey: ["parcel", id],
    queryFn: async () => {
      const res = await useAxios.get(`/parcels?id=${id}`);
      console.log("update page:", res.data);
      setCalculatedPrice(res.data[0].price);
      return res.data[0];
    },
  });

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

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    const form = e.target;
    const data = {
      name: form.name.value,
      email: form.email.value,
      phoneNumber: form.phoneNumber.value,
      type: form.type.value,
      weight: form.weight.value,
      receiversName: form.receiversName.value,
      deliveryAddress: form.deliveryAddress.value,
      deliveryDate: form.deliveryDate.value,
      latitude: form.latitude.value,
      longitude: form.longitude.value,
      price: calculatedPrice,
    };
    useAxios
      .put(`/parcel?id=${id}`, data)
      .then((res) => {
        if (res.data.acknowledged) {
          toast.success("Parcel Updated Successfully!");
        }
      })
      .catch((error) => toast.error(error.message));
  };
  return (
    <>
      <div>
        <h2 className="text-xl md:text-2xl font-semibold text-primary border-b pb-3">
          Update
        </h2>
        <form onSubmit={onSubmit} className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* name */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="name" className="text-base-content">
                Your Name
              </Label>
              <Input
                type="name"
                name="name"
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
                placeholder="+1 234 567 8901"
                defaultValue={parcel?.phoneNumber}
                readOnly
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
                placeholder="Electronics, Documents, Fragile Items"
                defaultValue={parcel?.type}
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
                placeholder="2.5"
                onChange={priceHandler}
                defaultValue={parcel?.weight}
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
                placeholder="Jane Smith"
                defaultValue={parcel?.receiversName}
              />
            </div>
            {/* Receiver's Phone Number */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label
                htmlFor="ReceiversPhoneNumber"
                className="text-base-content"
              >
                Receiver's Phone Number
              </Label>
              <Input
                type="text"
                name="ReceiversPhoneNumber"
                placeholder="+1 987 654 3210"
                defaultValue={parcel?.ReceiversPhoneNumber}
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
                placeholder="123 Main Street, Apt 4B, New York, NY 10001"
                defaultValue={parcel?.deliveryAddress}
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
                placeholder="2025-01-20"
                defaultValue={parcel?.deliveryDate}
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
                placeholder="40.712776"
                defaultValue={parcel?.latitude}
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
                placeholder="-74.005974"
                defaultValue={parcel?.longitude}
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
              <ArrowUpDown /> Update
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Update;

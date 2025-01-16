import { AuthContext } from "@/authProvider/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send, SendHorizonal } from "lucide-react";
import { useContext, useState } from "react";

const BookParcel = () => {
  const { user } = useContext(AuthContext);
  const [calculatedPrice, setCalculatedPrice] = useState(0);
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
  return (
    <>
      <div>
        <h2 className="text-xl md:text-2xl font-semibold text-primary border-b pb-3">
          Book a Parcel
        </h2>
        <form className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* name */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="name" className="text-base-content">
                Name
              </Label>
              <Input
                type="name"
                name="name"
                placeholder="name"
                defaultValue={user?.displayName}
                readOnly
              />
            </div>
            {/* email */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email" className="text-base-content">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                defaultValue={user?.email}
                readOnly
              />
            </div>
            {/* Phone Number */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="phoneNumber" className="text-base-content">
                Phone Number
              </Label>
              <Input type="tel" name="phoneNumber" placeholder="Phone Number" />
            </div>
            {/* Parcel Type */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="parcelType" className="text-base-content">
                Parcel Type
              </Label>
              <Input type="text" name="parcelType" placeholder="Parcel Type" />
            </div>
            {/* Parcel Weight */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="parcelWeight" className="text-base-content">
                Parcel Weight (Kg)
              </Label>
              <Input
                type="number"
                name="parcelWeight"
                placeholder="Parcel Weight"
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
                placeholder="Receiver’s Name"
              />
            </div>
            {/* Receiver's Phone Number */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label
                htmlFor="receiversPhoneNumber"
                className="text-base-content"
              >
                Receiver's Phone Number
              </Label>
              <Input
                type="text"
                name="receiversPhoneNumber"
                placeholder="Receiver's Phone Number"
              />
            </div>
            {/* Parcel Delivery Address */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label
                htmlFor="parcelDeliveryAddress"
                className="text-base-content"
              >
                Parcel Delivery Address
              </Label>
              <Input
                type="text"
                name="parcelDeliveryAddress"
                placeholder="Parcel Delivery Address"
              />
            </div>
            {/* Requested Delivery Date */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label
                htmlFor="requestedDeliveryDate"
                className="text-base-content"
              >
                Requested Delivery Date
              </Label>
              <Input
                type="date"
                name="requestedDeliveryDate"
                placeholder="Requested Delivery Date"
              />
            </div>
            {/* Delivery Address Latitude */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label
                htmlFor="deliveryAddressLatitude"
                className="text-base-content"
              >
                Delivery Address Latitude
              </Label>
              <Input
                type="number"
                name="deliveryAddressLatitude"
                placeholder="Delivery Address Latitude"
              />
            </div>
            {/* Delivery Address longitude */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label
                htmlFor="deliveryAddressLongitude"
                className="text-base-content"
              >
                Delivery Address Longitude
              </Label>
              <Input
                type="number"
                name="deliveryAddressLongitude"
                placeholder="Delivery Address Longitude"
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
              {" "}
              <SendHorizonal /> Book Now!
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BookParcel;

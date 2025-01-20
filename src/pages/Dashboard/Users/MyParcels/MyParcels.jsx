import { AuthContext } from "@/authProvider/AuthProvider";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AxiosSecure from "@/hooks/AxiosSecure/AxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Ellipsis } from "lucide-react";
import { Link } from "react-router-dom";
import LoadingScreen from "@/components/custom/Loading/LoadingScreen";
import Swal from "sweetalert2";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MyParcels = () => {
  const useAxios = AxiosSecure();
  const { user } = useContext(AuthContext);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [parcels, setParcels] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ["parcels", user?.email],
    queryFn: async () => {
      const res = await useAxios.get(`/parcels?email=${user.email}`);
      setParcels(res.data);
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  const cancelBtnHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        useAxios.patch(`/parcel?id=${id}&status=Canceled`, {}).then((res) => {
          Swal.fire({
            title: "Canceled!",
            text: "Your parcel has been canceled.",
            icon: "success",
          });
        });
      }
    });
  };

  const formHandler = (e) => {
    e.preventDefault();
    const date = new Date();
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    const data = {
      name: e.target.name.value,
      photoURL: e.target.photoURL.value,
      rating: Number(e.target.rating.value),
      feedback: e.target.feedback.value,
      deliveryMenId: e.target.deliveryMenId.value,
      reviewDate: date.toLocaleDateString(undefined, options),
    };
    useAxios.post(`/review`, data).then(() => {
      toast.success("Review Added Successfully!");
      setIsReviewOpen(false);
    });
  };

  const sortHandler = (value) => {
    if (value !== "All") {
      const sorted = data.filter((parcel) => parcel.status === value);
      setParcels(sorted);
    } else {
      setParcels(data);
    }
  };

  const makePayment = async (parcel) => {
    const stripe = await loadStripe(import.meta.env.VITE_stripePublicKey);
    const response = await useAxios.post("/create-checkout-session", parcel);
    const session = response.data;
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      console.log(result.error);
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-end mb-4">
          <Select onValueChange={sortHandler}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort By Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="Canceled">Canceled</SelectItem>
              <SelectItem value="On The Way">On The Way</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableCaption>A list of your parcels.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Parcel Type</TableHead>
              <TableHead>Requested Delivery Date</TableHead>
              <TableHead>Approximate Delivery Date</TableHead>
              <TableHead>Booking Date</TableHead>
              <TableHead>Delivery Men ID</TableHead>
              <TableHead>Booking Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {parcels.map((parcel) => (
              <TableRow key={parcel._id}>
                <TableCell className="font-medium">{parcel?.type}</TableCell>
                <TableCell className="font-medium">
                  {parcel?.deliveryDate}
                </TableCell>
                <TableCell className="font-medium">
                  {parcel?.approximateDeliveryDate || (
                    <span className="text-primary">NaN</span>
                  )}
                </TableCell>
                <TableCell className="font-medium">
                  {parcel?.bookingDate}
                </TableCell>
                <TableCell className="font-medium">
                  {parcel?.deliveryMenId || (
                    <span className="text-primary">NaN</span>
                  )}
                </TableCell>
                <TableCell className="font-medium">{parcel?.status}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Ellipsis />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem disabled={parcel?.status !== "pending"}>
                        <Link to={`update/${parcel?._id}`}>Update</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setIsReviewOpen(true);
                          setSelectedParcel(parcel);
                        }}
                      >
                        Review
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => makePayment(parcel)}>
                        Pay
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        disabled={parcel?.status !== "pending"}
                        onClick={() => cancelBtnHandler(parcel?._id)}
                        className="text-primary cursor-pointer"
                      >
                        Cancel
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a Review</DialogTitle>
              <DialogDescription>
                <form onSubmit={formHandler} className="grid gap-4 mt-4">
                  <div>
                    <Label className="text-base-content">Name</Label>
                    <Input
                      type="text"
                      name="name"
                      defaultValue={user?.displayName}
                      readOnly
                    />
                  </div>
                  <div>
                    <Label className="text-base-content">Photo URL</Label>
                    <Input
                      type="text"
                      name="photoURL"
                      defaultValue={user?.photoURL}
                      readOnly
                    />
                  </div>
                  <div>
                    <Label className="text-base-content">Delivery Men ID</Label>
                    <Input
                      type="text"
                      name="deliveryMenId"
                      defaultValue={selectedParcel?.deliveryMenId}
                      readOnly
                    />
                  </div>
                  <div>
                    <Label className="text-base-content">Rating out of 5</Label>
                    <Input
                      type="number"
                      min="0"
                      max="5"
                      step="0.01"
                      name="rating"
                      placeholder="4.5"
                    />
                  </div>
                  <div>
                    <Label className="text-base-content">Feedback</Label>
                    <Input
                      type="text"
                      name="feedback"
                      placeholder="Your Text"
                    />
                  </div>
                  <Button className="mt-6">Submit</Button>
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default MyParcels;

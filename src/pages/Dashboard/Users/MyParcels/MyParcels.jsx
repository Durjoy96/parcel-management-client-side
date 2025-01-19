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

const MyParcels = () => {
  const useAxios = AxiosSecure();
  const { user } = useContext(AuthContext);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState(null);
  console.log(selectedParcel);
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["parcels", user?.email],
    queryFn: async () => {
      const res = await useAxios.get(`/parcels?email=${user.email}`);
      console.log(res.data);
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
    const data = {
      name: e.target.name.value,
      photoURL: e.target.photoURL.value,
      rating: Number(e.target.rating.value),
      feedback: e.target.feedback.value,
      deliveryMenId: e.target.deliveryMenId.value,
    };
    useAxios.post(`/review`, data).then(() => {
      toast.success("Review Added Successfully!");
      setIsReviewOpen(false);
    });
  };

  return (
    <>
      <div>
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
                      <DropdownMenuItem>Pay</DropdownMenuItem>
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

import { AuthContext } from "@/authProvider/AuthProvider";
import AxiosSecure from "@/hooks/AxiosSecure/AxiosSecure";
import { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import LoadingScreen from "@/components/custom/Loading/LoadingScreen";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Map from "./Map/Map";

const MyDeliveryList = () => {
  const useAxios = AxiosSecure();
  const { userDBId } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [refetch, setRefetch] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    useAxios.get(`/delivery-list?id=${userDBId}`).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, [userDBId, refetch]);

  const statusHandler = (id, status) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, do it!",
    }).then((result) => {
      if (result.isConfirmed) {
        useAxios.patch(`/parcel?id=${id}&status=${status}`).then(() => {
          toast.success(`${status}!`);
          setRefetch((prev) => !prev);
        });
        Swal.fire({
          title: "Done!",
          text: "Thanks!",
          icon: "success",
        });
      }
    });
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div>
        <h2 className="text-xl md:text-2xl font-semibold text-primary border-b pb-3">
          My Delivery List
        </h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User Name</TableHead>
              <TableHead>Receivers Name</TableHead>
              <TableHead>Booked Users Phone</TableHead>
              <TableHead>Requested Delivery Date</TableHead>
              <TableHead>Approximate Delivery Date</TableHead>
              <TableHead>Receivers phone number</TableHead>
              <TableHead>Receivers Address</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((parcel) => (
              <TableRow key={parcel._id}>
                <TableCell>{parcel.name}</TableCell>
                <TableCell>{parcel.receiversName}</TableCell>
                <TableCell>{parcel.phoneNumber}</TableCell>
                <TableCell>{parcel.deliveryDate}</TableCell>
                <TableCell>{parcel.approximateDeliveryDate}</TableCell>
                <TableCell>{parcel.ReceiversPhoneNumber}</TableCell>
                <TableCell>{parcel.deliveryAddress}</TableCell>
                <TableCell className="flex gap-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">View Location</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[525px]">
                      <DialogHeader>
                        <DialogTitle>Location</DialogTitle>
                      </DialogHeader>
                      <div className="w-full h-96">
                        <Map
                          latitude={Number(parcel?.latitude)}
                          longitude={Number(parcel?.longitude)}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    onClick={() => statusHandler(parcel._id, "Delivered")}
                  >
                    Deliver
                  </Button>
                  <Button onClick={() => statusHandler(parcel._id, "Canceled")}>
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default MyDeliveryList;

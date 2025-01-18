import { AuthContext } from "@/authProvider/AuthProvider";
import AxiosSecure from "@/hooks/AxiosSecure/AxiosSecure";
import { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const MyDeliveryList = () => {
  const useAxios = AxiosSecure();
  const { user } = useContext(AuthContext);
  const [userId, setUserId] = useState("");
  const [data, setData] = useState([]);
  const [refetch, setRefetch] = useState(true);
  useEffect(() => {
    useAxios.get(`/user?email=${user?.email}`).then((res) => {
      setUserId(res.data._id);
    });
  }, []);

  useEffect(() => {
    useAxios
      .get(`/delivery-list?id=${userId}`)
      .then((res) => setData(res.data));
  }, [userId, refetch]);

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

  return (
    <>
      <div>
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
                  <Button variant="outline">View Location</Button>
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

import AxiosSecure from "@/hooks/AxiosSecure/AxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { useState } from "react";
import { Search } from "lucide-react";

const AllParcels = () => {
  const useAxios = AxiosSecure();
  const [parcels, setParcels] = useState([]);
  const [formDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const res = await useAxios.get(`/parcels`);
      setParcels(res.data);
    },
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  const { data: deliveryMen = [] } = useQuery({
    queryKey: ["deliveryMen"],
    queryFn: async () => {
      const res = await useAxios.get(`/users`);
      console.log(res.data);
      const filter = res.data.filter((user) => user.role === "deliveryMen");
      return filter;
    },
  });

  const formHandler = (id, e) => {
    e.preventDefault();
    const approximateDeliveryDate = e.target.approximateDeliveryDate.value;
    const deliveryMenId = e.target.deliveryMenId.value;
    const info = {
      approximateDeliveryDate,
      deliveryMenId,
      status: "On The Way",
    };
    useAxios
      .put(`/manage?id=${id}`, info)
      .then(() => toast.success("Assigned Successfully!"))
      .catch((error) => toast.error(error.message));
  };

  const searchHandler = async () => {
    const res = await useAxios.get(`/search?from=${formDate}&to=${toDate}`);
    setParcels(res.data);
  };

  return (
    <>
      <div>
        <h2 className="text-xl md:text-2xl font-semibold text-primary border-b pb-3">
          All Parcels
        </h2>
        <div className="flex max-w-60 flex-col gap-6 md:flex-row md:items-end mt-8">
          <div className="grid gap-2">
            <Label className="text-left">From</Label>
            <Input
              type="date"
              value={formDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label className="text-left">To</Label>
            <Input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
          <Button onClick={searchHandler}>
            <Search /> Search
          </Button>
        </div>
        <Table className="mt-8">
          <TableCaption>A list of Parcels.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>User Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Booking Date</TableHead>
              <TableHead>Requested Delivery Date</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {parcels.map((parcel) => (
              <TableRow>
                <TableCell>{parcel?.name}</TableCell>
                <TableCell>{parcel?.phoneNumber}</TableCell>
                <TableCell>{parcel?.bookingDate}</TableCell>
                <TableCell>{parcel?.deliveryDate}</TableCell>
                <TableCell>{parcel?.price}TK</TableCell>
                <TableCell
                  className={`${
                    parcel?.status === "canceled" && "text-primary"
                  }`}
                >
                  {parcel?.status}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Manage</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Manage</DialogTitle>
                        <DialogDescription>
                          Set your delivery men here. Click assign when you're
                          done.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={(e) => formHandler(parcel?._id, e)}>
                        <div className="grid gap-4 py-4">
                          <div>
                            <Label
                              htmlFor="deliveryMenId"
                              className="text-right"
                            >
                              Select a delivery man
                            </Label>
                            <select
                              name="deliveryMenId"
                              className="w-full border py-2 rounded"
                            >
                              {deliveryMen.map((user) => (
                                <option key={user?._id} value={user?._id}>
                                  {user?.name} - ({user?._id})
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <Label
                              htmlFor="approximateDeliveryDate"
                              className="text-right"
                            >
                              Approximate Delivery Date
                            </Label>
                            <Input
                              type="date"
                              defaultValue={parcel?.deliveryDate}
                              name="approximateDeliveryDate"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Assign</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default AllParcels;

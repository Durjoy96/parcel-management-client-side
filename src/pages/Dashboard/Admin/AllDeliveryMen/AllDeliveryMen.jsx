import LoadingScreen from "@/components/custom/Loading/LoadingScreen";
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

const AllDeliveryMen = () => {
  const useAxios = AxiosSecure();
  const { data: deliveryMen = [], isLoading } = useQuery({
    queryKey: ["deliveryMen"],
    queryFn: async () => {
      const res = await useAxios.get("/delivery-men");
      return res.data;
    },
  });

  console.log(deliveryMen);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div>
        <h2 className="text-xl md:text-2xl font-semibold text-primary border-b pb-3">
          All Delivery Men
        </h2>
        <div>
          <Table>
            <TableCaption>A list of your delivery Men.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Delivery Men Name</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Parcels delivered</TableHead>
                <TableHead>Average Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deliveryMen.map((deliveryMan) => (
                <TableRow key={deliveryMan?._id}>
                  <TableCell>{deliveryMan?.name}</TableCell>
                  <TableCell>{deliveryMan?.phone_number}</TableCell>
                  <TableCell>{deliveryMan?.deliveredCount}</TableCell>
                  <TableCell>{deliveryMan?.averageRating}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default AllDeliveryMen;

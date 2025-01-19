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
      const res = await useAxios.get("/deliveryMen");
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
                <TableHead>Parcels delivered</TableHead>o
                <TableHead>Average review</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default AllDeliveryMen;

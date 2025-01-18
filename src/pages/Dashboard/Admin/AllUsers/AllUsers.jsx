import LoadingScreen from "@/components/custom/Loading/LoadingScreen";
import { Button } from "@/components/ui/button";
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
import toast from "react-hot-toast";

const AllUsers = () => {
  const useAxios = AxiosSecure();
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await useAxios.get(`/all-users`);
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  const roleHandler = (id, name, role) => {
    useAxios
      .patch(`/user?id=${id}&role=${role}`)
      .then(() => {
        refetch();
        toast.success(`${name} updated as a ${role}!`);
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <>
      <div>
        <h2 className="text-xl md:text-2xl font-semibold text-primary border-b pb-3">
          All Users
        </h2>
        <div>
          <Table>
            <TableCaption>A list of your users.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>User Name</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Parcels Booked</TableHead>
                <TableHead>Role</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user?._id}>
                  <TableCell>{user?.name}</TableCell>
                  <TableCell>{user?.phoneNumber}</TableCell>
                  <TableCell>{user?.parcelsCount}</TableCell>
                  <TableCell>{user?.role}</TableCell>
                  <TableCell className="flex justify-end gap-5">
                    <Button
                      onClick={() =>
                        roleHandler(user?._id, user?.name, "deliveryMen")
                      }
                      variant="outline"
                    >
                      Delivery Men
                    </Button>
                    <Button
                      onClick={() =>
                        roleHandler(user?._id, user?.name, "admin")
                      }
                      variant="outline"
                    >
                      Admin
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default AllUsers;

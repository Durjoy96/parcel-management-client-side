import { AuthContext } from "@/authProvider/AuthProvider";
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
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router-dom";

const AllUsers = () => {
  const useAxios = AxiosSecure();
  const { user } = useContext(AuthContext);
  const { count } = useLoaderData();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const numberOfPage = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPage).keys()];

  const roleHandler = (id, name, role) => {
    useAxios
      .patch(`/user?id=${id}&role=${role}`)
      .then(() => {
        toast.success(`${name} updated as a ${role}!`);
        setRefetch((prev) => !prev);
      })
      .catch((error) => toast.error(error.message));
  };

  useEffect(() => {
    useAxios
      .get(
        `/pagination?page=${currentPage}&size=${itemsPerPage}&email=${user.email}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      )
      .then((res) => setUsers(res.data));
    setLoading(false);
  }, [currentPage, refetch]);

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <>
      <div>
        <h2 className="text-xl md:text-2xl font-semibold text-primary border-b pb-3">
          All Users
        </h2>
        <div>
          <Table>
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
          <div className="mt-8 flex flex-wrap gap-6">
            <Button
              disabled={currentPage === 1 && true}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </Button>
            {pages.map((page) => (
              <Button
                variant="outline"
                onClick={() => setCurrentPage(page + 1)}
                className={`${
                  currentPage === page + 1 &&
                  "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                }`}
                key={page}
              >
                {page + 1}
              </Button>
            ))}
            <Button
              disabled={currentPage === numberOfPage && true}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllUsers;

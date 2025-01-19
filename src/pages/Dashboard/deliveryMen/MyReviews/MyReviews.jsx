import { AuthContext } from "@/authProvider/AuthProvider";
import LoadingScreen from "@/components/custom/Loading/LoadingScreen";
import AxiosSecure from "@/hooks/AxiosSecure/AxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

const MyReviews = () => {
  const { userDBId } = useContext(AuthContext);
  const useAxios = AxiosSecure();
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await useAxios.get(`/reviews?id=${userDBId}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div>
        <h2 className="text-xl md:text-2xl font-semibold text-primary border-b pb-3">
          My Reviews
        </h2>
        <div className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {reviews.map((review) => (
            <div key={review._id} className="p-6 bg-base-200 rounded-lg">
              <img className="rounded-lg w-full" src={review.photoURL} alt="" />
              <div className="mt-6">
                <p className="text-base-content-secondary">
                  Name :{" "}
                  <span className="text-xl font-bold text-base-content">
                    {review.name}
                  </span>
                </p>
                <p className="text-base-content-secondary">
                  Review Date :{" "}
                  <span className="text-lg font-bold text-base-content">
                    {review.reviewDate}
                  </span>
                </p>
                <p className="text-base-content-secondary">
                  Rating :{" "}
                  <span className="text-xl font-bold text-base-content">
                    {review.rating}
                  </span>
                </p>
                <p className="text-base-content-secondary">
                  feedback :{" "}
                  <span className="text-base font-semibold text-base-content">
                    {review.feedback}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyReviews;

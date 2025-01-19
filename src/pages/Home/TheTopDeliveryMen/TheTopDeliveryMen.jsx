import AxiosSecure from "@/hooks/AxiosSecure/AxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ReactStars from "react-rating-stars-component";

const TheTopDeliveryMen = () => {
  const useAxios = AxiosSecure();
  const { data: deliveryMen = [], isLoading } = useQuery({
    queryKey: ["deliveryMen"],
    queryFn: async () => {
      const res = await useAxios.get("/delivery-men");
      return res.data;
    },
  });

  const topDeliveryMen = deliveryMen
    .sort((a, b) => b.averageRating - a.averageRating)
    .slice(0, 3);

  return (
    <>
      <div className="main-container mt-12 md:mt-20 lg:mt-32">
        <div>
          <h2 className="text-xl md:text-3xl lg:text-4xl text-base-content font-bold">
            The Top 3 Delivery Men's
          </h2>
          <p className="text-base-content-secondary mt-2">
            Description of the top 3 delivery men and what makes them stand out.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {topDeliveryMen.map((deliveryMan) => (
            <div key={deliveryMan?._id} className="p-6 bg-base-200 rounded-lg">
              <div>
                <img
                  className="rounded-full h-32 w-32 block mx-auto"
                  src={deliveryMan?.photo_url}
                  alt=""
                />
              </div>
              <div className="mt-6">
                <h3 className="text-xl md:text-2xl font-semibold text-base-content">
                  {deliveryMan?.name}
                </h3>
                <p className="text-base-content-secondary mt-1">
                  Delivered:{" "}
                  <span className="text-xl font-semibold text-base-content">
                    {deliveryMan?.deliveredCount}
                  </span>
                </p>
                <div className="flex items-center gap-1">
                  <ReactStars
                    key={deliveryMan?._id}
                    count={5}
                    value={deliveryMan?.averageRating}
                    edit={false}
                    isHalf={true}
                    size={24}
                    activeColor="#ffd700"
                  />
                  <span>({deliveryMan?.averageRating})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TheTopDeliveryMen;

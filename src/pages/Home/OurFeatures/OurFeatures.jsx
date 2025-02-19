import AxiosSecure from "@/hooks/AxiosSecure/AxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Shield, Zap } from "lucide-react";
import CountUp from "react-countup";

const OurFeatures = () => {
  const useAxios = AxiosSecure();
  const { data: counts = [] } = useQuery({
    queryKey: ["counts"],
    queryFn: async () => {
      const res = await useAxios.get(`/total-count`);
      // console.log(res.data);
      return res.data;
    },
  });
  // console.log(counts);
  const features = [
    {
      icon: <Shield />,
      title: "Secure Handling, Guaranteed",
      description:
        "Your parcels are handled with care and safeguarded throughout the delivery process, ensuring they arrive in perfect condition.",
    },
    {
      icon: <Zap />,
      title: "Lightning-Fast Deliveries",
      description:
        "Get your parcels delivered in record time with our optimized logistics network and real-time tracking.",
    },
    {
      icon: <MapPin />,
      title: "Track in Real Time",
      description:
        "Stay updated with live tracking and instant notifications, keeping you informed every step of the way.",
    },
  ];

  return (
    <>
      <div id="features">
        <div className="main-container">
          <h2 className="text-xl md:text-3xl lg:text-4xl text-base-content font-bold">
            Our Features
          </h2>
          <p className="text-base-content-secondary mt-2">
            Some of the features that set us apart from other delivery services.
          </p>
        </div>
        <div className="main-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {features.map((feature, idx) => (
            <div key={idx} className="p-6 bg-base-200 rounded-lg">
              <div>
                <div className="text-primary">{feature.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-base-content mt-2">
                    {feature.title}
                  </h3>
                  <p className="text-base-content-secondary mt-1">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 md:mt-10 lg:mt-32 py-6 md:py-10 lg:py-32 bg-base-200">
          <div className="main-container">
            <h2 className="text-xl md:text-3xl lg:text-4xl text-base-content font-bold">
              Some Numbers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {/* total parcels card */}
              <div className="p-6 bg-base-100 rounded-lg flex items-center flex-col">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary">
                  <CountUp end={counts.parcels} />
                </h3>
                <p className="text-base-content-secondary mt-1">
                  Total Parcels
                </p>
              </div>
              {/* total delivered card */}
              <div className="p-6 bg-base-100 rounded-lg flex items-center flex-col">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary">
                  <CountUp end={counts.delivered} />
                </h3>
                <p className="text-base-content-secondary mt-1">
                  Total Delivered
                </p>
              </div>
              {/* total users card */}
              <div className="p-6 bg-base-100 rounded-lg flex items-center flex-col">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary">
                  <CountUp end={counts.users} />
                </h3>
                <p className="text-base-content-secondary mt-1">Total Users</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurFeatures;

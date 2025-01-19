import { Input } from "@/components/ui/input";
import bgImg from "../../../assets/images/bg.jpg";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
const Banner = () => {
  return (
    <>
      <div
        className="h-screen flex items-center justify-center bg-cover bg-center px-5"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-0"></div>
        <div className="z-10">
          <div className="max-w-xl flex justify-center flex-col gap-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-center text-white/90 font-bold">
              Simplify Deliveries, <br />
              Streamline Life.
            </h1>
            <p className="text-base text-white/80 text-center">
              Effortlessly track, manage, and organize your parcels with our
              intuitive online platform, ensuring every delivery is smooth and
              stress-free.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-2 mt-6 md:mt-10 lg:mt-12">
            <Input
              type="text"
              placeholder="Search"
              className="bg-base-100 w-full md:w-96 h-12"
            ></Input>
            <Button className="h-12">
              <Search /> Search
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;

import LoadingAnimation from "../../assets/Lottie/loading.json";
import Lottie from "lottie-react";

const LoadingScreen = () => {
  return (
    <>
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-base-200/80 flex justify-center items-center">
        <div className="w-72 md:w-96">
          <Lottie animationData={LoadingAnimation} loop={true} />
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;

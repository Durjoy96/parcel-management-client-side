import ReactConfetti from "react-confetti";
import acceptImg from "../../../../../assets/images/accept.png";

const Success = () => {
  return (
    <>
      <ReactConfetti />
      <div className="flex items-center justify-center h-screen">
        <div className="bg-base-200 border px-6 py-12 rounded-xl flex flex-col items-center max-w-xl">
          <div className="h-28">
            <img className="h-full" src={acceptImg} alt="Success" />
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-base-content mt-4">
            Your payment was successful!
          </h2>
          <p className="text-base text-base-content-secondary mt-2">
            Thank you for your purchase. Your transaction has been completed.
          </p>
        </div>
      </div>
    </>
  );
};

export default Success;

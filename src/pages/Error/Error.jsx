import { useRouteError } from "react-router-dom";
import ErrorLaptopImg from "../../assets/images/error.png";
import { Link } from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="max-w-32 lg:max-w-64">
          <img className="w-full animate-bounce" src={ErrorLaptopImg} alt="" />
        </div>
        <div className="text-center">
          <h2 className="text-4xl lg:text-7xl font-bold text-red-500">
            {error.status}
          </h2>
          <p className="text-base font-bold text-red-500">
            {error.statusText}!
          </p>
        </div>
        <Link
          to="/"
          className="mt-8 px-6 py-2 rounded-full border-2 border-primary bg-primary text-white text-base"
        >
          Go Home
        </Link>
      </div>
    </>
  );
};

export default Error;

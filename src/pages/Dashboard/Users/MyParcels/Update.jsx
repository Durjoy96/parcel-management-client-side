import { useParams } from "react-router-dom";

const Update = () => {
  const { id } = useParams();
  console.log(id);
  return <div></div>;
};

export default Update;

import Banner from "../Banner/Banner";
import OurFeatures from "../OurFeatures/OurFeatures";

const Home = () => {
  return (
    <>
      <section>
        <div>
          <Banner />
        </div>
        <div className="mt-12 md:mt-20 lg:mt-32">
          <OurFeatures />
        </div>
      </section>
    </>
  );
};

export default Home;

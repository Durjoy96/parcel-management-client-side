import Banner from "../Banner/Banner";
import OurFeatures from "../OurFeatures/OurFeatures";
import TheTopDeliveryMen from "../TheTopDeliveryMen/TheTopDeliveryMen";

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
        <TheTopDeliveryMen />
      </section>
    </>
  );
};

export default Home;

const Testimonial = () => {
  return (
    <>
      <section className="main-container py-12 md:py-20 lg:py-32 dark:bg-gray-100 dark:text-gray-800">
        <div className="container flex flex-col items-center mx-auto mb-12 md:p-10 md:px-12">
          <h1 className="p-4 text-4xl font-semibold leading-none text-center">
            What our customers are saying about us
          </h1>
        </div>
        <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div data-aos="fade-right" className="flex flex-col shadow-lg">
            <div className="px-4 py-12 rounded-t-lg sm:px-8 md:px-12 dark:bg-gray-50">
              <p className="relative px-6 py-1 text-lg italic text-center dark:text-gray-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  className="w-8 h-8 dark:text-violet-600"
                >
                  <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                  <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                </svg>
                This parcel management service has been a game-changer for my
                online business. I never worry about deliveries!
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  className="absolute right-0 w-8 h-8 dark:text-violet-600"
                >
                  <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                  <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
                </svg>
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-8 rounded-b-lg dark:bg-violet-600 dark:text-gray-50">
              <img
                src="https://randomuser.me/api/portraits/men/30.jpg"
                alt=""
                className="w-16 h-16 mb-2 -mt-16 bg-center bg-cover rounded-full dark:bg-gray-500"
              />
              <p className="text-xl font-semibold leading-tight">
                Daniel Lewis
              </p>
              <p className="text-sm uppercase">Software Engineer</p>
            </div>
          </div>
          <div data-aos="fade-up" className="flex flex-col shadow-lg">
            <div className="px-4 py-12 rounded-t-lg sm:px-8 md:px-12 dark:bg-gray-50">
              <p className="relative px-6 py-1 text-lg italic text-center dark:text-gray-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  className="w-8 h-8 dark:text-violet-600"
                >
                  <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                  <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                </svg>
                Their storage and delivery options saved me so much time.
                Efficient and professional! Highly recommend!
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  className="absolute right-0 w-8 h-8 dark:text-violet-600"
                >
                  <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                  <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
                </svg>
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-8 rounded-b-lg dark:bg-violet-600 dark:text-gray-50">
              <img
                src="https://randomuser.me/api/portraits/men/9.jpg"
                alt=""
                className="w-16 h-16 mb-2 -mt-16 bg-center bg-cover rounded-full dark:bg-gray-500 "
              />
              <p className="text-xl font-semibold leading-tight">
                James Robinson
              </p>
              <p className="text-sm uppercase">Marketing Manager</p>
            </div>
          </div>
          <div data-aos="fade-left" className="flex flex-col shadow-lg">
            <div className="px-4 py-12 rounded-t-lg sm:px-8 md:px-12 dark:bg-gray-50">
              <p className="relative px-6 py-1 text-lg italic text-center dark:text-gray-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  className="w-8 h-8 dark:text-violet-600"
                >
                  <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                  <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                </svg>
                Super convenient! The notifications are instant, and I can pick
                up my parcels hassle-free. Highly recommend!
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  className="absolute right-0 w-8 h-8 dark:text-violet-600"
                >
                  <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                  <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
                </svg>
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-8 rounded-b-lg dark:bg-violet-600 dark:text-gray-50">
              <img
                src="https://randomuser.me/api/portraits/women/70.jpg"
                alt=""
                className="w-16 h-16 mb-2 -mt-16 bg-center bg-cover rounded-full dark:bg-gray-500 "
              />
              <p className="text-xl font-semibold leading-tight">
                Olivia Carter
              </p>
              <p className="text-sm uppercase">E-commerce Seller</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonial;

import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <>
      <section id="contact" className="bg-base-200 py-12 md:py-20 lg:py-32">
        <div className="grid max-w-screen-xl mx-auto grid-cols-1 gap-8 rounded-lg md:grid-cols-2 px-5 dark:bg-gray-100 dark:text-gray-800">
          <div className="flex flex-col justify-between">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold leading-tight lg:text-5xl">
                Let's talk!
              </h2>
              <div className="dark:text-gray-600 text-base-content-secondary">
                have a question or want to say hi? we'd love to hear from you!
              </div>
            </div>
            <img
              src="https://mambaui.com/assets/svg/doodle.svg"
              alt=""
              className="p-6 h-52 md:h-64"
            />
          </div>
          <form noValidate="" className="space-y-6">
            <div>
              <label htmlFor="name" className="text-sm">
                Full name
              </label>
              <input
                id="name"
                type="text"
                placeholder=""
                className="w-full p-3 rounded dark:bg-gray-100"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full p-3 rounded dark:bg-gray-100"
              />
            </div>
            <div>
              <label htmlFor="message" className="text-sm">
                Message
              </label>
              <textarea
                id="message"
                rows="3"
                className="w-full p-3 rounded dark:bg-gray-100"
                spellcheck="false"
                data-ms-editor="true"
              ></textarea>
            </div>
            <Button
              type="submit"
              className=" w-full p-3 text-sm font-bold tracking-wide uppercase rounded dark:bg-violet-600 dark:text-gray-50"
            >
              Send Message
            </Button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;

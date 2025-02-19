import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = () => {
  return (
    <div id="faq" className="flex gap-8 flex-col md:flex-row">
      <h2 className="text-xl md:text-3xl lg:text-4xl text-base-content font-bold">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            1. What is a parcel management service?
          </AccordionTrigger>
          <AccordionContent>
            A parcel management service helps individuals and businesses
            receive, store, track, and distribute packages efficiently. It is
            useful for e-commerce, offices, residential buildings, and logistics
            companies.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            2. How does your parcel management system work?
          </AccordionTrigger>
          <AccordionContent>
            We receive parcels on your behalf, log them into our system, notify
            you, and store them securely until you collect or request delivery.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            3. Who can use your parcel management service?
          </AccordionTrigger>
          <AccordionContent>
            Our service is ideal for residential complexes, offices, e-commerce
            businesses, and individuals who receive frequent deliveries.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>
            4. Do I need to sign up for your service?
          </AccordionTrigger>
          <AccordionContent>
            Yes, you must create an account with us to use our parcel management
            features.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>
            5. Can someone else pick up my parcel?
          </AccordionTrigger>
          <AccordionContent>
            Yes, you can authorize someone else to collect your parcel by
            providing them with a unique pickup code or written permission.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger>6. Are my parcels safe with you?</AccordionTrigger>
          <AccordionContent>
            Yes, we have secure storage facilities with CCTV surveillance and
            access control to ensure the safety of your parcels.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Faq;

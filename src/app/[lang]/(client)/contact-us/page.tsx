import ContactForm from "@/components/contact/ContactForm";
import { Content } from "@/components/contact/Content";

const Page = async () => {
  return (
    <section>
      <div className="max-w-screen-xl mx-auto grid py-11 md:grid-cols-2 lg:w-full">
        <ContactForm />
        <Content />
      </div>
    </section>
  );
};

export default Page;

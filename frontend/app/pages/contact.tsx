import { TextImageSplit } from "../components/ui/text-image-split";
import { ContactForm } from "../views/contact/form";

export default function Contact() {
  return (
    <div>
      <TextImageSplit
        heading="Contact"
        text="If you are interested in volunteering as a researcher or have general questions please use the email form below to contact the project director."
        split="3/2"
        backgroundColor="primary"
      />
      <ContactForm
        backgroundColor="secondary"
      />
    </div>
  )
}

import Layout from '../components/utils/Layout';
import dynamic from 'next/dynamic';
import usePageNumber from '../lib/hooks/usePageNumber';


export default function Contact() {
    usePageNumber(5)
    const ContactForm = dynamic(() =>
        import('../components/ui/contact-form')
    )
    return (
        <ContactForm />
    )
}
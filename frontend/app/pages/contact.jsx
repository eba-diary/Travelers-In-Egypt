
import Layout from '../components/utils/Layout';
import dynamic from 'next/dynamic';


export default function Contact() {
    const ContactForm = dynamic(() =>
        import('../components/content/contact-form')
    )
    return (
        <Layout index={4}>
            <ContactForm />
        </Layout>
    )
}
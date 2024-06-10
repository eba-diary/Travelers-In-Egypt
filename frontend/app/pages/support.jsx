import Layout from '../components/utils/layout';
import dynamic from 'next/dynamic';


export default function Contact() {
    const ContactForm = dynamic(() =>
        import('../components/ui/support')
    )
    return (
        <Layout index={5}>
            <ContactForm />
        </Layout>
    )
}


// styles
import { PageSection } from '@/shared/_layouts/pageSection/PageSection';
import styles from './Contact.module.scss';
import { ContactForm } from '../contactForm/ContactForm';

export const Contact = () => {
  return (
    <PageSection>
      <h2>Send a Request!</h2>
      <ContactForm
        page='contact'
      />
    </PageSection>
  )
}

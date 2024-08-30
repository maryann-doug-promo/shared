"use client"

// Google reCaptcha stuff
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

// components
import { ContactForm } from '../contactForm/ContactForm';

interface ContactFormWrapperProps {
  page: string;
  classNameFields?: string;
  classNameSubmitButton?: string;
}

export const ContactFormWrapper = ({ classNameFields, classNameSubmitButton, page }: ContactFormWrapperProps) => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}>
      <ContactForm
        classNameFields={classNameFields}
        classNameSubmitButton={classNameSubmitButton}
        page={page}
      />
    </GoogleReCaptchaProvider>
  )
}

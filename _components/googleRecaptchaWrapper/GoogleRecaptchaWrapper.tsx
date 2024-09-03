"use client"

// Google reCaptcha stuff
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

interface ContactFormWrapperProps {
  children: React.ReactNode;
}

export const GoogleRecaptchaWrapper = ({ children }: ContactFormWrapperProps) => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}>
      {children}
    </GoogleReCaptchaProvider>
  )
}

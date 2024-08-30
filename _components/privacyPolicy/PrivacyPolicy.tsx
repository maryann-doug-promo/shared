
// layouts
import { PageSection } from "@/shared/_layouts/pageSection/PageSection";

// styles
import styles from './PrivacyPolicy.module.scss';

interface PrivacyPolicyProps {
  businessName: string;
  email: string;
}

export const PrivacyPolicy = ({ businessName, email }: PrivacyPolicyProps) => {
  return (
    <PageSection>
      <div>
        <h1 className={styles.title}>Privacy Policy</h1>
        <h2>1. Introduction</h2>
        <p className={styles.description}>
          At {businessName} I am committed to protecting your privacy.
          This privacy policy explains how we collect, use, and protect your information when you visit our website.
        </p>
        <h2>2. Information Collected</h2>
        <p className={styles.description}>
          When you send me an email on the website the following information is collected in the email:
        </p>
        <ul className={styles.ul}>
          <li><strong>Name:</strong> Provided by you when submitting a form.</li>
          <li><strong>Email Address:</strong> Provided by you when submitting a form.</li>
          <li><strong>Phone Number:</strong> Provided by you when submitting a form.</li>
          <li><strong>Message Content:</strong> Any additional information you include in your message.</li>
        </ul>
        <p className={styles.description}>
          We also use Google reCAPTCHA to protect our site from spam and abuse. Google reCAPTCHA may collect information to determine whether you are a human or a bot.
        </p>
        <h2>3. How We Use Information</h2>
        <p className={styles.description}>
          We use the information we collect to:
        </p>
        <ul className={styles.ul}>
          <li>Respond to your inquiries.</li>
          <li>Protect our website from spam and abuse.</li>
        </ul>
        <h2>4. How to Request Deletion</h2>
        <p className={styles.description}>
          If you have submitted information through our contact form and would like it to be deleted, please contact us at <strong>{email}</strong>.
          We will manually delete your information from our records.
        </p>
        <h2>5. Third-Party Services</h2>
        <p className={styles.description}>
          We use Google reCAPTCHA to protect our site. Google reCAPTCHA may collect certain information to determine whether you are a human or a bot.
          This information is collected in accordance with Google's <a className={styles.link} href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and <a className={styles.link} href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a>.
        </p>
        <h2>6. Changes to This Policy</h2>
        <p className={styles.description}>
          We may update this privacy policy from time to time. The latest version will always be available on our website.
        </p>
        <h2>7. Contact Us</h2>
        <p className={styles.description}>
          If you have any questions about this privacy policy, please contact us at <strong>{email}</strong>.
        </p>
      </div>
    </PageSection>
  )
}



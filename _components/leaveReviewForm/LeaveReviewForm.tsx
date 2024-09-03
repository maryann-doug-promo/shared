"use client"

// Google reCaptcha stuff
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import classNames from 'classnames';
import { useEffect, useState, useRef } from 'react';
import { useFormState } from 'react-dom';

// actions
import { leaveReviewAction } from '@/shared/_actions/review';

// componets
import { SubmitFormButton } from '../submitFormButton/SubmitFormButton';

// styles
import styles from './LeaveReviewForm.module.scss';


interface LeaveReviewStateType {
  message: string | null;
  success: boolean | null;
}

const initialState: LeaveReviewStateType = {
  message: null,
  success: false
};

interface LeaveReviewFormProps {
  page: string;
  className?: string;
  classNameButton?: string;
  handleCloseForm: () => void;
}

export const LeaveReviewForm = ({ page, className, classNameButton, handleCloseForm }: LeaveReviewFormProps) => {

  const [leaveReviewState, leaveReview] = useFormState(leaveReviewAction, initialState);
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const formRef = useRef<HTMLFormElement>(null);

  const { executeRecaptcha } = useGoogleReCaptcha();
  const [recaptchaToken, setReCaptachToken] = useState<string>("");

  const handleFormReset = () => {
    formRef.current?.reset();
  }

  useEffect(() => {

    if (leaveReviewState.success == true) {
      handleFormReset();
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        // close the pop up to submit a review
        handleCloseForm();
      }, 5000);
    } else {
      setShowMessage(true);
    }

  }, [leaveReviewState, handleCloseForm]);

  useEffect(() => {
    const updateReCaptchaToken = async () => {
      if (executeRecaptcha) {
        const token = await executeRecaptcha("submit");
        setReCaptachToken(token);
      } else {
        setReCaptachToken("");
      }
    };
    updateReCaptchaToken();
  }, [executeRecaptcha]);

  return (
    <form className={classNames(styles.leaveReviewForm, className)} action={leaveReview} ref={formRef}>
      <h2 className={styles.title}>Leave a new review</h2>
      <div className={styles.fields}>
        <div className={styles.fieldContainer}>
          <label
            className={styles.label}
            htmlFor={`${page}-leaveReview-input-firstName`}
          >
            First Name:
          </label>
          <input
            id={`${page}-leaveReview-input-firstName`}
            className={styles.input}
            name="first_name"
            type='text'
            required={true}
            placeholder="John"
            minLength={3}
            maxLength={50}
          />
        </div>
        <div className={styles.fieldContainer}>
          <label
            className={styles.label}
            htmlFor={`${page}-leaveReview-input-lastName`}
          >
            Last Name:
          </label>
          <input
            id={`${page}-leaveReview-input-lastName`}
            className={styles.input}
            name="last_name"
            type='text'
            required={true}
            placeholder="Smith"
            minLength={3}
            maxLength={50}
          />
        </div>
        <div>
          <label
            className={styles.label}
            htmlFor={`${page}-leaveReview-rating`}
          >
            Rating:
          </label>
          <select
            id={`${page}-leaveReview-rating`}
            name="rating"
            required={true}
          >
            <option></option>
            {Array.from({ length: 5 }, (_, index) => {
              const value = index + 1;
              return (
                <option
                  key={`${page}-leaveReview-rating-${value}`}
                  value={value}
                >
                  {value}
                </option>
              )
            })}
          </select>
        </div>
        <div className={styles.fieldContainer}>
          <label
            className={styles.label}
            htmlFor={`${page}-leaveReview-review-textArea`}
          >
            Review:
          </label>
          <textarea
            id={`${page}-leaveReview-review-textArea`}
            className={styles.textarea}
            minLength={2}
            maxLength={2000}
            placeholder="Leave Review"
            name="message"
            rows={4}
            required={true}
          />
        </div>
        {/* This is for the reCaptcha with google */}
        <input type="hidden" name="recaptcha" value={recaptchaToken} />
        <SubmitFormButton
          text='Submit Review'
          className={classNameButton}
        />
        {(leaveReviewState.message && showMessage) && (
          <h3
            className={leaveReviewState.success ? styles.successMessage : styles.error}
          >
            {leaveReviewState.message}
          </h3>
        )}
      </div>
    </form>
  )
}

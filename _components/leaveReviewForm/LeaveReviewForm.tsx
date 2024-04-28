"use client"

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
  handleCloseForm: () => void;
}

export const LeaveReviewForm = ({ page, handleCloseForm }: LeaveReviewFormProps) => {

  const [leaveReviewState, leaveReview] = useFormState(leaveReviewAction, initialState);
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const formRef = useRef<HTMLFormElement>(null);

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

  return (
    <form className={styles.leaveReviewForm} action={leaveReview} ref={formRef}>
      <h2 className={styles.title}>Leave a new review</h2>
      <div className={styles.fields}>
        <div className={styles.fieldContainer}>
          <label
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
            htmlFor={`${page}-leaveReview-rating`}
            className={styles.label}
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
            htmlFor={`${page}-leaveReview-review-textArea`}
            className={styles.label}
          >
            Review:
          </label>
          <textarea
            id={`${page}-leaveReview-review-textArea`}
            minLength={2}
            maxLength={2000}
            placeholder="Leave Review"
            name="message"
            rows={4}
            required={true}
          />
        </div>
        <SubmitFormButton
          text='Submit Review'
          className={
            classNames(
              styles.submitButton,
            )
          }
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

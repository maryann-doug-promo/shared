"use client"

import classNames from 'classnames';

import { useState } from 'react';

// components
import { GoogleRecaptchaWrapper } from '../googleRecaptchaWrapper/GoogleRecaptchaWrapper';
import { LeaveReviewForm } from '../leaveReviewForm/LeaveReviewForm';

import content from '../../content/leaveReview.json';

// styles
import styles from './LeaveReview.module.scss';
import { SplashScreen } from '@/shared/_layouts/splashScreen/SplashScreen';

interface LeaveReviewProps {
  classNameButton?: string;
  classNameForm?: string;
  buttonText?: string;
}

export const LeaveReview = ({ classNameButton, classNameForm, buttonText }: LeaveReviewProps) => {

  const [leaveNewReview, setLeaveNewReview] = useState(false);

  return (
    <>
      {leaveNewReview ? (
        <SplashScreen
          handleClose={() => {
            setLeaveNewReview(false);
          }}
        >
          <GoogleRecaptchaWrapper>
            <LeaveReviewForm
              page="reviews"
              className={classNameForm}
              classNameButton={classNameButton}
              handleCloseForm={() => {
                setLeaveNewReview(false);
              }}
            />
          </GoogleRecaptchaWrapper>
        </SplashScreen>
      ) : (
        <button
          className={classNames(styles.writeReviewButton, classNameButton)}
          onClick={() => {
            setLeaveNewReview(true)
          }}
        >
          {buttonText ?? content.buttonText}
        </button>
      )}
    </>
  )
}

"use client"

import classNames from 'classnames';
import { useFormState } from 'react-dom';

// types
import { ReviewType } from '@/shared/types/review';

// actions
import { approveReviewAction } from '@/shared/_actions/review';

// styles
import styles from './ApproveReviewForm.module.scss';

interface ApproveReviewStateType {
  message: string | null;
  success: boolean | null;
}

const initialState: ApproveReviewStateType = {
  message: null,
  success: null,
};

interface ApproveFormProps {
  review: ReviewType
}

export const ApproveForm = ({ review }: ApproveFormProps) => {

  const [approveState, approveReview] = useFormState(approveReviewAction, initialState);

  return (
    <form className={styles.approveForm} action={approveReview}>
      <input
        type="hidden"
        name="review_id"
        value={review.id.toString()}
      />
      {approveState.success ? (
        <h3 className={styles.success}>{approveState.message}</h3>
      ) : (
        <>
          <h3>Do you approve of this review?</h3>
          <div className={styles.submitButtons}>
            <button
              className={classNames(styles.submitButton, styles.yesButton)}
              type="submit"
              name="approve"
              value='true'
            >
              Yes
            </button>
            <button
              className={classNames(styles.submitButton, styles.noButton)}
              type="submit"
              name="approve"
              value='false'
            >
              No
            </button>
          </div>
          {approveState.success === false && (
            <h3 className={styles.error}>{approveState.message}</h3>
          )}
        </>
      )
      }
    </form >
  )
}

"use server"

// types
import { ReviewType } from '../../types/review';

// layouts
import { PageSection } from '../../_layouts/pageSection/PageSection';

// components
import { ApproveForm } from '../approveReviewForm/ApproveReviewForm';
import { Review } from '../review/Review';

// styles
import styles from './ApproveReview.module.scss';

interface ApproveReviewProps {
  review: null | ReviewType
}

export const ApproveReview = ({ review }: ApproveReviewProps) => {
  return (
    <PageSection innerStyle={styles.innerStyle}>
      {!review ? (
        <h1 className={styles.noReview}>No Review was identified with that id.</h1>
      ) : (
        <>
          <h1 className={styles.title}>Please see the following review.</h1>
          <Review
            review={review}
            page="approve"
            type="review"
          />
          <ApproveForm
            review={review}
          />
        </>
      )}
    </PageSection>
  )
}

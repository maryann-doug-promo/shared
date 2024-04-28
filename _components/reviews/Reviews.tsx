"use Server"

import classNames from 'classnames';

import { unstable_noStore } from 'next/cache';

// DB Functions
import { getReviews, getFavoriteReviews } from '../../lib/db/review';

// type
import { ReviewType } from '../../types/review';

// layouts
import { PageSection } from '@/shared/_layouts/pageSection/PageSection';

// components
import { Review } from '../review/Review';

// styles
import styles from './Reviews.module.scss';

interface ReviewsProps {
  isFavorites: boolean;
  sectionTitle?: React.ReactNode;
  classNameCard?: string;
}

export const Reviews = async ({ classNameCard, isFavorites, sectionTitle }: ReviewsProps) => {
  // TODO once you get caching right you implement it
  // TODO for now not enough time
  unstable_noStore();

  let reviews: ReviewType[] = [];
  if (isFavorites) {
    reviews = await getFavoriteReviews();
  } else {
    reviews = await getReviews();
  }
  return (
    <PageSection>
      {sectionTitle}
      <div className={styles.reviews}>
        {reviews.map((review: ReviewType, index: number) => {
          return (
            <Review
              key={`reviews_page_review_${index}`}
              review={review}
              page='reviews'
              type={review.favorite ? 'favorite' : 'normal'}
              classNameCard={classNameCard}
            />
          )
        })}
      </div>
    </PageSection>
  )
}

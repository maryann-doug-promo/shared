"use server"

import classNames from 'classnames';

// layouts
import { Card } from '@/shared/_layouts/card/Card';

// types
import { ReviewType } from '@/shared/types/review';

// content
import content from '../../content/review.json';

// styles
import styles from './Review.module.scss';
import { Icon } from '../../../app/_components/icon/Icon';
import { getTimeAgo } from '@/shared/lib/utils';

interface ReviewProps {
  review: ReviewType;
  page: string;
  type: string;
  classNameCard?: string;
}

export const Review = ({ review, page, type, classNameCard }: ReviewProps) => {

  const timeAgo = getTimeAgo(review.updated_at);

  return (
    <>
      <Card className={classNames(styles.card, classNameCard)}>
        <h3>{review.reviewer_name}</h3>
        <div className={styles.rating}>
          {Array.from({ length: review.rating }, (_, index) => {
            return (
              <div
                key={`review_${review.id}_${page}_${type}_rating_star_${index}`}
                className={styles.starContainer}
              >
                <Icon
                  id={content.star.id}
                  alt={content.star.alt}
                  tooltip={content.star.tooltip}
                />
              </div>
            );
          })}
          <span className={styles.timeAgo}>{timeAgo}</span>
        </div>
        <p>{review.message}</p>
      </Card>
    </>
  )
}

"use server"

import classNames from 'classnames';

// layouts
import { Card } from '@/shared/_layouts/card/Card';

// components
import { LinkButton } from '../linkButton/LinkButton';

// styles
import styles from './GeneralCard.module.scss';

interface GeneralCardProps {
  cardClassName?: string;
  description: string;
  title: string;
  callToActionButton?: {
    href: string;
    label: string;
  };
  classNameCallToActionButton?: string;
  classNameDescription?: string;

}

export const GeneralCard = ({
  title,
  description,
  cardClassName,
  callToActionButton,
  classNameCallToActionButton,
  classNameDescription
}: GeneralCardProps) => {
  return (
    <Card className={classNames(styles.generalCard, "cardBorders", cardClassName)}>
      <h3 className={styles.title}>{title}</h3>
      <p className={classNames(styles.description, classNameDescription)}>{description}</p>
      {callToActionButton && (
        <LinkButton
          className={classNames(styles.link, classNameCallToActionButton)}
          content={callToActionButton}
        />
      )}
    </Card>
  )
}

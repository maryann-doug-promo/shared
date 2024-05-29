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
  description?: string;
  list?: string[],
  title: string;
  callToActionButton?: {
    href: string;
    label: string;
  };
  classNameCallToActionButton?: string;
  classNameDescription?: string;
  classNameList?: string;
}

export const GeneralCard = ({
  title,
  description,
  list,
  cardClassName,
  callToActionButton,
  classNameCallToActionButton,
  classNameDescription,
  classNameList
}: GeneralCardProps) => {
  return (
    <Card className={classNames(styles.generalCard, "cardBorders", cardClassName)}>
      <h3 className={styles.title}>{title}</h3>
      {description && (
        <p className={classNames(styles.description, classNameDescription)}>{description}</p>
      )}
      {list && (
        <ul className={styles.list}>
          {list.map((item: string, index: number) => {
            return (
              <li
                key={`${title}_list_item_${index}`}
                className={classNames(styles.listItem, classNameList)}
              >
                {item}
              </li>
            )
          })}
        </ul>
      )}
      {callToActionButton && (
        <LinkButton
          className={classNames(styles.link, classNameCallToActionButton)}
          content={callToActionButton}
        />
      )}
    </Card>
  )
}

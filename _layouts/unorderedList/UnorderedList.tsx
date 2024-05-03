
import classNames from 'classnames';

// styles
import styles from './UnorderedList.module.scss';

interface UnorderedListProps {
  items: string[] | React.ReactNode[];
  category: string;
  page: string;
  className?: string;
}

export const UnorderedList = ({ items, category, page, className }: UnorderedListProps) => {
  return (
    <ul className={classNames(styles.items, className)}>
      {items.map((item: string | React.ReactNode, index: number) => {
        return (
          <li
            className={styles.item}
            key={`${page}-${category}-${index}`}
          >
            {item}
          </li>
        )
      })}
    </ul>
  )
}

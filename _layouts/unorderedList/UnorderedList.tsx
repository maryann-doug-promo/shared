
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
    <ul className={classNames(styles.unorderedList, className)}>
      {items.map((item: string | React.ReactNode, index: number) => {
        return (
          <li key={`${page}-${category}-${index}`}>
            {item}
          </li>
        )
      })}
    </ul>
  )
}

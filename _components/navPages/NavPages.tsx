
import classNames from 'classnames'

// types
import { PageLinkType } from '@/shared/types/links'

// import components
import { PageLink } from '../linkPage/LinkPage'

// styles
import styles from './NavPages.module.scss';

interface NavPagesProps {
  pages: PageLinkType[];
  placeCalling: string;
}

export const NavPages = ({ pages, placeCalling }: NavPagesProps) => {
  return (
    <nav className={classNames(styles.nav, 'containerFullPage')}>
      {pages.map((page: PageLinkType) => {
        return (
          <PageLink
            key={`${placeCalling}_pages_nav_link_${page.id}`}
            page={page}
          />
        );
      })}
    </nav>
  )
}

"use client"

import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

// types
import { PageLinkType } from '../../types/links';

// styles
import styles from './LinkPage.module.scss';


interface HeaderLinkProps {
  page: PageLinkType
}

export const HeaderLink = ({ page }: HeaderLinkProps) => {
  const pathname = usePathname()
  return (
    <Link
      className={
        classNames(
          pathname === page.href ? styles.active : undefined,
          styles.link
        )
      }
      href={page.href}
      title={page.tooltip}
    >
      {page.label}
    </Link>
  )
}

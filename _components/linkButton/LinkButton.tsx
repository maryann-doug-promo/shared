"use server"

import classNames from "classnames";
import Link from "next/link";

// types
import { LinkButtonType } from "../../types/linkButton";

// styles
import styles from './LinkButton.module.scss';

interface LinkButtonProps {
  className?: string;
  content: LinkButtonType
}

export const LinkButton = ({ className, content }: LinkButtonProps) => {
  return (
    <Link
      href={content.href}
      className={classNames(className, styles.linkButton)}
    >
      {content.label}
    </Link>
  )
}

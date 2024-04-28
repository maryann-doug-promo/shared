
// components
import { Icon } from '@/app/_components/icon/Icon';

// styles
import styles from './SplashScreen.module.scss';

interface SplashScreenProps {
  children: React.ReactNode;
  handleClose: () => void
}

export const SplashScreen = ({ children, handleClose }: SplashScreenProps) => {
  return (
    <div className={styles.splashScreen}>
      <button
        className={styles.closeButton}
        onClick={handleClose}
      >
        <div className={styles.closeIconContainer}>
          <Icon
            id="close"
            alt="Close Icon"
            tooltip="Close the splash screen"
          />
        </div>
      </button>
      {children}
    </div>
  )
}

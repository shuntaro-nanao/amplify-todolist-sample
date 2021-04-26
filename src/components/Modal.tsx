import { FC, ReactNode } from 'react'
import styles from './Modal.module.scss'

type ModalProps = {
  isOpen: boolean
  activator: ReactNode
  clickOutSide?: () => void
}

export const Modal: FC<ModalProps> = ({
  children,
  clickOutSide,
  activator,
  isOpen,
}) => {
  return (
    <>
      {activator}
      <div
        className={styles['modal-wrapper']}
        onClick={clickOutSide}
        style={{ display: isOpen ? undefined : 'none' }}
      >
        <div className={styles['modal']} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </>
  )
}
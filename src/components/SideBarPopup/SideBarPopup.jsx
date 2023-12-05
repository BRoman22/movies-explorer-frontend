import { createPortal } from 'react-dom';
import usePopupClose from '../../hooks/usePopupClose';
import './SideBarPopup.css';
import SideBar from './SideBar/SideBar';

const modalRoot = document.querySelector('#modals');

export default function SideBarPopup({ isOpen, onClose }) {
  usePopupClose(isOpen, onClose);

  return createPortal(
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <SideBar isOpen={isOpen} onClose={onClose} />
    </div>,
    modalRoot,
  );
}

import { createPortal } from 'react-dom';
import usePopupClose from '../../hooks/usePopupClose';
import './Popup.css';
import SideBar from '../Header/SideBar/SideBar';

const modalRoot = document.querySelector('#modals');

export default function Popup({ isOpen, handleTogglePopup }) {
  usePopupClose(isOpen, handleTogglePopup);

  return createPortal(
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <SideBar isOpen={isOpen} handleTogglePopup={handleTogglePopup} />
    </div>,
    modalRoot,
  );
}

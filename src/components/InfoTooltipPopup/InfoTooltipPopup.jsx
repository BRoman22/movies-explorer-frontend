import { createPortal } from 'react-dom';
import usePopupClose from '../../hooks/usePopupClose';
import './InfoTooltipPopup.css';

const modalRoot = document.querySelector('#modals');

export default function InfoTooltipPopup({ isOpen, onClose, errorMessage }) {
  usePopupClose(isOpen, onClose);

  return createPortal(
    <div className={`popup ${isOpen && 'popup_opened'}`}>
      <div className='infoTooltip'>
        <span className='infoTooltip__text'>{errorMessage}</span>
      </div>
    </div>,
    modalRoot,
  );
}

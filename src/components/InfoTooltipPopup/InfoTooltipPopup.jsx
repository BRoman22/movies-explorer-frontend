import { createPortal } from 'react-dom';
import usePopupClose from '../../hooks/usePopupClose';
import './InfoTooltipPopup.css';
import successLogo from '../../images/unionSuccess.svg';
import { ERROR } from '../../utils/constants';

const modalRoot = document.querySelector('#modals');

export default function InfoTooltipPopup({ isOpen, onClose, errorMessage }) {
  usePopupClose(isOpen, onClose);

  return createPortal(
    <div className={`popup ${isOpen && 'popup_opened'}`}>
      <div className='infoTooltip'>
        {errorMessage === ERROR.SUCCESS ? (
          <img src={successLogo} alt='Успех!' className='infoTooltip__logo' />
        ) : (
          <span className='infoTooltip__text'>{errorMessage}</span>
        )}
      </div>
    </div>,
    modalRoot,
  );
}

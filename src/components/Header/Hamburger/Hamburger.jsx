import './Hamburger.css';

export default function Hamburger({ handleTogglePopup }) {
  return (
    <button
      type='button'
      aria-label='Боковое меню'
      className='hamburger'
      onClick={handleTogglePopup}
    >
      <span className='hamburger__line' />
      <span className='hamburger__line' />
      <span className='hamburger__line' />
    </button>
  );
}

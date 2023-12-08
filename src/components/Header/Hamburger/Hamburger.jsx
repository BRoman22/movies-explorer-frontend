import './Hamburger.css';

export default function Hamburger({ handleOpenSideBar }) {
  return (
    <button
      type='button'
      aria-label='Боковое меню'
      className='hamburger'
      onClick={handleOpenSideBar}
    >
      <span className='hamburger__line' />
      <span className='hamburger__line' />
      <span className='hamburger__line' />
    </button>
  );
}

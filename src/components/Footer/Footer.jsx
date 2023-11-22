import './Footer.css';

export default function Footer() {
  return (
    <footer className='footer'>
      <h2 className='footer__title'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <hr className='line line_footer' />
      <span className='footer__text'>© 2023</span>
      <a
        href='https://practicum.yandex.ru/'
        target='_blank'
        rel='noreferrer'
        className='footer__link'
      >
        Яндекс.Практикум
      </a>
      <a
        href='https://github.com/BRoman22'
        target='_blank'
        rel='noreferrer'
        className='footer__link'
      >
        Github
      </a>
    </footer>
  );
}

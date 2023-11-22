import './Portfolio.css';

export default function Portfolio() {
  return (
    <section className='portfolio'>
      <h3 className='portfolio__subtitle'>Портфолио</h3>
      <ul className='portfolio__list'>
        <li className='portfolio__item'>
          <a
            className='portfolio__link'
            href='https://broman22.github.io/how-to-learn/'
            target='_blank'
            rel='noreferrer'
          >
            <p className='portfolio__text'>Статичный сайт</p>
            <span>↗</span>
          </a>
          <hr className='line line_portfolio' />
        </li>
        <li className='portfolio__item'>
          <a
            className='portfolio__link'
            href='https://broman22.github.io/russian-travel/'
            target='_blank'
            rel='noreferrer'
          >
            <p className='portfolio__text'>Адаптивный сайт</p>
            <span>↗</span>
          </a>
          <hr className='line line_portfolio' />
        </li>
        <li className='portfolio__item'>
          <a
            className='portfolio__link'
            href='https://broman22.github.io/react-mesto-auth/'
            target='_blank'
            rel='noreferrer'
          >
            <p className='portfolio__text'>Одностраничное приложение</p>
            <span>↗</span>
          </a>
        </li>
      </ul>
    </section>
  );
}

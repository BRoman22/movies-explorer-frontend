import './AboutMe.css';
import photo from '../../../images/test-photo.png';

export default function AboutMe() {
  return (
    <section className='about-me'>
      <h2 className='subtitle subtitle_letter-spacing'>Студент</h2>
      <hr className='line line_place' />
      <div className='about-me__container'>
        <h2 className='about-me__title'>Виталий</h2>
        <h3 className='about-me__subtitle'>Фронтенд-разработчик, 30 лет</h3>
        <p className='text text_about-me'>
          Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня
          есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом.
          Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
          После того, как прошёл курс по веб&#8209;разработке, начал заниматься
          фриланс-заказами и ушёл с постоянной работы.
        </p>
        <img src={photo} alt='Виталий' className='about-me__photo' />
        <a
          className='about-me__link'
          href='https://github.com/BRoman22'
          target='_blank'
          rel='noreferrer'
        >
          Github
        </a>
      </div>
    </section>
  );
}

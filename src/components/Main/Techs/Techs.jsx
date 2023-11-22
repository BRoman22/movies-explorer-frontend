import './Techs.css';

export default function Techs() {
  return (
    <section className='techs'>
      <h3 className='subtitle subtitle_letter-spacing'>Технологии</h3>
      <hr className='line line_place' />
      <h2 className='techs__title'>7 технологий</h2>
      <p className='text text_letter-spacing text_techs'>
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <ul className='techs__list'>
        <li className='tech__item'>HTML</li>
        <li className='tech__item'>CSS</li>
        <li className='tech__item'>JS</li>
        <li className='tech__item'>React</li>
        <li className='tech__item'>Git</li>
        <li className='tech__item'>Express.js</li>
        <li className='tech__item'>mongoDB</li>
      </ul>
    </section>
  );
}

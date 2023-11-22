import './AboutProject.css';

export default function AboutProject() {
  return (
    <section className='about-project' id='about-project'>
      <h3 className='subtitle subtitle_letter-spacing'>О проекте</h3>
      <hr className='line line_place' />
      <div className='about-project__two-columns'>
        <h3 className='about-project__subtitle about-project__subtitle_one'>
          Дипломный проект включал 5 этапов
        </h3>
        <h3 className='about-project__subtitle about-project__subtitle_two'>
          На выполнение диплома ушло 5 недель
        </h3>
        <p className='text text_about-project'>
          Составление плана, работу над бэкендом, вёрстку, добавление
          функциональности и финальные доработки.
        </p>
        <p className='text'>
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
          соблюдать, чтобы успешно защититься.
        </p>
      </div>
      <div className='about-project__progress'>
        <h3 className='about-project__progress-title about-project__progress-title_green'>
          1 неделя
        </h3>
        <h3 className='about-project__progress-title'>4 недели</h3>
        <p className='about-project__progress-text'>Back-end</p>
        <p className='about-project__progress-text'>Front-end</p>
      </div>
    </section>
  );
}

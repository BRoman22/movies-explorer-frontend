import './MoviesCard.css';

export default function MoviesCard({ movie }) {
  return (
    <article className='movies-card'>
      <div className='movies-card__container'>
        <h2 className='movies-card__title'>{movie?.title}</h2>
        <span className='movies-card__subtitle'>{movie?.duration}</span>
        <button aria-label='Сохранить' className='movies-card__button'></button>
      </div>
      <a href={movie.image} target='_blank' rel='noreferrer'>
        <img
          src={movie?.image}
          alt={movie?.title}
          className='movies-card__image'
        />
      </a>
    </article>
  );
}

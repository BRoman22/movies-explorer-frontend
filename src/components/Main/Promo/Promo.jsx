import './Promo.css';

export default function Promo() {
  return (
    <section className='promo'>
      <h1 className='title title_promo'>
        Учебный проект студента факультета Веб&#8209;разработки.
      </h1>
      <h2 className='promo__subtitle'>
        Листайте ниже, чтобы узнать больше про этот проект и его создателя.
      </h2>
      <div className='promo__logo'></div>
      <a className='promo__link' href='#about-project'>
        Узнать больше
      </a>
    </section>
  );
}

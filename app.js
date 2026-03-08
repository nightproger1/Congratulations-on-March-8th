import { Sora } from './sora.js';

const memes = [
  {
    tone: 'card-pop',
    tag: 'POV',
    title: 'Март увидел тебя и сразу включил soft focus.',
    text: 'Пусть сегодня всё складывается красиво: настроение, планы, кофе и внезапные комплименты.',
  },
  {
    tone: 'card-console',
    tag: 'status.exe',
    title: 'battery: 100% | stress: 0% | compliments: unlimited',
    text: 'Желаю энергии как после идеального плейлиста и весны, которая явно играет за тебя.',
  },
  {
    tone: 'card-editorial',
    tag: 'main character',
    title: 'Сегодня официально включён режим главной героини весны.',
    text: 'Пусть каждая неделя ощущается как удачный кадр, где свет хороший и всё наконец получается.',
  },
  {
    tone: 'card-soft',
    tag: 'ultra rare',
    title: 'Уровень счастья: как найти деньги в зимней куртке, только в праздничной версии.',
    text: 'Побольше лёгкости, смешных моментов, добрых людей рядом и ощущения, что мир слегка влюблён в тебя.',
  },
];

const app = document.querySelector('#app');

app.innerHTML = `
  <main class='page-shell'>
    <section class='hero'>
      <div class='hero-copy'>
        <h1>С 8 Марта!</h1>
        <p class='supporting'>
          Желаю побольше поводов сиять, отдыхать без чувства вины, ловить
          красивые моменты.
        </p>
      </div>

      <figure class='hero-visual'>
        <div class='hero-frame'>
          <span class='sparkle sparkle-one' aria-hidden='true'></span>
          <span class='sparkle sparkle-two' aria-hidden='true'></span>
          <span class='sparkle sparkle-three' aria-hidden='true'></span>
          <img
            src='./assets/hero-march8.svg'
            alt='Праздничная иллюстрация с букетом, весенними наклейками и мягкими цветами'
          />
        </div>
        <figcaption>
          Визуальный режим на сегодня: цвести, нравиться себе и звучать как
          главный плейлист марта.
        </figcaption>
      </figure>
    </section>

    <section class='memes-section' aria-labelledby='memes-title'>
      <div class='section-copy'>
        <h2 id='memes-title'>Небольшой набор праздничных вайбов</h2>
        <p>
          Для тех случаев, когда обычное поздравление хочется смешать с
          интернет-энергией, нежностью и хорошим визуальным хаосом.
        </p>
      </div>

      <div class='memes-grid'>
        ${memes
          .map(
            ({ tone, tag, title, text }) => `
              <article class='meme-card ${tone}'>
                <span class='meme-tag'>${tag}</span>
                <h3>${title}</h3>
                <p>${text}</p>
              </article>
            `
          )
          .join('')}
      </div>
    </section>

    <section class='video-section' aria-labelledby='video-title'>
      <div class='section-copy'>
        <p class='section-kicker'>финальный штрих</p>
        <h2 id='video-title'>Видео для праздничного настроения</h2>
      </div>

      <div class='video-frame'>
        <iframe
          src='https://vkvideo.ru/video_ext.php?oid=730922963&id=456239253&hd=2&autoplay=1&mute=1&muted=1'
          title='Праздничное видео VK'
          allow='autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;'
          allowfullscreen
        ></iframe>
      </div>
    </section>
  </main>
`;

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  Sora.reveal('.hero-copy > *', {
    delay: 80,
    stagger: 110,
    y: 26,
    duration: 820,
  });

  Sora.reveal('.hero-frame', {
    delay: 180,
    duration: 940,
  });

  Sora.reveal('.hero-visual figcaption', {
    delay: 460,
    y: 18,
    duration: 680,
  });

  Sora.reveal('.meme-card', {
    delay: 320,
    stagger: 90,
    duration: 760,
  });

  Sora.reveal('.video-section', {
    delay: 520,
    y: 42,
    scale: 0.98,
    duration: 920,
  });

  Sora.float('.hero-visual', {
    distance: 14,
    duration: 3800,
  });

  Sora.pulse('.sparkle', {
    scale: 1.18,
    duration: 2400,
    delayStep: 240,
  });
}

const heroVisual = document.querySelector('.hero-visual');
const heroFrame = document.querySelector('.hero-frame');

if (heroVisual && heroFrame && !prefersReducedMotion) {
  const resetTilt = () => {
    heroFrame.style.setProperty('--tilt-x', '0deg');
    heroFrame.style.setProperty('--tilt-y', '0deg');
  };

  heroVisual.addEventListener('pointermove', (event) => {
    const bounds = heroVisual.getBoundingClientRect();
    const offsetX = event.clientX - bounds.left;
    const offsetY = event.clientY - bounds.top;
    const tiltY = ((offsetX / bounds.width) - 0.5) * 12;
    const tiltX = (0.5 - (offsetY / bounds.height)) * 10;

    heroFrame.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`);
    heroFrame.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`);
  });

  heroVisual.addEventListener('pointerleave', resetTilt);
  resetTilt();
}



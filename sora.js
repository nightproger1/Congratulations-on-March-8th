const toElements = (target) => {
  if (!target) {
    return [];
  }

  if (typeof target === 'string') {
    return [...document.querySelectorAll(target)];
  }

  if (target instanceof Element) {
    return [target];
  }

  return [...target];
};

const animate = (elements, keyframesBuilder, optionsBuilder) =>
  elements.map((element, index) =>
    element.animate(keyframesBuilder(index), {
      fill: 'both',
      ...optionsBuilder(index),
    })
  );

export const Sora = {
  reveal(target, settings = {}) {
    const {
      delay = 0,
      stagger = 0,
      duration = 720,
      y = 0,
      scale = 1,
      easing = 'cubic-bezier(0.2, 0.8, 0.2, 1)',
    } = settings;

    const elements = toElements(target);

    return animate(
      elements,
      () => {
        const fromTransform = [];

        if (y) {
          fromTransform.push(`translateY(${y}px)`);
        }

        if (scale !== 1) {
          fromTransform.push(`scale(${scale})`);
        }

        const initialFrame = {
          opacity: 0,
          filter: 'blur(8px)',
        };

        const finalFrame = {
          opacity: 1,
          filter: 'blur(0px)',
        };

        if (fromTransform.length) {
          initialFrame.transform = fromTransform.join(' ');
          finalFrame.transform = 'none';
        }

        return [initialFrame, finalFrame];
      },
      (index) => ({
        delay: delay + index * stagger,
        duration,
        easing,
      })
    );
  },

  float(target, settings = {}) {
    const {
      duration = 3600,
      distance = 12,
      delay = 0,
      delayStep = 160,
      easing = 'ease-in-out',
    } = settings;

    const elements = toElements(target);

    return animate(
      elements,
      () => [
        { transform: 'translateY(0px)' },
        { transform: `translateY(${-distance}px)` },
        { transform: 'translateY(0px)' },
        { transform: `translateY(${distance * 0.35}px)` },
        { transform: 'translateY(0px)' },
      ],
      (index) => ({
        delay: delay + index * delayStep,
        duration,
        easing,
        iterations: Infinity,
      })
    );
  },

  pulse(target, settings = {}) {
    const {
      duration = 2200,
      scale = 1.14,
      delay = 0,
      delayStep = 180,
      easing = 'ease-in-out',
    } = settings;

    const elements = toElements(target);

    return animate(
      elements,
      () => [
        { opacity: 0.45, transform: 'scale(0.92)' },
        { opacity: 1, transform: `scale(${scale})` },
        { opacity: 0.75, transform: 'scale(1)' },
        { opacity: 0.45, transform: 'scale(0.92)' },
      ],
      (index) => ({
        delay: delay + index * delayStep,
        duration,
        easing,
        iterations: Infinity,
      })
    );
  },
};

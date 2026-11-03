// HTML snapshot is a 1440px review fixture, not production page integration.
if (new URLSearchParams(location.search).get('mode') !== 'before') {
  document.querySelectorAll('#session-07 article').forEach((card, index) => {
    card.dataset.replayCard = String(index);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'replay-trigger';
    button.setAttribute('aria-label', `Replay ${['time saved', 'proposal layers', 'advisor reach'][index]} illustration`);
    card.append(button);
    const reset = () => { delete card.dataset.phase; };
    // Wait for the painted transition, not a wall-clock timer that can expire
    // before the first frame on a busy machine.
    card.addEventListener('transitionend', event => {
      if (card.dataset.phase === 'react' && ['transform', 'opacity'].includes(event.propertyName)) reset();
    });
    button.addEventListener('pointerdown', event => {
      if (!event.isPrimary || event.button !== 0) return;
      reset(); delete card.dataset.keyboard; card.dataset.phase = 'press';
    });
    button.addEventListener('pointerleave', reset);
    button.addEventListener('pointercancel', reset);
    button.addEventListener('blur', reset);
    button.addEventListener('click', event => {
      if (event.detail === 0) card.dataset.keyboard = '';
      else delete card.dataset.keyboard;
      card.dataset.phase = 'react';
    });
  });
}

else {
  // Source-equivalent baseline hover; deliberately no click handler.
  document.querySelectorAll('#session-07 article').forEach(card => {
    card.addEventListener('pointermove', event => {
      if (event.pointerType !== 'mouse') return;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      card.style.transition = 'transform 140ms ease-out';
      card.style.transform = `perspective(1000px) rotateX(${-y*12}deg) rotateY(${x*12}deg) scale(1.03)`;
      card.style.setProperty('--tilt-x', `${x*6}px`);
      card.style.setProperty('--tilt-y', `${y*6}px`);
    });
    card.addEventListener('pointerleave', event => {
      if (event.pointerType !== 'mouse') return;
      card.style.transition = 'transform 550ms cubic-bezier(.22,1,.36,1)';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
      card.style.setProperty('--tilt-x', '0px');
      card.style.setProperty('--tilt-y', '0px');
    });
  });
}

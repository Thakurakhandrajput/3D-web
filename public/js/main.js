document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.marquee__track');
  const marquee = document.querySelector('.marquee');
  if (track && marquee) {
    marquee.addEventListener('mouseenter', () => { track.style.animationPlayState = 'paused'; });
    marquee.addEventListener('mouseleave', () => { track.style.animationPlayState = 'running'; });
  }
});

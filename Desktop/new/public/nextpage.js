// 기존 코드 유지
const targetDate = new Date(Date.UTC(new Date().getUTCFullYear(), 5, 7, 6, 40, 0));

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const countdownContainer = document.getElementById('countdownContainer');
const videoModal = document.getElementById('videoModal');
const twitterShareBtn = document.getElementById('twitterShareBtn');

function updateCountdown() {
  const now = new Date();
  const nowKST = new Date(now.getTime() + 9 * 60 * 60 * 1000);

  let diff = targetDate - nowKST;

  if (diff <= 0) {
    clearInterval(timer);
    countdownContainer.classList.add('hidden');
    videoModal.classList.remove('hidden');

    const video = document.getElementById('finalVideo');
    video.play().catch(err => console.error('Autoplay error:', err));

    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * (1000 * 60 * 60 * 24);
  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);
  const minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * (1000 * 60);
  const seconds = Math.floor(diff / 1000);

  daysEl.textContent = days.toString().padStart(2, '0');
  hoursEl.textContent = hours.toString().padStart(2, '0');
  minutesEl.textContent = minutes.toString().padStart(2, '0');
  secondsEl.textContent = seconds.toString().padStart(2, '0');
}

const timer = setInterval(updateCountdown, 1000);
updateCountdown();

twitterShareBtn.addEventListener('click', () => {
  const text = encodeURIComponent('XGALX NEW BOY GROUP #We_are_____');
  const mainPageUrl = encodeURIComponent('http://xgalx.com/weare');
  const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${mainPageUrl}`;
  window.open(twitterUrl, '_blank', 'width=550,height=420');
});

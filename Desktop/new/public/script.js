document.addEventListener('DOMContentLoaded', () => {
  const modalOverlay = document.getElementById('modalOverlay');
  const modal = document.getElementById('modal');
  const editableInput = document.getElementById('editableInput');
  const svgImage = document.getElementById('svgImage');

  svgImage.addEventListener('click', () => {
    modalOverlay.classList.remove('hidden');
    editableInput.innerText = '';
    setTimeout(() => editableInput.focus(), 100);
  });

  modalOverlay.addEventListener('click', (e) => {
    if (!modal.contains(e.target)) {
      modalOverlay.classList.add('hidden');
      editableInput.innerText = '';
    }
  });

  editableInput.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const input = editableInput.innerText.trim();

      try {
        const response = await fetch('/api/check-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: input }),
        });

        if (response.ok) {
          window.location.href = 'nextpage.html';
        } else {
          alert('never die, or . are you alive?');
        }
      } catch (error) {
        alert('Server error');
      }
    }
  });
});

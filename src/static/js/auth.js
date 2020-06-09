document.querySelectorAll('input').forEach((inputElement) => {
  inputElement.addEventListener('blur', () => {
    inputElement.classList.add('validation');
  });
});

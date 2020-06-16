document.querySelectorAll(".buildforsdgs-console-details").forEach((detailElement, index) => {
  detailElement.addEventListener('click', () => {
    if(index == 0) window.location = '/consultants/dashboard/patients';
    if(index == 1) window.location = '/consultants/dashboard/appointments';
    if(index == 2) window.location = '/consultants/dashboard/connections';
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const $      = (s, c=document)=>c.querySelector(s);
  const form   = $('#regForm');
  const cards  = $('#cards');
  const table  = $('#summary');
  const tbody  = table.tBodies[0] || table.appendChild(document.createElement('tbody'));

  const toInts = t => t.split(',').map(s=>s.trim()).filter(Boolean);
  const uid    = () => Math.random().toString(36).slice(2,8);

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }

    const data = {
      first: $('#first').value.trim(),
      last:  $('#last').value.trim(),
      email: $('#email').value.trim(),
      prog:  $('#prog').value,
      year:  ($('input[name="year"]:checked')||{}).value,
      interests: toInts($('#interests').value),
      photo: $('#photo').value.trim()
    };

    const id  = uid();
    const src = data.photo || 'https://placehold.co/120x120/png';

    // Card
    cards.insertAdjacentHTML('afterbegin', `
      <div class="card" data-id="${id}">
        <img src="${src}" alt="" onerror="this.src='https://placehold.co/120x120/png';this.onerror=null;">
        <div>
          <strong>${data.first} ${data.last}</strong>
          <div class="badges">
            <span class="badge">${data.prog}</span>
            <span class="badge">Year ${data.year}</span>
          </div>
          <div>${data.interests.join(', ')}</div>
          <button class="btn danger" data-remove>Remove</button>
        </div>
      </div>`);

    // Summary row
    tbody.insertAdjacentHTML('afterbegin', `
      <tr data-id="${id}">
        <td>${data.first} ${data.last}</td>
        <td>${data.prog}</td>
        <td>${data.year}</td>
        <td>${data.interests.join(', ')}</td>
        <td><button class="btn danger" data-remove>Remove</button></td>
      </tr>`);

    form.reset();
  });

// One click handler: removes both the card and its matching table row
  document.addEventListener('click', (e)=>{
    const btn = e.target.closest('[data-remove]');
    if (!btn) return;
    const host = btn.closest('[data-id]');
    if (!host) return;
    const id = host.dataset.id;
    document.querySelectorAll(`[data-id="${id}"]`).forEach(el => el.remove());
  });
});

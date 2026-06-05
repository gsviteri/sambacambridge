// Load events
fetch('data/events.json')
  .then(r => r.json())
  .then(data => {
    const el = document.getElementById('events');
    if (el) {
      el.innerHTML = data.map(e => `
        <div class="card">
          <h3>${e.title}</h3>
          <p>${e.date} - ${e.time}</p>
          <p>${e.location}</p>
        </div>
      `).join('');
    }
  });

// Load gallery
fetch('data/gallery.json')
  .then(r => r.json())
  .then(data => {
    const el = document.getElementById('gallery');
    if (el) {
      el.innerHTML = data.map(g => `
        <div class="card">
          <p>${g.caption}</p>
        </div>
      `).join('');
    }
  });

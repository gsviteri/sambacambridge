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

// 📸 Load gallery images
fetch('data/gallery.json')
  .then(res => res.json())
  .then(data => {
    const el = document.getElementById('gallery');

    if (!el) return;

    el.innerHTML = data.map(item => `
      <img src="${item.image}" alt="${item.caption}">
    `).join('');
  });

  // 🎞️ Auto slideshow
  let currentSlide = 0;

  function showSlides() {
    const slides = document.querySelectorAll(".slide");

    if (!slides.length) return;

    slides.forEach(slide => slide.classList.remove("active"));

    currentSlide++;

    if (currentSlide > slides.length) {
      currentSlide = 1;
    }

    slides[currentSlide - 1].classList.add("active");

    setTimeout(showSlides, 4000); // change every 4 seconds
  }

  showSlides();

  // Next Gig Countdown

  fetch('data/events.json')
    .then(res => res.json())
    .then(events => {

      if (!events.length) return;

      const event = events[0];

      document.getElementById('next-event-title').textContent =
        `${event.title} • ${event.location}`;

      const eventDate = new Date(`${event.date} ${event.time}`);

      function updateCountdown() {

        const now = new Date();
        const diff = eventDate - now;

        if (diff <= 0) {

          document.getElementById('countdown').innerHTML =
            '<h3>🥁 We are playing now!</h3>';

          return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24))
          / (1000 * 60 * 60)
        );

        const minutes = Math.floor(
          (diff % (1000 * 60 * 60))
          / (1000 * 60)
        );

        const seconds = Math.floor(
          (diff % (1000 * 60))
          / 1000
        );

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
      }

      updateCountdown();

      setInterval(updateCountdown, 1000);

    });

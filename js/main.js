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

fetch('./data/events.json')
  .then(r => r.json())
  .then(events => {

    if (!events.length) return;

 const now = new Date();

 const futureEvents = events
   .map(event => ({
     ...event,
     eventDate: new Date(`${event.date}T${event.time}:00`)
   }))
   .filter(event => event.eventDate > now)
   .sort((a, b) => a.eventDate - b.eventDate);

 if (!futureEvents.length) return;

 const event = futureEvents[0];
 document.getElementById('next-event-title').textContent =
   `${event.title} • ${event.location}`;
 const eventDate = event.eventDate;

    function updateCountdown() {

      const diff = eventDate.getTime() - Date.now();

      if (diff <= 0) return;

      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);

      document.getElementById('days').textContent = days;
      document.getElementById('hours').textContent = hours;
      document.getElementById('minutes').textContent = minutes;
      document.getElementById('seconds').textContent = seconds;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

  })
  .catch(console.error);

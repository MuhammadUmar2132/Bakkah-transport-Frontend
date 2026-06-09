/* ===================== BAKKAH TRANSPORT - SCRIPTS ===================== */
document.addEventListener('DOMContentLoaded', function () {

  /* ---------- mobile menu ---------- */
  const menu = document.getElementById('menu');
  const ham = document.getElementById('hamburger');
  const overlay = document.getElementById('overlay');
  function toggleMenu() {
    menu.classList.toggle('active');
    overlay.classList.toggle('active');
  }
  ham.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);
  menu.querySelectorAll('a:not(.drop-toggle)').forEach(a =>
    a.addEventListener('click', () => { if (menu.classList.contains('active')) toggleMenu(); })
  );
  // mobile dropdown expand
  menu.querySelectorAll('.drop-toggle').forEach(t => {
    t.addEventListener('click', e => {
      if (window.innerWidth <= 820) { e.preventDefault(); t.parentElement.classList.toggle('open-mob'); }
    });
  });


  /* ---------- round trip packages ---------- */
  const pkgs = [
    { stops: [['Jaddah','Airport','airport'],['Makkah','Hotel','makkah'],['Madinah','Hotel','madinah'],['Madinah','Airport','airport']], name: 'Package 1', price: '830 SAR' },
    { stops: [['Madinah','Airport','airport'],['Madinah','Hotel','madinah'],['Makkah','Hotel','makkah'],['Jaddah','Airport','airport']], name: 'Package 2', price: '830 SAR' },
    { stops: [['Jaddah','Airport','airport'],['Makkah','Hotel','makkah'],['Madinah','Hotel','madinah'],['Jaddah','Airport','airport']], name: 'Package 3', price: '1100 SAR' },
    { stops: [['Jaddah','Airport','airport'],['Madinah','Hotel','madinah'],['Makkah','Hotel','makkah'],['Jaddah','Airport','airport']], name: 'Package 4', price: '1100 SAR' },
  ];
  document.getElementById('pkgGrid').innerHTML = pkgs.map(p => {
    const stops = p.stops.map((s, i) => `
      <div class="pkg-stop ${s[2]}"><div class="ic"></div>${s[0]}<br>${s[1]}</div>
      ${i < p.stops.length - 1 ? '<span class="pkg-arrow">&gt;</span>' : ''}`).join('');
    return `
      <div class="pkg-card">
        <div class="pkg-stops">${stops}</div>
        <div class="pkg-price">
          <div class="pname">${p.name}</div>
          <div class="pstart">Price Starting Form</div>
          <div class="pval">${p.price}</div>
        </div>
      </div>`;
  }).join('');

  /* ---------- routes ---------- */
  const routes = [
    'Jeddah To Makkah Taxi','Jeddah to Madinah Taxi','Jeddah To Taif Taxi','Makkah Ziyarat Taxi',
    'Makkah to Madinah Taxi','Makkah to Jeddah Taxi','Makkah to Taif Taxi','Madinah Ziyarat Taxi',
    'Madinah to Makkah Taxi','Madinah to Jeddah Taxi','Madinah to Badr Taxi','Taif Ziyarat Taxi'
  ];
  document.getElementById('routeGrid').innerHTML = routes.map(r => `
    <a href="#" class="route-pill"><span class="ra">›</span>${r}</a>`).join('');

  /* ---------- FAQ ---------- */
  const faqs = [
    ['Does Bakkah Transport provide group travel or shared rides?', 'No. Bakkah Transport only offers private Umrah taxi services. Each ride is exclusively for your group, ensuring comfort, privacy, and a smooth journey. We do not provide shared rides.'],
    ['How can I pay for my Umrah taxi or Ziyarat tour?', 'You can pay online through our secure booking system or via WhatsApp. Payments are simple and confirm your ride instantly.'],
    ['Are online payments safe and secure?', 'Yes! All online payments are secure and encrypted. You can book your private Umrah taxi, airport pickup, or Ziyarat tour with confidence.'],
    ['Can I pay in cash to the driver?', 'Yes, cash payments are accepted. You can pay the driver directly at the end of the trip or securely online using our payment link.'],
    ['Do you offer discounts for large groups or families?', 'Yes. Bakkah Transport provides competitive rates for families and groups traveling together. Contact us via WhatsApp or our online form for group pricing details.'],
    ['Is booking required in advance for group travel?', 'Yes. You should book in advance to ensure a comfortable and safe journey and to guarantee availability on major routes.'],
    ['Can I book multiple vehicles for bigger groups?', 'Yes. You can reserve multiple vehicles at once. Our fleet includes Toyota Camry, Hyundai Staria, Toyota Hiace, Toyota Coaster, GMC Yukon XL, and buses for any group size.'],
    ['Are there flexible payment options for airport pickups and intercity transfers?', 'Yes. You can choose online link payment, WhatsApp booking, or cash payment for all services including airport pickups, hotel transfers, city-to-city travel, and Ziyarat tours.'],
    ['Can your drivers speak Arabic?', 'Yes. All our drivers are fluent in Arabic and are trained to provide professional, courteous, and safe service throughout your journey.'],
    ['Do you provide Urdu-speaking guides?', 'Yes. Bakkah Transport can arrange Urdu-speaking guides for Ziyarat tours and city transfers, making your pilgrimage comfortable and easy to understand.'],
    ['Do you offer private Ziyarat tours in Madinah?', 'Yes. We provide private Ziyarat tours in Madinah, starting from your hotel or airport, with professional drivers and comfortable vehicles.'],
    ['Can I book an airport pickup from Jeddah or Madinah?', 'Yes. We offer airport pickups and drop-offs from Jeddah and Madinah airports. You can book online or via WhatsApp for a safe and hassle-free transfer.'],
    ['Is Bakkah Transport available anytime?', 'Yes! Bakkah Transport is available 24/7, and our dedicated customer support team is always ready to assist you before and during your Umrah journey.'],
  ];
  const faqWrap = document.getElementById('faqWrap');
  faqWrap.innerHTML = faqs.map((f, i) => `
    <div class="faq-item ${i === 0 ? 'open' : ''}">
      <div class="faq-q">${f[0]}<span class="chev">▾</span></div>
      <div class="faq-a"><p>${f[1]}</p></div>
    </div>`).join('');

  faqWrap.querySelectorAll('.faq-item').forEach(item => {
    const a = item.querySelector('.faq-a');
    if (item.classList.contains('open')) a.style.maxHeight = a.scrollHeight + 'px';
    item.querySelector('.faq-q').addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqWrap.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) { item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
    });
  });

  /* ---------- booking form ---------- */
  const form = document.getElementById('bookingForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      // sends details to WhatsApp
      const inputs = form.querySelectorAll('input, select, textarea');
      const [name, mobile, email, vehicle, from, to, desc] = [...inputs].map(i => i.value || '-');
      const msg = `New Booking Request:%0AName: ${name}%0AMobile: ${mobile}%0AEmail: ${email}%0AVehicle: ${vehicle}%0AFrom: ${from}%0ATo: ${to}%0ADetails: ${desc}`;
      window.open(`https://wa.me/+966597595056?text=${msg}`, '_blank');
    });
  }

});

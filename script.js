// ===== 导航滚动 =====
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 50);
  backToTop.classList.toggle('visible', y > 400);
});
// ===== 汉堡菜单 =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ===== 回顶部 =====
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== IntersectionObserver =====
const io = (els, cb, options = {}) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        cb(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px', ...options });
  els.forEach(el => observer.observe(el));
};

// 技能卡片
io(document.querySelectorAll('.skill-card'), (card) => {
  const delay = parseInt(card.dataset.delay || 0);
  setTimeout(() => {
    card.classList.add('visible');
    const bar = card.querySelector('.skill-progress');
    if (bar) bar.style.width = bar.dataset.width + '%';
  }, delay);
});

// 通用淡入
document.querySelectorAll(
  '.exp-card, .featured-project-card, .edu-card, .gallery-item, .contact-info-card, .about-img-stack, .about-content, .section-header'
).forEach(el => {
  el.classList.add('fade-in');
});
io(document.querySelectorAll('.fade-in'), el => el.classList.add('visible'));

// ===== 联系表单 =====
const toast = document.createElement('div');
toast.className = 'toast';
toast.textContent = '✅ 已收到您的联系信息，我会尽快回复！';
document.body.appendChild(toast);

const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = '发送中...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = '发送联系信息 ✉️';
      btn.disabled = false;
      form.reset();
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3500);
    }, 1200);
  });
}

// ===== 平滑锚点 =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    }
  });
});

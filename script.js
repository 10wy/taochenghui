// ===== 导航栏滚动效果 =====
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  navbar.classList.toggle('scrolled', scrollY > 50);
  backToTop.classList.toggle('visible', scrollY > 400);
});

// ===== 汉堡菜单 =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== 回到顶部 =====
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== 数字滚动动画 =====
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current);
  }, 16);
}

// ===== 滚动进入动画（Intersection Observer）=====
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

// 技能卡片动画
const skillCards = document.querySelectorAll('.skill-card');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const card = entry.target;
      const delay = parseInt(card.dataset.delay || 0);
      setTimeout(() => {
        card.classList.add('visible');
        const bar = card.querySelector('.skill-progress');
        if (bar) {
          bar.style.width = bar.dataset.width + '%';
        }
      }, delay);
      skillObserver.unobserve(card);
    }
  });
}, observerOptions);

skillCards.forEach(card => skillObserver.observe(card));

// 统计数字动画
const statNums = document.querySelectorAll('.stat-num');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => statsObserver.observe(el));

// 通用淡入动画
const fadeEls = document.querySelectorAll(
  '.about-card, .project-card, .contact-card, .section-header, .about-content, .hero-stats'
);
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  fadeObserver.observe(el);
});

// ===== 联系表单 =====
const contactForm = document.getElementById('contactForm');
const toast = document.createElement('div');
toast.className = 'toast';
toast.textContent = '✅ 消息已发送，我会尽快回复你！';
document.body.appendChild(toast);

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.textContent = '发送中...';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = '发送消息 ✉️';
    btn.disabled = false;
    contactForm.reset();
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  }, 1200);
});

// ===== 平滑滚动到锚点 =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== 鼠标跟随高光效果（卡片） =====
document.querySelectorAll('.skill-card, .project-card, .contact-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', x + '%');
    card.style.setProperty('--mouse-y', y + '%');
  });
});

// ===== 页面加载动画 =====
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});

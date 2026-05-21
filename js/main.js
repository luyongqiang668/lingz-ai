document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sideLinks = document.querySelectorAll('.side-link');
  const allLinks = [...navLinks, ...sideLinks];
  const sections = document.querySelectorAll('section');
  const form = document.getElementById('demoForm');

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
      navToggle.textContent = navMenu.classList.contains('active') ? '×' : '☰';
    });
  }

  allLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || !targetId.startsWith('#')) return;
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      e.preventDefault();

      if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.textContent = '☰';
      }

      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: 'smooth'
      });

      updateActiveNavLink(targetId);
    });
  });

  function updateActiveNavLink(id) {
    allLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === id);
    });
  }

  window.addEventListener('scroll', function () {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 140) {
        current = '#' + section.getAttribute('id');
      }
    });
    if (current) updateActiveNavLink(current);
  }, { passive: true });

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = {
        name: document.getElementById('nameInput').value.trim(),
        phone: document.getElementById('phoneInput').value.trim(),
        email: document.getElementById('emailInput').value.trim(),
        industry: document.getElementById('industrySelect').value
      };

      if (!data.name || !data.phone || !data.email || !data.industry) {
        showNotification('请填写所有必填项', 'error');
        return;
      }

      showNotification('预约已提交。我们将在24小时内联系你。', 'success');
      form.reset();
      console.log('LINGZ demo form submitted:', data);
    });
  }

  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `<span>${message}</span><button aria-label="关闭">×</button>`;
    document.body.appendChild(notification);

    notification.style.cssText = `
      position: fixed; top: 96px; right: 24px; z-index: 10000;
      background: ${type === 'success' ? '#111' : '#ff3b30'};
      color: #fff; padding: 14px 18px; min-width: 280px;
      display: flex; justify-content: space-between; align-items: center;
      gap: 18px; box-shadow: 0 18px 50px rgba(0,0,0,.18);
      transform: translateX(120%); transition: transform .28s ease;
    `;

    notification.querySelector('button').style.cssText = `
      background:none;border:0;color:#fff;font-size:22px;cursor:pointer;
    `;

    requestAnimationFrame(() => notification.style.transform = 'translateX(0)');

    const close = () => {
      notification.style.transform = 'translateX(120%)';
      setTimeout(() => notification.remove(), 280);
    };

    notification.querySelector('button').addEventListener('click', close);
    setTimeout(close, type === 'success' ? 4200 : 6200);
  }

  document.body.classList.add('loaded');
  console.log('LINGZ DJI-style website loaded.');
});

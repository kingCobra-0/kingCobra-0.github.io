// js/app.js - 初始化
window.addEventListener('hashchange', render);
loadPosts();

// 移动端菜单切换（管理 aria-expanded 状态）
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (btn && menu) {
    btn.addEventListener('click', () => {
      const expanded = menu.classList.toggle('hidden');
      btn.setAttribute('aria-expanded', String(!expanded));
      btn.setAttribute('aria-label', expanded ? '打开菜单' : '关闭菜单');
    });
  }
});

// 点击菜单内链接时自动关闭
document.addEventListener('click', (e) => {
  const m = document.getElementById('mobile-menu');
  const btn = document.getElementById('mobile-menu-btn');
  if (m && !m.classList.contains('hidden') && e.target.closest('a')) {
    m.classList.add('hidden');
    if (btn) {
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', '打开菜单');
    }
  }
});

// Hero 聚光灯跟随鼠标
let spotlightRaf = 0;
let spotlightTarget = { x: 0, y: 0 };
let spotlightCurrent = { x: 0, y: 0 };

document.addEventListener('mousemove', (e) => {
  const card = document.getElementById('hero-spotlight');
  if (!card) return;
  const rect = card.getBoundingClientRect();
  spotlightTarget.x = ((e.clientX - rect.left) / rect.width) * 100;
  spotlightTarget.y = ((e.clientY - rect.top) / rect.height) * 100;
});

function updateSpotlight() {
  const dx = spotlightTarget.x - spotlightCurrent.x;
  const dy = spotlightTarget.y - spotlightCurrent.y;
  spotlightCurrent.x += dx * 0.08;
  spotlightCurrent.y += dy * 0.08;
  const card = document.getElementById('hero-spotlight');
  if (card) {
    card.style.setProperty('--spotlight-x', spotlightCurrent.x + '%');
    card.style.setProperty('--spotlight-y', spotlightCurrent.y + '%');
  }
  spotlightRaf = requestAnimationFrame(updateSpotlight);
}
requestAnimationFrame(updateSpotlight);

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

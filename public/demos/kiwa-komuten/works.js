function initWorksFilters() {
  const controls = document.querySelector('[data-works-filters]');
  if (!controls) return;

  const buttons = [...controls.querySelectorAll('[data-works-filter]')];
  const cases = [...document.querySelectorAll('.portfolio-case')];
  const results = document.querySelector('.portfolio-results');

  results.textContent = `${cases.length}件の施工事例`;
  controls.hidden = false;

  // 詳細ページの「次の事例」から、既存事例の詳細表示へつなぐ。
  const linkedCase = document.getElementById(location.hash.slice(1));
  if (linkedCase?.matches('.portfolio-case')) linkedCase.querySelector('[data-dialog]')?.click();

  controls.addEventListener('click', event => {
    const button = event.target.closest('[data-works-filter]');
    if (!button || button.getAttribute('aria-pressed') === 'true') return;
    const category = button.dataset.worksFilter;
    let count = 0;

    for (const item of cases) {
      item.hidden = category !== 'all' && item.dataset.category !== category;
      if (!item.hidden) count++;
    }
    for (const candidate of buttons) candidate.setAttribute('aria-pressed', String(candidate === button));
    const label = category === 'all' ? '' : `${button.dataset.filterLabel}：`;
    results.textContent = `${label}${count}件の施工事例`;
  });
}

initWorksFilters();

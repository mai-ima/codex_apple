import { deepLinkGroups, footerGroups, navigation, productComparison, productNav, shoppingPromises, site } from "../data/site.mjs";

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const asset = (page, fileName) => `${page.assetRoot}${fileName}`;
const isExternalOrAnchor = (href) => href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:");
const sitePath = (page, href) => {
  if (isExternalOrAnchor(href)) return href;
  return page.navRoot ? href.replace("pages/", "") : href.startsWith("pages/") ? href : `pages/${href}`;
};

const nav = (page) => `
<header class="site-header" aria-label="${site.brand}グローバルナビゲーション">
  <nav class="nav-shell">
    <a class="brand" href="${page.navRoot}index.html" aria-label="${site.brand} ホーム">
      <img src="${asset(page, "gcherry-mark.svg")}" alt="" width="22" height="22" />
      <span>${site.brand}</span>
    </a>
    <button class="menu-button" type="button" aria-label="メニューを開く">
      <span></span><span></span>
    </button>
    <div class="nav-links" aria-label="主要リンク">
      ${navigation.map((item) => `<a href="${sitePath(page, item.href)}">${escapeHtml(item.label)}</a>`).join("\n")}
    </div>
  </nav>
</header>`;


const productRail = (page) => `
<nav class="product-rail" aria-label="Gcherry製品ショートカット">
  <div>
    ${productNav
      .map(
        (item) => `<a href="${sitePath(page, item.href)}">
      <span>${escapeHtml(item.label)}</span>
      <small>${escapeHtml(item.meta)}</small>
    </a>`,
      )
      .join("\n")}
  </div>
</nav>`;

const shoppingPromise = () => `
<section class="shopping-promise" aria-labelledby="shopping-promise-title">
  <div class="promise-heading">
    <p class="eyebrow">Gcherry Store Experience</p>
    <h2 id="shopping-promise-title">選ぶ前も、購入後も、迷わない。</h2>
  </div>
  <div class="promise-grid">
    ${shoppingPromises
      .map(
        (item) => `<article>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.text)}</p>
    </article>`,
      )
      .join("\n")}
  </div>
</section>`;

const cta = (page, label, href, variant = "primary") =>
  `<a class="${variant}-link" href="${sitePath(page, href)}">${escapeHtml(label)}</a>`;

const hero = (page) => `
<section class="hero section-block ${page.heroTheme === "dark" ? "dark-panel" : "light-panel"}" aria-labelledby="hero-title">
  <div class="hero-copy">
    <p class="eyebrow">${escapeHtml(page.eyebrow)}</p>
    <h1 id="hero-title">${escapeHtml(page.headline)}</h1>
    <p class="lede">${escapeHtml(page.lead)}</p>
    <div class="cta-row">
      ${cta(page, page.primaryCta, page.primaryHref, "primary")}
      ${cta(page, page.secondaryCta, page.secondaryHref, "secondary")}
    </div>
  </div>
  <div class="hero-art" aria-hidden="true">
    <img src="${asset(page, page.heroImage)}" alt="" />
  </div>
</section>`;

const showcase = (page, section) => `
<section id="${section.id}" class="section-block split-panel light-panel" aria-labelledby="${section.id}-title">
  <div>
    <p class="eyebrow">${escapeHtml(section.eyebrow)}</p>
    <h2 id="${section.id}-title">${escapeHtml(section.title)}</h2>
    <p class="section-text">${escapeHtml(section.text)}</p>
    ${cta(page, section.cta, section.href, "primary")}
  </div>
  <div class="section-art" aria-hidden="true">
    <img src="${asset(page, section.image)}" alt="" />
  </div>
</section>`;

const grid = (page, section) => `
<section id="${section.id}" class="product-grid" aria-labelledby="${section.id}-title">
  <div class="section-heading">
    <p class="eyebrow">${escapeHtml(section.eyebrow)}</p>
    <h2 id="${section.id}-title">${escapeHtml(section.title)}</h2>
  </div>
  ${section.cards
    .map(
      (card) => `
  <article class="product-card${card.tone === "dark" ? " card-dark" : ""}">
    <div class="card-copy">
      <p class="eyebrow">${escapeHtml(card.title)}</p>
      <h3>${escapeHtml(card.text.split("。")[0])}。</h3>
      <p>${escapeHtml(card.text)}</p>
      ${cta(page, "詳しく見る", card.href, "secondary")}
    </div>
    <img class="card-image" src="${asset(page, card.image)}" alt="" />
  </article>`,
    )
    .join("\n")}
</section>`;

const service = (page, section) => `
<section id="${section.id}" class="section-block service-panel" aria-labelledby="${section.id}-title">
  <div class="service-copy">
    <p class="eyebrow">${escapeHtml(section.eyebrow)}</p>
    <h2 id="${section.id}-title">${escapeHtml(section.title)}</h2>
    <p class="section-text">${escapeHtml(section.text)}</p>
    ${cta(page, "詳しく見る", section.href, "primary")}
  </div>
  <div class="tile-stack" aria-hidden="true">
    ${section.tiles.map((tile) => `<span>${escapeHtml(tile)}</span>`).join("\n")}
  </div>
</section>`;

const feature = (page, section) => `
<section id="${section.id}" class="section-block feature-panel" aria-labelledby="${section.id}-title">
  <div class="feature-art" aria-hidden="true"><img src="${asset(page, section.image)}" alt="" /></div>
  <div class="feature-copy">
    <p class="eyebrow">${escapeHtml(section.eyebrow)}</p>
    <h2 id="${section.id}-title">${escapeHtml(section.title)}</h2>
    <p class="section-text">${escapeHtml(section.text)}</p>
  </div>
</section>`;

const specs = (section) => `
<section id="${section.id}" class="section-block specs-panel" aria-labelledby="${section.id}-title">
  <h2 id="${section.id}-title">${escapeHtml(section.title)}</h2>
  <ul class="spec-list">
    ${section.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n")}
  </ul>
</section>`;


const buySteps = (page, section) => `
<section id="${section.id}" class="section-block buy-panel" aria-labelledby="${section.id}-title">
  <div class="buy-panel-head">
    <p class="eyebrow">${escapeHtml(section.eyebrow)}</p>
    <h2 id="${section.id}-title">${escapeHtml(section.title)}</h2>
    <p class="section-text">${escapeHtml(section.text)}</p>
  </div>
  <ol class="buy-steps">
    ${section.steps
      .map(
        (step, index) => `<li style="--step-index: ${index}">
      <span class="step-number">${String(index + 1).padStart(2, "0")}</span>
      <h3>${escapeHtml(step.title)}</h3>
      <p>${escapeHtml(step.text)}</p>
    </li>`,
      )
      .join("\n")}
  </ol>
  ${cta(page, "購入ページへ進む", section.href, "primary")}
</section>`;

const techGrid = (section) => `
<section id="${section.id}" class="section-block tech-panel" aria-labelledby="${section.id}-title">
  <div class="section-heading compact-heading">
    <p class="eyebrow">${escapeHtml(section.eyebrow)}</p>
    <h2 id="${section.id}-title">${escapeHtml(section.title)}</h2>
  </div>
  <div class="tech-grid">
    ${section.cards
      .map(
        (card) => `<article>
      <h3>${escapeHtml(card.title)}</h3>
      <p>${escapeHtml(card.text)}</p>
    </article>`,
      )
      .join("\n")}
  </div>
</section>`;

const timeline = (section) => `
<section id="${section.id}" class="section-block timeline-panel" aria-labelledby="${section.id}-title">
  <div class="section-heading compact-heading">
    <p class="eyebrow">${escapeHtml(section.eyebrow)}</p>
    <h2 id="${section.id}-title">${escapeHtml(section.title)}</h2>
  </div>
  <ol class="timeline-list">
    ${section.events
      .map(
        (event) => `<li>
      <time>${escapeHtml(event.year)}</time>
      <div>
        <h3>${escapeHtml(event.title)}</h3>
        <p>${escapeHtml(event.text)}</p>
      </div>
    </li>`,
      )
      .join("\n")}
  </ol>
</section>`;


const compare = (page, section = {}) => `
<section id="${section.id ?? "compare"}" class="section-block compare-panel" aria-labelledby="${section.id ?? "compare"}-title">
  <div class="section-heading compact-heading">
    <p class="eyebrow">Compare</p>
    <h2 id="${section.id ?? "compare"}-title">どのGcherryを選ぶか。</h2>
  </div>
  <div class="compare-table" role="table" aria-label="Gcherry製品比較">
    ${productComparison
      .map(
        (item) => `<a class="compare-row" href="${sitePath(page, item.href)}" role="row">
      <strong>${escapeHtml(item.model)}</strong>
      <span>${escapeHtml(item.bestFor)}</span>
      <span>${escapeHtml(item.display)}</span>
      <span>${escapeHtml(item.battery)}</span>
    </a>`,
      )
      .join("\n")}
  </div>
</section>`;

const renderSection = (page, section) => {
  if (section.type === "showcase") return showcase(page, section);
  if (section.type === "grid") return grid(page, section);
  if (section.type === "service") return service(page, section);
  if (section.type === "feature") return feature(page, section);
  if (section.type === "specs") return specs(section);
  if (section.type === "buySteps") return buySteps(page, section);
  if (section.type === "techGrid") return techGrid(section);
  if (section.type === "timeline") return timeline(section);
  if (section.type === "compare") return compare(page, section);
  throw new Error(`Unsupported section type: ${section.type}`);
};

const footer = (page) => `
<footer class="site-footer">
  <div class="footer-note">
    <strong>${site.brand}</strong>
    <span>このサイトは架空ブランドのオリジナルデモです。実在企業の公式サイト、ロゴ、文章、画像素材は使用していません。</span>
  </div>
  <div class="footer-grid">
    ${footerGroups
      .map(
        (group) => `<div>
      <h2>${escapeHtml(group.title)}</h2>
      ${group.links.map(([label, href]) => `<a href="${sitePath(page, href)}">${escapeHtml(label)}</a>`).join("\n")}
    </div>`,
      )
      .join("\n")}
  </div>
  <div class="footer-directory">
    ${deepLinkGroups
      .map(
        (group) => `<section>
      <h2>${escapeHtml(group.title)}</h2>
      ${group.links.map(([label, href]) => `<a href="${sitePath(page, href)}">${escapeHtml(label)}</a>`).join("\n")}
    </section>`,
      )
      .join("\n")}
  </div>
  <p class="copyright">© 2026 Gcherry Concept. Original copy and SVG visuals.</p>
</footer>`;

const clean = (html) => html.replace(/^ +$/gm, "");

export const renderPage = (page) => clean(`<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${escapeHtml(site.description)}" />
    <title>${escapeHtml(page.title)}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="${page.navRoot}styles.css" />
  </head>
  <body class="page-${escapeHtml(page.slug)}">
    ${nav(page)}
    ${productRail(page)}
    <main>
      ${hero(page)}
      ${shoppingPromise()}
      ${page.sections.map((section) => renderSection(page, section)).join("\n")}
    </main>
    ${footer(page)}
  </body>
</html>
`);

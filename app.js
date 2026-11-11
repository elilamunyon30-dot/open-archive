(() => {
  "use strict";
  const archive = window.ARCHIVE || { site: {}, works: [] };
  const works = Array.isArray(archive.works) ? archive.works : [];
  const $ = (id) => document.getElementById(id);
  const grid = $("works-grid");
  const searchInput = $("search-input");
  const emptyState = $("empty-state");
  const filters = [...document.querySelectorAll(".filter")];
  const booksShortcut = $("books-shortcut");
  const names = { all: "works", games: "games", books: "books", music: "songs" };
  const symbols = {
    games: '<svg viewBox="0 0 120 120" fill="none" aria-hidden="true"><rect x="18" y="18" width="84" height="84" rx="9" stroke="currentColor" stroke-width="3"/><path d="M46 18v84M74 18v84M18 46h84M18 74h84" stroke="currentColor" stroke-opacity=".35" stroke-width="2"/><path d="m53 53 14 14m0-14L53 67" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><circle cx="31.5" cy="32" r="6" fill="currentColor"/><circle cx="88" cy="88" r="6" fill="currentColor"/></svg>',
    books: '<svg viewBox="0 0 120 120" fill="none" aria-hidden="true"><path d="M60 29C46 21 28 21 15 26v67c13-5 31-5 45 3 14-8 32-8 45-3V26c-13-5-31-5-45 3Z" stroke="currentColor" stroke-width="3"/><path d="M60 29v67M27 42c9-2 17-1 24 2M27 55c9-2 17-1 24 2M68 44c7-3 15-4 24-2M68 57c7-3 15-4 24-2" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>',
    music: '<svg viewBox="0 0 120 120" fill="none" aria-hidden="true"><path d="M46 33v58c0 8-9 15-19 15S9 101 9 93s8-13 18-13c6 0 10 1 13 3V32l68-17v65c0 8-9 15-19 15S71 90 71 82s8-13 18-13c6 0 10 1 13 3V22L46 36" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  let selected = new URLSearchParams(window.location.search).get("category") === "books" ? "books" : "all";
  const text = (value) => String(value ?? "");
  function safeUrl(raw) {
    if (typeof raw !== "string" || !raw.trim()) return "";
    const value = raw.trim();
    // External HTTPS/HTTP URLs and local files within the published site are supported.
    // Dangerous protocols and directory traversal are rejected.
    if (/^https?:\/\//i.test(value)) return value;
    if (/^(?:\/|\\|#|[a-z][a-z0-9+.-]*:)/i.test(value)) return "";
    if (value.includes("\\") || value.split(/[/?#]/)[0] === ".." || value.split("/").includes("..")) return "";
    return value;
  }
  function itemType(item) { return ["games", "books", "music"].includes(item.type) ? item.type : "games"; }
  function el(tag, className, value) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (value !== undefined) element.textContent = text(value);
    return element;
  }
  function renderCard(item, index) {
    const type = itemType(item);
    const url = safeUrl(item.url);
    const published = item.status === "published" && !!url;
    const accent = ["lime", "purple", "orange", "blue", "rose", "yellow"].includes(item.accent) ? item.accent : "lime";
    const card = el("article", "work-card");
    const cover = el("div", `work-cover accent-${accent}`);
    cover.innerHTML = symbols[type];
    cover.appendChild(el("span", "cover-number", `${String(index + 1).padStart(2, "0")} / ${type.toUpperCase()}`));
    cover.appendChild(el("span", "cover-corner", "✳"));
    card.appendChild(cover);

    const details = el("div", "work-details");
    const meta = el("div", "card-meta");
    meta.appendChild(el("span", "card-category", type === "music" ? "Music" : type === "books" ? "Book" : "Game"));
    meta.appendChild(el("span", "card-meta-sep"));
    meta.appendChild(el("span", published ? "card-status is-live" : "card-status", published ? "Available now" : "Coming soon"));
    details.appendChild(meta);
    details.appendChild(el("h3", "", item.title || "Untitled work"));
    details.appendChild(el("p", "work-description", item.description || "A new creation for the collection."));

    const tags = el("div", "tag-list");
    (Array.isArray(item.tags) ? item.tags : []).slice(0, 4).forEach(tag => tags.appendChild(el("span", "work-tag", tag)));
    details.appendChild(tags);
    details.appendChild(el("div", "card-divider"));

    const bottom = el("div", "card-bottom");
    bottom.appendChild(el("small", "", published ? (item.accessNote || "Free to access") : "Not published yet"));
    if (published) {
      const button = el("a", "work-link");
      button.href = url;
      button.target = "_blank";
      button.rel = "noopener noreferrer";
      button.textContent = item.actionLabel ? `${item.actionLabel} ` : type === "games" ? "Play now " : type === "books" ? "Read now " : "Listen now ";
      button.appendChild(el("span", "arrow", "↗"));
      bottom.appendChild(button);
    } else {
      bottom.appendChild(el("span", "coming-label", "In the works ✧"));
    }
    details.appendChild(bottom);
    card.appendChild(details);
    return card;
  }
  function renderCounts() {
    for (const type of ["all", "games", "books", "music"]) {
      const count = type === "all" ? works.length : works.filter(item => item.type === type).length;
      $("count-" + type).textContent = String(count);
    }
  }
  function render() {
    if (booksShortcut) booksShortcut.hidden = selected !== "books";
    const query = searchInput.value.trim().toLocaleLowerCase();
    const result = works.filter(item =>
      (selected === "all" || item.type === selected) &&
      (!query || [item.title, item.description, ...(Array.isArray(item.tags) ? item.tags : [])].join(" ").toLocaleLowerCase().includes(query))
    );
    grid.replaceChildren(...result.map((item, i) => renderCard(item, i)));
    $("visible-count").textContent = String(result.length);
    $("count-word").textContent = result.length === 1 ? "work listed" : "works listed";
    emptyState.hidden = result.length > 0;
    if (!result.length) {
      $("empty-title").textContent = query ? "No matching works found." : "Nothing on this shelf yet.";
      $("empty-description").textContent = query ? "Try a different search, or browse the complete collection." : "This part of the collection is ready for the first release.";
    }
  }
  function chooseFilter(type) {
    selected = type;
    filters.forEach(button => {
      const on = button.dataset.filter === type;
      button.classList.toggle("is-active", on);
      button.setAttribute("aria-pressed", String(on));
    });
    render();
  }
  filters.forEach(button => button.addEventListener("click", () => chooseFilter(button.dataset.filter)));
  searchInput.addEventListener("input", render);
  $("clear-filters").addEventListener("click", () => { searchInput.value = ""; chooseFilter("all"); searchInput.focus(); });
  $("back-to-top").addEventListener("click", (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); });
  if (archive.site.intro) $("site-intro").textContent = archive.site.intro;
  if (archive.site.about) $("about-text").textContent = archive.site.about;
  if (archive.site.name) { document.title = `${archive.site.name} — Games, Books & Music`; }
  renderCounts();
  chooseFilter(selected);
})();

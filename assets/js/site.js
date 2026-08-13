const navigation = [
  { label: "Home", href: "/" },
  { label: "Members", section: "/members/", labelOnly: true, children: [
    ["Professor", "/members/professor.html"], ["Students", "/members/students.html"], ["Researchers", "/members/researchers.html"]
  ]},
  { label: "Research", href: "/research/" },
  { label: "Publications", section: "/publications/", labelOnly: true, children: [
    ["International", "/publications/international.html"], ["Domestic", "/publications/domestic.html"]
  ]},
  { label: "Project", href: "/project/" },
  { label: "Activities", section: "/activities/", labelOnly: true, children: [
    ["Courses", "/activities/courses.html"], ["Conferences", "/activities/conferences.html"], ["Invited Talks", "/activities/invited-talks.html"], ["Reviewers", "/activities/peer-review.html"]
  ]},
  { label: "News", section: "/news/", labelOnly: true, children: [
    ["New", "/news/"], ["Gallery", "/news/gallery.html"]
  ]},
  { label: "Links", href: "/links/" }
];

const path = window.location.pathname.replace(/\/index\.html$/, "/");
const isCurrentSection = (href) => href === "/" ? path === "/" : path.startsWith(href);

const header = document.querySelector("[data-site-header]");
if (header) {
  header.innerHTML = `
    <header class="site-header">
      <div class="nav-wrap">
        <a class="brand" href="/" aria-label="APMM home">
          <img class="brand-logo" src="/assets/images/logo.png" alt="">
        </a>
        <button class="nav-toggle" type="button" aria-label="Open navigation" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
        <nav class="main-nav" aria-label="Main navigation">
          <ul class="nav-list">
            ${navigation.map(item => `
              <li class="nav-item ${item.children ? "has-dropdown" : ""} ${isCurrentSection(item.href || item.section) ? "is-current" : ""}">
                ${item.labelOnly
                  ? `<button class="nav-link nav-dropdown-toggle" type="button" aria-expanded="false">${item.label}</button>`
                  : `<a class="nav-link" href="${item.href}" ${path === item.href ? 'aria-current="page"' : ""}>${item.label}</a>`}
                ${item.children ? `<ul class="dropdown">${item.children.map(([label, href]) => `<li><a href="${href}" ${path === href ? 'aria-current="page"' : ""}>${label}</a></li>`).join("")}</ul>` : ""}
              </li>`).join("")}
          </ul>
        </nav>
      </div>
    </header>`;

  const toggle = header.querySelector(".nav-toggle");
  const nav = header.querySelector(".main-nav");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });

  header.querySelectorAll(".has-dropdown > .nav-link").forEach(link => {
    link.addEventListener("click", event => {
      const parent = link.parentElement;
      if (link.classList.contains("nav-dropdown-toggle")) {
        event.preventDefault();
        if (window.matchMedia("(max-width: 1100px)").matches) {
          const open = parent.classList.toggle("dropdown-open");
          link.setAttribute("aria-expanded", String(open));
        }
        return;
      }
      if (window.matchMedia("(max-width: 1100px)").matches) {
        if (!parent.classList.contains("dropdown-open")) {
          event.preventDefault();
          parent.classList.add("dropdown-open");
        }
      }
    });
  });
}

const footer = document.querySelector("[data-site-footer]");
if (footer) {
  footer.innerHTML = `<footer class="site-footer"><div class="footer-inner">&copy; <span data-year></span> Research Laboratory</div></footer>`;
  footer.querySelector("[data-year]").textContent = new Date().getFullYear();
}

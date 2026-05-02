const body = document.body;
const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const brandLink = document.querySelector(".brand");
const navAnchors = [...document.querySelectorAll(".site-nav a")];
const footerTopLinks = [...document.querySelectorAll(".site-footer a[href]:not([href*='#'])")];
const personFocusLinks = [...document.querySelectorAll("[data-focus-person]")];
const currentUrl = new URL(window.location.href);
const navLinks = navAnchors.filter((link) => {
  const linkUrl = new URL(link.href);
  return linkUrl.hash && linkUrl.pathname === currentUrl.pathname && linkUrl.search === currentUrl.search;
});
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const projectCards = [...document.querySelectorAll(".project-card")];
const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");
const slideshowTriggers = [...document.querySelectorAll("[data-slideshow]")];
const slideshowModal = document.querySelector("[data-slideshow-modal]");
const slideshowImage = document.querySelector("[data-slideshow-image]");
const slideshowTitle = document.querySelector("[data-slideshow-title]");
const slideshowCaption = document.querySelector("[data-slideshow-caption]");
const slideshowCount = document.querySelector("[data-slideshow-count]");
const slideshowDots = document.querySelector("[data-slideshow-dots]");
const slideshowClose = document.querySelector("[data-slideshow-close]");
const slideshowPrev = document.querySelector("[data-slideshow-prev]");
const slideshowNext = document.querySelector("[data-slideshow-next]");
let activeSlideshow = null;
let activeSlideIndex = 0;
let slideshowTimer = null;

const runningGalleries = {
  gallusareal: {
    title: "Gallusareal - 9016 St. Gallen",
    details: ["Tutilo AG - St.Gallen", "Perita AG - St.Gallen"],
    images: [
      "assets/legacy-all/images_typ890_858.jpg",
      "assets/legacy-all/images_typ890_860.jpg",
      "assets/legacy-all/images_typ890_861.jpg",
      "assets/legacy-all/images_typ890_862.jpg",
      "assets/legacy-all/images_typ890_863.jpg"
    ]
  },
  huber: {
    title: "Huber Kunststoff AG, Gossau SG",
    details: ["IE Industrial Engineering - 8008 Zürich"],
    images: [
      "assets/legacy-all/images_typ890_719.jpg",
      "assets/legacy-all/images_typ890_720.jpg",
      "assets/legacy-all/images_typ890_717.jpg",
      "assets/legacy-all/images_typ890_718.jpg",
      "assets/legacy-all/images_typ890_714.jpg",
      "assets/legacy-all/images_typ890_716.jpg",
      "assets/legacy-all/images_typ890_715.jpg",
      "assets/legacy-all/images_typ890_699.jpg",
      "assets/legacy-all/images_typ890_700.jpg",
      "assets/legacy-all/images_typ890_701.jpg",
      "assets/legacy-all/images_typ890_702.jpg",
      "assets/legacy-all/images_typ890_703.jpg",
      "assets/legacy-all/images_typ890_704.jpg",
      "assets/legacy-all/images_typ890_705.jpg",
      "assets/legacy-all/images_typ890_706.jpg",
      "assets/legacy-all/images_typ890_707.jpg",
      "assets/legacy-all/images_typ890_708.jpg",
      "assets/legacy-all/images_typ890_709.jpg",
      "assets/legacy-all/images_typ890_710.jpg",
      "assets/legacy-all/images_typ890_711.jpg",
      "assets/legacy-all/images_typ890_712.jpg",
      "assets/legacy-all/images_typ890_713.jpg"
    ]
  },
  datacenter: {
    title: "Datacenter MCZ, Dielsdorf",
    details: ["Baltensperger AG - 8181 Höri"],
    images: [
      "assets/legacy-all/images_typ890_738.jpg",
      "assets/legacy-all/images_typ890_739.jpg",
      "assets/legacy-all/images_typ890_740.jpg"
    ]
  },
  "selfstorage-dietikon": {
    title: "Selfstorage - 8953 Dietikon",
    details: ["ReGall Generalunternehmung AG - St. Gallen", "Raumwerk AG - Amriswil"],
    images: [
      "assets/legacy-all/images_typ890_850.jpg",
      "assets/legacy-all/images_typ890_851.jpg",
      "assets/legacy-all/images_typ890_852.jpg",
      "assets/legacy-all/images_typ890_853.jpg",
      "assets/legacy-all/images_typ890_854.jpg",
      "assets/legacy-all/images_typ890_855.jpg",
      "assets/legacy-all/images_typ890_856.jpg"
    ]
  },
  rikon: {
    title: "Werkstattgebäude Rikon - 8486 Rikon im Tösstal",
    details: ["ROBAUEN AG - Winterthur"],
    images: [
      "assets/legacy-all/images_typ890_835.jpg",
      "assets/legacy-all/images_typ890_836.jpg",
      "assets/legacy-all/images_typ890_837.jpg",
      "assets/legacy-all/images_typ890_838.jpg",
      "assets/legacy-all/images_typ890_839.jpg",
      "assets/legacy-all/images_typ890_840.jpg",
      "assets/legacy-all/images_typ890_841.jpg",
      "assets/legacy-all/images_typ890_842.jpg",
      "assets/legacy-all/images_typ890_843.jpg",
      "assets/legacy-all/images_typ890_844.jpg",
      "assets/legacy-all/images_typ890_845.jpg"
    ]
  },
  anplaq: {
    title: "Anplaq AG - 7015 Tamins",
    details: ["Biedenkapp Stahlbau AG - Rheineck", "RITTER SCHUMACHER AG - ARCHITEKTEN ETH HTL AA SIA - Chur"],
    images: [
      "assets/legacy-all/images_typ890_810.jpg",
      "assets/legacy-all/images_typ890_811.jpg",
      "assets/legacy-all/images_typ890_812.jpg",
      "assets/legacy-all/images_typ890_813.jpg",
      "assets/legacy-all/images_typ890_814.jpg",
      "assets/legacy-all/images_typ890_815.jpg",
      "assets/legacy-all/images_typ890_816.jpg",
      "assets/legacy-all/images_typ890_817.jpg",
      "assets/legacy-all/images_typ890_818.jpg"
    ]
  },
  mittelland: {
    title: "Mittelland Molkerei AG - 5034 Suhr",
    details: ["Prometplan AG - Brügg"],
    images: [
      "assets/legacy-all/images_typ890_819.jpg",
      "assets/legacy-all/images_typ890_820.jpg",
      "assets/legacy-all/images_typ890_821.jpg",
      "assets/legacy-all/images_typ890_822.jpg",
      "assets/legacy-all/images_typ890_823.jpg"
    ]
  },
  hiag: {
    title: "HIAG AG - Oerlikon Metco AG - 5212 Hausen",
    details: ["HIAG Immobilien AG", "Schiess ITI AG - Dübendorf"],
    images: [
      "assets/legacy-all/images_typ890_846.jpg"
    ]
  },
  wallisellen: {
    title: "Neubau MFH - Lägernstrasse 16 - 8304 Wallisellen",
    details: ["Thomet Partner AG - Lufingen", "Primobilia AG - Wallisellen"],
    images: [
      "assets/running/wallisellen-01.jpg",
      "assets/running/wallisellen-02.jpg",
      "assets/running/wallisellen-03.jpg",
      "assets/running/wallisellen-04.jpg",
      "assets/running/wallisellen-05.jpg",
      "assets/running/wallisellen-06.jpg"
    ]
  },
  apfelmatte: {
    title: "Gewerbebau Apfelmatte - 8833 Samstagern",
    details: ["Hotz Partner AG SIA - Wädenswil", "KMR Immoblien c/o Keller Metallbau AG"],
    images: [
      "assets/running/apfelmatte-01.jpg",
      "assets/running/apfelmatte-02.jpg",
      "assets/running/apfelmatte-03.jpg",
      "assets/running/apfelmatte-04.jpg",
      "assets/running/apfelmatte-05.jpg",
      "assets/running/apfelmatte-06.jpg"
    ]
  },
  jossi: {
    title: "Jossi Management AG - 8546 Islikon",
    details: ["MLR Baumanagement GmbH - 8574 Dettighofen"],
    images: [
      "assets/running/jossi-01.jpg",
      "assets/running/jossi-02.jpg",
      "assets/running/jossi-03.jpg",
      "assets/running/jossi-04.jpg",
      "assets/running/jossi-05.jpg",
      "assets/running/jossi-06.jpg",
      "assets/running/jossi-07.jpg",
      "assets/running/jossi-08.jpg",
      "assets/running/jossi-09.jpg",
      "assets/running/jossi-10.jpg",
      "assets/running/jossi-11.jpg"
    ]
  },
  fahrmaadhof: {
    title: "Fahrmaadhof AG - 9444 Diepoldsau",
    details: ["CHRISTUZZI Architektur AG - Widnau"],
    images: [
      "assets/running/fahrmaadhof-01.jpg",
      "assets/running/fahrmaadhof-02.jpg",
      "assets/running/fahrmaadhof-03.jpg",
      "assets/running/fahrmaadhof-04.jpg",
      "assets/running/fahrmaadhof-05.jpg",
      "assets/running/fahrmaadhof-06.jpg",
      "assets/running/fahrmaadhof-07.jpg",
      "assets/running/fahrmaadhof-08.jpg",
      "assets/running/fahrmaadhof-09.jpg",
      "assets/running/fahrmaadhof-10.jpg"
    ]
  },
  spross: {
    title: "Spross Transport & Recycling AG - 8004 Zürich",
    details: ["Schiess ITI AG - 8052 Zürich"],
    images: [
      "assets/running/spross-01.jpg",
      "assets/running/spross-02.jpg",
      "assets/running/spross-03.jpg",
      "assets/running/spross-04.jpg",
      "assets/running/spross-05.jpg",
      "assets/running/spross-06.jpg",
      "assets/running/spross-07.jpg",
      "assets/running/spross-08.jpg",
      "assets/running/spross-09.jpg"
    ]
  },
  "ref-selfstorage": {
    title: "Neubau Selfstoragegebäude - 9320 Frasnacht",
    images: [
      "assets/legacy-all/images_typ890_597.jpg",
      "assets/legacy-all/images_typ890_598.jpg",
      "assets/legacy-all/images_typ890_599.jpg",
      "assets/legacy-all/images_typ890_600.jpg"
    ]
  },
  "ref-kellenberger": {
    title: "L. Kellenberger & Co. AG - 9403 Goldach",
    images: [
      "assets/legacy-all/images_typ890_849.jpg",
      "assets/legacy-all/images_typ890_848.jpg",
      "assets/legacy-all/images_typ890_520.jpg",
      "assets/legacy-all/images_typ890_521.jpg",
      "assets/legacy-all/images_typ890_522.jpg"
    ]
  },
  "ref-opima": {
    title: "Opima AG - Steinach",
    images: [
      "assets/legacy-all/images_typ890_787.jpg",
      "assets/legacy-all/images_typ890_784.jpg",
      "assets/legacy-all/images_typ890_785.jpg",
      "assets/legacy-all/images_typ890_786.jpg",
      "assets/legacy-all/images_typ890_788.jpg",
      "assets/legacy-all/images_typ890_789.jpg"
    ]
  },
  "ref-park19": {
    title: "Gewerbehaus Park 19 - Frauenfeld",
    images: [
      "assets/legacy-all/images_typ890_744.jpg",
      "assets/legacy-all/images_typ890_745.jpg",
      "assets/legacy-all/images_typ890_742.jpg",
      "assets/legacy-all/images_typ890_747.jpg",
      "assets/legacy-all/images_typ890_741.jpg",
      "assets/legacy-all/images_typ890_746.jpg",
      "assets/legacy-all/images_typ890_743.jpg",
      "assets/legacy-all/images_typ890_748.jpg"
    ]
  },
  "ref-hnz": {
    title: "HNZ Herz-Neuro-Zentrale - Münsterlingen",
    images: [
      "assets/legacy-all/images_typ890_290.jpg",
      "assets/legacy-all/images_typ890_291.jpg",
      "assets/legacy-all/images_typ890_292.jpg",
      "assets/legacy-all/images_typ890_293.jpg"
    ]
  },
  "ref-luzisteig": {
    title: "MZH St. Luzisteig - Fläsch",
    images: [
      "assets/legacy-all/images_typ890_258.jpg",
      "assets/legacy-all/images_typ890_259.jpg",
      "assets/legacy-all/images_typ890_263.jpg"
    ]
  },
  "ref-ist": {
    title: "IST AG - Ebnat-Kappel",
    images: [
      "assets/legacy-all/images_typ890_256.jpg"
    ]
  },
  "ref-schuetzenwiese": {
    title: "Schützenwiese - Kriessern",
    images: [
      "assets/legacy-all/images_typ890_271.jpg",
      "assets/legacy-all/images_typ890_278.jpg",
      "assets/legacy-all/images_typ890_269.jpg",
      "assets/legacy-all/images_typ890_273.jpg",
      "assets/legacy-all/images_typ890_281.jpg",
      "assets/legacy-all/images_typ890_277.jpg",
      "assets/legacy-all/images_typ890_274.jpg",
      "assets/legacy-all/images_typ890_270.jpg",
      "assets/legacy-all/images_typ890_280.jpg"
    ]
  },
  "ref-hochdorf": {
    title: "Hochdorf Swiss Nutrition AG - Sulgen",
    images: [
      "assets/legacy-all/images_typ890_254.jpg",
      "assets/legacy-all/images_typ890_255.jpg",
      "assets/legacy-all/images_typ890_253.jpg"
    ]
  },
  "ref-badminton": {
    title: "Badmintonhalle - Dielsdorf",
    images: [
      "assets/legacy-all/images_typ890_235.jpg",
      "assets/legacy-all/images_typ890_236.jpg"
    ]
  },
  "ref-zentrum-heerbrugg": {
    title: "Zentrum - Heerbrugg",
    images: [
      "assets/legacy-all/images_typ890_230.jpg",
      "assets/legacy-all/images_typ890_231.jpg",
      "assets/legacy-all/images_typ890_232.jpg"
    ]
  },
  "ref-kirche": {
    title: "Neuapostolische Kirche - Winterthur",
    images: [
      "assets/legacy-all/images_typ890_200.jpg",
      "assets/legacy-all/images_typ890_199.jpg",
      "assets/legacy-all/images_typ890_202.jpg",
      "assets/legacy-all/images_typ890_203.jpg",
      "assets/legacy-all/images_typ890_201.jpg"
    ]
  },
  "ref-motorex": {
    title: "MOTOREX-BUCHER GROUP AG",
    images: [
      "assets/legacy-all/images_typ890_204.jpg",
      "assets/legacy-all/images_typ890_205.jpg",
      "assets/legacy-all/images_typ890_206.jpg",
      "assets/legacy-all/images_typ890_207.jpg",
      "assets/legacy-all/images_typ890_208.jpg",
      "assets/legacy-all/images_typ890_209.jpg"
    ]
  },
  "ref-busdepot": {
    title: "Busdepot Stadt Winterthur",
    images: [
      "assets/legacy-all/images_typ890_215.jpg",
      "assets/legacy-all/images_typ890_216.jpg",
      "assets/legacy-all/images_typ890_217.jpg",
      "assets/legacy-all/images_typ890_219.jpg",
      "assets/legacy-all/images_typ890_213.jpg",
      "assets/legacy-all/images_typ890_228.jpg"
    ]
  },
  "ref-coop": {
    title: "Coop - Güttingen",
    images: [
      "assets/legacy-all/images_typ890_240.jpg",
      "assets/legacy-all/images_typ890_239.jpg",
      "assets/legacy-all/images_typ890_241.jpg"
    ]
  },
  "ref-migros": {
    title: "Migros Walke - Herisau",
    images: [
      "assets/legacy-all/images_typ890_244.jpg",
      "assets/legacy-all/images_typ890_243.jpg",
      "assets/legacy-all/images_typ890_245.jpg"
    ]
  },
  "ref-sicherheit": {
    title: "Sicherheitszentrum - Weinfelden",
    images: [
      "assets/legacy-all/images_typ890_247.jpg",
      "assets/legacy-all/images_typ890_248.jpg",
      "assets/legacy-all/images_typ890_251.jpg",
      "assets/legacy-all/images_typ890_250.jpg",
      "assets/legacy-all/images_typ890_249.jpg"
    ]
  }
};

navToggle?.addEventListener("click", () => {
  const expanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!expanded));
  navToggle.setAttribute("aria-label", expanded ? "Navigation öffnen" : "Navigation schliessen");
  nav?.classList.toggle("is-open", !expanded);
  body.classList.toggle("nav-open", !expanded);
});

const closeNavigation = () => {
  nav?.classList.remove("is-open");
  body.classList.remove("nav-open");
  navToggle?.setAttribute("aria-expanded", "false");
  navToggle?.setAttribute("aria-label", "Navigation öffnen");
};

brandLink?.addEventListener("click", (event) => {
  const brandUrl = new URL(brandLink.href);
  if (brandUrl.pathname !== currentUrl.pathname || brandUrl.search !== currentUrl.search) {
    closeNavigation();
    return;
  }

  event.preventDefault();
  closeNavigation();
  window.scrollTo({ top: 0, behavior: "smooth" });
  history.replaceState(null, "", window.location.href.split("#")[0]);
});

navAnchors.forEach((link) => {
  link.addEventListener("click", () => {
    closeNavigation();
  });
});

footerTopLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const linkUrl = new URL(link.href);
    if (linkUrl.pathname !== currentUrl.pathname || linkUrl.search !== currentUrl.search) return;

    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.replaceState(null, "", window.location.href.split("#")[0]);
  });
});

personFocusLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const personCard = document.getElementById(link.dataset.focusPerson);
    if (!personCard) return;

    document.querySelectorAll(".person-card.is-highlighted").forEach((card) => {
      card.classList.remove("is-highlighted");
    });

    personCard.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => {
      personCard.classList.add("is-visible", "is-highlighted");
      personCard.focus({ preventScroll: true });
    }, 360);
    window.setTimeout(() => personCard.classList.remove("is-highlighted"), 3600);
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  {
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0
  }
);

document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
});

const stopSlideshow = () => {
  if (slideshowTimer) {
    window.clearInterval(slideshowTimer);
    slideshowTimer = null;
  }
};

const startSlideshow = () => {
  stopSlideshow();
  if (!activeSlideshow || activeSlideshow.images.length < 2) return;
  slideshowTimer = window.setInterval(() => {
    showSlide(activeSlideIndex + 1);
  }, 4200);
};

const renderSlideshowDots = () => {
  if (!slideshowDots || !activeSlideshow) return;
  slideshowDots.innerHTML = "";
  activeSlideshow.images.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Bild ${index + 1} anzeigen`);
    dot.classList.toggle("is-active", index === activeSlideIndex);
    dot.addEventListener("click", () => {
      showSlide(index);
      startSlideshow();
    });
    slideshowDots.append(dot);
  });
};

const renderSlideshowCaption = () => {
  if (!slideshowCaption || !activeSlideshow) return;
  const details = activeSlideshow.details || [];
  slideshowCaption.replaceChildren();
  slideshowCaption.hidden = details.length === 0;
  details.forEach((line) => {
    const detailLine = document.createElement("span");
    detailLine.textContent = line;
    slideshowCaption.append(detailLine);
  });
};

function showSlide(index) {
  if (!activeSlideshow || !slideshowImage || !slideshowCount) return;
  activeSlideIndex = (index + activeSlideshow.images.length) % activeSlideshow.images.length;
  slideshowImage.classList.add("is-switching");
  window.setTimeout(() => {
    if (!activeSlideshow || !slideshowImage || !slideshowCount) return;
    slideshowImage.src = activeSlideshow.images[activeSlideIndex];
    slideshowImage.alt = `${activeSlideshow.title} - Bild ${activeSlideIndex + 1}`;
    slideshowCount.textContent = `${activeSlideIndex + 1} / ${activeSlideshow.images.length}`;
    renderSlideshowDots();
    slideshowImage.classList.remove("is-switching");
  }, 120);
}

const openSlideshow = (galleryKey) => {
  const gallery = runningGalleries[galleryKey];
  if (!gallery || !slideshowModal || !slideshowTitle) return;
  activeSlideshow = gallery;
  activeSlideIndex = 0;
  slideshowTitle.textContent = gallery.title;
  renderSlideshowCaption();
  slideshowModal.classList.add("is-open");
  slideshowModal.setAttribute("aria-hidden", "false");
  body.classList.add("nav-open");
  showSlide(0);
  startSlideshow();
  slideshowClose?.focus();
};

const closeSlideshow = () => {
  stopSlideshow();
  slideshowModal?.classList.remove("is-open");
  slideshowModal?.setAttribute("aria-hidden", "true");
  body.classList.remove("nav-open");
  activeSlideshow = null;
};

slideshowTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => openSlideshow(trigger.dataset.slideshow));
});

slideshowClose?.addEventListener("click", closeSlideshow);
slideshowPrev?.addEventListener("click", () => {
  showSlide(activeSlideIndex - 1);
  startSlideshow();
});
slideshowNext?.addEventListener("click", () => {
  showSlide(activeSlideIndex + 1);
  startSlideshow();
});

slideshowModal?.addEventListener("click", (event) => {
  if (event.target === slideshowModal) closeSlideshow();
});

document.addEventListener("keydown", (event) => {
  if (!slideshowModal?.classList.contains("is-open")) return;
  if (event.key === "Escape") closeSlideshow();
  if (event.key === "ArrowLeft") {
    showSlide(activeSlideIndex - 1);
    startSlideshow();
  }
  if (event.key === "ArrowRight") {
    showSlide(activeSlideIndex + 1);
    startSlideshow();
  }
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    projectCards.forEach((card) => {
      const visible = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !visible);
    });
  });
});

const clearInvalidState = (field) => {
  field.classList.remove("is-invalid");
  field.removeAttribute("aria-invalid");
};

const markInvalidFields = () => {
  contactForm?.querySelectorAll("input, textarea").forEach((field) => {
    const invalid = !field.checkValidity();
    field.classList.toggle("is-invalid", invalid);
    if (invalid) {
      field.setAttribute("aria-invalid", "true");
    } else {
      field.removeAttribute("aria-invalid");
    }
  });
};

const scrollToInvalidField = (field) => {
  const target = field.closest("label") || field;
  const headerOffset = (header?.offsetHeight || 0) + 28;
  const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;

  window.scrollTo({ top: Math.max(targetTop, 0), behavior: "smooth" });
  window.setTimeout(() => {
    field.focus({ preventScroll: true });
    field.reportValidity();
  }, 520);
};

contactForm?.querySelectorAll("input, textarea").forEach((field) => {
  field.addEventListener("input", () => {
    if (field.checkValidity()) clearInvalidState(field);
  });
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    const firstInvalidField = contactForm.querySelector("input:invalid, textarea:invalid");
    markInvalidFields();
    if (formStatus) {
      formStatus.textContent = "Bitte fülle zuerst die markierten Pflichtfelder aus.";
    }
    if (firstInvalidField) scrollToInvalidField(firstInvalidField);
    return;
  }

  const data = new FormData(contactForm);
  const lines = [
    `Firma: ${data.get("firma") || "-"}`,
    `Name: ${data.get("name") || "-"}`,
    `E-Mail: ${data.get("email") || "-"}`,
    `Telefon: ${data.get("telefon") || "-"}`,
    "",
    "Nachricht:",
    String(data.get("nachricht") || "")
  ];

  const subject = encodeURIComponent("Projektanfrage an die COVRA Metall AG");
  const bodyText = encodeURIComponent(lines.join("\n"));
  window.location.href = `mailto:info@covra.ch?subject=${subject}&body=${bodyText}`;

  if (formStatus) {
    formStatus.textContent = "Die Anfrage wurde in deinem E-Mail-Programm vorbereitet.";
  }

  contactForm.querySelectorAll("input, textarea").forEach(clearInvalidState);
});

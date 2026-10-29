(() => {
  const header = document.querySelector("[data-port-header]");
  if (!header) return;

  const burger = header.querySelector(".port-burger");
  const nav = header.querySelector(".port-nav");
  const drops = [...header.querySelectorAll(".port-drop")];

  const closeDrops = () => {
    drops.forEach((drop) => {
      drop.classList.remove("is-open");
      drop.querySelector("button")?.setAttribute("aria-expanded", "false");
    });
  };

  const setBurgerLabel = () => {
    if (!burger) return;
    const open = header.classList.contains("is-menu");
    const lang = document.documentElement.lang || "en";
    const key = open ? "close" : "open";
    const label =
      lang === "de"
        ? burger.dataset[key + "De"]
        : lang === "zh-CN" || lang.startsWith("zh")
          ? burger.dataset[key + "Zh"]
          : burger.dataset[key + "En"];
    burger.setAttribute("aria-label", label || "");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    if (nav) {
      const navLabel =
        lang === "de"
          ? nav.dataset.labelDe
          : lang === "zh-CN" || lang.startsWith("zh")
            ? nav.dataset.labelZh
            : nav.dataset.labelEn;
      if (navLabel) nav.setAttribute("aria-label", navLabel);
    }
  };

  burger?.addEventListener("click", () => {
    header.classList.toggle("is-menu");
    closeDrops();
    setBurgerLabel();
  });

  drops.forEach((drop) => {
    const button = drop.querySelector("button");
    button?.addEventListener("click", (event) => {
      event.stopPropagation();
      const willOpen = !drop.classList.contains("is-open");
      closeDrops();
      drop.classList.toggle("is-open", willOpen);
      button.setAttribute("aria-expanded", willOpen ? "true" : "false");
    });
  });

  document.addEventListener("click", (event) => {
    if (header.contains(event.target)) return;
    closeDrops();
    if (header.classList.contains("is-menu")) {
      header.classList.remove("is-menu");
      setBurgerLabel();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    closeDrops();
    if (header.classList.contains("is-menu")) {
      header.classList.remove("is-menu");
      setBurgerLabel();
      burger?.focus();
    }
  });

  const top = document.querySelector(".sh-top");
  if (top && !top.id) {
    top.id = "port-main";
    top.tabIndex = -1;
  }

  setBurgerLabel();
  new MutationObserver(setBurgerLabel).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"],
  });
})();

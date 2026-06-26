/* Centre Dream PH — lightweight FR/EN toggle (text-node translation, no page reload) */
(function () {
  var DICT = {
    // Nav
    "MASSAGES": "MASSAGES", "HAMMAM": "HAMMAM", "FORFAITS": "PACKAGES", "CONTACT": "CONTACT",
    // Hero
    "S’arrêter,": "Slow down,", "respirer,": "breathe,", "se reconnecter": "reconnect",
    "Centre Dream PH, votre spa asiatique de bien-être à Casablanca, vous accueille dans un cadre raffiné et apaisant. Nos soins ancestraux d’Asie allient traditions, savoir-faire et bienveillance pour rétablir l’harmonie du corps, de l’esprit et de l’âme.":
      "Centre Dream PH, your Asian wellness spa in Casablanca, welcomes you in a refined and soothing setting. Our ancestral Asian treatments blend tradition, expertise and care to restore the harmony of body, mind and soul.",
    // Dark section
    "L’art du": "The art of", "bien-être": "well-being",
    "Massages signature, traditionnels et thaï, rituels du hammam, jacuzzi privatif et forfaits d’exception : chaque soin est pensé pour vous offrir un moment d’évasion et de sérénité absolue.":
      "Signature, traditional and Thai massages, hammam rituals, private jacuzzi and exceptional packages: every treatment is crafted to offer you a moment of escape and absolute serenity.",
    // Marquees
    "Massages": "Massages", "Hammam & Rituels": "Hammam & Rituals", "Forfaits & VIP": "Packages & VIP",
    // Service cards (split titles)
    "Nos": "Our", "Hammam": "Hammam", "& Rituels": "& Rituals", "Forfaits": "Packages",
    "Massages signature, suédois, oriental, plantaire ou thaï : des soins sur-mesure pour apaiser le corps, l’esprit et l’âme.":
      "Signature, Swedish, Oriental, foot or Thai massages: bespoke treatments to soothe the body, mind and soul.",
    "Hammam traditionnel ou oriental royal, gommage au savon noir et enveloppement au rassoul pour une peau douce, purifiée et éclatante.":
      "Traditional or royal Oriental hammam, black-soap scrub and rhassoul wrap for soft, purified and radiant skin.",
    "Forfaits Classic, Premium et Luxury, jacuzzi privatif et expériences VIP : offrez-vous plus qu’un soin, offrez-vous une expérience.":
      "Classic, Premium and Luxury packages, private jacuzzi and VIP experiences: treat yourself to more than a treatment — treat yourself to an experience.",
    // CTAs
    "Découvrir": "Discover", "le soin": "the treatment",
    "Prendre": "Book an", "rendez-vous": "appointment",
    "S'offrir": "Treat yourself", "une pause": "to a break",
    // Philosophy quote
    "Prenez": "Take", "le temps": "the time", "de vous,": "for yourself,", "VOUS LE": "YOU", "méritez.": "deserve it.",
    "‘‘ PRENEZ LE TEMPS DE VOUS. VOUS LE MÉRITEZ. ’’": "‘‘ TAKE TIME FOR YOURSELF. YOU DESERVE IT. ’’",
    // About
    "Au Centre Dream PH, nous sommes passionnés par l’art du bien-être. Notre philosophie : ‘‘ prenez le temps de vous ’’, pour vous arrêter, respirer et vous reconnecter à l’essentiel.":
      "At Centre Dream PH, we are passionate about the art of well-being. Our philosophy: ‘‘ take time for yourself ’’ — to slow down, breathe and reconnect with what truly matters.",
    "Niché au cœur de Casablanca, le Centre Dream PH est un véritable havre de paix dédié aux soins ancestraux d’Asie. Massages signature, traditionnels et thaï, rituels du hammam, jacuzzi privatif et forfaits d’exception : nos thérapeutes experts allient traditions, savoir-faire et bienveillance pour rétablir l’harmonie du corps, de l’esprit et de l’âme.":
      "Nestled in the heart of Casablanca, Centre Dream PH is a true haven of peace dedicated to ancestral Asian treatments. Signature, traditional and Thai massages, hammam rituals, private jacuzzi and exceptional packages: our expert therapists blend tradition, expertise and care to restore the harmony of body, mind and soul.",
    "Aujourd'hui, nous vous accueillons avec toute notre attention et dans la bienveillance.":
      "Today, we welcome you with our full attention and care.",
    // Localisation
    "Où ?": "Where?", "Afficher sur": "View on", "google map": "Google Maps", "Allons-y !": "Let’s go!",
    "Sur place": "On site",
    "11 Rue Badr Assayab, Casablanca 20250, Maroc": "11 Rue Badr Assayab, Casablanca 20250, Morocco",
    // Testimonials
    "Nos clients": "Our clients", "en parlent": "say",
    "J’ai vécu un massage signature au": "I had a signature massage at",
    "Centre Dream PH. Une expérience": "Centre Dream PH. A truly",
    "d’exception. C’est une": "exceptional experience. A",
    "équipe très à l’écoute et": "team that truly listens and is",
    "passionnée par son métier.": "passionate about their craft.",
    "Un vrai moment d’évasion et de": "A real moment of escape and",
    "et de sérénité absolue.": "of absolute serenity.",
    "sérénité absolue.": "absolute serenity.",
    "J’ai vécu un massage signature au Centre": "I had a signature massage at Centre",
    "Dream PH. Une expérience d’exception. C’est": "Dream PH. A truly exceptional experience. A",
    "une équipe très à l’écoute et passionnée": "a team that truly listens and is passionate",
    "par son métier. Un vrai moment d’évasion": "about their craft. A real moment of escape",
    "Le hammam oriental royal a été une": "The royal Oriental hammam was a",
    "véritable pause de bien-être qui": "true moment of well-being that",
    "m'a permis de retrouver de": "helped me regain my",
    "l’énergie après une période de": "energy after a period of",
    "fatigue.": "fatigue.",
    "véritable pause de bien-être qui m’a": "true moment of well-being that",
    "permis de retrouver de l’énergie après": "helped me regain my energy after",
    "une période de fatigue.": "a period of fatigue.",
    "Merci pour votre approche très": "Thank you for your very",
    "professionnelle du bien-être du": "professional approach to the well-being of the",
    "corps en respect de la personne.": "body, respecting the person.",
    "Bon toucher, belle énergie, bon": "Great touch, beautiful energy, great",
    "massage. Que demander de plus ?": "massage. What more could you ask for?",
    "professionnelle du bien-être du corps": "professional approach to the well-being of the body",
    "en respect de la personne. Bon toucher,": "respecting the person. Great touch,",
    "belle énergie, bon massage. Que": "beautiful energy, great massage. What",
    "demander de plus ?": "more could you ask for?",
    "Un moment où j'ai trouvé la paix,": "A moment where I found peace,",
    "la tranquillité pour me déposer": "and the calm to let myself go",
    "dans un cadre chaleureux.": "in a warm setting.",
    "L’équipe sait prendre soin": "The team knows how to care",
    "avec douceur et harmonie.": "with gentleness and harmony.",
    "la tranquillité pour me déposer dans": "and the calm to let myself go in",
    "un cadre chaleureux. L’équipe sait": "a warm setting. The team knows how",
    "prendre soin avec douceur et harmonie.": "to care with gentleness and harmony.",
    // Axes section
    "Axes pour une": "Keys to", "meilleure santé": "better well-being",
    "Les sources du déséquilibre sont notre environnement. Effectivement, les processus d’auto-guérison se réalisent tous seuls mais ont d'abord besoin de notre consentement. Notre corps est notre véhicule, il a simplement besoin d’un bon entretien, là est notre consentement. C’est notre environnement qui nous permet ou pas d’être en bonne santé. À nous de décider...":
      "The sources of imbalance lie in our environment. True well-being begins with self-care and intention. Our body is our vehicle; it simply needs proper care. It is our environment that lets us feel our very best. The choice is ours...",
    "Nettoyage": "Cleansing", "Alimentation": "Nutrition", "Repos": "Rest", "Optimisme": "Optimism", "Entretien physique": "Movement",
    // Footer
    "Votre bien-être,": "Your well-being,", "notre": "our", "priorité": "priority",
    // Next soin
    "Soin suivant": "Next treatment",
    // Service pages captions + titles + intros
    "dès 300 DH": "from 300 DH", "dès 400 DH": "from 400 DH",
    "Nos Massages": "Our Massages", "Nos Forfaits": "Our Packages",
    "Massages signature, traditionnels et thaï — pour apaiser le corps, l’esprit et l’âme.":
      "Signature, traditional and Thai massages — to soothe the body, mind and soul.",
    "Rituels du bain, jacuzzi privatif et expériences VIP — pour purifier le corps et réveiller les sens.":
      "Bath rituals, private jacuzzi and VIP experiences — to purify the body and awaken the senses.",
    "Forfaits Classic, Premium et Luxury — offrez-vous plus qu’un soin, offrez-vous une expérience.":
      "Classic, Premium and Luxury packages — treat yourself to more than a treatment, treat yourself to an experience.",
    // Contact
    "Afficher": "View", "le lieu": "the location", "Google map": "Google Maps",
    "Pour réserver votre moment de bien-être, contactez-nous par téléphone, WhatsApp ou e-mail. Ouvert tous les jours de 10h à 23h.":
      "To book your moment of well-being, contact us by phone, WhatsApp or e-mail. Open every day from 10am to 11pm."
  };

  var TITLES = {
    "Centre Dream PH — Spa asiatique de bien-être à Casablanca": "Centre Dream PH — Asian Wellness Spa in Casablanca",
    "Centre Dream PH — Contact & Réservation, Casablanca": "Centre Dream PH — Contact & Booking, Casablanca",
    "Nos Massages — Centre Dream PH, Casablanca": "Our Massages — Centre Dream PH, Casablanca",
    "Hammam & Rituels — Centre Dream PH, Casablanca": "Hammam & Rituals — Centre Dream PH, Casablanca",
    "Nos Forfaits — Centre Dream PH, Casablanca": "Our Packages — Centre Dream PH, Casablanca"
  };

  var KEY = "cdph_lang";
  var nodes = null, frTitle = null;

  function collect() {
    nodes = [];
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        var p = n.parentNode;
        if (p && /^(SCRIPT|STYLE|NOSCRIPT)$/.test(p.nodeName)) return NodeFilter.FILTER_REJECT;
        if (p && p.classList && p.classList.contains("i18n-toggle")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var n;
    while ((n = w.nextNode())) nodes.push({ node: n, fr: n.nodeValue });
    frTitle = document.title;
  }

  function apply(lang) {
    if (!nodes) collect();
    nodes.forEach(function (it) {
      var key = it.fr.trim();
      if (lang === "en" && DICT[key] != null) it.node.nodeValue = it.fr.replace(key, DICT[key]);
      else it.node.nodeValue = it.fr;
    });
    var tk = frTitle.trim();
    document.title = (lang === "en" && TITLES[tk]) ? TITLES[tk] : frTitle;
    document.documentElement.setAttribute("lang", lang);
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    var t = document.querySelector(".i18n-toggle");
    if (t) t.textContent = (lang === "en") ? "FR" : "EN";
  }

  function injectToggle() {
    var list = document.querySelector(".content_nav_mobile");
    if (!list || document.querySelector(".i18n-toggle")) return;
    var wrap = document.createElement("div");
    wrap.className = "container_nav_link i18n-toggle-wrap";
    var a = document.createElement("a");
    a.className = "nav_link_2 w-nav-link i18n-toggle";
    a.href = "javascript:void(0)";
    a.textContent = "EN";
    wrap.appendChild(a);
    var ul = document.createElement("div");
    ul.className = "underline_nav_link";
    wrap.appendChild(ul);
    list.appendChild(wrap);
    a.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var cur = document.documentElement.getAttribute("lang") || "fr";
      apply(cur === "en" ? "fr" : "en");
    });
  }

  function init() {
    injectToggle();
    var saved = "fr";
    try { saved = localStorage.getItem(KEY) || "fr"; } catch (e) {}
    apply(saved);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  /* ---- Scroll-aware nav contrast: cream over dark sections, burgundy over ivory ---- */
  function navContrast() {
    var darkEls = [].slice.call(document.querySelectorAll(
      ".content-section, .container_quote, .footer, .footer_section, footer"));
    if (!darkEls.length) return;
    var probe = 50; // y position just under the fixed nav
    function update() {
      var dark = false;
      for (var i = 0; i < darkEls.length; i++) {
        var r = darkEls[i].getBoundingClientRect();
        if (r.top <= probe && r.bottom >= probe) { dark = true; break; }
      }
      document.body.classList.toggle("nav-on-dark", dark);
    }
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    setInterval(update, 200); // luxy eases scroll; poll to stay in sync
    update();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", navContrast);
  else navContrast();

  /* ---- Mobile burger: mirror Webflow's open state onto body.menu-open ---- */
  function menuState() {
    var btn = document.querySelector(".menu-button-2, .w-nav-button");
    if (!btn) return;
    var sync = function () {
      document.body.classList.toggle("menu-open", btn.classList.contains("w--open"));
    };
    new MutationObserver(sync).observe(btn, { attributes: true, attributeFilter: ["class"] });
    sync();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", menuState);
  else menuState();
})();

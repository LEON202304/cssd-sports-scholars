/* home-hero.js — 首页首屏「搜索优先」增强
   在 portal 壳挂载后：
   1) 给 .sp-banner 打标记类，便于 CSS 分区覆盖
   2) 把口号改成一句承诺文案（不改 h1，保留品牌/SEO）
   3) 主按钮文案改为「发现」；搜索表单后插入次要文字按钮
   4) 把 #sp-metrics 包进 .sp-trust-card，并加上一行信任文案
   不碰八个功能入口、学术动态、三列面板与数据文件。
   回退：删本文件、index.html 对应 script，以及 portal.polish.css
   里 hero-search-first 分区。 */
(function () {
  var DONE_BANNER = false;
  var DONE_TRUST = false;

  function enhanceBanner(banner) {
    if (!banner || DONE_BANNER) return;
    DONE_BANNER = true;
    banner.classList.add("sp-hero-search-first");

    var slogan = banner.querySelector(".sp-slogan");
    if (slogan) {
      slogan.textContent = "一站检索学者、院校、期刊与科研项目";
    }

    var submit = banner.querySelector(".sp-search .sp-btn--primary, .sp-search button[type='submit']");
    if (submit) submit.textContent = "发现";

    var form = banner.querySelector(".sp-search");
    if (form && !banner.querySelector(".sp-hero-secondary")) {
      var secondary = document.createElement("div");
      secondary.className = "sp-hero-secondary";
      secondary.innerHTML =
        '<button type="button" class="sp-hero-link" data-route="scholars">浏览学者目录</button>' +
        '<span class="sp-hero-sep" aria-hidden="true">·</span>' +
        '<button type="button" class="sp-hero-link" data-route="projects">查看科研项目</button>';
      secondary.addEventListener("click", function (e) {
        var btn = e.target.closest(".sp-hero-link");
        if (!btn) return;
        var route = btn.getAttribute("data-route");
        if (route && typeof window.spNavigate === "function") window.spNavigate(route);
      });
      form.insertAdjacentElement("afterend", secondary);
    }
  }

  function enhanceTrust(metrics) {
    if (!metrics) return;
    var card = metrics.closest(".sp-trust-card");
    if (!card) {
      card = document.createElement("div");
      card.className = "sp-trust-card";
      if (metrics.parentNode) {
        metrics.parentNode.insertBefore(card, metrics);
        card.appendChild(metrics);
      }
    }
    if (!card.querySelector(".sp-trust-line")) {
      var line = document.createElement("p");
      line.className = "sp-trust-line";
      line.textContent = "真实学者、真实院校、真实科研项目";
      card.insertBefore(line, metrics);
    }
    DONE_TRUST = true;
  }

  function tick() {
    var banner = document.querySelector("#sportsPortal .sp-banner");
    if (banner) enhanceBanner(banner);
    var metrics = document.getElementById("sp-metrics");
    if (metrics) enhanceTrust(metrics);
    return DONE_BANNER && DONE_TRUST;
  }

  function watch() {
    if (tick()) return;
    var obs = new MutationObserver(function () {
      if (tick()) obs.disconnect();
    });
    obs.observe(document.documentElement, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", watch, { once: true });
  } else {
    watch();
  }
})();

#!/usr/bin/env python3
"""Non-destructive PR #25 smoke checks, 2026-10-12.
Runs against checked-out branch served locally. Does not deploy or write site data.
"""
import re
import sys
import json
from pathlib import Path
from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeoutError
import tinycss2

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "test-artifacts"
OUT.mkdir(exist_ok=True)
BASE = "http://127.0.0.1:8765/"
errors = []
results = []

def check(name, fn):
    try:
        detail = fn()
        results.append({"name": name, "ok": True, "detail": detail or ""})
        print("PASS:", name, detail or "", flush=True)
    except Exception as e:
        results.append({"name": name, "ok": False, "error": repr(e)})
        errors.append((name, repr(e)))
        print("FAIL:", name, repr(e), flush=True)

def static_checks():
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    css = (ROOT / "portal.editorial_20261012_V2.css").read_text(encoding="utf-8")
    assert html.count('href="portal.editorial_20261012_V2.css"') == 1
    assert '<link rel="preload" as="image" href="mountains.5f7d4f16.webp"' not in html
    assert "sports-scholars-data.cc4064f5.js" in html
    assert "portal.9149a373.js" in html
    nodes = tinycss2.parse_stylesheet(css, skip_whitespace=True, skip_comments=True)
    parse_errors = [str(x) for x in nodes if x.type == "error"]
    assert not parse_errors, parse_errors
    assert sum(x.type == "qualified-rule" for x in nodes) > 50
    assert "background-image:linear-gradient(180deg,#FAFCFE" in css
    return f"{len(nodes)} parsed CSS nodes, no stylesheet syntax errors"

check("source references and CSS parse", static_checks)
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, args=["--no-sandbox"])
    page = browser.new_page(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
    page.on("pageerror", lambda e: errors.append(("browser JS error", str(e))))
    page.on("console", lambda msg: print("BROWSER:", msg.type, msg.text[:180], flush=True) if msg.type == "error" else None)

    def launch():
        page.goto(BASE, wait_until="domcontentloaded", timeout=120000)
        page.wait_for_selector("header.sp-header", timeout=120000)
        page.wait_for_selector("#sportsPortal .sp-metrics button", timeout=120000)
        page.wait_for_timeout(1300)
        assert page.locator("#sportsPortal .sp-quick-card").count() == 8
        assert page.locator("#sportsPortal .sp-panel").count() >= 3
        assert page.evaluate("() => getComputedStyle(document.querySelector('#sportsPortal .sp-banner')).backgroundImage.includes('mountains')") is False
        assert page.locator("#sp-query").count() == 1
        page.screenshot(path=str(OUT / "desktop-home.png"), animations="disabled", timeout=30000)
        return "Home loaded; 8 entry cards and >=3 panels; mountain image not used"

    check("desktop home, cards, no mountain backdrop", launch)

    def route(route_id, expected_id):
        page.locator(f'header.sp-header button[data-route="{route_id}"]').click(timeout=30000)
        page.wait_for_function(f"document.getElementById('{expected_id}')?.classList.contains('on')", timeout=30000)
        page.wait_for_timeout(400)
        return route_id

    def scholar_test():
        route("scholars", "vw-scholars")
        assert page.locator("#qinp").count() == 1
        assert page.locator("#fcat").count() == 1
        assert page.locator("#fsort").count() == 1
        page.locator("#qinp").fill("张")
        page.locator("#qsrch-btn").click(timeout=30000)
        page.wait_for_timeout(900)
        page.screenshot(path=str(OUT / "desktop-scholars.png"), timeout=30000, animations="disabled")
        return "Scholar route and search/filter controls available"

    check("scholar directory navigation and search", scholar_test)

    def institution_test():
        route("institutions", "vw-institutions")
        assert page.locator("#ivt-catalog").count() == 1
        page.locator("#ivt-catalog").click(timeout=30000)
        page.wait_for_timeout(600)
        assert page.locator("#univCatalogPanel").is_visible()
        page.locator("#ivt-scholars").click(timeout=30000)
        page.locator("#mapViewBtn").click(timeout=30000)
        page.wait_for_timeout(400)
        assert page.locator("#instMapContainer").is_visible()
        page.screenshot(path=str(OUT / "desktop-institutions.png"), timeout=30000, animations="disabled")
        return "Institution catalog and map toggles work"

    check("institution catalog and region map", institution_test)

    def journal_test():
        route("journals", "vw-journals")
        page.locator("#jnl-tab-int").click(timeout=30000)
        page.wait_for_timeout(600)
        assert "on" in page.locator("#jnl-tab-int").get_attribute("class")
        page.screenshot(path=str(OUT / "desktop-journals.png"), timeout=30000, animations="disabled")
        page.locator("#jnl-tab-cn").click(timeout=30000)
        assert page.locator("#jnlCnSearch").is_visible()
        page.locator("#jnlCnSearch").fill("体育")
        page.wait_for_timeout(400)
        return "CN/international tabs and CN journal search work"

    check("journal tabs and search", journal_test)

    def project_test():
        route("projects", "vw-projects")
        assert page.locator("#projSearch").is_visible()
        assert page.locator("#projYearSelect").count() == 1
        page.locator("#projSearch").fill("体育")
        page.wait_for_timeout(500)
        page.screenshot(path=str(OUT / "desktop-projects.png"), timeout=30000, animations="disabled")
        return "Project search and year selector visible"

    check("project route and search", project_test)

    def discipline_test():
        route("disciplines", "vw-disciplines")
        assert page.locator("#discg").count() == 1
        return "Disciplines reachable"

    check("disciplines route", discipline_test)

    def mobile_test(width, label):
        mobile = browser.new_page(viewport={"width":width, "height":844},device_scale_factor=1)
        try:
            mobile.goto(BASE,wait_until="domcontentloaded",timeout=120000)
            mobile.wait_for_selector("#sportsPortal .sp-metrics button",timeout=120000)
            mobile.wait_for_timeout(800)
            assert mobile.locator("#sportsPortal .sp-quick-card").count()==8
            assert mobile.locator("#sp-query").is_visible()
            assert mobile.evaluate("() => getComputedStyle(document.querySelector('#sportsPortal .sp-banner')).backgroundImage.includes('mountains')") is False
            mobile.screenshot(path=str(OUT / f"mobile-home-{label}.png"),timeout=30000,animations="disabled")
            return f"Rendered {width}px homepage"
        finally:
            mobile.close()

    check("mobile 390px layout", lambda:mobile_test(390,"390"))
    check("tablet 720px layout", lambda:mobile_test(720,"720"))
    page.close()
    browser.close()

(OUT / "smoke-results.json").write_text(json.dumps({"passed":len(results)-len([x for x in results if not x["ok"]]),"failed":len(errors),"results":results,"errors":errors},ensure_ascii=False,indent=2),encoding="utf-8")
print("\nSUMMARY:", json.dumps({"results":len(results),"failed":len(errors)}),flush=True)
for name,err in errors: print("ERROR:",name,err,flush=True)
sys.exit(1 if errors else 0)

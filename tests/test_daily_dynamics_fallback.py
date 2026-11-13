# -*- coding: utf-8 -*-
"""空抓取不得抹掉上一版每日动态。

夜间官网常整源返回 0 条。重试后仍为空时，沿用上一版该源的条目，
字段原样（含空日期），再走原来的日期窗口和条数上限。
"""
from __future__ import annotations

import json
import sys
import tempfile
import unittest
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

import update_daily_dynamics as daily  # noqa: E402

DAY = date(2026, 11, 13)

# 2026-11-13 快照里北京体育大学的 6 条。两条校园要闻没有日期。
BSU = [
    {
        "cat": "院校",
        "source": "北京体育大学",
        "section": "通知公告",
        "title": "北京体育大学国家训练基地2026-2027年度维修零配件采购项目询价公告",
        "date": "2026-11-12",
        "link": "https://www.bsu.edu.cn/tzgg/3b905057b0fa4d13bba3e27fc4ca04e1.htm",
    },
    {
        "cat": "院校",
        "source": "北京体育大学",
        "section": "通知公告",
        "title": "北京体育大学学生公寓用电智能管理系统维保服务项目采购比选结果公示",
        "date": "2026-11-10",
        "link": "https://www.bsu.edu.cn/tzgg/dbc974e506914b5d985ae5531ff6f127.htm",
    },
    {
        "cat": "院校",
        "source": "北京体育大学",
        "section": "通知公告",
        "title": "北京体育大学学生公寓用电智能管理系统维保服务项目比选公告",
        "date": "2026-10-26",
        "link": "https://www.bsu.edu.cn/tzgg/3a9a3972b29f4c14b6a7f70c3f6f2902.htm",
    },
    {
        "cat": "院校",
        "source": "北京体育大学",
        "section": "通知公告",
        "title": "北京体育大学后勤管理处扫路车采购项目\u200b询价公告",
        "date": "2026-10-09",
        "link": "https://www.bsu.edu.cn/tzgg/ea12d312ceba4fa487ab993f481b2fcd.htm",
    },
    {
        "cat": "院校",
        "source": "北京体育大学",
        "section": "校园要闻",
        "title": "北体师生赴中国人民革命军事博物馆参观“伟大的远征”主题展览",
        "date": "",
        "link": "https://www.bsu.edu.cn/xyyw/79ee56ab04814b94833c247329d97b34.htm",
    },
    {
        "cat": "院校",
        "source": "北京体育大学",
        "section": "校园要闻",
        "title": "北京体育大学全体党员“同上一堂大课”",
        "date": "",
        "link": "https://www.bsu.edu.cn/xyyw/4dfa7e5763844a2cb995edd261752b61.htm",
    },
]

JOURNAL = [
    {
        "cat": "期刊",
        "source": "沈阳体育学院学报",
        "section": "当期目录",
        "title": "主动健康视域下社区体育健康治理的内涵、困境与实施策略",
        "date": "",
        "link": "https://stxb.magtech.com.cn/CN/10.12163/j.ssu.20260191",
    },
]

OLD_JOURNAL = [
    {
        "cat": "期刊",
        "source": "沈阳体育学院学报",
        "section": "当期目录",
        "title": "旧目录不该在抓取成功时被沿用",
        "date": "2026-01-01",
        "link": "https://stxb.magtech.com.cn/CN/old",
    },
]


class DailyDynamicsFallbackTest(unittest.TestCase):
    def setUp(self):
        self.snapshot = (ROOT / "daily-dynamics.json").read_bytes()

    def tearDown(self):
        self.assertEqual((ROOT / "daily-dynamics.json").read_bytes(), self.snapshot)

    def test_retry_backoff_on_empty_and_on_error(self):
        self.assertEqual(daily.SOURCE_ATTEMPTS, 3)
        self.assertGreater(daily.SOURCE_BACKOFF_SEC[0], 0)
        self.assertLess(daily.SOURCE_BACKOFF_SEC[0], daily.SOURCE_BACKOFF_SEC[1])

        sleeps = []
        calls = {"n": 0}

        def empty_then_hit(src):
            calls["n"] += 1
            if calls["n"] < 3:
                return []
            return [dict(BSU[0])]

        items, err, used, notes = daily.scrape_source(
            {"name": "北京体育大学"}, name="北京体育大学",
            collect_fn=empty_then_hit, sleeper=sleeps.append)
        self.assertEqual(sleeps, list(daily.SOURCE_BACKOFF_SEC))
        self.assertEqual(used, 3)
        self.assertIsNone(err)
        self.assertEqual(len(notes), 2)
        self.assertIn("北京体育大学", notes[0])
        self.assertIn("重试", notes[0])
        settled, status = daily.settle_source(items, err, BSU)
        self.assertEqual(status, "fresh")
        self.assertEqual(settled, [BSU[0]])

        def boom(src):
            raise TimeoutError("timed out")

        err_sleeps = []
        items, err, used, notes = daily.scrape_source(
            {"name": "山东体育学院"}, name="山东体育学院",
            collect_fn=boom, sleeper=err_sleeps.append)
        self.assertEqual(items, [])
        self.assertIsInstance(err, TimeoutError)
        self.assertEqual(used, 3)
        self.assertEqual(err_sleeps, list(daily.SOURCE_BACKOFF_SEC))
        self.assertEqual(len(notes), 2)
        warning = daily.carry_warning("山东体育学院", 5, used, err)
        self.assertTrue(warning.startswith("::warning::山东体育学院"))
        self.assertIn("TimeoutError", warning)

        none_sleeps = []
        items, err, used, _notes = daily.scrape_source(
            {"name": "广州体育学院"}, name="广州体育学院",
            collect_fn=lambda src: [dict(BSU[0], source="广州体育学院")],
            sleeper=none_sleeps.append)
        self.assertEqual(none_sleeps, [])
        self.assertEqual(used, 1)
        self.assertIsNone(err)
        self.assertEqual(len(items), 1)

    def test_empty_beijing_sport_university_keeps_previous_items(self):
        previous_doc = {
            "generatedAt": "2026-11-12",
            "source": "C刊官网 + 体育院校官网（GitHub Actions 每日）",
            "statusHint": "live",
            "items": BSU + OLD_JOURNAL,
        }
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "daily-dynamics.json"
            path.write_text(json.dumps(previous_doc, ensure_ascii=False, indent=2) + "\n",
                            encoding="utf-8")
            loaded = daily.load_previous_by_source(path)
        self.assertEqual(loaded["北京体育大学"], BSU)
        self.assertTrue(any(it["date"] == "" for it in loaded["北京体育大学"]))
        self.assertIn("\u200b", loaded["北京体育大学"][3]["title"])

        logs = []

        def collect_fn(src):
            name = src["name"]
            if name == "北京体育大学":
                return []
            if name == "上海体育大学":
                return []
            if name == "沈阳体育学院学报":
                return [dict(it) for it in JOURNAL]
            raise AssertionError(name)

        jobs = [
            ("北京体育大学", {"name": "北京体育大学", "key": "bsu"}),
            ("沈阳体育学院学报", {"name": "沈阳体育学院学报", "key": "syty_xb"}),
            ("上海体育大学", {"name": "上海体育大学", "key": "sus"}),
        ]
        results, ok, bad, carried = daily.gather(
            jobs, loaded, collect_fn=collect_fn, sleeper=lambda _s: None,
            log_fn=logs.append, workers=1)

        self.assertEqual(carried, ["北京体育大学"])
        self.assertEqual(bad, [])
        self.assertIn("北京体育大学(沿用)", ok)
        self.assertIn("上海体育大学(0)", ok)
        self.assertNotIn("上海体育大学", results)
        warnings = [line for line in logs if line.startswith("::warning::")]
        self.assertEqual(warnings, [
            daily.carry_warning("北京体育大学", len(BSU), daily.SOURCE_ATTEMPTS, None),
        ])
        self.assertIn("::warning::北京体育大学", warnings[0])
        self.assertIn("空结果（0 条）", warnings[0])
        self.assertIn("沿用上一版快照中的 6 条", warnings[0])
        self.assertNotIn("上海体育大学", warnings[0])

        carried_items = results["北京体育大学"]
        self.assertEqual(len(carried_items), len(BSU))
        for got, src in zip(carried_items, BSU):
            self.assertEqual(got, src)
            self.assertIsNot(got, src)
            self.assertEqual(got["date"], src["date"])
            self.assertEqual(got["link"], src["link"])
            self.assertEqual(got["title"], src["title"])
            self.assertEqual(got["source"], src["source"])
            self.assertNotIn("stale", got)
            self.assertNotIn("outdated", got)
        self.assertEqual(sum(it["date"] == "" for it in carried_items), 2)
        self.assertTrue(all(it["date"] != DAY.isoformat() for it in carried_items))

        # 学报源这次抓到了，用新结果，不用上一版，空日期也不补。
        self.assertEqual(results["沈阳体育学院学报"], JOURNAL)
        self.assertEqual(results["沈阳体育学院学报"][0]["date"], "")
        self.assertNotIn(OLD_JOURNAL[0]["title"],
                         [it["title"] for it in results["沈阳体育学院学报"]])

        merged = daily.assemble_items(results, today=DAY)
        bsu_out = [it for it in merged if it["source"] == "北京体育大学"]
        by_link = {it["link"]: it for it in BSU}
        self.assertEqual(len(bsu_out), len(BSU))
        for it in bsu_out:
            self.assertEqual(it, by_link[it["link"]])
            self.assertNotEqual(it["date"], DAY.isoformat())
        self.assertEqual(sum(it["date"] == "" for it in bsu_out), 2)
        journal_out = [it for it in merged if it["source"] == "沈阳体育学院学报"]
        self.assertEqual(journal_out, JOURNAL)

        payload = {
            "generatedAt": DAY.isoformat(),
            "source": "C刊官网 + 体育院校官网（GitHub Actions 每日）",
            "statusHint": "live",
            "items": merged,
        }
        restored = json.loads(json.dumps(payload, ensure_ascii=False))
        for it in restored["items"]:
            if it["source"] != "北京体育大学":
                continue
            self.assertEqual(it, by_link[it["link"]])
            self.assertNotEqual(it["date"], restored["generatedAt"])
            self.assertNotIn("stale", it)
            self.assertNotIn("outdated", it)

        print("\n".join(logs))
        print("-- 沿用后的北京体育大学 --")
        for it in bsu_out:
            print(f"  date={it['date']!r}  {it['title'][:28]}")

    def test_empty_dates_follow_the_same_window_as_a_fresh_scrape(self):
        """空日期不改成今天，也不比当场抓到这些条目时多丢。"""
        extra_old = {
            "cat": "院校",
            "source": "北京体育大学",
            "section": "通知公告",
            "title": "应被日期窗口丢掉的旧闻",
            "date": "2026-09-01",
            "link": "https://www.bsu.edu.cn/tzgg/old.htm",
        }
        extra_blank = {
            "cat": "院校",
            "source": "北京体育大学",
            "section": "校园要闻",
            "title": "第三条无日期",
            "date": "",
            "link": "https://www.bsu.edu.cn/xyyw/third.htm",
        }
        extended = BSU + [extra_old, extra_blank]
        carried, status = daily.settle_source([], None, extended)
        self.assertEqual(status, "carry")
        carried[0]["date"] = "1999-01-01"
        self.assertEqual(extended[0]["date"], "2026-11-12")

        fresh = daily.assemble_items(
            {"北京体育大学": [dict(it) for it in extended]}, today=DAY)
        carried, status = daily.settle_source([], None, extended)
        got = daily.assemble_items({"北京体育大学": carried}, today=DAY)
        self.assertEqual(status, "carry")
        self.assertEqual(got, fresh)

        links = {it["link"] for it in got}
        self.assertNotIn(extra_old["link"], links)
        self.assertNotIn(extra_blank["link"], links)
        blank_links = [it["link"] for it in BSU if it["date"] == ""]
        self.assertEqual(len(blank_links), 2)
        for link in blank_links:
            self.assertIn(link, links)
        for it in got:
            src = next(x for x in extended if x["link"] == it["link"])
            self.assertEqual(it, src)
            self.assertEqual(it["date"], src["date"])
            if src["date"] == "":
                self.assertEqual(it["date"], "")
            self.assertNotEqual(it["date"], DAY.isoformat())
        # 14 天窗口外、但排进现有「每源最多 4 条」的通知仍保留原日期。
        kept_oct = next(it for it in got if it["date"] == "2026-10-26")
        self.assertEqual(kept_oct["title"], BSU[2]["title"])
        self.assertEqual(kept_oct["link"], BSU[2]["link"])


if __name__ == "__main__":
    unittest.main()

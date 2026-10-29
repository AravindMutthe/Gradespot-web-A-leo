// Direction A — "The Prospectus" chapter contract (design-focus brief
// §4, 2026-10-29). Unit tests for the JSON chapter contract: builders
// produce sequential, validated chapters; the schema rejects malformed
// contracts at build instead of shipping a broken page.

import { describe, expect, it } from "vitest";
import {
  buildContentsChapters,
  buildDetailChapters,
  chapterNumber,
  parseChapters,
} from "../src/lib/chapter-contract";

describe("chapterNumber", () => {
  it("pads to two digits", () => {
    expect(chapterNumber(1)).toBe("01");
    expect(chapterNumber(10)).toBe("10");
  });
});

describe("buildContentsChapters", () => {
  it("numbers sequentially and carries computed meta only", () => {
    const chapters = buildContentsChapters([
      { title: "Azure", href: "/trainings/category/microsoft-azure", meta: "7 trainings" },
      { title: "Cisco", href: "/trainings/category/cisco", meta: "2 trainings" },
    ]);
    expect(chapters.map((c) => c.number)).toEqual(["01", "02"]);
    expect(chapters[0].kind).toBe("contents");
    expect(chapters[0].description).toBe("7 trainings");
    expect(chapters[1].href).toBe("/trainings/category/cisco");
  });

  it("rejects an entry with an empty title", () => {
    expect(() =>
      buildContentsChapters([{ title: "", href: "/trainings" }]),
    ).toThrow();
  });
});

describe("buildDetailChapters", () => {
  it("is 01 Syllabus, 02 About, 03 Enquire where about sections exist", () => {
    const chapters = buildDetailChapters(true);
    expect(chapters.map((c) => `${c.number} ${c.id}`)).toEqual([
      "01 syllabus",
      "02 about",
      "03 enquire",
    ]);
    expect(chapters[2].kind).toBe("enquiry");
  });

  it("closes with 02 Enquire where no about sections exist", () => {
    const chapters = buildDetailChapters(false);
    expect(chapters.map((c) => `${c.number} ${c.id}`)).toEqual([
      "01 syllabus",
      "02 enquire",
    ]);
  });
});

describe("parseChapters validation", () => {
  it("rejects duplicate ids", () => {
    expect(() =>
      parseChapters([
        { kind: "chapter", id: "syllabus", number: "01", title: "Syllabus" },
        { kind: "chapter", id: "syllabus", number: "02", title: "About" },
      ]),
    ).toThrow();
  });

  it("rejects non-sequential numbers", () => {
    expect(() =>
      parseChapters([
        { kind: "chapter", id: "syllabus", number: "01", title: "Syllabus" },
        { kind: "chapter", id: "about", number: "03", title: "About" },
      ]),
    ).toThrow();
  });

  it("rejects unknown kinds and empty titles", () => {
    expect(() =>
      parseChapters([{ kind: "cover-story", id: "x", number: "01", title: "X" }]),
    ).toThrow();
    expect(() =>
      parseChapters([{ kind: "chapter", id: "x", number: "01", title: "" }]),
    ).toThrow();
  });
});

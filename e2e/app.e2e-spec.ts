import { Tm2WebPage } from "./app.po";

describe("tm2-web App", () => {
  let page: Tm2WebPage;

  beforeEach(() => {
    page = new Tm2WebPage();
  });

  it("should display message saying app works", () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual("app works!");
  });
});

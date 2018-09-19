import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  // it('should display welcome message', () => {
  //   page.navigateTo();
  //   expect(page.getParagraphText()).toEqual('Welcome to Onboarding!');
  // });

  it('should display home page',() =>{
    page.navigateTo();
    expect(page.getParagraphText()).toBe(1);
  });
});

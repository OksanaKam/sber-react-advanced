import { used } from './utils.js';
import { routes } from './routes.js';

used();

const homeButton = document.querySelector<HTMLButtonElement>('#home-button')!;
const aboutButton = document.querySelector<HTMLButtonElement>('#about-button')!;
const content = document.querySelector<HTMLElement>('#content')!;

homeButton.onclick = async () => {
  try {
    const module = await routes.home();
    content.textContent = module.HomePage();
  } catch {
    content.textContent = 'Не удалось загрузить главную страницу.';
  }
};

aboutButton.onclick = async () => {
  try {
    const module = await routes.about();
    content.textContent = module.AboutPage();
  } catch {
    content.textContent = 'Не удалось загрузить страницу о проекте.';
  }
};

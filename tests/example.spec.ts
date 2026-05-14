import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://pokedex-flurn.netlify.app/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Pokédex/);
});

test('should search pokemon and validate visible details', async ({ page }) => {
  await page.goto('https://pokedex-flurn.netlify.app/');
  // Click the get started link.
  const searchBox = page.getByRole('textbox', { name: 'seacrh..' });
  const searchButton = page.getByRole('button', { name: 'Search' });
  // const randomPokemon = Math.floor(Math.random() * 898) + 1;
  await searchBox.click();
  await searchBox.fill('bulbasaur');
  // await searchBox.fill(randomPokemon);
  await searchButton.click();
  // // Expects page to have a heading with the name of Installation.
  const pokemonDetailsHeader = page.locator('div h2')
  await expect(pokemonDetailsHeader).toBeVisible();
  await expect(pokemonDetailsHeader).toContainText('Bulbasaur');
  // await expect(pokemonDetailsHeader).toContainText(randomPokemon);
  const typesField = page.locator("//*[text()='Types']/following-sibling::span");
  const typesText = typesField.innerText();
  await expect(typesText).toContain(['grass', 'poison']);
  // await expect(page.locator("//*[text()='Types']/following-sibling::span")).toContainText(expectedPokemonTypes);
});

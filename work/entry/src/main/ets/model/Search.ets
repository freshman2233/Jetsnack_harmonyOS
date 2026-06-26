import { Snack, snacks } from './Snack';

export class SearchCategory {
  name: string;
  imageRes: Resource;

  constructor(name: string, imageRes: Resource) {
    this.name = name;
    this.imageRes = imageRes;
  }
}

export class SearchCategoryCollection {
  id: number;
  name: string;
  categories: SearchCategory[];

  constructor(id: number, name: string, categories: SearchCategory[]) {
    this.id = id;
    this.name = name;
    this.categories = categories;
  }
}

export class SearchSuggestionGroup {
  id: number;
  name: string;
  suggestions: string[];

  constructor(id: number, name: string, suggestions: string[]) {
    this.id = id;
    this.name = name;
    this.suggestions = suggestions;
  }
}

const searchCategoryCollections: SearchCategoryCollection[] = [
  new SearchCategoryCollection(0, 'Categories', [
    new SearchCategory('Chips & crackers', $r('app.media.chips')),
    new SearchCategory('Fruit snacks', $r('app.media.fruit')),
    new SearchCategory('Desserts', $r('app.media.desserts')),
    new SearchCategory('Nuts', $r('app.media.nuts')),
  ]),
  new SearchCategoryCollection(1, 'Lifestyles', [
    new SearchCategory('Organic', $r('app.media.organic')),
    new SearchCategory('Gluten Free', $r('app.media.gluten_free')),
    new SearchCategory('Paleo', $r('app.media.paleo')),
    new SearchCategory('Vegan', $r('app.media.vegan')),
    new SearchCategory('Vegetarian', $r('app.media.organic')),
    new SearchCategory('Whole30', $r('app.media.paleo')),
  ]),
];

const searchSuggestions: SearchSuggestionGroup[] = [
  new SearchSuggestionGroup(0, 'Recent searches', ['Cheese', 'Apple Sauce']),
  new SearchSuggestionGroup(1, 'Popular searches',
    ['Organic', 'Gluten Free', 'Paleo', 'Vegan', 'Vegitarian', 'Whole30']),
];

export class SearchRepo {
  static getCategories(): SearchCategoryCollection[] {
    return searchCategoryCollections;
  }

  static getSuggestions(): SearchSuggestionGroup[] {
    return searchSuggestions;
  }

  static search(query: string): Snack[] {
    return snacks.filter((s) => s.name.toLowerCase().includes(query.toLowerCase()));
  }
}

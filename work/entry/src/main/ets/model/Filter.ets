import { JetsnackColor } from '../theme/Colors';

export class Filter {
  name: string;
  enabled: boolean = false;
  icon: string | null = null;

  constructor(name: string, enabled: boolean = false, icon: string | null = null) {
    this.name = name;
    this.enabled = enabled;
    this.icon = icon;
  }
}

export const filters: Filter[] = [
  new Filter('Organic'),
  new Filter('Gluten-free'),
  new Filter('Dairy-free'),
  new Filter('Sweet'),
  new Filter('Savory'),
];

export const priceFilters: Filter[] = [
  new Filter('$'),
  new Filter('$$'),
  new Filter('$$$'),
  new Filter('$$$$'),
];

export const sortFilters: Filter[] = [
  new Filter('Android\'s favorite (default)', false, 'ic_android'),
  new Filter('Rating', false, 'ic_star'),
  new Filter('Alphabetical', false, 'ic_sort_by_alpha'),
];

export const categoryFilters: Filter[] = [
  new Filter('Chips & crackers'),
  new Filter('Fruit snacks'),
  new Filter('Desserts'),
  new Filter('Nuts'),
];

export const lifeStyleFilters: Filter[] = [
  new Filter('Organic'),
  new Filter('Gluten-free'),
  new Filter('Dairy-free'),
  new Filter('Sweet'),
  new Filter('Savory'),
];

export const sortDefault: string = sortFilters[0].name;

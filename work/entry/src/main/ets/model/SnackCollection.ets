import { Snack, snacks } from './Snack';
import { Filter, filters, priceFilters, sortFilters, categoryFilters, lifeStyleFilters, sortDefault }
  from './Filter';

export enum CollectionType {
  Normal,
  Highlight
}

export class SnackCollection {
  id: number;
  name: string;
  snacks: Snack[];
  type: CollectionType;

  constructor(id: number, name: string, snacksList: Snack[], type: CollectionType = CollectionType.Normal) {
    this.id = id;
    this.name = name;
    this.snacks = snacksList;
    this.type = type;
  }
}

export class OrderLine {
  snack: Snack;
  count: number;

  constructor(snack: Snack, count: number) {
    this.snack = snack;
    this.count = count;
  }

  copy(count: number): OrderLine {
    return new OrderLine(this.snack, count);
  }
}

function subList(arr: Snack[], from: number, to: number): Snack[] {
  return arr.slice(from, to);
}

const tastyTreats = new SnackCollection(1, 'Android\'s picks', subList(snacks, 0, 13), CollectionType.Highlight);
const popular = new SnackCollection(2, 'Popular on Jetsnack', subList(snacks, 14, 19));
const wfhFavs = new SnackCollection(3, 'WFH favourites', subList(snacks, 0, 13), CollectionType.Highlight);
const newlyAdded = new SnackCollection(4, 'Newly Added', subList(snacks, 14, 19));
const exclusive = new SnackCollection(5, 'Only on Jetsnack', subList(snacks, 0, 13), CollectionType.Highlight);

const snackCollections: SnackCollection[] = [tastyTreats, popular, wfhFavs, newlyAdded, exclusive];

const also = new SnackCollection(6, 'Customers also bought', subList(snacks, 0, 13), CollectionType.Highlight);
const popularRelated = new SnackCollection(7, 'Popular on Jetsnack', subList(snacks, 14, 19));
const related: SnackCollection[] = [also, popularRelated];

const inspiredByCart = new SnackCollection(8, 'Inspired by your cart', subList(snacks, 0, 13), CollectionType.Highlight);

const cart: OrderLine[] = [
  new OrderLine(snacks[4], 2),
  new OrderLine(snacks[6], 3),
  new OrderLine(snacks[8], 1),
];

export class SnackRepo {
  static getSnacks(): SnackCollection[] {
    return snackCollections;
  }

  static getSnack(snackId: number): Snack {
    return snacks.find((s) => s.id === snackId) || snacks[0];
  }

  static getRelated(_snackId: number): SnackCollection[] {
    return related;
  }

  static getInspiredByCart(): SnackCollection {
    return inspiredByCart;
  }

  static getFilters(): Filter[] {
    return filters;
  }

  static getPriceFilters(): Filter[] {
    return priceFilters;
  }

  static getCart(): OrderLine[] {
    return cart;
  }

  static getSortFilters(): Filter[] {
    return sortFilters;
  }

  static getCategoryFilters(): Filter[] {
    return categoryFilters;
  }

  static getSortDefault(): string {
    return sortDefault;
  }

  static getLifeStyleFilters(): Filter[] {
    return lifeStyleFilters;
  }
}

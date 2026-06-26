import { snacks } from "@bundle:com.example.jetsnack/entry/ets/model/Snack";
import type { Snack } from "@bundle:com.example.jetsnack/entry/ets/model/Snack";
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
        new SearchCategory('Chips & crackers', { "id": 16777291, "type": 20000, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" }),
        new SearchCategory('Fruit snacks', { "id": 16777303, "type": 20000, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" }),
        new SearchCategory('Desserts', { "id": 16777293, "type": 20000, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" }),
        new SearchCategory('Nuts', { "id": 16777231, "type": 20000, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" }),
    ]),
    new SearchCategoryCollection(1, 'Lifestyles', [
        new SearchCategory('Organic', { "id": 16777219, "type": 20000, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" }),
        new SearchCategory('Gluten Free', { "id": 16777296, "type": 20000, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" }),
        new SearchCategory('Paleo', { "id": 16777298, "type": 20000, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" }),
        new SearchCategory('Vegan', { "id": 16777305, "type": 20000, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" }),
        new SearchCategory('Vegetarian', { "id": 16777219, "type": 20000, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" }),
        new SearchCategory('Whole30', { "id": 16777298, "type": 20000, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" }),
    ]),
];
const searchSuggestions: SearchSuggestionGroup[] = [
    new SearchSuggestionGroup(0, 'Recent searches', ['Cheese', 'Apple Sauce']),
    new SearchSuggestionGroup(1, 'Popular searches', ['Organic', 'Gluten Free', 'Paleo', 'Vegan', 'Vegitarian', 'Whole30']),
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

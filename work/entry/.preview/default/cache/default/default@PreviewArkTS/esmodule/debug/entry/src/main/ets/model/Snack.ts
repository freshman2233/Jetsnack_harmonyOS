export class Snack {
    id: number;
    name: string;
    imageRes: Resource;
    price: number;
    tagline: string;
    tags: string[];
    constructor(id: number, name: string, imageRes: Resource, price: number, tagline: string = '', tags: string[] = []) {
        this.id = id;
        this.name = name;
        this.imageRes = imageRes;
        this.price = price;
        this.tagline = tagline;
        this.tags = tags;
    }
}
export const snacks: Snack[] = [
    new Snack(1, 'Cupcake', { "id": 16777292, "type": 20000, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" }, 299, 'A tag line'),
    new Snack(2, 'Donut', { "id": 16777235, "type": 20000, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" }, 299, 'A tag line'),
    new Snack(3, 'Eclair', { "id": 16777299, "type": 20000, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" }, 299, 'A tag line'),
    new Snack(4, 'Froyo', { "id": 16777307, "type": 20000, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" }, 299, 'A tag line'),
    new Snack(5, 'Gingerbread', { "id": 16777301, "type": 20000, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" }, 499, 'A tag line'),
    new Snack(6, 'Honeycomb', { "id": 16777232, "type": 20000, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" }, 299, 'A tag line'),
    new Snack(7, 'Ice Cream Sandwich', { "id": 16777295, "type": 20000, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" }, 1299, 'A tag line'),
    new Snack(8, 'Jellybean', { "id": 16777288, "type": 20000, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" }, 299, 'A tag line'),
    new Snack(9, 'KitKat', { "id": 16777226, "type": 20000, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" }, 549, 'A tag line'),
    new Snack(10, 'Lollipop', { "id": 16777221, "type": 20000, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" }, 299, 'A tag line'),
    new Snack(11, 'Marshmallow', { "id": 16777294, "type": 20000, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" }, 299, 'A tag line'),
    new Snack(12, 'Nougat', { "id": 16777289, "type": 20000, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" }, 299, 'A tag line'),
    new Snack(13, 'Oreo', { "id": 16777220, "type": 20000, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" }, 299, 'A tag line'),
    new Snack(14, 'Pie', { "id": 16777228, "type": 20000, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" }, 299, 'A tag line'),
    new Snack(15, 'Chips', { "id": 16777291, "type": 20000, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" }, 299),
    new Snack(16, 'Pretzels', { "id": 16777218, "type": 20000, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" }, 299),
    new Snack(17, 'Smoothies', { "id": 16777297, "type": 20000, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" }, 299),
    new Snack(18, 'Popcorn', { "id": 16777222, "type": 20000, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" }, 299),
    new Snack(19, 'Almonds', { "id": 16777300, "type": 20000, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" }, 299),
    new Snack(20, 'Cheese', { "id": 16777304, "type": 20000, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" }, 299),
    new Snack(21, 'Apples', { "id": 16777224, "type": 20000, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" }, 299, 'A tag line'),
    new Snack(22, 'Apple sauce', { "id": 16777290, "type": 20000, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" }, 299, 'A tag line'),
    new Snack(23, 'Apple chips', { "id": 16777236, "type": 20000, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" }, 299, 'A tag line'),
    new Snack(24, 'Apple juice', { "id": 16777229, "type": 20000, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" }, 299, 'A tag line'),
    new Snack(25, 'Apple pie', { "id": 16777230, "type": 20000, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" }, 299, 'A tag line'),
    new Snack(26, 'Grapes', { "id": 16777306, "type": 20000, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" }, 299, 'A tag line'),
    new Snack(27, 'Kiwi', { "id": 16777227, "type": 20000, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" }, 299, 'A tag line'),
    new Snack(28, 'Mango', { "id": 16777302, "type": 20000, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" }, 299, 'A tag line'),
];

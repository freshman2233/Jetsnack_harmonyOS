export class Snack {
  id: number;
  name: string;
  imageRes: Resource;
  price: number;
  tagline: string;
  tags: string[];

  constructor(id: number, name: string, imageRes: Resource, price: number,
    tagline: string = '', tags: string[] = []) {
    this.id = id;
    this.name = name;
    this.imageRes = imageRes;
    this.price = price;
    this.tagline = tagline;
    this.tags = tags;
  }
}

export const snacks: Snack[] = [
  new Snack(1, 'Cupcake', $r('app.media.cupcake'), 299, 'A tag line'),
  new Snack(2, 'Donut', $r('app.media.donut'), 299, 'A tag line'),
  new Snack(3, 'Eclair', $r('app.media.eclair'), 299, 'A tag line'),
  new Snack(4, 'Froyo', $r('app.media.froyo'), 299, 'A tag line'),
  new Snack(5, 'Gingerbread', $r('app.media.gingerbread'), 499, 'A tag line'),
  new Snack(6, 'Honeycomb', $r('app.media.honeycomb'), 299, 'A tag line'),
  new Snack(7, 'Ice Cream Sandwich', $r('app.media.ice_cream_sandwich'), 1299, 'A tag line'),
  new Snack(8, 'Jellybean', $r('app.media.jelly_bean'), 299, 'A tag line'),
  new Snack(9, 'KitKat', $r('app.media.kitkat'), 549, 'A tag line'),
  new Snack(10, 'Lollipop', $r('app.media.lollipop'), 299, 'A tag line'),
  new Snack(11, 'Marshmallow', $r('app.media.marshmallow'), 299, 'A tag line'),
  new Snack(12, 'Nougat', $r('app.media.nougat'), 299, 'A tag line'),
  new Snack(13, 'Oreo', $r('app.media.oreo'), 299, 'A tag line'),
  new Snack(14, 'Pie', $r('app.media.pie'), 299, 'A tag line'),
  new Snack(15, 'Chips', $r('app.media.chips'), 299),
  new Snack(16, 'Pretzels', $r('app.media.pretzels'), 299),
  new Snack(17, 'Smoothies', $r('app.media.smoothies'), 299),
  new Snack(18, 'Popcorn', $r('app.media.popcorn'), 299),
  new Snack(19, 'Almonds', $r('app.media.almonds'), 299),
  new Snack(20, 'Cheese', $r('app.media.cheese'), 299),
  new Snack(21, 'Apples', $r('app.media.apples'), 299, 'A tag line'),
  new Snack(22, 'Apple sauce', $r('app.media.apple_sauce'), 299, 'A tag line'),
  new Snack(23, 'Apple chips', $r('app.media.apple_chips'), 299, 'A tag line'),
  new Snack(24, 'Apple juice', $r('app.media.apple_juice'), 299, 'A tag line'),
  new Snack(25, 'Apple pie', $r('app.media.apple_pie'), 299, 'A tag line'),
  new Snack(26, 'Grapes', $r('app.media.grapes'), 299, 'A tag line'),
  new Snack(27, 'Kiwi', $r('app.media.kiwi'), 299, 'A tag line'),
  new Snack(28, 'Mango', $r('app.media.mango'), 299, 'A tag line'),
];

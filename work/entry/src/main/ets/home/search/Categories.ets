import { getColors, toGradient } from '../../theme/Theme';
import { SearchCategoryCollection, SearchCategory } from '../../model/Search';
import { SnackImage } from '../../components/SnackImage';

@Component
export struct SearchCategories {
  categories: SearchCategoryCollection[] = [];

  build(): void {
    List() {
      ForEach(this.categories, (collection: SearchCategoryCollection, index: number) => {
        ListItem() {
          this.CategoryCollection(collection, index)
        }
      }, (collection: SearchCategoryCollection) => collection.id.toString())
    }
    .width('100%')
    .height('100%')
  }

  @Builder
  CategoryCollection(collection: SearchCategoryCollection, index: number): void {
    Column() {
      Text(collection.name)
        .fontSize(20)
        .fontWeight(FontWeight.Bold)
        .fontColor(getColors().textPrimary)
        .width('100%')
        .padding({ left: 24, right: 24, top: 4, bottom: 4 })
        .height(56)

      Grid() {
        ForEach(collection.categories, (category: SearchCategory) => {
          GridItem() {
            this.CategoryTile(category, index)
          }
        }, (category: SearchCategory) => category.name)
      }
      .columnsTemplate('1fr 1fr')
      .columnsGap(0)
      .rowsGap(0)
      .padding({ left: 16, right: 16 })
      .width('100%')

      Blank().height(4)
    }
  }

  @Builder
  CategoryTile(category: SearchCategory, index: number): void {
    Stack({ alignContent: Alignment.Start }) {
      Column()
        .width('100%')
        .height('100%')
        .linearGradient({
          angle: 0,
          colors: toGradient(index % 2 === 0 ? getColors().gradient2_2 : getColors().gradient2_3)
        })

      Text(category.name)
        .fontSize(16)
        .fontWeight(FontWeight.Bold)
        .fontColor(getColors().textSecondary)
        .padding({ left: 12, top: 4 })
        .width('55%')

      SnackImage({
        imageRes: category.imageRes,
        widthValue: 100,
        heightValue: 100,
        radiusValue: 50
      })
        .position({ x: '55%', y: '50%' })
        .markAnchor({ x: 0, y: '50%' })
    }
    .width('100%')
    .aspectRatio(1.45)
    .borderRadius(10)
    .margin(8)
    .clip(true)
  }
}

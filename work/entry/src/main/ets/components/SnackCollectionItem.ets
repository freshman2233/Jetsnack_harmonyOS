import { getColors, toGradient } from '../theme/Theme';
import { Snack } from '../model/Snack';
import { SnackCollection, CollectionType } from '../model/SnackCollection';
import { SnackImage } from './SnackImage';
import { SnackIcon } from './SnackIcon';

@Component
export struct SnackCollectionItem {
  collection: SnackCollection = new SnackCollection(0, '', []);
  onSnackClick: (id: number, origin: string) => void = () => {};
  index: number = 0;
  highlight: boolean = true;

  build(): void {
    Column() {
      Row() {
        Text(this.collection.name)
          .fontSize(20)
          .fontWeight(FontWeight.Medium)
          .fontColor(getColors().brand)
          .maxLines(1)
          .textOverflow({ overflow: TextOverflow.Ellipsis })
          .layoutWeight(1)

        SnackIcon({ iconName: 'ic_arrow_back', color: getColors().brand, iconSize: 24 })
      }
      .width('100%')
      .height(56)
      .padding({ left: 24, right: 12 })

      if (this.highlight && this.collection.type === CollectionType.Highlight) {
        this.HighlightedSnacks()
      } else {
        this.NormalSnacks()
      }
    }
  }

  @Builder
  HighlightedSnacks(): void {
    List({ space: 16 }) {
      ForEach(this.collection.snacks, (snack: Snack) => {
        ListItem() {
          this.HighlightCard(snack)
        }
      }, (snack: Snack) => snack.id.toString())
    }
    .listDirection(Axis.Horizontal)
    .width('100%')
    .padding({ left: 24, right: 24 })
  }

  @Builder
  NormalSnacks(): void {
    List({ space: 8 }) {
      ForEach(this.collection.snacks, (snack: Snack) => {
        ListItem() {
          this.NormalCard(snack)
        }
      }, (snack: Snack) => snack.id.toString())
    }
    .listDirection(Axis.Horizontal)
    .width('100%')
    .padding({ left: 12, right: 12 })
  }

  @Builder
  HighlightCard(snack: Snack): void {
    Column() {
      Stack({ alignContent: Alignment.Bottom }) {
        Column()
          .width('100%')
          .height(100)
          .linearGradient({
            angle: 90,
            colors: toGradient(this.index % 2 === 0 ? getColors().gradient6_1 : getColors().gradient6_2)
          })

        SnackImage({
          imageRes: snack.imageRes,
          widthValue: 120,
          heightValue: 120,
          radiusValue: 60
        })
      }
      .width('100%')
      .height(160)

      Text(snack.name)
        .fontSize(18)
        .fontWeight(FontWeight.Bold)
        .fontColor(getColors().textSecondary)
        .maxLines(1)
        .textOverflow({ overflow: TextOverflow.Ellipsis })
        .width('100%')
        .padding({ left: 16, right: 16, top: 8 })

      Text(snack.tagline)
        .fontSize(14)
        .fontColor(getColors().textHelp)
        .width('100%')
        .padding({ left: 16, right: 16, top: 4 })
    }
    .width(170)
    .height(250)
    .borderRadius(20)
    .backgroundColor(getColors().uiBackground)
    .border({ width: 1, color: getColors().uiBorder })
    .margin({ bottom: 16 })
    .onClick(() => this.onSnackClick(snack.id, this.collection.id.toString()))
  }

  @Builder
  NormalCard(snack: Snack): void {
    Column() {
      SnackImage({
        imageRes: snack.imageRes,
        widthValue: 120,
        heightValue: 120,
        radiusValue: 60
      })

      Text(snack.name)
        .fontSize(16)
        .fontWeight(FontWeight.Bold)
        .fontColor(getColors().textSecondary)
        .maxLines(1)
        .margin({ top: 8 })
    }
    .alignItems(HorizontalAlign.Center)
    .padding(8)
    .margin({ left: 4, right: 4, bottom: 8 })
    .borderRadius(20)
    .backgroundColor(getColors().uiBackground)
    .onClick(() => this.onSnackClick(snack.id, this.collection.id.toString()))
  }
}

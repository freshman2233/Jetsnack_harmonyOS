import { getColors, toGradient } from '../../theme/Theme';
import { Snack } from '../../model/Snack';
import { SnackImage } from '../../components/SnackImage';
import { JetsnackButton } from '../../components/Button';
import { JetsnackDivider } from '../../components/Surface';
import { SnackIcon } from '../../components/SnackIcon';
import { formatPrice } from '../../utils/FormatPrice';

@Component
export struct SearchResults {
  searchResults: Snack[] = [];
  onSnackClick: (id: number, origin: string) => void = () => {};

  build(): void {
    Column() {
      Text(`${this.searchResults.length} items`)
        .fontSize(20)
        .fontWeight(FontWeight.Bold)
        .fontColor(getColors().textPrimary)
        .padding({ left: 24, right: 24, top: 4, bottom: 4 })

      List() {
        ForEach(this.searchResults, (snack: Snack, index: number) => {
          ListItem() {
            this.ResultItem(snack, index !== 0)
          }
        }, (snack: Snack) => snack.id.toString())
      }
      .width('100%')
      .layoutWeight(1)
    }
    .width('100%')
    .height('100%')
  }

  @Builder
  ResultItem(snack: Snack, showDivider: boolean): void {
    Column() {
      if (showDivider) {
        JetsnackDivider({ color: getColors().uiBorder, thickness: 1 })
      }

      Row() {
        SnackImage({
          imageRes: snack.imageRes,
          widthValue: 100,
          heightValue: 100,
          radiusValue: 50
        })

        Column() {
          Text(snack.name)
            .fontSize(16)
            .fontWeight(FontWeight.Bold)
            .fontColor(getColors().textSecondary)

          Text(snack.tagline)
            .fontSize(16)
            .fontColor(getColors().textHelp)
            .margin({ top: 2 })

          Text(formatPrice(snack.price))
            .fontSize(16)
            .fontWeight(FontWeight.Bold)
            .fontColor(getColors().textPrimary)
            .margin({ top: 8 })
        }
        .layoutWeight(1)
        .alignItems(HorizontalAlign.Start)
        .margin({ left: 16, right: 16 })

        Stack() {
          SnackIcon({ iconName: 'ic_add', color: getColors().textInteractive, iconSize: 24 })
        }
        .width(36)
        .height(36)
        .borderRadius(50)
        .linearGradient({ angle: 90, colors: toGradient(getColors().interactivePrimary) })
      }
      .width('100%')
      .padding({ left: 24, right: 24, top: 16, bottom: 16 })
      .alignItems(VerticalAlign.Center)
      .onClick(() => this.onSnackClick(snack.id, 'search'))
    }
    .width('100%')
  }
}

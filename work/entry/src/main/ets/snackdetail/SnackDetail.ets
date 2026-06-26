import { getColors, toGradient } from '../theme/Theme';
import { SnackRepo, SnackCollection } from '../model/SnackCollection';
import { Snack } from '../model/Snack';
import { SnackImage } from '../components/SnackImage';
import { SnackCollectionItem } from '../components/SnackCollectionItem';
import { QuantitySelector } from '../components/QuantitySelector';
import { JetsnackButton } from '../components/Button';
import { JetsnackDivider } from '../components/Surface';
import { SnackIcon } from '../components/SnackIcon';
import { formatPrice } from '../utils/FormatPrice';

@Component
export struct SnackDetailScreen {
  @Prop snackId: number;
  @Prop origin: string;
  upPress: () => void = () => {};
  @State quantity: number = 1;
  @State seeMore: boolean = true;
  @State scrollY: number = 0;
  private snack: Snack = SnackRepo.getSnack(1);
  private related: SnackCollection[] = [];

  aboutToAppear(): void {
    this.snack = SnackRepo.getSnack(this.snackId);
    this.related = SnackRepo.getRelated(this.snackId);
  }

  build(): void {
    Stack({ alignContent: Alignment.TopStart }) {
      Scroll() {
        Column() {
          Column()
            .width('100%')
            .height(280)
            .linearGradient({
              angle: 135,
              colors: toGradient(getColors().tornado1)
            })

          Row() {
            SnackImage({
              imageRes: this.snack.imageRes,
              widthValue: this.imageSize,
              heightValue: this.imageSize,
              radiusValue: this.imageSize / 2
            })
          }
          .width('100%')
          .justifyContent(FlexAlign.Center)
          .margin({ top: -100 })

          Column() {
            Text(this.snack.name)
              .fontSize(30)
              .fontStyle(FontStyle.Italic)
              .fontWeight(FontWeight.Bold)
              .fontColor(getColors().textSecondary)
              .padding({ left: 24, right: 24 })

            Text(this.snack.tagline)
              .fontSize(20)
              .fontStyle(FontStyle.Italic)
              .fontColor(getColors().textHelp)
              .padding({ left: 24, right: 24, top: 4 })

            Text(formatPrice(this.snack.price))
              .fontSize(20)
              .fontWeight(FontWeight.Bold)
              .fontColor(getColors().textPrimary)
              .padding({ left: 24, right: 24, top: 8 })

            JetsnackDivider({ color: getColors().uiBorder, thickness: 1, marginLeft: 24, marginRight: 24 })
          }
          .width('100%')
          .padding({ top: 16 })

          Column() {
            Text($r('app.string.detail_header'))
              .fontSize(12)
              .fontWeight(FontWeight.Bold)
              .fontColor(getColors().textHelp)
              .padding({ left: 24, right: 24 })

            Text($r('app.string.detail_placeholder'))
              .fontSize(16)
              .fontColor(getColors().textHelp)
              .maxLines(this.seeMore ? 5 : 100)
              .textOverflow({ overflow: TextOverflow.Ellipsis })
              .padding({ left: 24, right: 24, top: 16 })

            Text(this.seeMore ? 'SEE MORE' : 'SEE LESS')
              .fontSize(14)
              .fontWeight(FontWeight.Bold)
              .fontColor(getColors().textLink)
              .width('100%')
              .textAlign(TextAlign.Center)
              .padding({ top: 15 })
              .onClick(() => {
                this.seeMore = !this.seeMore;
              })

            Blank().height(40)

            Text($r('app.string.ingredients'))
              .fontSize(12)
              .fontWeight(FontWeight.Bold)
              .fontColor(getColors().textHelp)
              .padding({ left: 24, right: 24 })

            Text($r('app.string.ingredients_list'))
              .fontSize(16)
              .fontColor(getColors().textHelp)
              .padding({ left: 24, right: 24, top: 4 })

            Blank().height(16)
            JetsnackDivider({ color: getColors().uiBorder, thickness: 1 })

            ForEach(this.related, (collection: SnackCollection) => {
              SnackCollectionItem({
                collection: collection,
                onSnackClick: (id: number, origin: string) => {},
                highlight: false
              })
            }, (collection: SnackCollection) => collection.id.toString())

            Blank().height(120)
          }
          .width('100%')
          .backgroundColor(getColors().uiBackground)
        }
      }
      .width('100%')
      .height('100%')
      .scrollBar(BarState.Off)
      .onScroll((xOffset: number, yOffset: number) => {
        this.scrollY = yOffset;
      })

      Row() {
        Stack() {
          SnackIcon({ iconName: 'ic_arrow_back', color: getColors().iconInteractive, iconSize: 24 })
        }
        .width(36)
        .height(36)
        .borderRadius(50)
        .backgroundColor('#52121212')
        .onClick(() => this.upPress())
      }
      .width('100%')
      .padding({ left: 16, top: 48 })

      this.CartBar()
    }
    .width('100%')
    .height('100%')
    .backgroundColor(getColors().uiBackground)
  }

  private get imageSize(): number {
    const max = 300;
    const min = 150;
    const range = 180 + 115 + 56 - 56;
    const fraction = Math.min(1, Math.max(0, this.scrollY / range));
    return max - (max - min) * fraction;
  }

  @Builder
  CartBar(): void {
    Column() {
      JetsnackDivider({ color: getColors().uiBorder, thickness: 1 })
      Row() {
        QuantitySelector({
          count: this.quantity,
          decreaseAction: () => {
            if (this.quantity > 0) {
              this.quantity--;
            }
          },
          increaseAction: () => {
            this.quantity++;
          }
        })

        Blank().width(16)

        Button($r('app.string.add_to_cart'))
          .type(ButtonType.Normal)
          .layoutWeight(1)
          .height(48)
          .borderRadius(50)
          .linearGradient({ angle: 90, colors: toGradient(getColors().interactivePrimary) })
          .fontColor(getColors().textInteractive)
          .fontSize(14)
          .fontWeight(FontWeight.Bold)
      }
      .width('100%')
      .padding({ left: 24, right: 24, top: 8, bottom: 8 })
      .alignItems(VerticalAlign.Center)
    }
    .width('100%')
    .backgroundColor(getColors().uiBackground)
    .position({ x: 0, y: '100%' })
    .markAnchor({ x: 0, y: '100%' })
  }
}

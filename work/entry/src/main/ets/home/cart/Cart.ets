import { getColors, toGradient } from '../../theme/Theme';
import { OrderLine, SnackRepo, SnackCollection } from '../../model/SnackCollection';
import { Snack } from '../../model/Snack';
import { SnackImage } from '../../components/SnackImage';
import { QuantitySelector } from '../../components/QuantitySelector';
import { SnackCollectionItem } from '../../components/SnackCollectionItem';
import { DestinationBar } from '../DestinationBar';
import { JetsnackDivider } from '../../components/Surface';
import { JetsnackButton } from '../../components/Button';
import { SnackIcon } from '../../components/SnackIcon';
import { formatPrice } from '../../utils/FormatPrice';
import { SnackbarManager } from '../../model/SnackbarManager';

@Component
export struct CartScreen {
  onSnackClick: (id: number, origin: string) => void = () => {};
  @State orderLines: OrderLine[] = [];
  private inspiredByCart: SnackCollection = SnackRepo.getInspiredByCart();
  private requestCount: number = 0;

  aboutToAppear(): void {
    this.orderLines = SnackRepo.getCart();
  }

  private shouldRandomlyFail(): boolean {
    this.requestCount++;
    return this.requestCount % 5 === 0;
  }

  increaseSnackCount(snackId: number): void {
    if (!this.shouldRandomlyFail()) {
      const line = this.orderLines.find((l: OrderLine) => l.snack.id === snackId);
      if (line) {
        this.updateSnackCount(snackId, line.count + 1);
      }
    } else {
      SnackbarManager.instance.showMessage('There was an error and the quantity couldn\'t be increased. Please try again.');
    }
  }

  decreaseSnackCount(snackId: number): void {
    if (!this.shouldRandomlyFail()) {
      const line = this.orderLines.find((l: OrderLine) => l.snack.id === snackId);
      if (line) {
        if (line.count === 1) {
          this.removeSnack(snackId);
        } else {
          this.updateSnackCount(snackId, line.count - 1);
        }
      }
    } else {
      SnackbarManager.instance.showMessage('There was an error and the quantity couldn\'t be decreased. Please try again.');
    }
  }

  removeSnack(snackId: number): void {
    this.orderLines = this.orderLines.filter((l: OrderLine) => l.snack.id !== snackId);
  }

  private updateSnackCount(snackId: number, count: number): void {
    this.orderLines = this.orderLines.map((l: OrderLine): OrderLine => {
      if (l.snack.id === snackId) {
        return new OrderLine(l.snack, count);
      }
      return l;
    });
  }

  private get subtotal(): number {
    return this.orderLines.reduce((sum: number, l: OrderLine): number => sum + l.snack.price * l.count, 0);
  }

  build(): void {
    Stack({ alignContent: Alignment.Top }) {
      List() {
        ListItem() {
          Text(`Order (${this.orderLines.length} ${this.orderLines.length === 1 ? 'item' : 'items'})`)
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .fontColor(getColors().brand)
            .maxLines(1)
            .width('100%')
            .height(56)
            .padding({ left: 24, right: 24, top: 4, bottom: 4 })
        }

        ForEach(this.orderLines, (line: OrderLine) => {
          ListItem() {
            this.CartItem(line)
          }
        }, (line: OrderLine) => line.snack.id.toString())

        ListItem() {
          this.Summary()
        }

        ListItem() {
          SnackCollectionItem({
            collection: this.inspiredByCart,
            onSnackClick: (id: number, origin: string) => this.onSnackClick(id, origin),
            highlight: false
          })
        }

        ListItem() {
          Column() {
            Blank().height(56)
          }
        }
      }
      .width('100%')
      .height('100%')
      .padding({ top: 56 })

      DestinationBar()

      this.CheckoutBar()
    }
    .width('100%')
    .height('100%')
    .backgroundColor(getColors().uiBackground)
  }

  @Builder
  CartItem(line: OrderLine): void {
    Column() {
      Row() {
        SnackImage({
          imageRes: line.snack.imageRes,
          widthValue: 100,
          heightValue: 100,
          radiusValue: 50
        })
          .margin({ top: 16, bottom: 16 })

        Column() {
          Row() {
            Text(line.snack.name)
              .fontSize(16)
              .fontWeight(FontWeight.Bold)
              .fontColor(getColors().textSecondary)
              .layoutWeight(1)
              .margin({ top: 16, right: 16 })

            Stack() {
              SnackIcon({ iconName: 'ic_close', color: getColors().iconSecondary, iconSize: 24 })
            }
            .width(40)
            .height(40)
            .margin({ top: 12 })
            .onClick(() => this.removeSnack(line.snack.id))
          }
          .width('100%')

          Text(line.snack.tagline)
            .fontSize(16)
            .fontColor(getColors().textHelp)
            .margin({ right: 16 })

          Blank().height(8)

          Row() {
            Text(formatPrice(line.snack.price))
              .fontSize(16)
              .fontWeight(FontWeight.Bold)
              .fontColor(getColors().textPrimary)
              .layoutWeight(1)

            QuantitySelector({
              count: line.count,
              decreaseAction: () => this.decreaseSnackCount(line.snack.id),
              increaseAction: () => this.increaseSnackCount(line.snack.id)
            })
          }
          .width('100%')
          .alignItems(VerticalAlign.Center)
        }
        .layoutWeight(1)
        .margin({ left: 16 })
        .alignItems(HorizontalAlign.Start)
      }
      .width('100%')
      .padding({ left: 24, right: 24 })
      .alignItems(VerticalAlign.Top)

      JetsnackDivider({ color: getColors().uiBorder, thickness: 1 })
    }
    .width('100%')
    .onClick(() => this.onSnackClick(line.snack.id, 'cart'))
  }

  @Builder
  Summary(): void {
    Column() {
      Text($r('app.string.cart_summary_header'))
        .fontSize(20)
        .fontWeight(FontWeight.Bold)
        .fontColor(getColors().brand)
        .width('100%')
        .height(56)
        .padding({ left: 24, right: 24, top: 4, bottom: 4 })

      Row() {
        Text($r('app.string.cart_subtotal_label'))
          .fontSize(16)
          .layoutWeight(1)
        Text(formatPrice(this.subtotal))
          .fontSize(16)
      }
      .width('100%')
      .padding({ left: 24, right: 24 })

      Row() {
        Text($r('app.string.cart_shipping_label'))
          .fontSize(16)
          .layoutWeight(1)
        Text(formatPrice(369))
          .fontSize(16)
      }
      .width('100%')
      .padding({ left: 24, right: 24, top: 8, bottom: 8 })

      Blank().height(8)
      JetsnackDivider({ color: getColors().uiBorder, thickness: 1 })

      Row() {
        Text($r('app.string.cart_total_label'))
          .fontSize(16)
          .layoutWeight(1)
          .margin({ right: 16 })
        Text(formatPrice(this.subtotal + 369))
          .fontSize(16)
          .fontWeight(FontWeight.Bold)
      }
      .width('100%')
      .padding({ left: 24, right: 24, top: 8, bottom: 8 })

      JetsnackDivider({ color: getColors().uiBorder, thickness: 1 })
    }
    .width('100%')
  }

  @Builder
  CheckoutBar(): void {
    Column() {
      JetsnackDivider({ color: getColors().uiBorder, thickness: 1 })
      Row() {
        Blank().layoutWeight(1)
        Button($r('app.string.cart_checkout'))
          .type(ButtonType.Normal)
          .layoutWeight(1)
          .height(48)
          .borderRadius(0)
          .linearGradient({ angle: 90, colors: toGradient(getColors().interactivePrimary) })
          .fontColor(getColors().textInteractive)
          .fontSize(14)
          .fontWeight(FontWeight.Bold)
          .margin({ left: 12, right: 12, top: 8, bottom: 8 })
      }
      .width('100%')
    }
    .width('100%')
    .backgroundColor(getColors().uiBackground)
    .position({ x: 0, y: '100%' })
    .markAnchor({ x: 0, y: '100%' })
  }
}

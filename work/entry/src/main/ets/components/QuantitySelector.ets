import { getColors } from '../theme/Theme';
import { SnackIcon } from './SnackIcon';
import { GradientTintedIconButton } from './GradientTintedIconButton';

@Component
export struct QuantitySelector {
  @Prop count: number;
  decreaseAction: () => void = () => {};
  increaseAction: () => void = () => {};

  build(): void {
    Row() {
      Text('Qty')
        .fontSize(14)
        .fontColor(getColors().textSecondary)
        .margin({ right: 18 })

      GradientTintedIconButton({
        iconName: 'ic_remove',
        onClickAction: () => this.decreaseAction(),
        btnSize: 40,
        iconSize: 20
      })

      Text(this.count.toString())
        .fontSize(18)
        .fontColor(getColors().textPrimary)
        .textAlign(TextAlign.Center)
        .width(24)
        .margin({ left: 8, right: 8 })

      GradientTintedIconButton({
        iconName: 'ic_add',
        onClickAction: () => this.increaseAction(),
        btnSize: 40,
        iconSize: 20
      })
    }
    .alignItems(VerticalAlign.Center)
  }
}

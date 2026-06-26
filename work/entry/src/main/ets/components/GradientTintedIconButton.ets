import { getColors } from '../theme/Theme';
import { SnackIcon } from './SnackIcon';

@Component
export struct GradientTintedIconButton {
  iconName: string = 'ic_add';
  onClickAction: () => void = () => {};
  btnSize: number = 40;
  iconSize: number = 20;

  build(): void {
    Stack() {
      SnackIcon({ iconName: this.iconName, color: getColors().brand, iconSize: this.iconSize })
    }
    .width(this.btnSize)
    .height(this.btnSize)
    .borderRadius(this.btnSize / 2)
    .border({ width: 1.5, color: getColors().brandSecondary })
    .backgroundColor(getColors().uiBackground)
    .onClick(() => this.onClickAction())
  }
}

import { getColors, toGradient } from '../theme/Theme';

@Builder
function EmptyContent(): void {
}

@Component
export struct JetsnackButton {
  @BuilderParam content: () => void = EmptyContent;
  onClickAction: () => void = () => {};
  btnEnabled: boolean = true;
  radius: number = 50;
  widthValue: string | number = 'auto';
  heightValue: string | number = 'auto';
  backgroundGradient: string[] = ['#FF7057F5', '#FF001787'];
  contentColor: string = '#FFFFFFFF';
  paddingTop: number = 8;
  paddingBottom: number = 8;
  paddingLeft: number = 16;
  paddingRight: number = 16;

  build(): void {
    Button() {
      this.content()
    }
    .type(ButtonType.Normal)
    .enabled(this.btnEnabled)
    .width(this.widthValue)
    .height(this.heightValue)
    .borderRadius(this.radius)
    .padding({ top: this.paddingTop, bottom: this.paddingBottom, left: this.paddingLeft, right: this.paddingRight })
    .linearGradient({
      angle: 90,
      colors: toGradient(this.btnEnabled ? this.backgroundGradient : getColors().interactiveSecondary)
    })
    .fontColor(this.contentColor)
    .onClick(() => this.onClickAction())
  }
}

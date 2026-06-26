import { getColors } from '../theme/Theme';
import { Snack } from '../model/Snack';

@Component
export struct SnackImage {
  imageRes: Resource = $r('app.media.placeholder');
  widthValue: number = 120;
  heightValue: number = 120;
  radiusValue: number = 60;

  build(): void {
    Stack() {
      Image(this.imageRes)
        .width(this.widthValue)
        .height(this.heightValue)
        .objectFit(ImageFit.Cover)
        .borderRadius(this.radiusValue)
        .clip(true)
    }
    .width(this.widthValue)
    .height(this.heightValue)
    .borderRadius(this.radiusValue)
    .backgroundColor(getColors().uiBackground)
  }
}

import { getColors } from '../theme/Theme';
import { JetsnackColor } from '../theme/Colors';
import { SnackIcon } from '../components/SnackIcon';
import { JetsnackDivider } from '../components/Surface';

@Component
export struct DestinationBar {
  build(): void {
    Column() {
      Row() {
        Text('Delivery to 1600 Amphitheater Way')
          .fontSize(16)
          .fontWeight(FontWeight.Bold)
          .fontColor(getColors().textSecondary)
          .textAlign(TextAlign.Center)
          .maxLines(1)
          .textOverflow({ overflow: TextOverflow.Ellipsis })
          .layoutWeight(1)

        SnackIcon({ iconName: 'ic_expand_more', color: getColors().brand, iconSize: 24 })
      }
      .width('100%')
      .height(56)
      .padding({ left: 24, right: 16 })

      JetsnackDivider({ color: getColors().uiBorder, thickness: 1 })
    }
    .width('100%')
    .backgroundColor(getColors().uiBackground)
  }
}

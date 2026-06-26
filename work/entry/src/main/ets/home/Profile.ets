import { getColors } from '../theme/Theme';

@Component
export struct ProfileScreen {
  build(): void {
    Column() {
      Image($r('app.media.placeholder'))
        .width(200)
        .height(105)

      Text($r('app.string.work_in_progress'))
        .fontSize(16)
        .fontWeight(FontWeight.Medium)
        .fontColor(getColors().textSecondary)
        .textAlign(TextAlign.Center)
        .width('100%')
        .margin({ top: 24 })

      Text($r('app.string.grab_beverage'))
        .fontSize(14)
        .fontColor(getColors().textSecondary)
        .textAlign(TextAlign.Center)
        .width('100%')
        .margin({ top: 16 })
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center)
    .alignItems(HorizontalAlign.Center)
    .padding(24)
  }
}

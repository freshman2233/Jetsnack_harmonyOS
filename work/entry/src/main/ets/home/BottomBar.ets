import { getColors } from '../theme/Theme';
import { SnackIcon } from '../components/SnackIcon';

@Component
export struct BottomBar {
  @Prop selectedIndex: number;
  onTabSelected: (index: number) => void = () => {};

  private tabs: Array<[string, string]> = [
    ['home_feed', 'ic_home'],
    ['home_search', 'ic_search'],
    ['home_cart', 'ic_shopping_cart'],
    ['home_profile', 'ic_account_circle'],
  ];

  build(): void {
    Row() {
      ForEach(this.tabs, (tab: [string, string], index: number) => {
        this.NavItem(tab[0], tab[1], index)
      }, (tab: [string, string]) => tab[0])
    }
    .width('100%')
    .height(56)
    .backgroundColor(getColors().iconPrimary)
    .padding({ left: 16, right: 16, bottom: 0, top: 0 })
  }

  @Builder
  NavItem(labelKey: string, iconName: string, index: number): void {
    Row() {
      SnackIcon({
        iconName: iconName,
        color: this.selectedIndex === index ? getColors().iconInteractive : getColors().iconInteractiveInactive,
        iconSize: 24
      })

      if (this.selectedIndex === index) {
        Text($r(`app.string.${labelKey}`))
          .fontSize(12)
          .fontWeight(FontWeight.Bold)
          .fontColor(this.selectedIndex === index ? getColors().iconInteractive : getColors().iconInteractiveInactive)
          .maxLines(1)
          .margin({ left: 4 })
      }
    }
    .height(40)
    .padding({ left: 16, right: 16, top: 8, bottom: 8 })
    .borderRadius(50)
    .border(this.selectedIndex === index ? {
      width: 2,
      color: getColors().iconInteractive
    } : { width: 0 })
    .layoutWeight(this.selectedIndex === index ? 2 : 1)
    .justifyContent(FlexAlign.Center)
    .alignItems(VerticalAlign.Center)
    .animation({ duration: 300, curve: Curve.EaseInOut })
    .onClick(() => this.onTabSelected(index))
  }
}

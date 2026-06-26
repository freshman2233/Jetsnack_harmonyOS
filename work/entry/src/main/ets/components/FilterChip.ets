import { getColors } from '../theme/Theme';
import { Filter } from '../model/Filter';

@Component
export struct FilterChip {
  filter: Filter = new Filter('');
  onToggle: (name: string, enabled: boolean) => void = () => {};
  @State selected: boolean = false;
  radius: number = 50;

  aboutToAppear(): void {
    this.selected = this.filter.enabled;
  }

  build(): void {
    Text(this.filter.name)
      .fontSize(12)
      .fontColor(this.selected ? '#FF000000' : getColors().textSecondary)
      .maxLines(1)
      .padding({ left: 20, right: 20, top: 6, bottom: 6 })
      .borderRadius(this.radius)
      .backgroundColor(this.selected ? getColors().brandSecondary : getColors().uiBackground)
      .border({ width: 1, color: this.selected ? getColors().brandSecondary : getColors().brandSecondary })
      .margin({ right: 4, bottom: 8 })
      .onClick(() => {
        this.selected = !this.selected;
        this.onToggle(this.filter.name, this.selected);
      })
  }
}

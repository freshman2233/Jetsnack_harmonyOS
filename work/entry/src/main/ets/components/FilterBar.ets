import { getColors } from '../theme/Theme';
import { Filter } from '../model/Filter';
import { SnackIcon } from '../components/SnackIcon';
import { FilterChip } from './FilterChip';

@Component
export struct FilterBar {
  filters: Filter[] = [];
  onShowFilters: () => void = () => {};
  @State filterStates: boolean[] = [];

  aboutToAppear(): void {
    this.filterStates = this.filters.map((f) => f.enabled);
  }

  build(): void {
    List({ space: 8 }) {
      ListItem() {
        Stack() {
          SnackIcon({ iconName: 'ic_filter_list', color: getColors().brand, iconSize: 24 })
        }
        .width(48)
        .height(48)
        .borderRadius(50)
        .border({ width: 1.5, color: getColors().brandSecondary })
        .onClick(() => this.onShowFilters())
      }

      ForEach(this.filters, (filter: Filter, index: number) => {
        ListItem() {
          FilterChip({
            filter: filter,
            onToggle: (name: string, enabled: boolean) => {
              this.filterStates[index] = enabled;
            }
          })
        }
      }, (filter: Filter) => filter.name)
    }
    .listDirection(Axis.Horizontal)
    .width('100%')
    .height(56)
    .alignListItem(ListItemAlign.Center)
    .padding({ left: 12, right: 8 })
  }
}

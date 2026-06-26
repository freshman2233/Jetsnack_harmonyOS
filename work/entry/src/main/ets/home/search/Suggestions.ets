import { getColors } from '../../theme/Theme';
import { SearchSuggestionGroup } from '../../model/Search';

@Component
export struct SearchSuggestions {
  suggestions: SearchSuggestionGroup[] = [];
  onSuggestionSelect: (suggestion: string) => void = () => {};

  build(): void {
    List() {
      ForEach(this.suggestions, (group: SearchSuggestionGroup) => {
        ListItem() {
          Text(group.name)
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .fontColor(getColors().textPrimary)
            .width('100%')
            .height(56)
            .padding({ left: 24, right: 24, top: 4, bottom: 4 })
        }

        ForEach(group.suggestions, (suggestion: string) => {
          ListItem() {
            Text(suggestion)
              .fontSize(16)
              .fontWeight(FontWeight.Bold)
              .fontColor(getColors().textSecondary)
              .width('100%')
              .height(48)
              .padding({ left: 24 })
              .onClick(() => this.onSuggestionSelect(suggestion))
          }
        }, (suggestion: string) => suggestion)

        ListItem() {
          Column() {
            Blank().height(4)
          }
        }
      }, (group: SearchSuggestionGroup) => group.id.toString())
    }
    .width('100%')
    .height('100%')
  }
}

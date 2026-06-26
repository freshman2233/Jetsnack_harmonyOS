import { getColors } from '../../theme/Theme';
import { SearchRepo, SearchCategoryCollection, SearchSuggestionGroup } from '../../model/Search';
import { Snack } from '../../model/Snack';
import { SnackIcon } from '../../components/SnackIcon';
import { JetsnackDivider } from '../../components/Surface';
import { SearchCategories } from './Categories';
import { SearchResults } from './Results';
import { SearchSuggestions } from './Suggestions';

enum SearchDisplay {
  Categories,
  Suggestions,
  Results,
  NoResults
}

@Component
export struct SearchScreen {
  onSnackClick: (id: number, origin: string) => void = () => {};
  @State query: string = '';
  @State focused: boolean = false;
  @State searching: boolean = false;
  @State searchResults: Snack[] = [];
  private categories: SearchCategoryCollection[] = SearchRepo.getCategories();
  private suggestions: SearchSuggestionGroup[] = SearchRepo.getSuggestions();

  private get display(): SearchDisplay {
    if (!this.focused && this.query.length === 0) {
      return SearchDisplay.Categories;
    }
    if (this.focused && this.query.length === 0) {
      return SearchDisplay.Suggestions;
    }
    if (this.searchResults.length === 0) {
      return SearchDisplay.NoResults;
    }
    return SearchDisplay.Results;
  }

  private doSearch(): void {
    this.searching = true;
    setTimeout(() => {
      this.searchResults = SearchRepo.search(this.query);
      this.searching = false;
    }, 200);
  }

  build(): void {
    Column() {
      Row() {
        if (this.focused) {
          SnackIcon({
            iconName: 'ic_arrow_back',
            color: getColors().iconPrimary,
            iconSize: 24
          })
            .onClick(() => {
              this.query = '';
              this.focused = false;
            })
        }

        TextInput({ text: this.query, placeholder: 'Search Jetsnack' })
          .layoutWeight(1)
          .backgroundColor(getColors().uiFloated)
          .borderRadius(50)
          .height(40)
          .onFocus(() => {
            this.focused = true;
          })
          .onChange((value: string) => {
            this.query = value;
            if (value.length > 0) {
              this.doSearch();
            } else {
              this.searchResults = [];
            }
          })

        if (this.searching) {
          LoadingProgress()
            .width(36)
            .height(36)
            .color(getColors().iconPrimary)
            .margin({ left: 6, right: 6 })
        } else {
          Blank().width(48)
        }
      }
      .width('100%')
      .height(56)
      .padding({ left: 24, right: 24, top: 8, bottom: 8 })

      JetsnackDivider({ color: getColors().uiBorder, thickness: 1 })

      if (this.display === SearchDisplay.Categories) {
        SearchCategories({ categories: this.categories })
      } else if (this.display === SearchDisplay.Suggestions) {
        SearchSuggestions({
          suggestions: this.suggestions,
          onSuggestionSelect: (suggestion: string) => {
            this.query = suggestion;
            this.doSearch();
          }
        })
      } else if (this.display === SearchDisplay.Results) {
        SearchResults({
          searchResults: this.searchResults,
          onSnackClick: (id: number, origin: string) => this.onSnackClick(id, origin)
        })
      } else {
        this.NoResultsView()
      }
    }
    .width('100%')
    .height('100%')
    .backgroundColor(getColors().uiBackground)
    .padding({ top: 36 })
  }

  @Builder
  NoResultsView(): void {
    Column() {
      Image($r('app.media.placeholder'))
        .width(200)
        .height(105)

      Text(`No matches for "${this.query}"`)
        .fontSize(16)
        .fontWeight(FontWeight.Medium)
        .fontColor(getColors().textSecondary)
        .textAlign(TextAlign.Center)
        .margin({ top: 24 })

      Text($r('app.string.search_no_matches_retry'))
        .fontSize(14)
        .fontColor(getColors().textSecondary)
        .textAlign(TextAlign.Center)
        .margin({ top: 16 })
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center)
    .alignItems(HorizontalAlign.Center)
    .padding(24)
  }
}

import { getColors } from '../theme/Theme';
import { SnackRepo, SnackCollection } from '../model/SnackCollection';
import { Filter } from '../model/Filter';
import { SnackCollectionItem } from '../components/SnackCollectionItem';
import { FilterBar } from '../components/FilterBar';
import { DestinationBar } from './DestinationBar';
import { JetsnackDivider } from '../components/Surface';
import { FilterScreen } from './FilterScreen';

@Component
export struct FeedScreen {
  onSnackClick: (id: number, origin: string) => void = () => {};
  @State showFilters: boolean = false;
  private collections: SnackCollection[] = SnackRepo.getSnacks();
  private filters: Filter[] = SnackRepo.getFilters();

  build(): void {
    Stack({ alignContent: Alignment.Top }) {
      List() {
        ListItem() {
          Column() {
            FilterBar({
              filters: this.filters,
              onShowFilters: () => {
                this.showFilters = true;
              }
            })
          }
          .width('100%')
        }

        ForEach(this.collections, (collection: SnackCollection, index: number) => {
          ListItem() {
            Column() {
              if (index > 0) {
                JetsnackDivider({ color: getColors().uiBorder, thickness: 2, widthValue: '100%' })
              }
              SnackCollectionItem({
                collection: collection,
                onSnackClick: (id: number, origin: string) => this.onSnackClick(id, origin),
                index: index,
                highlight: true
              })
            }
          }
        }, (collection: SnackCollection) => collection.id.toString())
      }
      .width('100%')
      .height('100%')
      .padding({ top: 56 })

      DestinationBar()

      if (this.showFilters) {
        FilterScreen({
          onDismiss: () => {
            this.showFilters = false;
          }
        })
      }
    }
    .width('100%')
    .height('100%')
    .backgroundColor(getColors().uiBackground)
  }
}

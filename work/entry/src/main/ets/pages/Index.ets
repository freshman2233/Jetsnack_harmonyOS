import { getColors } from '../theme/Theme';
import { FeedScreen } from '../home/Feed';
import { SearchScreen } from '../home/search/Search';
import { CartScreen } from '../home/cart/Cart';
import { ProfileScreen } from '../home/Profile';
import { BottomBar } from '../home/BottomBar';
import { SnackDetailScreen } from '../snackdetail/SnackDetail';

@Entry
@Component
struct Index {
  @State currentTab: number = 0;
  @State showDetail: boolean = false;
  @State detailSnackId: number = 1;
  @State detailOrigin: string = '';

  private navigateToSnackDetail(id: number, origin: string): void {
    this.detailSnackId = id;
    this.detailOrigin = origin;
    this.showDetail = true;
  }

  build(): void {
    Stack() {
      Column() {
        if (this.currentTab === 0) {
          FeedScreen({
            onSnackClick: (id: number, origin: string) => this.navigateToSnackDetail(id, origin)
          })
        } else if (this.currentTab === 1) {
          SearchScreen({
            onSnackClick: (id: number, origin: string) => this.navigateToSnackDetail(id, origin)
          })
        } else if (this.currentTab === 2) {
          CartScreen({
            onSnackClick: (id: number, origin: string) => this.navigateToSnackDetail(id, origin)
          })
        } else if (this.currentTab === 3) {
          ProfileScreen()
        }

        BottomBar({
          selectedIndex: this.currentTab,
          onTabSelected: (index: number) => {
            this.currentTab = index;
          }
        })
      }
      .width('100%')
      .height('100%')
      .backgroundColor(getColors().uiBackground)

      if (this.showDetail) {
        SnackDetailScreen({
          snackId: this.detailSnackId,
          origin: this.detailOrigin,
          upPress: () => {
            this.showDetail = false;
          }
        })
      }
    }
    .width('100%')
    .height('100%')
  }
}

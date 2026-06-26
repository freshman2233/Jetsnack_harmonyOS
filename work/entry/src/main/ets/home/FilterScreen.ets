import { getColors } from '../theme/Theme';
import { Filter } from '../model/Filter';
import { SnackRepo } from '../model/SnackCollection';
import { SnackIcon } from '../components/SnackIcon';
import { FilterChip } from '../components/FilterChip';

@Component
export struct FilterScreen {
  onDismiss: () => void = () => {};
  @State sortState: string = '';
  @State maxCalories: number = 0;
  private defaultSort: string = SnackRepo.getSortDefault();
  private sortFilters: Filter[] = SnackRepo.getSortFilters();
  private priceFilters: Filter[] = SnackRepo.getPriceFilters();
  private categoryFilters: Filter[] = SnackRepo.getCategoryFilters();
  private lifeStyleFilters: Filter[] = SnackRepo.getLifeStyleFilters();

  aboutToAppear(): void {
    this.sortState = this.defaultSort;
  }

  build(): void {
    Stack({ alignContent: Alignment.Center }) {
      Column()
        .width('100%')
        .height('100%')
        .backgroundColor('#80000000')
        .onClick(() => this.onDismiss())

      Column() {
        Row() {
          Stack() {
            SnackIcon({ iconName: 'ic_close', color: getColors().textSecondary, iconSize: 24 })
          }
          .width(40)
          .height(40)
          .onClick(() => this.onDismiss())

          Text($r('app.string.label_filters'))
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .fontColor(getColors().textSecondary)
            .textAlign(TextAlign.Center)
            .layoutWeight(1)

          Text($r('app.string.reset'))
            .fontSize(14)
            .fontWeight(this.sortState !== this.defaultSort ? FontWeight.Bold : FontWeight.Normal)
            .fontColor(this.sortState !== this.defaultSort ? getColors().brand : '#61000000')
            .onClick(() => {
              this.sortState = this.defaultSort;
              this.maxCalories = 0;
            })
        }
        .width('100%')
        .padding({ left: 8, right: 16, top: 8, bottom: 8 })

        this.SortSection()
        this.ChipSection($r('app.string.price'), this.priceFilters)
        this.ChipSection($r('app.string.category'), this.categoryFilters)
        this.CaloriesSection()
        this.ChipSection($r('app.string.lifestyle'), this.lifeStyleFilters)
      }
      .width('85%')
      .backgroundColor(getColors().uiFloated)
      .borderRadius(20)
      .padding({ left: 24, right: 24, top: 16, bottom: 16 })
    }
    .width('100%')
    .height('100%')
  }

  @Builder
  SortSection(): void {
    Column() {
      Text($r('app.string.sort'))
        .fontSize(20)
        .fontWeight(FontWeight.Bold)
        .fontColor(getColors().brand)
        .margin({ bottom: 8, top: 8 })

      ForEach(this.sortFilters, (filter: Filter) => {
        Row() {
          if (filter.icon) {
            SnackIcon({ iconName: filter.icon, color: getColors().textSecondary, iconSize: 24 })
          }
          Text(filter.name)
            .fontSize(16)
            .fontWeight(FontWeight.Bold)
            .fontColor(getColors().textSecondary)
            .layoutWeight(1)
            .margin({ left: 10 })
          if (this.sortState === filter.name) {
            SnackIcon({ iconName: 'ic_check', color: getColors().brand, iconSize: 24 })
          }
        }
        .width('100%')
        .padding({ top: 14 })
        .onClick(() => {
          this.sortState = filter.name;
        })
      }, (filter: Filter) => filter.name)
    }
    .margin({ bottom: 24 })
  }

  @Builder
  ChipSection(title: Resource, filters: Filter[]): void {
    Column() {
      Text(title)
        .fontSize(20)
        .fontWeight(FontWeight.Bold)
        .fontColor(getColors().brand)
        .margin({ bottom: 12 })

      Flex({ wrap: FlexWrap.Wrap }) {
        ForEach(filters, (filter: Filter) => {
          FilterChip({ filter: filter })
        }, (filter: Filter) => filter.name)
      }
      .width('100%')
      .padding({ left: 4, right: 4, bottom: 16 })
    }
  }

  @Builder
  CaloriesSection(): void {
    Column() {
      Row() {
        Text($r('app.string.max_calories'))
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .fontColor(getColors().brand)
        Text($r('app.string.per_serving'))
          .fontSize(14)
          .fontColor(getColors().brand)
          .margin({ left: 10, top: 5 })
      }

      Slider({
        value: this.maxCalories,
        min: 0,
        max: 300,
        step: 50
      })
        .width('100%')
        .selectedColor(getColors().brand)
        .trackColor(getColors().iconInteractive)
        .onChange((value: number) => {
          this.maxCalories = value;
        })
    }
  }
}

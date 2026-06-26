@Builder
function EmptyContent(): void {
}

@Component
export struct VerticalGrid {
  @BuilderParam content: () => void = EmptyContent;
  @Prop columns: number = 2;

  build(): void {
    Grid() {
      this.content()
    }
    .columnsTemplate(this.columns === 2 ? '1fr 1fr' : '1fr 1fr 1fr')
    .columnsGap(0)
    .rowsGap(0)
  }
}

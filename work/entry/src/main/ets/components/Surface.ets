import { getColors } from '../theme/Theme';

@Builder
function EmptyContent(): void {
}

@Component
export struct JetsnackSurface {
  @BuilderParam content: () => void = EmptyContent;
  bgColor: string = '#FFFFFFFF';
  contentColor: string = '#DE000000';
  radius: number = 0;
  bdWidth: number = 0;
  bdColor: string = '#1F000000';
  elevation: number = 0;
  widthValue: string | number = 'auto';
  heightValue: string | number = 'auto';

  build(): void {
    Stack() {
      this.content()
    }
    .width(this.widthValue)
    .height(this.heightValue)
    .backgroundColor(this.bgColor)
    .borderRadius(this.radius)
    .border(this.bdWidth > 0 ? { width: this.bdWidth, color: this.bdColor } : { width: 0 })
    .shadow(this.elevation > 0 ? { radius: this.elevation * 2, color: '#33000000', offsetX: 0, offsetY: 0 } : { radius: 0, color: '#00000000' })
  }
}

@Component
export struct JetsnackDivider {
  color: string = '#1F000000';
  thickness: number = 1;
  widthValue: string | number = '100%';
  marginLeft: number = 0;
  marginRight: number = 0;

  build(): void {
    Divider()
      .color(this.color)
      .strokeWidth(this.thickness)
      .width(this.widthValue)
      .margin({ left: this.marginLeft, right: this.marginRight })
  }
}

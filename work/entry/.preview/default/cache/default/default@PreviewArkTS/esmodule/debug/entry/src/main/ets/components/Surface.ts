if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface JetsnackDivider_Params {
    color?: string;
    thickness?: number;
    widthValue?: string | number;
    marginLeft?: number;
    marginRight?: number;
}
interface JetsnackSurface_Params {
    content?: () => void;
    bgColor?: string;
    contentColor?: string;
    radius?: number;
    bdWidth?: number;
    bdColor?: string;
    elevation?: number;
    widthValue?: string | number;
    heightValue?: string | number;
}
function EmptyContent(parent = null): void {
}
export class JetsnackSurface extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.content = EmptyContent;
        this.bgColor = '#FFFFFFFF';
        this.contentColor = '#DE000000';
        this.radius = 0;
        this.bdWidth = 0;
        this.bdColor = '#1F000000';
        this.elevation = 0;
        this.widthValue = 'auto';
        this.heightValue = 'auto';
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: JetsnackSurface_Params) {
        if (params.content !== undefined) {
            this.content = params.content;
        }
        if (params.bgColor !== undefined) {
            this.bgColor = params.bgColor;
        }
        if (params.contentColor !== undefined) {
            this.contentColor = params.contentColor;
        }
        if (params.radius !== undefined) {
            this.radius = params.radius;
        }
        if (params.bdWidth !== undefined) {
            this.bdWidth = params.bdWidth;
        }
        if (params.bdColor !== undefined) {
            this.bdColor = params.bdColor;
        }
        if (params.elevation !== undefined) {
            this.elevation = params.elevation;
        }
        if (params.widthValue !== undefined) {
            this.widthValue = params.widthValue;
        }
        if (params.heightValue !== undefined) {
            this.heightValue = params.heightValue;
        }
    }
    updateStateVars(params: JetsnackSurface_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __content;
    private bgColor: string;
    private contentColor: string;
    private radius: number;
    private bdWidth: number;
    private bdColor: string;
    private elevation: number;
    private widthValue: string | number;
    private heightValue: string | number;
    initialRender(): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("entry/src/main/ets/components/Surface.ets(20:5)", "entry");
            Stack.width(this.widthValue);
            Stack.height(this.heightValue);
            Stack.backgroundColor(this.bgColor);
            Stack.borderRadius(this.radius);
            Stack.border(this.bdWidth > 0 ? { width: this.bdWidth, color: this.bdColor } : { width: 0 });
            Stack.shadow(this.elevation > 0 ? { radius: this.elevation * 2, color: '#33000000', offsetX: 0, offsetY: 0 } : { radius: 0, color: '#00000000' });
        }, Stack);
        this.content.bind(this)();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class JetsnackDivider extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.color = '#1F000000';
        this.thickness = 1;
        this.widthValue = '100%';
        this.marginLeft = 0;
        this.marginRight = 0;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: JetsnackDivider_Params) {
        if (params.color !== undefined) {
            this.color = params.color;
        }
        if (params.thickness !== undefined) {
            this.thickness = params.thickness;
        }
        if (params.widthValue !== undefined) {
            this.widthValue = params.widthValue;
        }
        if (params.marginLeft !== undefined) {
            this.marginLeft = params.marginLeft;
        }
        if (params.marginRight !== undefined) {
            this.marginRight = params.marginRight;
        }
    }
    updateStateVars(params: JetsnackDivider_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private color: string;
    private thickness: number;
    private widthValue: string | number;
    private marginLeft: number;
    private marginRight: number;
    initialRender(): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.debugLine("entry/src/main/ets/components/Surface.ets(41:5)", "entry");
            Divider.color(this.color);
            Divider.strokeWidth(this.thickness);
            Divider.width(this.widthValue);
            Divider.margin({ left: this.marginLeft, right: this.marginRight });
        }, Divider);
    }
    rerender() {
        this.updateDirtyElements();
    }
}

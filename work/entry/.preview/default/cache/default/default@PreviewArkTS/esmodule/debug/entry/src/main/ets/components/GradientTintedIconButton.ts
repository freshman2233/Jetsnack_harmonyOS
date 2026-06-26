if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface GradientTintedIconButton_Params {
    iconName?: string;
    onClickAction?: () => void;
    btnSize?: number;
    iconSize?: number;
}
import { getColors } from "@bundle:com.example.jetsnack/entry/ets/theme/Theme";
import { SnackIcon } from "@bundle:com.example.jetsnack/entry/ets/components/SnackIcon";
export class GradientTintedIconButton extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.iconName = 'ic_add';
        this.onClickAction = () => { };
        this.btnSize = 40;
        this.iconSize = 20;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: GradientTintedIconButton_Params) {
        if (params.iconName !== undefined) {
            this.iconName = params.iconName;
        }
        if (params.onClickAction !== undefined) {
            this.onClickAction = params.onClickAction;
        }
        if (params.btnSize !== undefined) {
            this.btnSize = params.btnSize;
        }
        if (params.iconSize !== undefined) {
            this.iconSize = params.iconSize;
        }
    }
    updateStateVars(params: GradientTintedIconButton_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private iconName: string;
    private onClickAction: () => void;
    private btnSize: number;
    private iconSize: number;
    initialRender(): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("entry/src/main/ets/components/GradientTintedIconButton.ets(12:5)", "entry");
            Stack.width(this.btnSize);
            Stack.height(this.btnSize);
            Stack.borderRadius(this.btnSize / 2);
            Stack.border({ width: 1.5, color: getColors().brandSecondary });
            Stack.backgroundColor(getColors().uiBackground);
            Stack.onClick(() => this.onClickAction());
        }, Stack);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SnackIcon(this, { iconName: this.iconName, color: getColors().brand, iconSize: this.iconSize }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/components/GradientTintedIconButton.ets", line: 13, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            iconName: this.iconName,
                            color: getColors().brand,
                            iconSize: this.iconSize
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        iconName: this.iconName
                    });
                }
            }, { name: "SnackIcon" });
        }
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface QuantitySelector_Params {
    count?: number;
    decreaseAction?: () => void;
    increaseAction?: () => void;
}
import { getColors } from "@bundle:com.example.jetsnack/entry/ets/theme/Theme";
import { GradientTintedIconButton } from "@bundle:com.example.jetsnack/entry/ets/components/GradientTintedIconButton";
export class QuantitySelector extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__count = new SynchedPropertySimpleOneWayPU(params.count, this, "count");
        this.decreaseAction = () => { };
        this.increaseAction = () => { };
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: QuantitySelector_Params) {
        if (params.decreaseAction !== undefined) {
            this.decreaseAction = params.decreaseAction;
        }
        if (params.increaseAction !== undefined) {
            this.increaseAction = params.increaseAction;
        }
    }
    updateStateVars(params: QuantitySelector_Params) {
        this.__count.reset(params.count);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__count.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__count.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __count: SynchedPropertySimpleOneWayPU<number>;
    get count() {
        return this.__count.get();
    }
    set count(newValue: number) {
        this.__count.set(newValue);
    }
    private decreaseAction: () => void;
    private increaseAction: () => void;
    initialRender(): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/components/QuantitySelector.ets(12:5)", "entry");
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('Qty');
            Text.debugLine("entry/src/main/ets/components/QuantitySelector.ets(13:7)", "entry");
            Text.fontSize(14);
            Text.fontColor(getColors().textSecondary);
            Text.margin({ right: 18 });
        }, Text);
        Text.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new GradientTintedIconButton(this, {
                        iconName: 'ic_remove',
                        onClickAction: () => this.decreaseAction(),
                        btnSize: 40,
                        iconSize: 20
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/components/QuantitySelector.ets", line: 18, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            iconName: 'ic_remove',
                            onClickAction: () => this.decreaseAction(),
                            btnSize: 40,
                            iconSize: 20
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "GradientTintedIconButton" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.count.toString());
            Text.debugLine("entry/src/main/ets/components/QuantitySelector.ets(25:7)", "entry");
            Text.fontSize(18);
            Text.fontColor(getColors().textPrimary);
            Text.textAlign(TextAlign.Center);
            Text.width(24);
            Text.margin({ left: 8, right: 8 });
        }, Text);
        Text.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new GradientTintedIconButton(this, {
                        iconName: 'ic_add',
                        onClickAction: () => this.increaseAction(),
                        btnSize: 40,
                        iconSize: 20
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/components/QuantitySelector.ets", line: 32, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            iconName: 'ic_add',
                            onClickAction: () => this.increaseAction(),
                            btnSize: 40,
                            iconSize: 20
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "GradientTintedIconButton" });
        }
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

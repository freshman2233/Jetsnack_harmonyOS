if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface DestinationBar_Params {
}
import { getColors } from "@bundle:com.example.jetsnack/entry/ets/theme/Theme";
import { SnackIcon } from "@bundle:com.example.jetsnack/entry/ets/components/SnackIcon";
import { JetsnackDivider } from "@bundle:com.example.jetsnack/entry/ets/components/Surface";
export class DestinationBar extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: DestinationBar_Params) {
    }
    updateStateVars(params: DestinationBar_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    initialRender(): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/home/DestinationBar.ets(9:5)", "entry");
            Column.width('100%');
            Column.backgroundColor(getColors().uiBackground);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/home/DestinationBar.ets(10:7)", "entry");
            Row.width('100%');
            Row.height(56);
            Row.padding({ left: 24, right: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('Delivery to 1600 Amphitheater Way');
            Text.debugLine("entry/src/main/ets/home/DestinationBar.ets(11:9)", "entry");
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(getColors().textSecondary);
            Text.textAlign(TextAlign.Center);
            Text.maxLines(1);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SnackIcon(this, { iconName: 'ic_expand_more', color: getColors().brand, iconSize: 24 }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/home/DestinationBar.ets", line: 20, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            iconName: 'ic_expand_more',
                            color: getColors().brand,
                            iconSize: 24
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        iconName: 'ic_expand_more'
                    });
                }
            }, { name: "SnackIcon" });
        }
        Row.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new JetsnackDivider(this, { color: getColors().uiBorder, thickness: 1 }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/home/DestinationBar.ets", line: 26, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            color: getColors().uiBorder,
                            thickness: 1
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "JetsnackDivider" });
        }
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

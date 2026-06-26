if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ProfileScreen_Params {
}
import { getColors } from "@bundle:com.example.jetsnack/entry/ets/theme/Theme";
export class ProfileScreen extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ProfileScreen_Params) {
    }
    updateStateVars(params: ProfileScreen_Params) {
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
            Column.width('100%');
            Column.height('100%');
            Column.justifyContent(FlexAlign.Center);
            Column.alignItems(HorizontalAlign.Center);
            Column.padding(24);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777302, "type": 20000, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" });
            Image.width(200);
            Image.height(105);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777268, "type": 10003, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" });
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor(getColors().textSecondary);
            Text.textAlign(TextAlign.Center);
            Text.width('100%');
            Text.margin({ top: 24 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777237, "type": 10003, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" });
            Text.fontSize(14);
            Text.fontColor(getColors().textSecondary);
            Text.textAlign(TextAlign.Center);
            Text.width('100%');
            Text.margin({ top: 16 });
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

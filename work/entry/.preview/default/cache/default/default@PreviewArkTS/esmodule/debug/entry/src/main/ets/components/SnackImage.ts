if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SnackImage_Params {
    imageRes?: Resource;
    widthValue?: number;
    heightValue?: number;
    radiusValue?: number;
}
import { getColors } from "@bundle:com.example.jetsnack/entry/ets/theme/Theme";
export class SnackImage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.imageRes = { "id": 16777223, "type": 20000, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" };
        this.widthValue = 120;
        this.heightValue = 120;
        this.radiusValue = 60;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SnackImage_Params) {
        if (params.imageRes !== undefined) {
            this.imageRes = params.imageRes;
        }
        if (params.widthValue !== undefined) {
            this.widthValue = params.widthValue;
        }
        if (params.heightValue !== undefined) {
            this.heightValue = params.heightValue;
        }
        if (params.radiusValue !== undefined) {
            this.radiusValue = params.radiusValue;
        }
    }
    updateStateVars(params: SnackImage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private imageRes: Resource;
    private widthValue: number;
    private heightValue: number;
    private radiusValue: number;
    initialRender(): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("entry/src/main/ets/components/SnackImage.ets(12:5)", "entry");
            Stack.width(this.widthValue);
            Stack.height(this.heightValue);
            Stack.borderRadius(this.radiusValue);
            Stack.backgroundColor(getColors().uiBackground);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.imageRes);
            Image.debugLine("entry/src/main/ets/components/SnackImage.ets(13:7)", "entry");
            Image.width(this.widthValue);
            Image.height(this.heightValue);
            Image.objectFit(ImageFit.Cover);
            Image.borderRadius(this.radiusValue);
            Image.clip(true);
        }, Image);
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

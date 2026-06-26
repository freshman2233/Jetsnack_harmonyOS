if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface BottomBar_Params {
    selectedIndex?: number;
    onTabSelected?: (index: number) => void;
    tabs?: Array<[
        string,
        string
    ]>;
}
import { getColors } from "@bundle:com.example.jetsnack/entry/ets/theme/Theme";
import { SnackIcon } from "@bundle:com.example.jetsnack/entry/ets/components/SnackIcon";
export class BottomBar extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__selectedIndex = new SynchedPropertySimpleOneWayPU(params.selectedIndex, this, "selectedIndex");
        this.onTabSelected = () => { };
        this.tabs = [
            ['home_feed', 'ic_home'],
            ['home_search', 'ic_search'],
            ['home_cart', 'ic_shopping_cart'],
            ['home_profile', 'ic_account_circle'],
        ];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: BottomBar_Params) {
        if (params.onTabSelected !== undefined) {
            this.onTabSelected = params.onTabSelected;
        }
        if (params.tabs !== undefined) {
            this.tabs = params.tabs;
        }
    }
    updateStateVars(params: BottomBar_Params) {
        this.__selectedIndex.reset(params.selectedIndex);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__selectedIndex.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__selectedIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __selectedIndex: SynchedPropertySimpleOneWayPU<number>;
    get selectedIndex() {
        return this.__selectedIndex.get();
    }
    set selectedIndex(newValue: number) {
        this.__selectedIndex.set(newValue);
    }
    private onTabSelected: (index: number) => void;
    private tabs: Array<[
        string,
        string
    ]>;
    initialRender(): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/home/BottomBar.ets(17:5)", "entry");
            Row.width('100%');
            Row.height(56);
            Row.backgroundColor(getColors().iconPrimary);
            Row.padding({ left: 16, right: 16, bottom: 0, top: 0 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const tab = _item;
                this.NavItem.bind(this)(tab[0], tab[1], index);
            };
            this.forEachUpdateFunction(elmtId, this.tabs, forEachItemGenFunction, (tab: [
                string,
                string
            ]) => tab[0], true, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
    }
    NavItem(labelKey: string, iconName: string, index: number, parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/home/BottomBar.ets(30:5)", "entry");
            globalThis.Context.animation({ duration: 300, curve: Curve.EaseInOut });
            Row.height(40);
            Row.padding({ left: 16, right: 16, top: 8, bottom: 8 });
            Row.borderRadius(50);
            Row.border(this.selectedIndex === index ? {
                width: 2,
                color: getColors().iconInteractive
            } : { width: 0 });
            Row.layoutWeight(this.selectedIndex === index ? 2 : 1);
            Row.justifyContent(FlexAlign.Center);
            Row.alignItems(VerticalAlign.Center);
            globalThis.Context.animation(null);
            Row.onClick(() => this.onTabSelected(index));
        }, Row);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SnackIcon(this, {
                        iconName: iconName,
                        color: this.selectedIndex === index ? getColors().iconInteractive : getColors().iconInteractiveInactive,
                        iconSize: 24
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/home/BottomBar.ets", line: 31, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            iconName: iconName,
                            color: this.selectedIndex === index ? getColors().iconInteractive : getColors().iconInteractiveInactive,
                            iconSize: 24
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        iconName: iconName
                    });
                }
            }, { name: "SnackIcon" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.selectedIndex === index) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ get id() {
                                return typeof __getResourceId__ === "function" ? __getResourceId__(this) : -1;
                            }, "type": -1, params: [`app.string.${labelKey}`], "bundleName": "com.example.jetsnack", "moduleName": "entry" });
                        Text.debugLine("entry/src/main/ets/home/BottomBar.ets(38:9)", "entry");
                        Text.fontSize(12);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor(this.selectedIndex === index ? getColors().iconInteractive : getColors().iconInteractiveInactive);
                        Text.maxLines(1);
                        Text.margin({ left: 4 });
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

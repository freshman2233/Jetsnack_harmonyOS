if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface FilterScreen_Params {
    onDismiss?: () => void;
    sortState?: string;
    maxCalories?: number;
    defaultSort?: string;
    sortFilters?: Filter[];
    priceFilters?: Filter[];
    categoryFilters?: Filter[];
    lifeStyleFilters?: Filter[];
}
import { getColors } from "@bundle:com.example.jetsnack/entry/ets/theme/Theme";
import type { Filter } from '../model/Filter';
import { SnackRepo } from "@bundle:com.example.jetsnack/entry/ets/model/SnackCollection";
import { SnackIcon } from "@bundle:com.example.jetsnack/entry/ets/components/SnackIcon";
import { FilterChip } from "@bundle:com.example.jetsnack/entry/ets/components/FilterChip";
export class FilterScreen extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.onDismiss = () => { };
        this.__sortState = new ObservedPropertySimplePU('', this, "sortState");
        this.__maxCalories = new ObservedPropertySimplePU(0, this, "maxCalories");
        this.defaultSort = SnackRepo.getSortDefault();
        this.sortFilters = SnackRepo.getSortFilters();
        this.priceFilters = SnackRepo.getPriceFilters();
        this.categoryFilters = SnackRepo.getCategoryFilters();
        this.lifeStyleFilters = SnackRepo.getLifeStyleFilters();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: FilterScreen_Params) {
        if (params.onDismiss !== undefined) {
            this.onDismiss = params.onDismiss;
        }
        if (params.sortState !== undefined) {
            this.sortState = params.sortState;
        }
        if (params.maxCalories !== undefined) {
            this.maxCalories = params.maxCalories;
        }
        if (params.defaultSort !== undefined) {
            this.defaultSort = params.defaultSort;
        }
        if (params.sortFilters !== undefined) {
            this.sortFilters = params.sortFilters;
        }
        if (params.priceFilters !== undefined) {
            this.priceFilters = params.priceFilters;
        }
        if (params.categoryFilters !== undefined) {
            this.categoryFilters = params.categoryFilters;
        }
        if (params.lifeStyleFilters !== undefined) {
            this.lifeStyleFilters = params.lifeStyleFilters;
        }
    }
    updateStateVars(params: FilterScreen_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__sortState.purgeDependencyOnElmtId(rmElmtId);
        this.__maxCalories.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__sortState.aboutToBeDeleted();
        this.__maxCalories.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private onDismiss: () => void;
    private __sortState: ObservedPropertySimplePU<string>;
    get sortState() {
        return this.__sortState.get();
    }
    set sortState(newValue: string) {
        this.__sortState.set(newValue);
    }
    private __maxCalories: ObservedPropertySimplePU<number>;
    get maxCalories() {
        return this.__maxCalories.get();
    }
    set maxCalories(newValue: number) {
        this.__maxCalories.set(newValue);
    }
    private defaultSort: string;
    private sortFilters: Filter[];
    private priceFilters: Filter[];
    private categoryFilters: Filter[];
    private lifeStyleFilters: Filter[];
    aboutToAppear(): void {
        this.sortState = this.defaultSort;
    }
    initialRender(): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.Center });
            Stack.width('100%');
            Stack.height('100%');
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#80000000');
            Column.onClick(() => this.onDismiss());
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('85%');
            Column.backgroundColor(getColors().uiFloated);
            Column.borderRadius(20);
            Column.padding({ left: 24, right: 24, top: 16, bottom: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 8, right: 16, top: 8, bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.width(40);
            Stack.height(40);
            Stack.onClick(() => this.onDismiss());
        }, Stack);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SnackIcon(this, { iconName: 'ic_close', color: getColors().textSecondary, iconSize: 24 }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/home/FilterScreen.ets", line: 33, col: 13 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            iconName: 'ic_close',
                            color: getColors().textSecondary,
                            iconSize: 24
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        iconName: 'ic_close'
                    });
                }
            }, { name: "SnackIcon" });
        }
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777247, "type": 10003, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" });
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(getColors().textSecondary);
            Text.textAlign(TextAlign.Center);
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777260, "type": 10003, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" });
            Text.fontSize(14);
            Text.fontWeight(this.sortState !== this.defaultSort ? FontWeight.Bold : FontWeight.Normal);
            Text.fontColor(this.sortState !== this.defaultSort ? getColors().brand : '#61000000');
            Text.onClick(() => {
                this.sortState = this.defaultSort;
                this.maxCalories = 0;
            });
        }, Text);
        Text.pop();
        Row.pop();
        this.SortSection.bind(this)();
        this.ChipSection.bind(this)({ "id": 16777256, "type": 10003, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" }, this.priceFilters);
        this.ChipSection.bind(this)({ "id": 16777233, "type": 10003, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" }, this.categoryFilters);
        this.CaloriesSection.bind(this)();
        this.ChipSection.bind(this)({ "id": 16777252, "type": 10003, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" }, this.lifeStyleFilters);
        Column.pop();
        Stack.pop();
    }
    SortSection(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.margin({ bottom: 24 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777267, "type": 10003, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" });
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(getColors().brand);
            Text.margin({ bottom: 8, top: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const filter = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('100%');
                    Row.padding({ top: 14 });
                    Row.onClick(() => {
                        this.sortState = filter.name;
                    });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (filter.icon) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new SnackIcon(this, { iconName: filter.icon, color: getColors().textSecondary, iconSize: 24 }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/home/FilterScreen.ets", line: 85, col: 13 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                iconName: filter.icon,
                                                color: getColors().textSecondary,
                                                iconSize: 24
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            iconName: filter.icon
                                        });
                                    }
                                }, { name: "SnackIcon" });
                            }
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(filter.name);
                    Text.fontSize(16);
                    Text.fontWeight(FontWeight.Bold);
                    Text.fontColor(getColors().textSecondary);
                    Text.layoutWeight(1);
                    Text.margin({ left: 10 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.sortState === filter.name) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new SnackIcon(this, { iconName: 'ic_check', color: getColors().brand, iconSize: 24 }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/home/FilterScreen.ets", line: 94, col: 13 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                iconName: 'ic_check',
                                                color: getColors().brand,
                                                iconSize: 24
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            iconName: 'ic_check'
                                        });
                                    }
                                }, { name: "SnackIcon" });
                            }
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, this.sortFilters, forEachItemGenFunction, (filter: Filter) => filter.name, false, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
    }
    ChipSection(title: Resource, filters: Filter[], parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(getColors().brand);
            Text.margin({ bottom: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ wrap: FlexWrap.Wrap });
            Flex.width('100%');
            Flex.padding({ left: 4, right: 4, bottom: 16 });
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const filter = _item;
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new FilterChip(this, { filter: filter }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/home/FilterScreen.ets", line: 118, col: 11 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    filter: filter
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "FilterChip" });
                }
            };
            this.forEachUpdateFunction(elmtId, filters, forEachItemGenFunction, (filter: Filter) => filter.name, false, false);
        }, ForEach);
        ForEach.pop();
        Flex.pop();
        Column.pop();
    }
    CaloriesSection(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777253, "type": 10003, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" });
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(getColors().brand);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777255, "type": 10003, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" });
            Text.fontSize(14);
            Text.fontColor(getColors().brand);
            Text.margin({ left: 10, top: 5 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Slider.create({
                value: this.maxCalories,
                min: 0,
                max: 300,
                step: 50
            });
            Slider.width('100%');
            Slider.selectedColor(getColors().brand);
            Slider.trackColor(getColors().iconInteractive);
            Slider.onChange((value: number) => {
                this.maxCalories = value;
            });
        }, Slider);
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

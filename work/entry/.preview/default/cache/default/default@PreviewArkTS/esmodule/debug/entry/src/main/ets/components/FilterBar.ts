if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface FilterBar_Params {
    filters?: Filter[];
    onShowFilters?: () => void;
    filterStates?: boolean[];
}
import { getColors } from "@bundle:com.example.jetsnack/entry/ets/theme/Theme";
import type { Filter } from '../model/Filter';
import { SnackIcon } from "@bundle:com.example.jetsnack/entry/ets/components/SnackIcon";
import { FilterChip } from "@bundle:com.example.jetsnack/entry/ets/components/FilterChip";
export class FilterBar extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.filters = [];
        this.onShowFilters = () => { };
        this.__filterStates = new ObservedPropertyObjectPU([], this, "filterStates");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: FilterBar_Params) {
        if (params.filters !== undefined) {
            this.filters = params.filters;
        }
        if (params.onShowFilters !== undefined) {
            this.onShowFilters = params.onShowFilters;
        }
        if (params.filterStates !== undefined) {
            this.filterStates = params.filterStates;
        }
    }
    updateStateVars(params: FilterBar_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__filterStates.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__filterStates.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private filters: Filter[];
    private onShowFilters: () => void;
    private __filterStates: ObservedPropertyObjectPU<boolean[]>;
    get filterStates() {
        return this.__filterStates.get();
    }
    set filterStates(newValue: boolean[]) {
        this.__filterStates.set(newValue);
    }
    aboutToAppear(): void {
        this.filterStates = this.filters.map((f) => f.enabled);
    }
    initialRender(): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({ space: 8 });
            List.debugLine("entry/src/main/ets/components/FilterBar.ets(17:5)", "entry");
            List.listDirection(Axis.Horizontal);
            List.width('100%');
            List.height(56);
            List.alignListItem(ListItemAlign.Center);
            List.padding({ left: 12, right: 8 });
        }, List);
        {
            const itemCreation = (elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                ListItem.create(deepRenderFunction, true);
                if (!isInitialRender) {
                    ListItem.pop();
                }
                ViewStackProcessor.StopGetAccessRecording();
            };
            const itemCreation2 = (elmtId, isInitialRender) => {
                ListItem.create(deepRenderFunction, true);
                ListItem.debugLine("entry/src/main/ets/components/FilterBar.ets(18:7)", "entry");
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Stack.create();
                    Stack.debugLine("entry/src/main/ets/components/FilterBar.ets(19:9)", "entry");
                    Stack.width(48);
                    Stack.height(48);
                    Stack.borderRadius(50);
                    Stack.border({ width: 1.5, color: getColors().brandSecondary });
                    Stack.onClick(() => this.onShowFilters());
                }, Stack);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new SnackIcon(this, { iconName: 'ic_filter_list', color: getColors().brand, iconSize: 24 }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/components/FilterBar.ets", line: 20, col: 11 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    iconName: 'ic_filter_list',
                                    color: getColors().brand,
                                    iconSize: 24
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                iconName: 'ic_filter_list'
                            });
                        }
                    }, { name: "SnackIcon" });
                }
                Stack.pop();
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            ListItem.pop();
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const filter = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        ListItem.create(deepRenderFunction, true);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(deepRenderFunction, true);
                        ListItem.debugLine("entry/src/main/ets/components/FilterBar.ets(30:9)", "entry");
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new FilterChip(this, {
                                        filter: filter,
                                        onToggle: (name: string, enabled: boolean) => {
                                            this.filterStates[index] = enabled;
                                        }
                                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/components/FilterBar.ets", line: 31, col: 11 });
                                    ViewPU.create(componentCall);
                                    let paramsLambda = () => {
                                        return {
                                            filter: filter,
                                            onToggle: (name: string, enabled: boolean) => {
                                                this.filterStates[index] = enabled;
                                            }
                                        };
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                                }
                            }, { name: "FilterChip" });
                        }
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.filters, forEachItemGenFunction, (filter: Filter) => filter.name, true, false);
        }, ForEach);
        ForEach.pop();
        List.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface FeedScreen_Params {
    onSnackClick?: (id: number, origin: string) => void;
    showFilters?: boolean;
    collections?: SnackCollection[];
    filters?: Filter[];
}
import { getColors } from "@bundle:com.example.jetsnack/entry/ets/theme/Theme";
import { SnackRepo } from "@bundle:com.example.jetsnack/entry/ets/model/SnackCollection";
import type { SnackCollection } from "@bundle:com.example.jetsnack/entry/ets/model/SnackCollection";
import type { Filter } from '../model/Filter';
import { SnackCollectionItem } from "@bundle:com.example.jetsnack/entry/ets/components/SnackCollectionItem";
import { FilterBar } from "@bundle:com.example.jetsnack/entry/ets/components/FilterBar";
import { DestinationBar } from "@bundle:com.example.jetsnack/entry/ets/home/DestinationBar";
import { JetsnackDivider } from "@bundle:com.example.jetsnack/entry/ets/components/Surface";
import { FilterScreen } from "@bundle:com.example.jetsnack/entry/ets/home/FilterScreen";
export class FeedScreen extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.onSnackClick = () => { };
        this.__showFilters = new ObservedPropertySimplePU(false, this, "showFilters");
        this.collections = SnackRepo.getSnacks();
        this.filters = SnackRepo.getFilters();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: FeedScreen_Params) {
        if (params.onSnackClick !== undefined) {
            this.onSnackClick = params.onSnackClick;
        }
        if (params.showFilters !== undefined) {
            this.showFilters = params.showFilters;
        }
        if (params.collections !== undefined) {
            this.collections = params.collections;
        }
        if (params.filters !== undefined) {
            this.filters = params.filters;
        }
    }
    updateStateVars(params: FeedScreen_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__showFilters.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__showFilters.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private onSnackClick: (id: number, origin: string) => void;
    private __showFilters: ObservedPropertySimplePU<boolean>;
    get showFilters() {
        return this.__showFilters.get();
    }
    set showFilters(newValue: boolean) {
        this.__showFilters.set(newValue);
    }
    private collections: SnackCollection[];
    private filters: Filter[];
    initialRender(): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.Top });
            Stack.width('100%');
            Stack.height('100%');
            Stack.backgroundColor(getColors().uiBackground);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.width('100%');
            List.height('100%');
            List.padding({ top: 56 });
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
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width('100%');
                }, Column);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new FilterBar(this, {
                                filters: this.filters,
                                onShowFilters: () => {
                                    this.showFilters = true;
                                }
                            }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/home/Feed.ets", line: 22, col: 13 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    filters: this.filters,
                                    onShowFilters: () => {
                                        this.showFilters = true;
                                    }
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "FilterBar" });
                }
                Column.pop();
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            ListItem.pop();
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const collection = _item;
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
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            If.create();
                            if (index > 0) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    {
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            if (isInitialRender) {
                                                let componentCall = new JetsnackDivider(this, { color: getColors().uiBorder, thickness: 2, widthValue: '100%' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/home/Feed.ets", line: 36, col: 17 });
                                                ViewPU.create(componentCall);
                                                let paramsLambda = () => {
                                                    return {
                                                        color: getColors().uiBorder,
                                                        thickness: 2,
                                                        widthValue: '100%'
                                                    };
                                                };
                                                componentCall.paramsGenerator_ = paramsLambda;
                                            }
                                            else {
                                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                                            }
                                        }, { name: "JetsnackDivider" });
                                    }
                                });
                            }
                            else {
                                this.ifElseBranchUpdateFunction(1, () => {
                                });
                            }
                        }, If);
                        If.pop();
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new SnackCollectionItem(this, {
                                        collection: collection,
                                        onSnackClick: (id: number, origin: string) => this.onSnackClick(id, origin),
                                        index: index,
                                        highlight: true
                                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/home/Feed.ets", line: 38, col: 15 });
                                    ViewPU.create(componentCall);
                                    let paramsLambda = () => {
                                        return {
                                            collection: collection,
                                            onSnackClick: (id: number, origin: string) => this.onSnackClick(id, origin),
                                            index: index,
                                            highlight: true
                                        };
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                                }
                            }, { name: "SnackCollectionItem" });
                        }
                        Column.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.collections, forEachItemGenFunction, (collection: SnackCollection) => collection.id.toString(), true, false);
        }, ForEach);
        ForEach.pop();
        List.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new DestinationBar(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/home/Feed.ets", line: 52, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "DestinationBar" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showFilters) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new FilterScreen(this, {
                                    onDismiss: () => {
                                        this.showFilters = false;
                                    }
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/home/Feed.ets", line: 55, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        onDismiss: () => {
                                            this.showFilters = false;
                                        }
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "FilterScreen" });
                    }
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

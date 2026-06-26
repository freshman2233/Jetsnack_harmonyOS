if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    currentTab?: number;
    showDetail?: boolean;
    detailSnackId?: number;
    detailOrigin?: string;
}
import { getColors } from "@bundle:com.example.jetsnack/entry/ets/theme/Theme";
import { FeedScreen } from "@bundle:com.example.jetsnack/entry/ets/home/Feed";
import { SearchScreen } from "@bundle:com.example.jetsnack/entry/ets/home/search/Search";
import { CartScreen } from "@bundle:com.example.jetsnack/entry/ets/home/cart/Cart";
import { ProfileScreen } from "@bundle:com.example.jetsnack/entry/ets/home/Profile";
import { BottomBar } from "@bundle:com.example.jetsnack/entry/ets/home/BottomBar";
import { SnackDetailScreen } from "@bundle:com.example.jetsnack/entry/ets/snackdetail/SnackDetail";
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentTab = new ObservedPropertySimplePU(0, this, "currentTab");
        this.__showDetail = new ObservedPropertySimplePU(false, this, "showDetail");
        this.__detailSnackId = new ObservedPropertySimplePU(1, this, "detailSnackId");
        this.__detailOrigin = new ObservedPropertySimplePU('', this, "detailOrigin");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.currentTab !== undefined) {
            this.currentTab = params.currentTab;
        }
        if (params.showDetail !== undefined) {
            this.showDetail = params.showDetail;
        }
        if (params.detailSnackId !== undefined) {
            this.detailSnackId = params.detailSnackId;
        }
        if (params.detailOrigin !== undefined) {
            this.detailOrigin = params.detailOrigin;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentTab.purgeDependencyOnElmtId(rmElmtId);
        this.__showDetail.purgeDependencyOnElmtId(rmElmtId);
        this.__detailSnackId.purgeDependencyOnElmtId(rmElmtId);
        this.__detailOrigin.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentTab.aboutToBeDeleted();
        this.__showDetail.aboutToBeDeleted();
        this.__detailSnackId.aboutToBeDeleted();
        this.__detailOrigin.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __currentTab: ObservedPropertySimplePU<number>;
    get currentTab() {
        return this.__currentTab.get();
    }
    set currentTab(newValue: number) {
        this.__currentTab.set(newValue);
    }
    private __showDetail: ObservedPropertySimplePU<boolean>;
    get showDetail() {
        return this.__showDetail.get();
    }
    set showDetail(newValue: boolean) {
        this.__showDetail.set(newValue);
    }
    private __detailSnackId: ObservedPropertySimplePU<number>;
    get detailSnackId() {
        return this.__detailSnackId.get();
    }
    set detailSnackId(newValue: number) {
        this.__detailSnackId.set(newValue);
    }
    private __detailOrigin: ObservedPropertySimplePU<string>;
    get detailOrigin() {
        return this.__detailOrigin.get();
    }
    set detailOrigin(newValue: string) {
        this.__detailOrigin.set(newValue);
    }
    private navigateToSnackDetail(id: number, origin: string): void {
        this.detailSnackId = id;
        this.detailOrigin = origin;
        this.showDetail = true;
    }
    initialRender(): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("entry/src/main/ets/pages/Index.ets(24:5)", "entry");
            Stack.width('100%');
            Stack.height('100%');
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(25:7)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor(getColors().uiBackground);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.currentTab === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new FeedScreen(this, {
                                    onSnackClick: (id: number, origin: string) => this.navigateToSnackDetail(id, origin)
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 27, col: 11 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        onSnackClick: (id: number, origin: string) => this.navigateToSnackDetail(id, origin)
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "FeedScreen" });
                    }
                });
            }
            else if (this.currentTab === 1) {
                this.ifElseBranchUpdateFunction(1, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new SearchScreen(this, {
                                    onSnackClick: (id: number, origin: string) => this.navigateToSnackDetail(id, origin)
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 31, col: 11 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        onSnackClick: (id: number, origin: string) => this.navigateToSnackDetail(id, origin)
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "SearchScreen" });
                    }
                });
            }
            else if (this.currentTab === 2) {
                this.ifElseBranchUpdateFunction(2, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new CartScreen(this, {
                                    onSnackClick: (id: number, origin: string) => this.navigateToSnackDetail(id, origin)
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 35, col: 11 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        onSnackClick: (id: number, origin: string) => this.navigateToSnackDetail(id, origin)
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "CartScreen" });
                    }
                });
            }
            else if (this.currentTab === 3) {
                this.ifElseBranchUpdateFunction(3, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new ProfileScreen(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 39, col: 11 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {};
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "ProfileScreen" });
                    }
                });
            }
            else {
                this.ifElseBranchUpdateFunction(4, () => {
                });
            }
        }, If);
        If.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new BottomBar(this, {
                        selectedIndex: this.currentTab,
                        onTabSelected: (index: number) => {
                            this.currentTab = index;
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 42, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            selectedIndex: this.currentTab,
                            onTabSelected: (index: number) => {
                                this.currentTab = index;
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        selectedIndex: this.currentTab
                    });
                }
            }, { name: "BottomBar" });
        }
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showDetail) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new SnackDetailScreen(this, {
                                    snackId: this.detailSnackId,
                                    origin: this.detailOrigin,
                                    upPress: () => {
                                        this.showDetail = false;
                                    }
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 54, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        snackId: this.detailSnackId,
                                        origin: this.detailOrigin,
                                        upPress: () => {
                                            this.showDetail = false;
                                        }
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    snackId: this.detailSnackId,
                                    origin: this.detailOrigin
                                });
                            }
                        }, { name: "SnackDetailScreen" });
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
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.example.jetsnack", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });

if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SearchResults_Params {
    searchResults?: Snack[];
    onSnackClick?: (id: number, origin: string) => void;
}
import { getColors, toGradient } from "@bundle:com.example.jetsnack/entry/ets/theme/Theme";
import type { Snack } from '../../model/Snack';
import { SnackImage } from "@bundle:com.example.jetsnack/entry/ets/components/SnackImage";
import { JetsnackDivider } from "@bundle:com.example.jetsnack/entry/ets/components/Surface";
import { SnackIcon } from "@bundle:com.example.jetsnack/entry/ets/components/SnackIcon";
import { formatPrice } from "@bundle:com.example.jetsnack/entry/ets/utils/FormatPrice";
export class SearchResults extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.searchResults = [];
        this.onSnackClick = () => { };
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SearchResults_Params) {
        if (params.searchResults !== undefined) {
            this.searchResults = params.searchResults;
        }
        if (params.onSnackClick !== undefined) {
            this.onSnackClick = params.onSnackClick;
        }
    }
    updateStateVars(params: SearchResults_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private searchResults: Snack[];
    private onSnackClick: (id: number, origin: string) => void;
    initialRender(): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.searchResults.length} items`);
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(getColors().textPrimary);
            Text.padding({ left: 24, right: 24, top: 4, bottom: 4 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.width('100%');
            List.layoutWeight(1);
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const snack = _item;
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
                        this.ResultItem.bind(this)(snack, index !== 0);
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.searchResults, forEachItemGenFunction, (snack: Snack) => snack.id.toString(), true, false);
        }, ForEach);
        ForEach.pop();
        List.pop();
        Column.pop();
    }
    ResultItem(snack: Snack, showDivider: boolean, parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (showDivider) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new JetsnackDivider(this, { color: getColors().uiBorder, thickness: 1 }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/home/search/Results.ets", line: 40, col: 9 });
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
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 24, right: 24, top: 16, bottom: 16 });
            Row.alignItems(VerticalAlign.Center);
            Row.onClick(() => this.onSnackClick(snack.id, 'search'));
        }, Row);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SnackImage(this, {
                        imageRes: snack.imageRes,
                        widthValue: 100,
                        heightValue: 100,
                        radiusValue: 50
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/home/search/Results.ets", line: 44, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            imageRes: snack.imageRes,
                            widthValue: 100,
                            heightValue: 100,
                            radiusValue: 50
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "SnackImage" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ left: 16, right: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(snack.name);
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(getColors().textSecondary);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(snack.tagline);
            Text.fontSize(16);
            Text.fontColor(getColors().textHelp);
            Text.margin({ top: 2 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(formatPrice(snack.price));
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(getColors().textPrimary);
            Text.margin({ top: 8 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.width(36);
            Stack.height(36);
            Stack.borderRadius(50);
            Stack.linearGradient({ angle: 90, colors: toGradient(getColors().interactivePrimary) });
        }, Stack);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SnackIcon(this, { iconName: 'ic_add', color: getColors().textInteractive, iconSize: 24 }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/home/search/Results.ets", line: 73, col: 11 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            iconName: 'ic_add',
                            color: getColors().textInteractive,
                            iconSize: 24
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        iconName: 'ic_add'
                    });
                }
            }, { name: "SnackIcon" });
        }
        Stack.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

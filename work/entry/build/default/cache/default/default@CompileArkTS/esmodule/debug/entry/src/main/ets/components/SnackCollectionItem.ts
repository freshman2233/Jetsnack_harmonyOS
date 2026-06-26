if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SnackCollectionItem_Params {
    collection?: SnackCollection;
    onSnackClick?: (id: number, origin: string) => void;
    index?: number;
    highlight?: boolean;
}
import { getColors, toGradient } from "@bundle:com.example.jetsnack/entry/ets/theme/Theme";
import type { Snack } from '../model/Snack';
import { SnackCollection, CollectionType } from "@bundle:com.example.jetsnack/entry/ets/model/SnackCollection";
import { SnackImage } from "@bundle:com.example.jetsnack/entry/ets/components/SnackImage";
import { SnackIcon } from "@bundle:com.example.jetsnack/entry/ets/components/SnackIcon";
export class SnackCollectionItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.collection = new SnackCollection(0, '', []);
        this.onSnackClick = () => { };
        this.index = 0;
        this.highlight = true;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SnackCollectionItem_Params) {
        if (params.collection !== undefined) {
            this.collection = params.collection;
        }
        if (params.onSnackClick !== undefined) {
            this.onSnackClick = params.onSnackClick;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
        if (params.highlight !== undefined) {
            this.highlight = params.highlight;
        }
    }
    updateStateVars(params: SnackCollectionItem_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private collection: SnackCollection;
    private onSnackClick: (id: number, origin: string) => void;
    private index: number;
    private highlight: boolean;
    initialRender(): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(56);
            Row.padding({ left: 24, right: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.collection.name);
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor(getColors().brand);
            Text.maxLines(1);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SnackIcon(this, { iconName: 'ic_arrow_back', color: getColors().brand, iconSize: 24 }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/components/SnackCollectionItem.ets", line: 25, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            iconName: 'ic_arrow_back',
                            color: getColors().brand,
                            iconSize: 24
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        iconName: 'ic_arrow_back'
                    });
                }
            }, { name: "SnackIcon" });
        }
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.highlight && this.collection.type === CollectionType.Highlight) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.HighlightedSnacks.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.NormalSnacks.bind(this)();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    HighlightedSnacks(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({ space: 16 });
            List.listDirection(Axis.Horizontal);
            List.width('100%');
            List.padding({ left: 24, right: 24 });
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
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
                        this.HighlightCard.bind(this)(snack);
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.collection.snacks, forEachItemGenFunction, (snack: Snack) => snack.id.toString(), false, false);
        }, ForEach);
        ForEach.pop();
        List.pop();
    }
    NormalSnacks(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({ space: 8 });
            List.listDirection(Axis.Horizontal);
            List.width('100%');
            List.padding({ left: 12, right: 12 });
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
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
                        this.NormalCard.bind(this)(snack);
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.collection.snacks, forEachItemGenFunction, (snack: Snack) => snack.id.toString(), false, false);
        }, ForEach);
        ForEach.pop();
        List.pop();
    }
    HighlightCard(snack: Snack, parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(170);
            Column.height(250);
            Column.borderRadius(20);
            Column.backgroundColor(getColors().uiBackground);
            Column.border({ width: 1, color: getColors().uiBorder });
            Column.margin({ bottom: 16 });
            Column.onClick(() => this.onSnackClick(snack.id, this.collection.id.toString()));
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.Bottom });
            Stack.width('100%');
            Stack.height(160);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height(100);
            Column.linearGradient({
                angle: 90,
                colors: toGradient(this.index % 2 === 0 ? getColors().gradient6_1 : getColors().gradient6_2)
            });
        }, Column);
        Column.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SnackImage(this, {
                        imageRes: snack.imageRes,
                        widthValue: 120,
                        heightValue: 120,
                        radiusValue: 60
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/components/SnackCollectionItem.ets", line: 79, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            imageRes: snack.imageRes,
                            widthValue: 120,
                            heightValue: 120,
                            radiusValue: 60
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "SnackImage" });
        }
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(snack.name);
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(getColors().textSecondary);
            Text.maxLines(1);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.width('100%');
            Text.padding({ left: 16, right: 16, top: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(snack.tagline);
            Text.fontSize(14);
            Text.fontColor(getColors().textHelp);
            Text.width('100%');
            Text.padding({ left: 16, right: 16, top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
    }
    NormalCard(snack: Snack, parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Center);
            Column.padding(8);
            Column.margin({ left: 4, right: 4, bottom: 8 });
            Column.borderRadius(20);
            Column.backgroundColor(getColors().uiBackground);
            Column.onClick(() => this.onSnackClick(snack.id, this.collection.id.toString()));
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SnackImage(this, {
                        imageRes: snack.imageRes,
                        widthValue: 120,
                        heightValue: 120,
                        radiusValue: 60
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/components/SnackCollectionItem.ets", line: 116, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            imageRes: snack.imageRes,
                            widthValue: 120,
                            heightValue: 120,
                            radiusValue: 60
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
            Text.create(snack.name);
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(getColors().textSecondary);
            Text.maxLines(1);
            Text.margin({ top: 8 });
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

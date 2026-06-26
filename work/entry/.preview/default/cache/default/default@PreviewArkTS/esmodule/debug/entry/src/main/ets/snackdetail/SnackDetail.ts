if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SnackDetailScreen_Params {
    snackId?: number;
    origin?: string;
    upPress?: () => void;
    quantity?: number;
    seeMore?: boolean;
    scrollY?: number;
    snack?: Snack;
    related?: SnackCollection[];
}
import { getColors, toGradient } from "@bundle:com.example.jetsnack/entry/ets/theme/Theme";
import { SnackRepo } from "@bundle:com.example.jetsnack/entry/ets/model/SnackCollection";
import type { SnackCollection } from "@bundle:com.example.jetsnack/entry/ets/model/SnackCollection";
import type { Snack } from '../model/Snack';
import { SnackImage } from "@bundle:com.example.jetsnack/entry/ets/components/SnackImage";
import { SnackCollectionItem } from "@bundle:com.example.jetsnack/entry/ets/components/SnackCollectionItem";
import { QuantitySelector } from "@bundle:com.example.jetsnack/entry/ets/components/QuantitySelector";
import { JetsnackDivider } from "@bundle:com.example.jetsnack/entry/ets/components/Surface";
import { SnackIcon } from "@bundle:com.example.jetsnack/entry/ets/components/SnackIcon";
import { formatPrice } from "@bundle:com.example.jetsnack/entry/ets/utils/FormatPrice";
export class SnackDetailScreen extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__snackId = new SynchedPropertySimpleOneWayPU(params.snackId, this, "snackId");
        this.__origin = new SynchedPropertySimpleOneWayPU(params.origin, this, "origin");
        this.upPress = () => { };
        this.__quantity = new ObservedPropertySimplePU(1, this, "quantity");
        this.__seeMore = new ObservedPropertySimplePU(true, this, "seeMore");
        this.__scrollY = new ObservedPropertySimplePU(0, this, "scrollY");
        this.snack = SnackRepo.getSnack(1);
        this.related = [];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SnackDetailScreen_Params) {
        if (params.upPress !== undefined) {
            this.upPress = params.upPress;
        }
        if (params.quantity !== undefined) {
            this.quantity = params.quantity;
        }
        if (params.seeMore !== undefined) {
            this.seeMore = params.seeMore;
        }
        if (params.scrollY !== undefined) {
            this.scrollY = params.scrollY;
        }
        if (params.snack !== undefined) {
            this.snack = params.snack;
        }
        if (params.related !== undefined) {
            this.related = params.related;
        }
    }
    updateStateVars(params: SnackDetailScreen_Params) {
        this.__snackId.reset(params.snackId);
        this.__origin.reset(params.origin);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__snackId.purgeDependencyOnElmtId(rmElmtId);
        this.__origin.purgeDependencyOnElmtId(rmElmtId);
        this.__quantity.purgeDependencyOnElmtId(rmElmtId);
        this.__seeMore.purgeDependencyOnElmtId(rmElmtId);
        this.__scrollY.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__snackId.aboutToBeDeleted();
        this.__origin.aboutToBeDeleted();
        this.__quantity.aboutToBeDeleted();
        this.__seeMore.aboutToBeDeleted();
        this.__scrollY.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __snackId: SynchedPropertySimpleOneWayPU<number>;
    get snackId() {
        return this.__snackId.get();
    }
    set snackId(newValue: number) {
        this.__snackId.set(newValue);
    }
    private __origin: SynchedPropertySimpleOneWayPU<string>;
    get origin() {
        return this.__origin.get();
    }
    set origin(newValue: string) {
        this.__origin.set(newValue);
    }
    private upPress: () => void;
    private __quantity: ObservedPropertySimplePU<number>;
    get quantity() {
        return this.__quantity.get();
    }
    set quantity(newValue: number) {
        this.__quantity.set(newValue);
    }
    private __seeMore: ObservedPropertySimplePU<boolean>;
    get seeMore() {
        return this.__seeMore.get();
    }
    set seeMore(newValue: boolean) {
        this.__seeMore.set(newValue);
    }
    private __scrollY: ObservedPropertySimplePU<number>;
    get scrollY() {
        return this.__scrollY.get();
    }
    set scrollY(newValue: number) {
        this.__scrollY.set(newValue);
    }
    private snack: Snack;
    private related: SnackCollection[];
    aboutToAppear(): void {
        this.snack = SnackRepo.getSnack(this.snackId);
        this.related = SnackRepo.getRelated(this.snackId);
    }
    initialRender(): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.TopStart });
            Stack.debugLine("entry/src/main/ets/snackdetail/SnackDetail.ets(29:5)", "entry");
            Stack.width('100%');
            Stack.height('100%');
            Stack.backgroundColor(getColors().uiBackground);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.debugLine("entry/src/main/ets/snackdetail/SnackDetail.ets(30:7)", "entry");
            Scroll.width('100%');
            Scroll.height('100%');
            Scroll.scrollBar(BarState.Off);
            Scroll.onScroll((xOffset: number, yOffset: number) => {
                this.scrollY = yOffset;
            });
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/snackdetail/SnackDetail.ets(31:9)", "entry");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/snackdetail/SnackDetail.ets(32:11)", "entry");
            Column.width('100%');
            Column.height(280);
            Column.linearGradient({
                angle: 135,
                colors: toGradient(getColors().tornado1)
            });
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/snackdetail/SnackDetail.ets(40:11)", "entry");
            Row.width('100%');
            Row.justifyContent(FlexAlign.Center);
            Row.margin({ top: -100 });
        }, Row);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SnackImage(this, {
                        imageRes: this.snack.imageRes,
                        widthValue: this.imageSize,
                        heightValue: this.imageSize,
                        radiusValue: this.imageSize / 2
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/snackdetail/SnackDetail.ets", line: 41, col: 13 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            imageRes: this.snack.imageRes,
                            widthValue: this.imageSize,
                            heightValue: this.imageSize,
                            radiusValue: this.imageSize / 2
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "SnackImage" });
        }
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/snackdetail/SnackDetail.ets(52:11)", "entry");
            Column.width('100%');
            Column.padding({ top: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.snack.name);
            Text.debugLine("entry/src/main/ets/snackdetail/SnackDetail.ets(53:13)", "entry");
            Text.fontSize(30);
            Text.fontStyle(FontStyle.Italic);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(getColors().textSecondary);
            Text.padding({ left: 24, right: 24 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.snack.tagline);
            Text.debugLine("entry/src/main/ets/snackdetail/SnackDetail.ets(60:13)", "entry");
            Text.fontSize(20);
            Text.fontStyle(FontStyle.Italic);
            Text.fontColor(getColors().textHelp);
            Text.padding({ left: 24, right: 24, top: 4 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(formatPrice(this.snack.price));
            Text.debugLine("entry/src/main/ets/snackdetail/SnackDetail.ets(66:13)", "entry");
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(getColors().textPrimary);
            Text.padding({ left: 24, right: 24, top: 8 });
        }, Text);
        Text.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new JetsnackDivider(this, { color: getColors().uiBorder, thickness: 1, marginLeft: 24, marginRight: 24 }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/snackdetail/SnackDetail.ets", line: 72, col: 13 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            color: getColors().uiBorder,
                            thickness: 1,
                            marginLeft: 24,
                            marginRight: 24
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
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/snackdetail/SnackDetail.ets(77:11)", "entry");
            Column.width('100%');
            Column.backgroundColor(getColors().uiBackground);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777254, "type": 10003, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/snackdetail/SnackDetail.ets(78:13)", "entry");
            Text.fontSize(12);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(getColors().textHelp);
            Text.padding({ left: 24, right: 24 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777255, "type": 10003, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/snackdetail/SnackDetail.ets(84:13)", "entry");
            Text.fontSize(16);
            Text.fontColor(getColors().textHelp);
            Text.maxLines(this.seeMore ? 5 : 100);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.padding({ left: 24, right: 24, top: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.seeMore ? 'SEE MORE' : 'SEE LESS');
            Text.debugLine("entry/src/main/ets/snackdetail/SnackDetail.ets(91:13)", "entry");
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(getColors().textLink);
            Text.width('100%');
            Text.textAlign(TextAlign.Center);
            Text.padding({ top: 15 });
            Text.onClick(() => {
                this.seeMore = !this.seeMore;
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/snackdetail/SnackDetail.ets(102:13)", "entry");
            Blank.height(40);
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777261, "type": 10003, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/snackdetail/SnackDetail.ets(104:13)", "entry");
            Text.fontSize(12);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(getColors().textHelp);
            Text.padding({ left: 24, right: 24 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777262, "type": 10003, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/snackdetail/SnackDetail.ets(110:13)", "entry");
            Text.fontSize(16);
            Text.fontColor(getColors().textHelp);
            Text.padding({ left: 24, right: 24, top: 4 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/snackdetail/SnackDetail.ets(115:13)", "entry");
            Blank.height(16);
        }, Blank);
        Blank.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new JetsnackDivider(this, { color: getColors().uiBorder, thickness: 1 }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/snackdetail/SnackDetail.ets", line: 116, col: 13 });
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
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const collection = _item;
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new SnackCollectionItem(this, {
                                collection: collection,
                                onSnackClick: (id: number, origin: string) => { },
                                highlight: false
                            }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/snackdetail/SnackDetail.ets", line: 119, col: 15 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    collection: collection,
                                    onSnackClick: (id: number, origin: string) => { },
                                    highlight: false
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "SnackCollectionItem" });
                }
            };
            this.forEachUpdateFunction(elmtId, this.related, forEachItemGenFunction, (collection: SnackCollection) => collection.id.toString(), false, false);
        }, ForEach);
        ForEach.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/snackdetail/SnackDetail.ets(126:13)", "entry");
            Blank.height(120);
        }, Blank);
        Blank.pop();
        Column.pop();
        Column.pop();
        Scroll.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/snackdetail/SnackDetail.ets(139:7)", "entry");
            Row.width('100%');
            Row.padding({ left: 16, top: 48 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("entry/src/main/ets/snackdetail/SnackDetail.ets(140:9)", "entry");
            Stack.width(36);
            Stack.height(36);
            Stack.borderRadius(50);
            Stack.backgroundColor('#52121212');
            Stack.onClick(() => this.upPress());
        }, Stack);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SnackIcon(this, { iconName: 'ic_arrow_back', color: getColors().iconInteractive, iconSize: 24 }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/snackdetail/SnackDetail.ets", line: 141, col: 11 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            iconName: 'ic_arrow_back',
                            color: getColors().iconInteractive,
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
        Stack.pop();
        Row.pop();
        this.CartBar.bind(this)();
        Stack.pop();
    }
    CartBar(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/snackdetail/SnackDetail.ets(169:5)", "entry");
            Column.width('100%');
            Column.backgroundColor(getColors().uiBackground);
            Column.position({ x: 0, y: '100%' });
            Column.markAnchor({ x: 0, y: '100%' });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new JetsnackDivider(this, { color: getColors().uiBorder, thickness: 1 }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/snackdetail/SnackDetail.ets", line: 170, col: 7 });
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
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/snackdetail/SnackDetail.ets(171:7)", "entry");
            Row.width('100%');
            Row.padding({ left: 24, right: 24, top: 8, bottom: 8 });
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new QuantitySelector(this, {
                        count: this.quantity,
                        decreaseAction: () => {
                            if (this.quantity > 0) {
                                this.quantity--;
                            }
                        },
                        increaseAction: () => {
                            this.quantity++;
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/snackdetail/SnackDetail.ets", line: 172, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            count: this.quantity,
                            decreaseAction: () => {
                                if (this.quantity > 0) {
                                    this.quantity--;
                                }
                            },
                            increaseAction: () => {
                                this.quantity++;
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        count: this.quantity
                    });
                }
            }, { name: "QuantitySelector" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/snackdetail/SnackDetail.ets(184:9)", "entry");
            Blank.width(16);
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel({ "id": 16777239, "type": 10003, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" });
            Button.debugLine("entry/src/main/ets/snackdetail/SnackDetail.ets(186:9)", "entry");
            Button.type(ButtonType.Normal);
            Button.layoutWeight(1);
            Button.height(48);
            Button.borderRadius(50);
            Button.linearGradient({ angle: 90, colors: toGradient(getColors().interactivePrimary) });
            Button.fontColor(getColors().textInteractive);
            Button.fontSize(14);
            Button.fontWeight(FontWeight.Bold);
        }, Button);
        Button.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

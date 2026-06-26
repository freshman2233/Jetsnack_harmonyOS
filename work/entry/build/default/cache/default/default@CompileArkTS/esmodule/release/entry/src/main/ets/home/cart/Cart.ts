if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CartScreen_Params {
    onSnackClick?: (id: number, origin: string) => void;
    orderLines?: OrderLine[];
    inspiredByCart?: SnackCollection;
    requestCount?: number;
}
import { getColors, toGradient } from "@bundle:com.example.jetsnack/entry/ets/theme/Theme";
import { OrderLine, SnackRepo } from "@bundle:com.example.jetsnack/entry/ets/model/SnackCollection";
import type { SnackCollection } from "@bundle:com.example.jetsnack/entry/ets/model/SnackCollection";
import { SnackImage } from "@bundle:com.example.jetsnack/entry/ets/components/SnackImage";
import { QuantitySelector } from "@bundle:com.example.jetsnack/entry/ets/components/QuantitySelector";
import { SnackCollectionItem } from "@bundle:com.example.jetsnack/entry/ets/components/SnackCollectionItem";
import { DestinationBar } from "@bundle:com.example.jetsnack/entry/ets/home/DestinationBar";
import { JetsnackDivider } from "@bundle:com.example.jetsnack/entry/ets/components/Surface";
import { SnackIcon } from "@bundle:com.example.jetsnack/entry/ets/components/SnackIcon";
import { formatPrice } from "@bundle:com.example.jetsnack/entry/ets/utils/FormatPrice";
import { SnackbarManager } from "@bundle:com.example.jetsnack/entry/ets/model/SnackbarManager";
export class CartScreen extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.onSnackClick = () => { };
        this.__orderLines = new ObservedPropertyObjectPU([], this, "orderLines");
        this.inspiredByCart = SnackRepo.getInspiredByCart();
        this.requestCount = 0;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CartScreen_Params) {
        if (params.onSnackClick !== undefined) {
            this.onSnackClick = params.onSnackClick;
        }
        if (params.orderLines !== undefined) {
            this.orderLines = params.orderLines;
        }
        if (params.inspiredByCart !== undefined) {
            this.inspiredByCart = params.inspiredByCart;
        }
        if (params.requestCount !== undefined) {
            this.requestCount = params.requestCount;
        }
    }
    updateStateVars(params: CartScreen_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__orderLines.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__orderLines.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private onSnackClick: (id: number, origin: string) => void;
    private __orderLines: ObservedPropertyObjectPU<OrderLine[]>;
    get orderLines() {
        return this.__orderLines.get();
    }
    set orderLines(newValue: OrderLine[]) {
        this.__orderLines.set(newValue);
    }
    private inspiredByCart: SnackCollection;
    private requestCount: number;
    aboutToAppear(): void {
        this.orderLines = SnackRepo.getCart();
    }
    private shouldRandomlyFail(): boolean {
        this.requestCount++;
        return this.requestCount % 5 === 0;
    }
    increaseSnackCount(snackId: number): void {
        if (!this.shouldRandomlyFail()) {
            const line = this.orderLines.find((l: OrderLine) => l.snack.id === snackId);
            if (line) {
                this.updateSnackCount(snackId, line.count + 1);
            }
        }
        else {
            SnackbarManager.instance.showMessage('There was an error and the quantity couldn\'t be increased. Please try again.');
        }
    }
    decreaseSnackCount(snackId: number): void {
        if (!this.shouldRandomlyFail()) {
            const line = this.orderLines.find((l: OrderLine) => l.snack.id === snackId);
            if (line) {
                if (line.count === 1) {
                    this.removeSnack(snackId);
                }
                else {
                    this.updateSnackCount(snackId, line.count - 1);
                }
            }
        }
        else {
            SnackbarManager.instance.showMessage('There was an error and the quantity couldn\'t be decreased. Please try again.');
        }
    }
    removeSnack(snackId: number): void {
        this.orderLines = this.orderLines.filter((l: OrderLine) => l.snack.id !== snackId);
    }
    private updateSnackCount(snackId: number, count: number): void {
        this.orderLines = this.orderLines.map((l: OrderLine): OrderLine => {
            if (l.snack.id === snackId) {
                return new OrderLine(l.snack, count);
            }
            return l;
        });
    }
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
                    Text.create(`Order (${this.orderLines.length} ${this.orderLines.length === 1 ? 'item' : 'items'})`);
                    Text.fontSize(20);
                    Text.fontWeight(FontWeight.Bold);
                    Text.fontColor(getColors().brand);
                    Text.maxLines(1);
                    Text.width('100%');
                    Text.height(56);
                    Text.padding({ left: 24, right: 24, top: 4, bottom: 4 });
                }, Text);
                Text.pop();
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            ListItem.pop();
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const line = _item;
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
                        this.CartItem.bind(this)(line);
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.orderLines, forEachItemGenFunction, (line: OrderLine) => line.snack.id.toString(), false, false);
        }, ForEach);
        ForEach.pop();
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
                this.Summary.bind(this)();
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            ListItem.pop();
        }
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
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new SnackCollectionItem(this, {
                                collection: this.inspiredByCart,
                                onSnackClick: (id: number, origin: string) => this.onSnackClick(id, origin),
                                highlight: false
                            }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/home/cart/Cart.ets", line: 98, col: 11 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    collection: this.inspiredByCart,
                                    onSnackClick: (id: number, origin: string) => this.onSnackClick(id, origin),
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
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            ListItem.pop();
        }
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
                    Blank.create();
                    Blank.height(56);
                }, Blank);
                Blank.pop();
                Column.pop();
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            ListItem.pop();
        }
        List.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new DestinationBar(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/home/cart/Cart.ets", line: 115, col: 7 });
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
        this.CheckoutBar.bind(this)();
        Stack.pop();
    }
    CartItem(line: OrderLine, parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.onClick(() => this.onSnackClick(line.snack.id, 'cart'));
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 24, right: 24 });
            Row.alignItems(VerticalAlign.Top);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.margin({ top: 16, bottom: 16 });
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SnackImage(this, {
                        imageRes: line.snack.imageRes,
                        widthValue: 100,
                        heightValue: 100,
                        radiusValue: 50
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/home/cart/Cart.ets", line: 128, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            imageRes: line.snack.imageRes,
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
        __Common__.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
            Column.margin({ left: 16 });
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(line.snack.name);
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(getColors().textSecondary);
            Text.layoutWeight(1);
            Text.margin({ top: 16, right: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.width(40);
            Stack.height(40);
            Stack.margin({ top: 12 });
            Stack.onClick(() => this.removeSnack(line.snack.id));
        }, Stack);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SnackIcon(this, { iconName: 'ic_close', color: getColors().iconSecondary, iconSize: 24 }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/home/cart/Cart.ets", line: 146, col: 15 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            iconName: 'ic_close',
                            color: getColors().iconSecondary,
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
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(line.snack.tagline);
            Text.fontSize(16);
            Text.fontColor(getColors().textHelp);
            Text.margin({ right: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.height(8);
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(formatPrice(line.snack.price));
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(getColors().textPrimary);
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new QuantitySelector(this, {
                        count: line.count,
                        decreaseAction: () => this.decreaseSnackCount(line.snack.id),
                        increaseAction: () => this.increaseSnackCount(line.snack.id)
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/home/cart/Cart.ets", line: 169, col: 13 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            count: line.count,
                            decreaseAction: () => this.decreaseSnackCount(line.snack.id),
                            increaseAction: () => this.increaseSnackCount(line.snack.id)
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        count: line.count
                    });
                }
            }, { name: "QuantitySelector" });
        }
        Row.pop();
        Column.pop();
        Row.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new JetsnackDivider(this, { color: getColors().uiBorder, thickness: 1 }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/home/cart/Cart.ets", line: 186, col: 7 });
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
        Column.pop();
    }
    Summary(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777231, "type": 10003, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" });
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(getColors().brand);
            Text.width('100%');
            Text.height(56);
            Text.padding({ left: 24, right: 24, top: 4, bottom: 4 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 24, right: 24 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777230, "type": 10003, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" });
            Text.fontSize(16);
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(formatPrice(this.subtotal));
            Text.fontSize(16);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 24, right: 24, top: 8, bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777229, "type": 10003, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" });
            Text.fontSize(16);
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(formatPrice(369));
            Text.fontSize(16);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.height(8);
        }, Blank);
        Blank.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new JetsnackDivider(this, { color: getColors().uiBorder, thickness: 1 }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/home/cart/Cart.ets", line: 224, col: 7 });
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
            Row.width('100%');
            Row.padding({ left: 24, right: 24, top: 8, bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777232, "type": 10003, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" });
            Text.fontSize(16);
            Text.layoutWeight(1);
            Text.margin({ right: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(formatPrice(this.subtotal + 369));
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        Row.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new JetsnackDivider(this, { color: getColors().uiBorder, thickness: 1 }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/home/cart/Cart.ets", line: 238, col: 7 });
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
        Column.pop();
    }
    CheckoutBar(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.backgroundColor(getColors().uiBackground);
            Column.position({ x: 0, y: '100%' });
            Column.markAnchor({ x: 0, y: '100%' });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new JetsnackDivider(this, { color: getColors().uiBorder, thickness: 1 }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/home/cart/Cart.ets", line: 246, col: 7 });
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
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.layoutWeight(1);
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel({ "id": 16777223, "type": 10003, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" });
            Button.type(ButtonType.Normal);
            Button.layoutWeight(1);
            Button.height(48);
            Button.borderRadius(0);
            Button.linearGradient({ angle: 90, colors: toGradient(getColors().interactivePrimary) });
            Button.fontColor(getColors().textInteractive);
            Button.fontSize(14);
            Button.fontWeight(FontWeight.Bold);
            Button.margin({ left: 12, right: 12, top: 8, bottom: 8 });
        }, Button);
        Button.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

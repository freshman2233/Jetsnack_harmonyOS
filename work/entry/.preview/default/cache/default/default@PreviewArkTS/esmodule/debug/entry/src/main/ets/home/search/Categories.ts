if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SearchCategories_Params {
    categories?: SearchCategoryCollection[];
}
import { getColors, toGradient } from "@bundle:com.example.jetsnack/entry/ets/theme/Theme";
import type { SearchCategoryCollection, SearchCategory } from '../../model/Search';
import { SnackImage } from "@bundle:com.example.jetsnack/entry/ets/components/SnackImage";
export class SearchCategories extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.categories = [];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SearchCategories_Params) {
        if (params.categories !== undefined) {
            this.categories = params.categories;
        }
    }
    updateStateVars(params: SearchCategories_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private categories: SearchCategoryCollection[];
    initialRender(): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.debugLine("entry/src/main/ets/home/search/Categories.ets(10:5)", "entry");
            List.width('100%');
            List.height('100%');
        }, List);
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
                        ListItem.debugLine("entry/src/main/ets/home/search/Categories.ets(12:9)", "entry");
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.CategoryCollection.bind(this)(collection, index);
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.categories, forEachItemGenFunction, (collection: SearchCategoryCollection) => collection.id.toString(), true, false);
        }, ForEach);
        ForEach.pop();
        List.pop();
    }
    CategoryCollection(collection: SearchCategoryCollection, index: number, parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/home/search/Categories.ets(23:5)", "entry");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(collection.name);
            Text.debugLine("entry/src/main/ets/home/search/Categories.ets(24:7)", "entry");
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(getColors().textPrimary);
            Text.width('100%');
            Text.padding({ left: 24, right: 24, top: 4, bottom: 4 });
            Text.height(56);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Grid.create();
            Grid.debugLine("entry/src/main/ets/home/search/Categories.ets(32:7)", "entry");
            Grid.columnsTemplate('1fr 1fr');
            Grid.columnsGap(0);
            Grid.rowsGap(0);
            Grid.padding({ left: 16, right: 16 });
            Grid.width('100%');
        }, Grid);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const category = _item;
                {
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        GridItem.create(() => { }, false);
                        GridItem.debugLine("entry/src/main/ets/home/search/Categories.ets(34:11)", "entry");
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation2(itemCreation2, GridItem);
                        this.CategoryTile.bind(this)(category, index);
                        GridItem.pop();
                    };
                    observedDeepRender();
                }
            };
            this.forEachUpdateFunction(elmtId, collection.categories, forEachItemGenFunction, (category: SearchCategory) => category.name, false, false);
        }, ForEach);
        ForEach.pop();
        Grid.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/home/search/Categories.ets(45:7)", "entry");
            Blank.height(4);
        }, Blank);
        Blank.pop();
        Column.pop();
    }
    CategoryTile(category: SearchCategory, index: number, parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.Start });
            Stack.debugLine("entry/src/main/ets/home/search/Categories.ets(51:5)", "entry");
            Stack.width('100%');
            Stack.aspectRatio(1.45);
            Stack.borderRadius(10);
            Stack.margin(8);
            Stack.clip(true);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/home/search/Categories.ets(52:7)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.linearGradient({
                angle: 0,
                colors: toGradient(index % 2 === 0 ? getColors().gradient2_2 : getColors().gradient2_3)
            });
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(category.name);
            Text.debugLine("entry/src/main/ets/home/search/Categories.ets(60:7)", "entry");
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(getColors().textSecondary);
            Text.padding({ left: 12, top: 4 });
            Text.width('55%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.position({ x: '55%', y: '50%' });
            __Common__.markAnchor({ x: 0, y: '50%' });
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SnackImage(this, {
                        imageRes: category.imageRes,
                        widthValue: 100,
                        heightValue: 100,
                        radiusValue: 50
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/home/search/Categories.ets", line: 67, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            imageRes: category.imageRes,
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
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

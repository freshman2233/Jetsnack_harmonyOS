if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SearchScreen_Params {
    onSnackClick?: (id: number, origin: string) => void;
    query?: string;
    focused?: boolean;
    searching?: boolean;
    searchResults?: Snack[];
    categories?: SearchCategoryCollection[];
    suggestions?: SearchSuggestionGroup[];
}
import { getColors } from "@bundle:com.example.jetsnack/entry/ets/theme/Theme";
import { SearchRepo } from "@bundle:com.example.jetsnack/entry/ets/model/Search";
import type { SearchCategoryCollection, SearchSuggestionGroup } from "@bundle:com.example.jetsnack/entry/ets/model/Search";
import type { Snack } from '../../model/Snack';
import { SnackIcon } from "@bundle:com.example.jetsnack/entry/ets/components/SnackIcon";
import { JetsnackDivider } from "@bundle:com.example.jetsnack/entry/ets/components/Surface";
import { SearchCategories } from "@bundle:com.example.jetsnack/entry/ets/home/search/Categories";
import { SearchResults } from "@bundle:com.example.jetsnack/entry/ets/home/search/Results";
import { SearchSuggestions } from "@bundle:com.example.jetsnack/entry/ets/home/search/Suggestions";
enum SearchDisplay {
    Categories = 0,
    Suggestions = 1,
    Results = 2,
    NoResults = 3
}
export class SearchScreen extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.onSnackClick = () => { };
        this.__query = new ObservedPropertySimplePU('', this, "query");
        this.__focused = new ObservedPropertySimplePU(false, this, "focused");
        this.__searching = new ObservedPropertySimplePU(false, this, "searching");
        this.__searchResults = new ObservedPropertyObjectPU([], this, "searchResults");
        this.categories = SearchRepo.getCategories();
        this.suggestions = SearchRepo.getSuggestions();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SearchScreen_Params) {
        if (params.onSnackClick !== undefined) {
            this.onSnackClick = params.onSnackClick;
        }
        if (params.query !== undefined) {
            this.query = params.query;
        }
        if (params.focused !== undefined) {
            this.focused = params.focused;
        }
        if (params.searching !== undefined) {
            this.searching = params.searching;
        }
        if (params.searchResults !== undefined) {
            this.searchResults = params.searchResults;
        }
        if (params.categories !== undefined) {
            this.categories = params.categories;
        }
        if (params.suggestions !== undefined) {
            this.suggestions = params.suggestions;
        }
    }
    updateStateVars(params: SearchScreen_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__query.purgeDependencyOnElmtId(rmElmtId);
        this.__focused.purgeDependencyOnElmtId(rmElmtId);
        this.__searching.purgeDependencyOnElmtId(rmElmtId);
        this.__searchResults.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__query.aboutToBeDeleted();
        this.__focused.aboutToBeDeleted();
        this.__searching.aboutToBeDeleted();
        this.__searchResults.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private onSnackClick: (id: number, origin: string) => void;
    private __query: ObservedPropertySimplePU<string>;
    get query() {
        return this.__query.get();
    }
    set query(newValue: string) {
        this.__query.set(newValue);
    }
    private __focused: ObservedPropertySimplePU<boolean>;
    get focused() {
        return this.__focused.get();
    }
    set focused(newValue: boolean) {
        this.__focused.set(newValue);
    }
    private __searching: ObservedPropertySimplePU<boolean>;
    get searching() {
        return this.__searching.get();
    }
    set searching(newValue: boolean) {
        this.__searching.set(newValue);
    }
    private __searchResults: ObservedPropertyObjectPU<Snack[]>;
    get searchResults() {
        return this.__searchResults.get();
    }
    set searchResults(newValue: Snack[]) {
        this.__searchResults.set(newValue);
    }
    private categories: SearchCategoryCollection[];
    private suggestions: SearchSuggestionGroup[];
    private doSearch(): void {
        this.searching = true;
        setTimeout(() => {
            this.searchResults = SearchRepo.search(this.query);
            this.searching = false;
        }, 200);
    }
    initialRender(): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor(getColors().uiBackground);
            Column.padding({ top: 36 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(56);
            Row.padding({ left: 24, right: 24, top: 8, bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.focused) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.onClick(() => {
                            this.query = '';
                            this.focused = false;
                        });
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new SnackIcon(this, {
                                    iconName: 'ic_arrow_back',
                                    color: getColors().iconPrimary,
                                    iconSize: 24
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/home/search/Search.ets", line: 52, col: 11 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        iconName: 'ic_arrow_back',
                                        color: getColors().iconPrimary,
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
                    __Common__.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: this.query, placeholder: 'Search Jetsnack' });
            TextInput.layoutWeight(1);
            TextInput.backgroundColor(getColors().uiFloated);
            TextInput.borderRadius(50);
            TextInput.height(40);
            TextInput.onFocus(() => {
                this.focused = true;
            });
            TextInput.onChange((value: string) => {
                this.query = value;
                if (value.length > 0) {
                    this.doSearch();
                }
                else {
                    this.searchResults = [];
                }
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.searching) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        LoadingProgress.create();
                        LoadingProgress.width(36);
                        LoadingProgress.height(36);
                        LoadingProgress.color(getColors().iconPrimary);
                        LoadingProgress.margin({ left: 6, right: 6 });
                    }, LoadingProgress);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Blank.create();
                        Blank.width(48);
                    }, Blank);
                    Blank.pop();
                });
            }
        }, If);
        If.pop();
        Row.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new JetsnackDivider(this, { color: getColors().uiBorder, thickness: 1 }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/home/search/Search.ets", line: 94, col: 7 });
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
            If.create();
            if (this.display === SearchDisplay.Categories) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new SearchCategories(this, { categories: this.categories }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/home/search/Search.ets", line: 97, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        categories: this.categories
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "SearchCategories" });
                    }
                });
            }
            else if (this.display === SearchDisplay.Suggestions) {
                this.ifElseBranchUpdateFunction(1, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new SearchSuggestions(this, {
                                    suggestions: this.suggestions,
                                    onSuggestionSelect: (suggestion: string) => {
                                        this.query = suggestion;
                                        this.doSearch();
                                    }
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/home/search/Search.ets", line: 99, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        suggestions: this.suggestions,
                                        onSuggestionSelect: (suggestion: string) => {
                                            this.query = suggestion;
                                            this.doSearch();
                                        }
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "SearchSuggestions" });
                    }
                });
            }
            else if (this.display === SearchDisplay.Results) {
                this.ifElseBranchUpdateFunction(2, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new SearchResults(this, {
                                    searchResults: this.searchResults,
                                    onSnackClick: (id: number, origin: string) => this.onSnackClick(id, origin)
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/home/search/Search.ets", line: 107, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        searchResults: this.searchResults,
                                        onSnackClick: (id: number, origin: string) => this.onSnackClick(id, origin)
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "SearchResults" });
                    }
                });
            }
            else {
                this.ifElseBranchUpdateFunction(3, () => {
                    this.NoResultsView.bind(this)();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    NoResultsView(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.justifyContent(FlexAlign.Center);
            Column.alignItems(HorizontalAlign.Center);
            Column.padding(24);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777302, "type": 20000, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" });
            Image.width(200);
            Image.height(105);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`No matches for "${this.query}"`);
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor(getColors().textSecondary);
            Text.textAlign(TextAlign.Center);
            Text.margin({ top: 24 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777264, "type": 10003, params: [], "bundleName": "com.example.jetsnack", "moduleName": "entry" });
            Text.fontSize(14);
            Text.fontColor(getColors().textSecondary);
            Text.textAlign(TextAlign.Center);
            Text.margin({ top: 16 });
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

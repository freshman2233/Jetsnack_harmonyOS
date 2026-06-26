if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface FilterChip_Params {
    filter?: Filter;
    onToggle?: (name: string, enabled: boolean) => void;
    selected?: boolean;
    radius?: number;
}
import { getColors } from "@bundle:com.example.jetsnack/entry/ets/theme/Theme";
import { Filter } from "@bundle:com.example.jetsnack/entry/ets/model/Filter";
export class FilterChip extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.filter = new Filter('');
        this.onToggle = () => { };
        this.__selected = new ObservedPropertySimplePU(false, this, "selected");
        this.radius = 50;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: FilterChip_Params) {
        if (params.filter !== undefined) {
            this.filter = params.filter;
        }
        if (params.onToggle !== undefined) {
            this.onToggle = params.onToggle;
        }
        if (params.selected !== undefined) {
            this.selected = params.selected;
        }
        if (params.radius !== undefined) {
            this.radius = params.radius;
        }
    }
    updateStateVars(params: FilterChip_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__selected.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__selected.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private filter: Filter;
    private onToggle: (name: string, enabled: boolean) => void;
    private __selected: ObservedPropertySimplePU<boolean>;
    get selected() {
        return this.__selected.get();
    }
    set selected(newValue: boolean) {
        this.__selected.set(newValue);
    }
    private radius: number;
    aboutToAppear(): void {
        this.selected = this.filter.enabled;
    }
    initialRender(): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.filter.name);
            Text.debugLine("entry/src/main/ets/components/FilterChip.ets(16:5)", "entry");
            Text.fontSize(12);
            Text.fontColor(this.selected ? '#FF000000' : getColors().textSecondary);
            Text.maxLines(1);
            Text.padding({ left: 20, right: 20, top: 6, bottom: 6 });
            Text.borderRadius(this.radius);
            Text.backgroundColor(this.selected ? getColors().brandSecondary : getColors().uiBackground);
            Text.border({ width: 1, color: this.selected ? getColors().brandSecondary : getColors().brandSecondary });
            Text.margin({ right: 4, bottom: 8 });
            Text.onClick(() => {
                this.selected = !this.selected;
                this.onToggle(this.filter.name, this.selected);
            });
        }, Text);
        Text.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

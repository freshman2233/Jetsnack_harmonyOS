if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SnackIcon_Params {
    iconName?: string;
    color?: string;
    iconSize?: number;
}
export class SnackIcon extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__iconName = new SynchedPropertySimpleOneWayPU(params.iconName, this, "iconName");
        this.color = '#FFFFFFFF';
        this.iconSize = 24;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SnackIcon_Params) {
        if (params.color !== undefined) {
            this.color = params.color;
        }
        if (params.iconSize !== undefined) {
            this.iconSize = params.iconSize;
        }
    }
    updateStateVars(params: SnackIcon_Params) {
        this.__iconName.reset(params.iconName);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__iconName.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__iconName.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __iconName: SynchedPropertySimpleOneWayPU<string>;
    get iconName() {
        return this.__iconName.get();
    }
    set iconName(newValue: string) {
        this.__iconName.set(newValue);
    }
    private color: string;
    private iconSize: number;
    initialRender(): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.iconName === 'ic_home') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildPath.bind(this)('M240,760L360,760L360,520L600,520L600,760L720,760L720,400L480,220L240,400L240,760ZM160,840L160,360L480,120L800,360L800,840L520,840L520,600L440,600L440,840L160,840Z', 960, 960);
                });
            }
            else if (this.iconName === 'ic_search') {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.buildPath.bind(this)('M784,840L532,588Q502,612 463,626Q424,640 380,640Q271,640 195.5,564.5Q120,489 120,380Q120,271 195.5,195.5Q271,120 380,120Q489,120 564.5,195.5Q640,271 640,380Q640,424 626,463Q612,502 588,532L840,784L784,840ZM380,560Q455,560 507.5,507.5Q560,455 560,380Q560,305 507.5,252.5Q455,200 380,200Q305,200 252.5,252.5Q200,305 200,380Q200,455 252.5,507.5Q305,560 380,560Z', 960, 960);
                });
            }
            else if (this.iconName === 'ic_shopping_cart') {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.buildPath.bind(this)('M280,880Q247,880 223.5,856.5Q200,833 200,800Q200,767 223.5,743.5Q247,720 280,720Q313,720 336.5,743.5Q360,767 360,800Q360,833 336.5,856.5Q313,880 280,880ZM680,880Q647,880 623.5,856.5Q600,833 600,800Q600,767 623.5,743.5Q647,720 680,720Q713,720 736.5,743.5Q760,767 760,800Q760,833 736.5,856.5Q713,880 680,880ZM246,240L342,440L622,440L732,240L246,240ZM208,160L798,160Q821,160 833,180.5Q845,201 834,222L692,478Q681,498 662.5,509Q644,520 622,520L324,520L280,600L760,600L760,680L280,680Q235,680 212,640.5Q189,601 210,562L264,464L120,160L40,160L40,80L170,80L208,160Z', 960, 960);
                });
            }
            else if (this.iconName === 'ic_account_circle') {
                this.ifElseBranchUpdateFunction(3, () => {
                    this.buildPath.bind(this)('M234,684Q285,645 348,622.5Q411,600 480,600Q549,600 612,622.5Q675,645 726,684Q761,643 780.5,591Q800,539 800,480Q800,347 706.5,253.5Q613,160 480,160Q347,160 253.5,253.5Q160,347 160,480Q160,539 179.5,591Q199,643 234,684ZM480,520Q421,520 380.5,479.5Q340,439 340,380Q340,321 380.5,280.5Q421,240 480,240Q539,240 579.5,280.5Q620,321 620,380Q620,439 579.5,479.5Q539,520 480,520ZM480,880Q397,880 324,848.5Q251,817 197,763Q143,709 111.5,636Q80,563 80,480Q80,397 111.5,324Q143,251 197,197Q251,143 324,111.5Q397,80 480,80Q563,80 636,111.5Q709,143 763,197Q817,251 848.5,324Q880,397 880,480Q880,563 848.5,636Q817,709 763,763Q709,817 636,848.5Q563,880 480,880ZM480,800Q533,800 580,784.5Q627,769 666,740Q627,711 580,695.5Q533,680 480,680Q427,680 380,695.5Q333,711 294,740Q333,769 380,784.5Q427,800 480,800ZM480,440Q506,440 523,423Q540,406 540,380Q540,354 523,337Q506,320 480,320Q454,320 437,337Q420,354 420,380Q420,406 437,423Q454,440 480,440Z', 960, 960);
                });
            }
            else if (this.iconName === 'ic_close') {
                this.ifElseBranchUpdateFunction(4, () => {
                    this.buildPath.bind(this)('M256,760L200,704L424,480L200,256L256,200L480,424L704,200L760,256L536,480L760,704L704,760L480,536L256,760Z', 960, 960);
                });
            }
            else if (this.iconName === 'ic_check') {
                this.ifElseBranchUpdateFunction(5, () => {
                    this.buildPath.bind(this)('M382,720L154,492L211,435L382,606L749,239L806,296L382,720Z', 960, 960);
                });
            }
            else if (this.iconName === 'ic_arrow_back') {
                this.ifElseBranchUpdateFunction(6, () => {
                    this.buildPath.bind(this)('M20,11H7.83l5.59,-5.59L12,4l-8,8 8,8 1.41,-1.41L7.83,13H20v-2z', 24, 24);
                });
            }
            else if (this.iconName === 'ic_add') {
                this.ifElseBranchUpdateFunction(7, () => {
                    this.buildPath.bind(this)('M440,520L200,520L200,440L440,440L440,200L520,200L520,440L760,440L760,520L520,520L520,760L440,760L440,520Z', 960, 960);
                });
            }
            else if (this.iconName === 'ic_remove') {
                this.ifElseBranchUpdateFunction(8, () => {
                    this.buildPath.bind(this)('M200,520L200,440L760,440L760,520L200,520Z', 960, 960);
                });
            }
            else if (this.iconName === 'ic_expand_more') {
                this.ifElseBranchUpdateFunction(9, () => {
                    this.buildPath.bind(this)('M480,616L240,376L296,320L480,504L664,320L720,376L480,616Z', 960, 960);
                });
            }
            else if (this.iconName === 'ic_delete_forever') {
                this.ifElseBranchUpdateFunction(10, () => {
                    this.buildPath.bind(this)('M376,660L480,556L584,660L640,604L536,500L640,396L584,340L480,444L376,340L320,396L424,500L320,604L376,660ZM280,840Q247,840 223.5,816.5Q200,793 200,760L200,240L160,240L160,160L360,160L360,120L600,120L600,160L800,160L800,240L760,240L760,760Q760,793 736.5,816.5Q713,840 680,840L280,840Z', 960, 960);
                });
            }
            else if (this.iconName === 'ic_star') {
                this.ifElseBranchUpdateFunction(11, () => {
                    this.buildPath.bind(this)('M233,840L298,559L80,370L368,345L480,80L592,345L880,370L662,559L727,840L480,691L233,840Z', 960, 960);
                });
            }
            else if (this.iconName === 'ic_sort_by_alpha') {
                this.ifElseBranchUpdateFunction(12, () => {
                    this.buildPath.bind(this)('M80,680L230,280L316,280L466,680L384,680L350,584L196,584L164,680L80,680ZM220,516L324,516L276,366L270,366L220,516ZM548,680L548,604L750,352L556,352L556,280L838,280L838,356L638,608L840,608L840,680L548,680ZM360,200L480,80L600,200L360,200ZM480,880L360,760L600,760L480,880Z', 960, 960);
                });
            }
            else if (this.iconName === 'ic_android') {
                this.ifElseBranchUpdateFunction(13, () => {
                    this.buildPath.bind(this)('M40,720Q49,613 105.5,523Q162,433 256,380L182,252Q176,243 179,233Q182,223 192,218Q200,213 210,216Q220,219 226,228L300,356Q386,320 480,320Q574,320 660,356L734,228Q740,219 750,216Q760,213 768,218Q778,223 781,233Q784,243 778,252L704,380Q798,433 854.5,523Q911,613 920,720L40,720ZM280,610Q301,610 315.5,595.5Q330,581 330,560Q330,539 315.5,524.5Q301,510 280,510Q259,510 244.5,524.5Q230,539 230,560Q230,581 244.5,595.5Q259,610 280,610ZM680,610Q701,610 715.5,595.5Q730,581 730,560Q730,539 715.5,524.5Q701,510 680,510Q659,510 644.5,524.5Q630,539 630,560Q630,581 644.5,595.5Q659,610 680,610Z', 960, 960);
                });
            }
            else if (this.iconName === 'ic_filter_list') {
                this.ifElseBranchUpdateFunction(14, () => {
                    this.buildPath.bind(this)('M440,720Q423,720 411.5,708.5Q400,697 400,680Q400,663 411.5,651.5Q423,640 440,640L520,640Q537,640 548.5,651.5Q560,663 560,680Q560,697 548.5,708.5Q537,720 520,720L440,720ZM280,520Q263,520 251.5,508.5Q240,497 240,480Q240,463 251.5,451.5Q263,440 280,440L680,440Q697,440 708.5,451.5Q720,463 720,480Q720,497 708.5,508.5Q697,520 680,520L280,520ZM160,320Q143,320 131.5,308.5Q120,297 120,280Q120,263 131.5,251.5Q143,240 160,240L800,240Q817,240 828.5,251.5Q840,263 840,280Q840,297 828.5,308.5Q817,320 800,320L160,320Z', 960, 960);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(15, () => {
                });
            }
        }, If);
        If.pop();
    }
    buildPath(pathData: string, vw: number, vh: number, parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Shape.create();
            Shape.width(this.iconSize);
            Shape.height(this.iconSize);
            Shape.viewPort({ x: 0, y: 0, width: vw, height: vh });
        }, Shape);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Path.create();
            Path.commands(pathData);
            Path.fillOpacity(1);
            Path.fill(this.color);
        }, Path);
        Shape.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

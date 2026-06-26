import { JetsnackColor } from "@bundle:com.example.jetsnack/entry/ets/theme/Colors";
export class JetsnackColors {
    brand: string;
    brandSecondary: string;
    uiBackground: string;
    uiBorder: string;
    uiFloated: string;
    textPrimary: string;
    textSecondary: string;
    textHelp: string;
    textInteractive: string;
    textLink: string;
    iconPrimary: string;
    iconSecondary: string;
    iconInteractive: string;
    iconInteractiveInactive: string;
    error: string;
    notificationBadge: string;
    isDark: boolean;
    gradient6_1: string[];
    gradient6_2: string[];
    gradient3_1: string[];
    gradient3_2: string[];
    gradient2_1: string[];
    gradient2_2: string[];
    gradient2_3: string[];
    tornado1: string[];
    interactivePrimary: string[];
    interactiveSecondary: string[];
    interactiveMask: string[];
    constructor() {
        this.brand = JetsnackColor.Shadow5;
        this.brandSecondary = JetsnackColor.Ocean3;
        this.uiBackground = JetsnackColor.Neutral0;
        this.uiBorder = JetsnackColor.Neutral4;
        this.uiFloated = JetsnackColor.FunctionalGrey;
        this.textPrimary = JetsnackColor.Shadow5;
        this.textSecondary = JetsnackColor.Neutral7;
        this.textHelp = JetsnackColor.Neutral6;
        this.textInteractive = JetsnackColor.Neutral0;
        this.textLink = JetsnackColor.Ocean11;
        this.iconPrimary = JetsnackColor.Shadow5;
        this.iconSecondary = JetsnackColor.Neutral7;
        this.iconInteractive = JetsnackColor.Neutral0;
        this.iconInteractiveInactive = JetsnackColor.Neutral1;
        this.error = JetsnackColor.FunctionalRed;
        this.notificationBadge = JetsnackColor.FunctionalRed;
        this.isDark = false;
        this.gradient6_1 = [JetsnackColor.Shadow4, JetsnackColor.Ocean3, JetsnackColor.Shadow2,
            JetsnackColor.Ocean3, JetsnackColor.Shadow4];
        this.gradient6_2 = [JetsnackColor.Rose4, JetsnackColor.Lavender3, JetsnackColor.Rose2,
            JetsnackColor.Lavender3, JetsnackColor.Rose4];
        this.gradient3_1 = [JetsnackColor.Shadow2, JetsnackColor.Ocean3, JetsnackColor.Shadow4];
        this.gradient3_2 = [JetsnackColor.Rose2, JetsnackColor.Lavender3, JetsnackColor.Rose4];
        this.gradient2_1 = [JetsnackColor.Shadow4, JetsnackColor.Shadow11];
        this.gradient2_2 = [JetsnackColor.Ocean3, JetsnackColor.Shadow3];
        this.gradient2_3 = [JetsnackColor.Lavender3, JetsnackColor.Rose2];
        this.tornado1 = [JetsnackColor.Shadow4, JetsnackColor.Ocean3];
        this.interactivePrimary = this.gradient2_1;
        this.interactiveSecondary = this.gradient2_2;
        this.interactiveMask = this.gradient6_1;
    }
}
let _instance: JetsnackColors | null = null;
export function getColors(): JetsnackColors {
    if (!_instance) {
        _instance = new JetsnackColors();
    }
    return _instance;
}
export function toGradient(colors: string[]): Array<[
    ResourceColor,
    number
]> {
    const result: Array<[
        ResourceColor,
        number
    ]> = [];
    const n = colors.length;
    for (let i = 0; i < n; i++) {
        result.push([colors[i], n === 1 ? 0 : i / (n - 1)]);
    }
    return result;
}

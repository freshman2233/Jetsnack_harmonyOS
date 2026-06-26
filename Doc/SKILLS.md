# SKILLS: Android Jetsnack → HarmonyOS (ArkUI/ArkTS) 转换技能

> 本文档记录将 Android Jetpack Compose 应用 Jetsnack 完整迁移到鸿蒙 HarmonyOS (ArkUI/ArkTS) 平台所需的全部技术知识。基座模型为 GLM-4.7，仅输入安卓项目即可完成转换。

---

## 1. 环境要求

| 工具 | 验证命令 | 期望输出 |
|------|---------|---------|
| Node.js | `node --version` | v18.20.1+ |
| ohpm | `ohpm --version` | 6.1+ |
| hvigorw | `hvigorw --version` | 6.24.2 |
| DevEco SDK | 检查环境变量 `DEVECO_SDK_HOME` | 指向 sdk 目录 |
| SDK API | 读取 `sdk-pkg.json` 或 `oh-uni-package.json` | apiVersion: 24, version: 6.1.1.125 |

### SDK 路径探测

```
DEVECO_SDK_HOME = D:/Software/Huawei/DevEcoStudio/sdk
hvigor 根目录  = D:/Software/Huawei/DevEcoStudio/tools/hvigor
hvigorw 路径    = D:/Software/Huawei/DevEcoStudio/tools/hvigor/bin/hvigorw.bat
插件路径        = D:/Software/Huawei/DevEcoStudio/tools/hvigor/hvigor-ohos-plugin
```

### API → 平台版本映射表

从 `hos-config.json` 的 `osVersionMapper` 读取（路径：`hvigor-ohos-plugin/node_modules/@ohos/hos-sdkmanager-common/build/res/hos-config.json`）：

```
"6.1.1": "24"    "6.1.0": "23"    "6.0.2": "22"    "6.0.1": "21"
"6.0.0": "20"    "5.1.1": "19"    "5.1.0": "18"    "5.0.5": "17"
"5.0.4": "16"    "5.0.3": "15"    "5.0.2": "14"    "5.0.1": "13"
"5.0.0": "12"    "4.1.0": "11"    "4.0.0": "10"
```

**关键**：`compatibleSdkVersion` 中的平台版本必须与 API 版本匹配。API 24 → `"6.1.1(24)"`。

---

## 2. 输出项目结构

```
work/
├── AppScope/
│   ├── app.json5                          # 应用配置
│   └── resources/base/
│       ├── element/string.json            # 应用级字符串
│       └── media/app_icon.png            # 应用图标（从 Android mipmap 复制）
├── entry/
│   ├── src/main/
│   │   ├── ets/
│   │   │   ├── entryability/EntryAbility.ets
│   │   │   ├── pages/Index.ets           # 主页面（导航容器）
│   │   │   ├── theme/{Colors,Theme}.ets
│   │   │   ├── model/{Snack,SnackCollection,Filter,Search,SnackbarManager}.ets
│   │   │   ├── utils/FormatPrice.ets
│   │   │   ├── components/*.ets           # 11个组件文件
│   │   │   ├── home/{Feed,FilterScreen,DestinationBar,Profile,BottomBar}.ets
│   │   │   ├── home/search/{Search,Categories,Results,Suggestions}.ets
│   │   │   ├── home/cart/Cart.ets
│   │   │   └── snackdetail/SnackDetail.ets
│   │   ├── resources/
│   │   │   ├── base/media/*.jpg           # 36张零食图片
│   │   │   ├── base/element/{string,color}.json
│   │   │   ├── base/profile/main_pages.json
│   │   │   └── rawfile/fonts/*.ttf        # 6个字体文件
│   │   └── module.json5
│   ├── build-profile.json5
│   ├── hvigorfile.ts
│   └── oh-package.json5
├── hvigor/hvigor-config.json5
├── build-profile.json5
├── hvigorfile.ts
├── oh-package.json5
├── hvigorw.bat
├── node_modules/@ohos/hvigor-ohos-plugin  # → DevEco插件目录的junction链接
└── INSTRUCTION.md
```

---

## 3. 构建配置文件（精确内容）

### 3.1 根 `build-profile.json5`

```json5
{
  "app": {
    "signingConfigs": [],
    "products": [
      {
        "name": "default",
        "signingConfig": "default",
        "compatibleSdkVersion": "6.1.1(24)",
        "runtimeOS": "HarmonyOS"
      }
    ],
    "buildModeSet": [
      { "name": "debug" },
      { "name": "release" }
    ]
  },
  "modules": [
    {
      "name": "entry",
      "srcPath": "./entry",
      "targets": [
        { "name": "default", "applyToProducts": ["default"] }
      ]
    }
  ]
}
```

### 3.2 根 `oh-package.json5`

```json5
{
  "modelVersion": "5.0.0",
  "dependencies": {},
  "devDependencies": {}
}
```

### 3.3 根 `hvigorfile.ts`

```ts
export { appTasks } from '@ohos/hvigor-ohos-plugin';
```

### 3.4 `hvigor/hvigor-config.json5`

```json5
{
  "modelVersion": "5.0.0",
  "dependencies": {
    "@ohos/hvigor-ohos-plugin": "file://D:/Software/Huawei/DevEcoStudio/tools/hvigor/hvigor-ohos-plugin"
  }
}
```

> **注意**：`hvigor-config.json5` 只允许以下属性：`modelVersion`, `dependencies`, `execution`, `logging`, `debugging`, `nodeOptions`, `javaOptions`, `parameterFile`, `properties`。不允放 `hvigorVersion`、`daemon`、`executionParallelism` 等。

### 3.5 `node_modules` junction 创建（关键步骤）

`@ohos/hvigor-ohos-plugin` 不在 ohpm 公共仓库上，必须创建 junction 指向 DevEco Studio 自带插件：

```powershell
New-Item -ItemType Directory -Force -Path "work\node_modules\@ohos" | Out-Null
cmd /c mklink /J "work\node_modules\@ohos\hvigor-ohos-plugin" "D:\Software\Huawei\DevEcoStudio\tools\hvigor\hvigor-ohos-plugin"
```

### 3.6 `AppScope/app.json5`

```json5
{
  "app": {
    "bundleName": "com.example.jetsnack",
    "vendor": "jetsnack",
    "versionCode": 1,
    "versionName": "1.0.0",
    "label": "$string:app_name",
    "icon": "$media:app_icon",
    "minAPIVersion": 12
  }
}
```

> **注意**：`app.json5` 必须是纯 JSON5，不能有 `export default`。`label` 必须匹配正则 `^[$]string:...`，不能直接写字符串。

### 3.7 `AppScope/resources/base/element/string.json`

```json
{
  "string": [
    { "name": "app_name", "value": "Jetsnack" }
  ]
}
```

### 3.8 `entry/src/main/module.json5`

```json5
{
  "module": {
    "name": "entry",
    "type": "entry",
    "description": "$string:module_desc",
    "mainElement": "EntryAbility",
    "deviceTypes": ["phone", "tablet"],
    "deliveryWithInstall": true,
    "installationFree": false,
    "pages": "$profile:main_pages",
    "abilities": [
      {
        "name": "EntryAbility",
        "srcEntry": "./ets/entryability/EntryAbility.ets",
        "description": "$string:EntryAbility_desc",
        "label": "$string:EntryAbility_label",
        "startWindowIcon": "$media:app_icon",
        "startWindowBackground": "$color:start_window_background",
        "icon": "$media:app_icon",
        "skills": [
          { "entities": ["entity.system.home"], "actions": ["action.system.home"] }
        ]
      }
    ]
  }
}
```

> **注意**：ability 中不能有 `labelEn` 属性（会报 propertyNames 错误）。

### 3.9 `entry/build-profile.json5`

```json5
{
  "apiType": "stageMode",
  "buildOption": {},
  "buildOptionSet": [
    {
      "name": "release",
      "arkOptions": {
        "obfuscation": { "ruleOptions": { "enable": false } }
      }
    }
  ],
  "targets": [
    { "name": "default", "runtimeOS": "HarmonyOS" }
  ]
}
```

> **注意**：debug 的 `arkOptions` 不能包含 `externalNativeOptions`（会报 propertyNames 错误）。targets 中不要加 `ohosTest`（没有测试文件会报错）。

### 3.10 `entry/hvigorfile.ts`

```ts
export { hapTasks } from '@ohos/hvigor-ohos-plugin';
```

### 3.11 `entry/oh-package.json5`

```json5
{
  "name": "entry",
  "version": "1.0.0",
  "description": "Jetsnack entry module",
  "main": "",
  "author": "",
  "license": "Apache-2.0",
  "dependencies": {}
}
```

### 3.12 `resources/base/profile/main_pages.json`

```json
{
  "src": ["pages/Index"]
}
```

> **注意**：页面路径不要带 `.ets` 后缀，否则编译器找 `Index.ets.ets`。

### 3.13 `resources/base/element/color.json`

```json
{
  "color": [
    { "name": "start_window_background", "value": "#FFFFFFFF" }
  ]
}
```

### 3.14 `resources/base/element/string.json`

将 Android `values/strings.xml` 的所有 `<string name="xxx">value</string>` 转为：

```json
{
  "string": [
    { "name": "xxx", "value": "value" },
    ...
  ]
}
```

> **注意**：`%1s` → `%s`，`%1d` → `%d`，`&amp;` → `&`，`\'` → `'`。 plurals 需要拆成 `xxx_one` / `xxx_other`。

---

## 4. 资源迁移

### 4.1 图片

```
源:   Jetsnack/app/src/main/res/drawable-nodpi/*.jpg
目标: work/entry/src/main/resources/base/media/
```

直接复制。HarmonyOS media 文件名规则：小写字母、数字、下划线，必须以字母开头。Jetsnack 的文件名已符合。

### 4.2 字体

```
源:   Jetsnack/app/src/main/res/font/*.ttf
目标: work/entry/src/main/resources/rawfile/fonts/
```

### 4.3 应用图标

```
源:   Jetsnack/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png
目标: work/AppScope/resources/base/media/app_icon.png
```

### 4.4 矢量图标（VectorDrawable → ArkUI Path）

Android 的 `drawable/*.xml` 中的 `<vector>` 包含 `pathData`，格式与 SVG path 的 `d` 属性相同。ArkUI 的 `Path` 组件的 `.commands()` 接受相同格式。

**转换方法**：

1. 读取 `drawable/ic_xxx.xml`
2. 提取 `android:viewportWidth`、`android:viewportHeight`、`android:pathData`
3. 创建 ArkUI `Shape` + `Path` 组件：

```typescript
@Builder
buildPath(pathData: string, vw: number, vh: number): void {
  Shape() {
    Path()
      .commands(pathData)
      .fillOpacity(1)
      .fill(this.color)            // 注意：用 .fill() 不是 .fillColor()
  }
  .width(this.iconSize)
  .height(this.iconSize)
  .viewPort({ x: 0, y: 0, width: vw, height: vh })  // 注意：viewPort 大写P，参数是对象
}
```

**所有图标及其 pathData**（viewport 960×960 除非特别注明）：

| 图标名 | viewport | pathData（截取，完整见源文件） |
|--------|----------|------|
| ic_home | 960×960 | `M240,760L360,760L360,520L600,520...` |
| ic_search | 960×960 | `M784,840L532,588Q502,612 463,626...` |
| ic_shopping_cart | 960×960 | `M280,880Q247,880 223.5,856.5...` |
| ic_account_circle | 960×960 | `M234,684Q285,645 348,622.5...` |
| ic_close | 960×960 | `M256,760L200,704L424,480L200,256...` |
| ic_check | 960×960 | `M382,720L154,492L211,435L382,606...` |
| ic_arrow_back | 24×24 | `M20,11H7.83l5.59,-5.59L12,4l-8,8 8,8 1.41,-1.41L7.83,13H20v-2z` |
| ic_add | 960×960 | `M440,520L200,520L200,440L440,440...` |
| ic_remove | 960×960 | `M200,520L200,440L760,440L760,520L200,520Z` |
| ic_expand_more | 960×960 | `M480,616L240,376L296,320L480,504L664,320L720,376L480,616Z` |
| ic_delete_forever | 960×960 | `M376,660L480,556L584,660L640,604...` |
| ic_star | 960×960 | `M233,840L298,559L80,370L368,345...` |
| ic_sort_by_alpha | 960×960 | `M80,680L230,280L316,280L466,680...` |
| ic_android | 960×960 | `M40,720Q49,613 105.5,523...` |
| ic_filter_list | 960×960 | `M440,720Q423,720 411.5,708.5...` |
| empty_state_search | 341×179 | 多路径复杂图标，可用 placeholder.jpg 替代 |

---

## 5. 代码转换规则

### 5.1 颜色系统

**Android (Kotlin)**：
```kotlin
val Shadow5 = Color(0xff4b30ed)
```

**HarmonyOS (ArkTS)**：
```typescript
static readonly Shadow5: string = '#FF4B30ED';  // ARGB → #AARRGGBB
```

**带 alpha 的颜色**：
```kotlin
val Neutral7 = Color(0xde000000)  // → '#DE000000'
val Neutral4 = Color(0x1f000000)  // → '#1F000000'
```

### 5.2 主题系统

Android 用 `CompositionLocal` + `JetsnackTheme.colors`。HarmonyOS 用全局单例：

```typescript
export class JetsnackColors {
  brand: string;
  brandSecondary: string;
  uiBackground: string;
  // ... 所有颜色字段
  gradient6_1: string[];  // 渐变色数组
  // ...
}

let _instance: JetsnackColors | null = null;
export function getColors(): JetsnackColors {
  if (!_instance) { _instance = new JetsnackColors(); }
  return _instance;
}
```

### 5.3 渐变辅助函数

ArkUI 的 `linearGradient` 的 `colors` 参数需要 `Array<[ResourceColor, number]>`（颜色+位置元组），不能直接传 `string[]`。需要辅助函数：

```typescript
export function toGradient(colors: string[]): Array<[ResourceColor, number]> {
  const result: Array<[ResourceColor, number]> = [];
  const n = colors.length;
  for (let i = 0; i < n; i++) {
    result.push([colors[i], n === 1 ? 0 : i / (n - 1)]);
  }
  return result;
}
```

使用：`.linearGradient({ angle: 90, colors: toGradient(getColors().interactivePrimary) })`

### 5.4 组件映射总表

| Android (Jetpack Compose) | HarmonyOS (ArkUI / ArkTS) |
|---------------------------|---------------------------|
| `@Composable fun Foo()` | `@Component struct Foo { build() {} }` |
| `Modifier.xxx()` | 链式属性 `.xxx()` |
| `Box` | `Stack` |
| `Column` / `Row` | `Column` / `Row` |
| `LazyColumn` | `List` (默认垂直) |
| `LazyRow` | `List().listDirection(Axis.Horizontal)` |
| `Spacer(Modifier.height(x))` | `Blank().height(x)`（仅限 Row/Column/Flex 内） |
| `Text` | `Text` |
| `Image(painterResource(id))` | `Image($r('app.media.xxx'))` |
| `Icon(painterResource(id))` | 自定义 `SnackIcon` 组件（Path 渲染） |
| `Button(onClick) { content }` | `Button() { content }.onClick(() => {})` |
| `IconButton(onClick) { Icon(...) }` | `Stack() { SnackIcon(...) }.onClick(() => {})` |
| `Slider(value, onValueChange)` | `Slider({ value, onChange })` |
| `CircularProgressIndicator` | `LoadingProgress()` |
| `TopAppBar` | 手动用 `Row` + `Text` 构建 |
| `Scaffold` | 手动用 `Stack` + `Column` 构建 |
| `Brush.horizontalGradient(colors)` | `.linearGradient({ angle: 90, colors: toGradient(colors) })` |
| `Modifier.clickable { }` | `.onClick(() => {})` |
| `Modifier.clip(RoundedCornerShape(x))` | `.borderRadius(x).clip(true)` |
| `Modifier.background(color)` | `.backgroundColor(color)` |
| `Modifier.padding(x)` | `.padding(x)` |
| `Modifier.fillMaxSize()` | `.width('100%').height('100%')` |
| `Modifier.fillMaxWidth()` | `.width('100%')` |
| `Modifier.weight(1f)` | `.layoutWeight(1)` |
| `mutableStateOf(x)` | `@State x = ...` |
| `remember { }` | 直接初始化成员变量 |
| `CompositionLocal` | 全局单例 `getColors()` |
| `NavHost` + `NavController` | `@State` 条件渲染 + 回调导航 |
| `AsyncImage` (Coil) | `Image($r('app.media.xxx'))` |
| `Crossfade` | 直接渲染（简化） |
| `AnimatedVisibility` | `if (condition) { ... }` |
| `FlowRow` | `Flex({ wrap: FlexWrap.Wrap })` |

### 5.5 数据模型映射

```kotlin
// Android
@Immutable
data class Snack(val id: Long, val name: String, @DrawableRes val imageRes: Int, ...)
```

```typescript
// HarmonyOS
export class Snack {
  id: number;
  name: string;
  imageRes: Resource;    // $r('app.media.cupcake') 返回 Resource 类型
  price: number;
  tagline: string;
  constructor(id: number, name: string, imageRes: Resource, ...) { ... }
}
```

**图片资源引用**：在 `.ets` 文件中可以直接用 `$r('app.media.xxx')`，它在编译时解析为 `Resource` 对象。

### 5.6 导航转换

Android 用双层 NavHost（外层 home/detail，内层 feed/search/cart/profile）。

HarmonyOS 简化为 `@State` 条件渲染：

```typescript
@Entry
@Component
struct Index {
  @State currentTab: number = 0;       // 0=Feed, 1=Search, 2=Cart, 3=Profile
  @State showDetail: boolean = false;
  @State detailSnackId: number = 1;
  @State detailOrigin: string = '';

  build(): void {
    Stack() {
      Column() {
        if (this.currentTab === 0) {
          FeedScreen({ onSnackClick: (id, origin) => this.navigateToDetail(id, origin) })
        } else if (this.currentTab === 1) { ... }
        // ...
        BottomBar({ selectedIndex: this.currentTab, onTabSelected: (i) => { this.currentTab = i; } })
      }
      if (this.showDetail) {
        SnackDetailScreen({ snackId: this.detailSnackId, upPress: () => { this.showDetail = false; } })
      }
    }
  }
}
```

### 5.7 EntryAbility 模板

```typescript
import { UIAbility, AbilityConstant, Want } from '@kit.AbilityKit';
import { window } from '@kit.ArkUI';
import hilog from '@ohos.hilog';

export default class EntryAbility extends UIAbility {
  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
    hilog.info(0x0000, 'Jetsnack', 'EntryAbility onCreate');
  }
  onWindowStageCreate(windowStage: window.WindowStage): void {
    windowStage.loadContent('pages/Index', (err) => {
      if (err.code) { hilog.error(0x0000, 'Jetsnack', 'Failed: %{public}s', JSON.stringify(err)); return; }
      hilog.info(0x0000, 'Jetsnack', 'Succeeded in loading content.');
    });
  }
  onWindowStageDestroy(): void {}
  onDestroy(): void {}
}
```

---

## 6. ArkTS 严格规则与陷阱（关键！）

### 6.1 禁止隐式 any/unknown

```typescript
// ❌ 错误
this.orderLines.find((l) => l.snack.id === snackId)
this.orderLines.reduce((sum, l) => sum + l.snack.price * l.count, 0)

// ✅ 正确
this.orderLines.find((l: OrderLine) => l.snack.id === snackId)
this.orderLines.reduce((sum: number, l: OrderLine): number => sum + l.snack.price * l.count, 0)
```

### 6.2 禁止隐式返回类型

所有 lambda/箭头函数必须有显式返回类型标注（当编译器无法推断时）：

```typescript
// ❌ 错误
this.orderLines.map((l: OrderLine) => { if (...) return x; return l; })

// ✅ 正确
this.orderLines.map((l: OrderLine): OrderLine => { if (...) return x; return l; })
```

### 6.3 FontWeight 枚举值

```typescript
// ❌ FontWeight.SemiBold 不存在
.fontWeight(FontWeight.SemiBold)

// ✅ 可用值：Lighter, Normal, Regular, Medium, Bolder, Bold
.fontWeight(FontWeight.Bold)   // SemiBold → Bold
```

### 6.4 Path 组件 API

```typescript
// ❌ .fillColor() 不存在
Path().commands(data).fillColor(color)

// ✅ 用 .fill()
Path().commands(data).fill(color)
```

```typescript
// ❌ .viewport() 不存在于 Stack
Stack().viewport(vw, vh)

// ❌ .viewport() 不存在于 Shape（大小写错误）
Shape().viewport(vw, vh)

// ✅ .viewPort() 大写P，参数是对象
Shape().viewPort({ x: 0, y: 0, width: vw, height: vh })
```

### 6.5 组件属性名冲突

`@Component struct` 的成员变量不能与 `CustomComponent` 基类的属性同名。**禁止使用的名称**：

| 禁止名 | 替代名 |
|--------|--------|
| `size` | `iconSize` / `btnSize` / `dimension` |
| `color` | 可以用（不冲突） |
| `borderWidth` | `bdWidth` |
| `borderColor` | `bdColor` |
| `enabled` | `btnEnabled` |

### 6.6 @BuilderParam 必须有默认值

```typescript
// ❌ 无默认值（触发 @previewer/mandatory-default-value-for-local-initialization）
@BuilderParam content: () => void;

// ✅ 提供默认 @Builder 函数
@Builder
function EmptyContent(): void {}

@Component
export struct MyComponent {
  @BuilderParam content: () => void = EmptyContent;
  // ...
}
```

### 6.7 默认值不能依赖运行时

```typescript
// ❌ getColors() 是运行时调用
bgColor: string = getColors().uiBackground;

// ✅ 使用字面量
bgColor: string = '#FFFFFFFF';
```

所有颜色的字面量值（从 Colors.ets 查找）：

| 主题字段 | 对应色阶 | 字面量 |
|---------|---------|--------|
| uiBackground | Neutral0 | `'#FFFFFFFF'` |
| textSecondary | Neutral7 | `'#DE000000'` |
| textHelp | Neutral6 | `'#99000000'` |
| uiBorder | Neutral4 | `'#1F000000'` |
| textInteractive | Neutral0 | `'#FFFFFFFF'` |
| brand | Shadow5 | `'#FF4B30ED'` |
| brandSecondary | Ocean3 | `'#FF86F7FA'` |
| iconPrimary | Shadow5 | `'#FF4B30ED'` |
| iconInteractive | Neutral0 | `'#FFFFFFFF'` |
| iconInteractiveInactive | Neutral1 | `'#BDFFFFFF'` |
| error | FunctionalRed | `'#FFD00036'` |
| interactivePrimary | [Shadow4, Shadow11] | `['#FF7057F5', '#FF001787']` |
| interactiveSecondary | [Ocean3, Shadow3] | `['#FF86F7FA', '#FF9B86FA']` |

### 6.8 Blank 组件限制

`Blank()` 只能在 `Row`、`Column`、`Flex` 内使用。在 `ListItem` 内不能直接用：

```typescript
// ❌
ListItem() { Blank().height(4) }

// ✅ 包一层 Column
ListItem() { Column() { Blank().height(4) } }
```

### 6.9 List 对齐 API

```typescript
// ❌ .align() 不接受 ListItemAlign
List().align(ListItemAlign.Center)

// ✅ 用 .alignListItem()
List().alignListItem(ListItemAlign.Center)
```

### 6.10 Alignment 枚举值

```typescript
// ❌ Alignment.BottomCenter 不存在
Stack({ alignContent: Alignment.BottomCenter })

// ✅ 可用值：TopStart, Top, TopEnd, Start, Center, End, BottomStart, Bottom, BottomEnd
Stack({ alignContent: Alignment.Bottom })
```

### 6.11 导入路径深度

```
ets/
├── theme/Theme.ets
├── model/Snack.ets
├── components/SnackIcon.ets
├── home/
│   ├── Feed.ets          → import from '../theme/Theme'     (1级)
│   ├── search/Search.ets → import from '../../theme/Theme'  (2级)
│   └── cart/Cart.ets     → import from '../../theme/Theme'  (2级)
└── snackdetail/SnackDetail.ets → import from '../theme/Theme' (1级)
```

### 6.12 $r() 资源引用

- `$r('app.media.cupcake')` — 图片资源
- `$r('app.string.home_feed')` — 字符串资源
- `$r('app.string.${variable}')` — 模板字符串动态引用（可用）
- `$r('app.color.start_window_background')` — 颜色资源

### 6.13 ForEach 键值

```typescript
// 必须提供键生成函数
ForEach(this.snacks, (snack: Snack) => { ... }, (snack: Snack) => snack.id.toString())
```

### 6.14 组件属性传递

ArkUI 自定义组件的属性在创建时通过对象字面量传递：

```typescript
// 正确
SnackIcon({ iconName: 'ic_home', color: getColors().brand, iconSize: 24 })

// 不能链式调用
SnackIcon().iconName('ic_home')  // ❌
```

### 6.15 @Prop 与普通成员

- `@Prop` — 父组件变化时触发子组件更新（仅原始类型：string, number, boolean）
- 普通成员 — 初始化后不再更新（适合静态数据）
- 复杂对象（如 Snack[]）— 用普通成员传递

### 6.16 position + markAnchor

```typescript
// 在 Stack 内绝对定位子元素
SnackImage({ ... })
  .position({ x: '55%', y: '50%' })
  .markAnchor({ x: 0, y: '50%' })
```

---

## 7. 编译错误修复策略

### 7.1 迭代编译流程

```
1. hvigorw --no-daemon assembleHap
2. 读取所有 ERROR 行
3. 提取唯一错误消息：Select-String "Error Message:" | Select-Object -Unique
4. 逐个修复
5. 重新编译，直到 BUILD SUCCESSFUL
```

### 7.2 常见错误速查表

| 错误信息 | 原因 | 修复 |
|---------|------|------|
| `hvigor-config.json5 does not exist` | 缺少配置文件 | 创建 `hvigor/hvigor-config.json5` |
| `The project structure and configuration need to be upgraded` | `modelVersion` 缺失或不匹配 | 在 `oh-package.json5` 和 `hvigor-config.json5` 中添加 `"modelVersion": "5.0.0"` |
| `hvigorVersion is not valid property name` | `hvigor-config.json5` 包含不允许的属性 | 删除 `hvigorVersion`、`daemon`、`executionParallelism` |
| `platform version '5.0.0' and API version '24' do not match` | `compatibleSdkVersion` 平台版本与 API 不匹配 | API 24 → `"6.1.1(24)"` |
| `JSON5: invalid character 'e'` | `app.json5` 用了 `export default` | 改为纯 JSON5 |
| `must match pattern "^[$]string:..."` | `label` 直接写字符串 | 改为 `"$string:app_name"` |
| `property name must be valid (labelEn)` | ability 中有 `labelEn` | 删除 `labelEn` |
| `property name must be valid (externalNativeOptions)` | debug 的 arkOptions 有非法属性 | 删除 `externalNativeOptions` |
| `Page 'Index.ets.ets' does not exist` | `main_pages.json` 路径带了 `.ets` | 改为 `"pages/Index"` |
| `Cannot find module '@ohos/hvigor-ohos-plugin'` | 插件不在 node_modules | 创建 junction 链接 |
| `Could not resolve "../theme/Theme"` | 导入路径深度不够 | 子目录用 `../../` |
| `Property 'SemiBold' does not exist on FontWeight` | 枚举值不存在 | `FontWeight.SemiBold` → `FontWeight.Bold` |
| `Property 'fillColor' does not exist on PathAttribute` | API 名称错误 | `.fillColor()` → `.fill()` |
| `Property 'viewport' does not exist on ShapeAttribute` | 大小写错误 | `.viewport()` → `.viewPort({x,y,width,height})` |
| `Type 'string' is not assignable to '[ResourceColor, number]'` | linearGradient colors 格式错误 | 用 `toGradient()` 包裹 |
| `Property 'size' in type 'X' is not assignable to CustomComponent` | 属性名冲突 | `size` → `iconSize` 等 |
| `@BuilderParam content: () => void` 无默认值 | linter 规则 | 添加 `= EmptyContent` |
| `Use explicit types instead of "any"` | 隐式 any | 添加类型标注 `(l: OrderLine) =>` |
| `Blank can only be nested in Row,Column,Flex` | Blank 在 ListItem 内 | 包一层 `Column()` |
| `Argument of type 'ListItemAlign' is not assignable to Alignment` | API 错误 | `.align()` → `.alignListItem()` |
| `Alignment.BottomCenter does not exist` | 枚举值不存在 | 用 `Alignment.Bottom` |
| `Unknown resource name 'empty_state_search'` | 矢量图未转 media | 用 `$r('app.media.placeholder')` 替代 |

---

## 8. 验证清单

编译成功后检查：

- [ ] `hvigorw --no-daemon assembleHap` 输出 `BUILD SUCCESSFUL`
- [ ] HAP 文件生成于 `entry/build/default/outputs/default/entry-default-unsigned.hap`
- [ ] 无 ERROR，仅有签名 WARN（正常）
- [ ] INSTRUCTION.md 已创建
- [ ] 所有界面已转换：Feed, Search, Cart, Profile, SnackDetail, FilterScreen
- [ ] 底部导航 4 标签可切换
- [ ] 零食卡片点击可跳转详情
- [ ] 详情页返回按钮可返回
- [ ] 购物车数量增减/删除功能正常
- [ ] 筛选弹窗可弹出/关闭
- [ ] 搜索功能正常（分类/建议/结果/空状态）

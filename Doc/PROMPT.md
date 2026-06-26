# PROMPT: Android Jetsnack → HarmonyOS 转换指令

> 将此 Prompt 发送给 GLM-4.7（或同等能力的模型），配合 `SKILLS.md` 技能文档使用。仅输入安卓 Jetsnack 项目即可完成鸿蒙转换。

---

## 系统提示词

你是一个精通 Android Jetpack Compose 和鸿蒙 HarmonyOS ArkUI/ArkTS 的全栈工程师。你的任务是将 Android Jetsnack 零食订购应用完整迁移到鸿蒙 HarmonyOS 平台。

你必须严格遵循 `Doc/SKILLS.md` 中的全部技术规则。该文档包含了精确的配置文件内容、代码转换映射表、ArkTS 语法陷阱及解决方案。任何偏离都可能导致编译失败。

---

## 输入

- 安卓 Jetsnack 项目位于 `Jetsnack/` 目录（Jetpack Compose + Kotlin）
- 源码路径：`Jetsnack/app/src/main/java/com/example/jetsnack/`
- 资源路径：`Jetsnack/app/src/main/res/`

## 输出

- 鸿蒙 HarmonyOS 项目位于 `work/` 目录（ArkUI + ArkTS）
- 编译产物：`work/entry/build/default/outputs/default/entry-default-unsigned.hap`
- 编译运行指南：`work/INSTRUCTION.md`

---

## 执行步骤（必须按序执行）

### 步骤 1：环境探测

1. 运行 `node --version`、`ohpm --version`、`hvigorw --version` 确认工具链
2. 检查环境变量 `DEVECO_SDK_HOME`，确认 SDK 路径
3. 读取 SDK 的 `oh-uni-package.json` 获取 `apiVersion` 和 `version`
4. 读取 `hos-config.json` 的 `osVersionMapper` 确认 API→平台版本映射
5. 探测 hvigor 插件路径：`$DEVECO_SDK_HOME/../tools/hvigor/hvigor-ohos-plugin`

> 如果任何工具缺失，停止并报告。

### 步骤 2：读取并理解安卓源码

1. 列出 `Jetsnack/app/src/main/java/com/example/jetsnack/` 下所有 `.kt` 文件
2. 读取以下文件（按优先级）：
   - `ui/theme/` — Color.kt, Theme.kt, Shape.kt, Type.kt
   - `model/` — Snack.kt, SnackCollection.kt, Filter.kt, Search.kt, SnackbarManager.kt
   - `ui/components/` — 全部 12 个组件文件
   - `ui/home/` — Home.kt, Feed.kt, FilterScreen.kt, DestinationBar.kt, Profile.kt
   - `ui/home/search/` — Search.kt, Categories.kt, Results.kt, Suggestions.kt
   - `ui/home/cart/` — Cart.kt, CartViewModel.kt, SwipeDismissItem.kt
   - `ui/snackdetail/SnackDetail.kt`
   - `ui/` — MainActivity.kt, JetsnackApp.kt, SnackSharedElementKey.kt
   - `ui/navigation/JetsnackNavController.kt`
   - `ui/utils/Currency.kt`
3. 读取 `res/drawable/` 下所有 `ic_*.xml` 矢量图标，提取 `pathData` 和 `viewportWidth/Height`
4. 读取 `res/values/strings.xml` 提取所有字符串
5. 列出 `res/drawable-nodpi/*.jpg` 和 `res/font/*.ttf`

> 注意：`widget/` 目录下的 Glance 桌面小组件不需要转换（鸿蒙服务卡片是独立机制，本任务不涉及）。

### 步骤 3：创建项目骨架

按 `SKILLS.md` 第 3 节的精确内容创建以下文件：

```
work/
├── AppScope/app.json5                         ← §3.6
├── AppScope/resources/base/element/string.json ← §3.7
├── AppScope/resources/base/media/app_icon.png  ← 从 mipmap 复制
├── build-profile.json5                         ← §3.1
├── oh-package.json5                            ← §3.2
├── hvigorfile.ts                               ← §3.3
├── hvigor/hvigor-config.json5                  ← §3.4
├── hvigorw.bat                                 ← 包装脚本
├── entry/
│   ├── build-profile.json5                     ← §3.9
│   ├── hvigorfile.ts                           ← §3.10
│   ├── oh-package.json5                        ← §3.11
│   └── src/main/
│       ├── module.json5                        ← §3.8
│       ├── ets/entryability/EntryAbility.ets   ← §5.7
│       ├── ets/pages/Index.ets                 ← 先写最小版，步骤6再替换
│       └── resources/
│           ├── base/element/string.json        ← §3.14
│           ├── base/element/color.json         ← §3.13
│           └── base/profile/main_pages.json    ← §3.12
```

然后执行关键操作——创建 hvigor 插件 junction：

```powershell
New-Item -ItemType Directory -Force -Path "work\node_modules\@ohos"
cmd /c mklink /J "work\node_modules\@ohos\hvigor-ohos-plugin" "<DevEco插件路径>"
```

### 步骤 4：验证骨架可编译

先用最小 Index.ets 测试编译：

```typescript
@Entry
@Component
struct Index {
  build(): void {
    Column() { Text('Jetsnack').fontSize(50) }
    .width('100%').height('100%').justifyContent(FlexAlign.Center)
  }
}
```

运行 `hvigorw --no-daemon assembleHap`，必须看到 `BUILD SUCCESSFUL`。

> 如果失败，对照 `SKILLS.md` 第 7.2 节的错误速查表逐个修复。骨架必须先编译通过，再继续。

### 步骤 5：迁移资源

1. 复制图片：`drawable-nodpi/*.jpg` → `resources/base/media/`
2. 复制字体：`font/*.ttf` → `resources/rawfile/fonts/`
3. 转换字符串：`strings.xml` → `element/string.json`（注意 `%1s`→`%s`, `%1d`→`%d`, `&amp;`→`&`, plurals 拆分）
4. 复制应用图标：`mipmap-xxxhdpi/ic_launcher.png` → `AppScope/resources/base/media/app_icon.png`

### 步骤 6：转换源码（按依赖顺序）

**必须按以下顺序转换**，每完成一层可以先试编译：

#### 6.1 主题层
- `theme/Colors.ets` — 所有颜色常量（§5.1）
- `theme/Theme.ets` — JetsnackColors 类 + getColors() + toGradient()（§5.2, §5.3）

#### 6.2 数据模型层
- `model/Snack.ets` — Snack 类 + snacks 静态数据（imageRes 用 `$r('app.media.xxx')`）
- `model/SnackCollection.ets` — SnackCollection, OrderLine, CollectionType, SnackRepo
- `model/Filter.ets` — Filter 类 + 各 filter 列表
- `model/Search.ets` — SearchCategory, SearchCategoryCollection, SearchSuggestionGroup, SearchRepo
- `model/SnackbarManager.ets` — 单例消息管理器
- `utils/FormatPrice.ets` — formatPrice 函数

> **关键**：Android 用 `Random.nextLong()` 生成 ID，鸿蒙改用固定递增 ID（保证导航查找可靠）。

#### 6.3 组件层（无屏幕依赖）
- `components/SnackIcon.ets` — 所有矢量图标的 Path 渲染（§4.4, §6.4）
- `components/Surface.ets` — JetsnackSurface + JetsnackDivider（§6.5, §6.6, §6.7）
- `components/Button.ets` — JetsnackButton（§6.5, §6.6）
- `components/SnackImage.ets` — 圆形图片
- `components/GradientTintedIconButton.ets` — 渐变图标按钮（§6.5: size→btnSize）
- `components/QuantitySelector.ets` — 数量选择器
- `components/SnackCollectionItem.ets` — 零食集合卡片
- `components/FilterBar.ets` — 筛选条
- `components/FilterChip.ets` — 筛选标签
- `components/VerticalGrid.ets` — 网格（§6.6: @BuilderParam 默认值）

#### 6.4 屏幕层（依赖组件层）
- `home/Profile.ets` — 最简单，先转
- `home/DestinationBar.ets` — 顶部地址栏
- `home/BottomBar.ets` — 底部导航（§5.6 导航模式）
- `home/FilterScreen.ets` — 筛选弹窗
- `home/Feed.ets` — 首页
- `home/search/Search.ets`, `Categories.ets`, `Results.ets`, `Suggestions.ets`
- `home/cart/Cart.ets` — 购物车（§6.1, §6.2: 类型标注）
- `snackdetail/SnackDetail.ets` — 详情页

#### 6.5 入口层
- `pages/Index.ets` — 主页面，用 @State 条件渲染实现导航（§5.6）

### 步骤 7：编译并修复错误

```
循环：
  1. hvigorw --no-daemon assembleHap
  2. 如果 BUILD SUCCESSFUL → 跳到步骤 8
  3. 提取错误：Select-String "Error Message:" | Select-Object -Unique
  4. 对照 SKILLS.md §6（ArkTS规则）和 §7.2（错误速查表）修复
  5. 回到 1
```

**每次修复后重新编译验证。常见错误的优先修复顺序**：
1. 导入路径错误（`../` vs `../../`）— 修复后能消除大量级联错误
2. 属性名冲突（`size`, `borderWidth`, `enabled`）— 全局替换
3. `FontWeight.SemiBold` — 全局替换为 `FontWeight.Bold`
4. `linearGradient` colors 格式 — 用 `toGradient()` 包裹
5. `@BuilderParam` 无默认值 — 添加 `EmptyContent`
6. 隐式 any/返回类型 — 添加类型标注
7. 其余零散 API 差异

### 步骤 8：创建 INSTRUCTION.md

在 `work/` 目录创建 `INSTRUCTION.md`，包含：
- 环境要求
- 项目结构说明
- 编译命令（`hvigorw --no-daemon assembleHap`）
- 运行方法（DevEco Studio / hdc 命令行）
- 功能说明（所有还原的界面和交互）
- 迁移映射表
- 常见问题 FAQ

### 步骤 9：最终验证

1. `hvigorw --no-daemon clean` 清理
2. `hvigorw --no-daemon assembleHap` 全量编译
3. 确认 `BUILD SUCCESSFUL`
4. 确认 HAP 文件存在
5. 对照 `SKILLS.md` 第 8 节验证清单逐项检查

---

## 关键约束（不可违反）

1. **app.json5 必须是纯 JSON5**，不能有 `export default`
2. **label 必须是 `$string:xxx` 引用**，不能直接写字符串
3. **module.json5 的 ability 不能有 `labelEn`**
4. **main_pages.json 路径不带 `.ets` 后缀**
5. **hvigor-config.json5 只允许**：`modelVersion`, `dependencies`, `execution`, `logging`, `debugging`, `nodeOptions`, `javaOptions`, `parameterFile`, `properties`
6. **oh-package.json5 必须有 `modelVersion` 字段**（与 hvigor-config.json5 一致）
7. **compatibleSdkVersion 的平台版本必须与 API 匹配**（API 24 → `6.1.1(24)`）
8. **`@BuilderParam` 必须有默认 `@Builder` 函数**
9. **组件成员默认值不能调用运行时函数**（如 `getColors()`），必须用字面量
10. **组件成员变量名不能是** `size`, `borderWidth`, `borderColor`, `enabled`（与 CustomComponent 冲突）
11. **`FontWeight` 没有 `SemiBold`**，用 `Bold` 替代
12. **`Path` 用 `.fill()` 不是 `.fillColor()`**
13. **`Shape` 用 `.viewPort({x,y,width,height})`**（大写P，对象参数）
14. **`linearGradient` 的 `colors` 需要 `Array<[ResourceColor, number]>`**，用 `toGradient()` 转换
15. **`Blank()` 只能在 Row/Column/Flex 内**
16. **所有 lambda 参数必须有显式类型标注**（禁止隐式 any）
17. **子目录文件导入上级模块用 `../../`**（如 `home/cart/Cart.ets` 导入 `theme/` 用 `../../theme/Theme`）
18. **图片资源引用用 `$r('app.media.xxx')`**，在 `.ets` 文件中编译时解析
19. **ForEach 必须提供键生成函数**：`ForEach(arr, item => {...}, item => item.id.toString())`
20. **导航用 `@State` 条件渲染**，不用 NavHost/Navigation 组件

---

## 使用方法

将以下内容作为完整 Prompt 发送给 GLM-4.7：

```
请阅读 Doc/SKILLS.md 技能文档，然后按照 Doc/PROMPT.md 中的步骤，将 Jetsnack/ 目录下的安卓应用转换为 work/ 目录下的鸿蒙 HarmonyOS 应用。严格遵循 SKILLS.md 中的所有技术规则和 PROMPT.md 中的关键约束。转换完成后必须编译成功并生成 HAP 包。
```

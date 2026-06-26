# Jetsnack HarmonyOS — 编译运行指南

本项目是将 Android Jetpack Compose 示例应用 **Jetsnack**（零食订购 App）完整迁移到 **鸿蒙 HarmonyOS (ArkUI / ArkTS)** 平台的产物，位于 `work/` 目录下。

---

## 一、环境要求

| 工具 | 版本要求 | 说明 |
|------|---------|------|
| **DevEco Studio** | 6.1+ | 提供 HarmonyOS SDK (API 24) 及 hvigor 构建工具 |
| **Node.js** | 18.20.1+ | hvigor 运行依赖 |
| **ohpm** | 6.1+ | OpenHarmony 包管理器（随 DevEco Studio 安装） |
| **hvigorw** | 6.24.2 | 构建命令行工具（随 DevEco Studio 安装） |

### 环境变量

确保以下环境变量已设置（DevEco Studio 安装后通常会自动配置）：

```
DEVECO_SDK_HOME=D:/Software/Huawei/DevEcoStudio/sdk
```

`hvigorw` 和 `ohpm` 应在系统 `PATH` 中，或使用 DevEco Studio 自带的命令行工具。

---

## 二、项目结构

```
work/
├── AppScope/
│   ├── app.json5                          # 应用配置（包名、版本、图标）
│   └── resources/
│       └── base/
│           ├── element/string.json        # 应用级字符串
│           └── media/app_icon.png         # 应用图标
├── entry/                                 # 主模块（HAP）
│   ├── src/main/
│   │   ├── ets/                           # ArkTS 源代码
│   │   │   ├── entryability/
│   │   │   │   └── EntryAbility.ets       # 入口 Ability
│   │   │   ├── pages/
│   │   │   │   └── Index.ets              # 主页面（导航容器）
│   │   │   ├── theme/
│   │   │   │   ├── Colors.ets             # 颜色常量（Shadow/Ocean/Lavender/Rose 色阶）
│   │   │   │   └── Theme.ets             # JetsnackColors 主题类 + 渐变辅助函数
│   │   │   ├── model/
│   │   │   │   ├── Snack.ets              # Snack 数据模型 + 28 个零食数据
│   │   │   │   ├── SnackCollection.ets    # 集合模型 + SnackRepo 假数据仓库
│   │   │   │   ├── Filter.ets             # 筛选器模型 + 筛选项数据
│   │   │   │   ├── Search.ets             # 搜索模型 + SearchRepo
│   │   │   │   └── SnackbarManager.ets    # 消息管理单例
│   │   │   ├── utils/
│   │   │   │   └── FormatPrice.ets        # 价格格式化
│   │   │   ├── components/                # 可复用 UI 组件
│   │   │   │   ├── SnackIcon.ets          # 矢量图标（Path 渲染）
│   │   │   │   ├── Surface.ets            # JetsnackSurface + JetsnackDivider
│   │   │   │   ├── Button.ets             # JetsnackButton（渐变按钮）
│   │   │   │   ├── SnackImage.ets         # 圆形零食图片
│   │   │   │   ├── SnackCollectionItem.ets# 零食集合卡片（高亮/普通）
│   │   │   │   ├── FilterBar.ets          # 筛选条
│   │   │   │   ├── FilterChip.ets         # 可切换筛选标签
│   │   │   │   ├── GradientTintedIconButton.ets # 渐变图标按钮
│   │   │   │   ├── QuantitySelector.ets   # 数量选择器
│   │   │   │   └── VerticalGrid.ets       # 网格布局
│   │   │   ├── home/
│   │   │   │   ├── Feed.ets               # 首页 Feed
│   │   │   │   ├── FilterScreen.ets       # 筛选弹窗
│   │   │   │   ├── DestinationBar.ets     # 顶部地址栏
│   │   │   │   ├── Profile.ets            # 个人中心
│   │   │   │   ├── BottomBar.ets          # 底部导航栏
│   │   │   │   ├── search/
│   │   │   │   │   ├── Search.ets         # 搜索页
│   │   │   │   │   ├── Categories.ets     # 搜索分类
│   │   │   │   │   ├── Results.ets        # 搜索结果
│   │   │   │   │   └── Suggestions.ets    # 搜索建议
│   │   │   │   └── cart/
│   │   │   │       └── Cart.ets           # 购物车
│   │   │   └── snackdetail/
│   │   │       └── SnackDetail.ets        # 零食详情页（折叠图片动画）
│   │   ├── resources/
│   │   │   ├── base/
│   │   │   │   ├── media/                 # 36 张零食图片 (.jpg)
│   │   │   │   ├── element/
│   │   │   │   │   ├── string.json        # 字符串资源
│   │   │   │   │   └── color.json         # 颜色资源
│   │   │   │   └── profile/
│   │   │   │       └── main_pages.json    # 页面路由配置
│   │   │   └── rawfile/fonts/             # 6 个字体文件 (.ttf)
│   │   └── module.json5                   # 模块配置
│   ├── build-profile.json5                # 模块构建配置
│   ├── hvigorfile.ts                      # 模块 hvigor 脚本
│   └── oh-package.json5                   # 模块依赖配置
├── hvigor/
│   └── hvigor-config.json5               # hvigor 全局配置
├── build-profile.json5                    # 应用构建配置
├── hvigorfile.ts                          # 应用 hvigor 脚本
├── oh-package.json5                       # 应用依赖配置
├── hvigorw.bat                            # hvigor 命令行包装脚本
├── node_modules/                          # 构建依赖（含 hvigor-ohos-plugin 链接）
└── INSTRUCTION.md                         # 本文件
```

---

## 三、编译

### 方法一：命令行编译

1. 打开终端，进入项目目录：

   ```bash
   cd D:\Code\Harmony\Jetsnack_harmonyOS\work
   ```

2. 执行编译命令：

   ```bash
   hvigorw --no-daemon assembleHap
   ```

   或使用项目自带的包装脚本：

   ```bash
   .\hvigorw.bat --no-daemon assembleHap
   ```

3. 编译成功后，HAP 包位于：

   ```
   entry/build/default/outputs/default/entry-default-unsigned.hap
   ```

### 方法二：DevEco Studio 编译

1. 打开 DevEco Studio
2. 选择 `File → Open`，打开 `work` 目录
3. 等待项目同步完成
4. 点击 `Build → Build Hap(s)/APP(s) → Build Hap(s)`

---

## 四、运行

### 在模拟器或真机上运行

1. **配置签名**（真机运行需要）：
   - 在 DevEco Studio 中打开 `File → Project Structure → Signing Configs`
   - 勾选 `Automatically generate signature` 自动生成调试签名
   - 或在 `build-profile.json5` 中手动配置 `signingConfigs`

2. **命令行安装运行**：
   ```bash
   # 编译
   hvigorw --no-daemon assembleHap

   # 安装到设备（需连接 HarmonyOS 设备/模拟器）
   hdc install entry/build/default/outputs/default/entry-default-unsigned.hap

   # 启动应用
   hdc shell aa start -a EntryAbility -b com.example.jetsnack
   ```

3. **DevEco Studio 运行**：
   - 选择目标设备/模拟器
   - 点击 `Run` 按钮（或 `Shift+F10`）

---

## 五、应用功能说明

本应用完整还原了 Android Jetsnack 的所有界面、交互和功能：

### 界面

| 界面 | 说明 |
|------|------|
| **首页 (Feed)** | 零食集合列表，高亮卡片带渐变背景，顶部筛选条 + 地址栏 |
| **搜索 (Search)** | 搜索栏 + 分类网格 + 建议列表 + 结果列表 + 空状态 |
| **购物车 (Cart)** | 购物车商品列表（数量增减/删除）、订单摘要、结账栏 |
| **个人中心 (Profile)** | 占位页面（开发中提示） |
| **零食详情 (SnackDetail)** | 渐变头部、折叠图片动画、描述展开/收起、配料、相关推荐、底部加购栏 |
| **筛选弹窗 (FilterScreen)** | 排序选项、价格/分类/生活方式标签、卡路里滑块 |

### 交互

- **底部导航栏**：4 个标签页（首页/搜索/购物车/个人），选中项展开显示文字
- **零食卡片点击**：从任意页面跳转到详情页
- **详情页返回**：左上角返回按钮
- **筛选弹窗**：点击筛选图标弹出，点击遮罩或关闭按钮收起
- **数量选择器**：+/- 按钮调整数量，每 5 次操作随机模拟一次失败并提示
- **购物车删除**：点击商品右侧关闭按钮移除
- **搜索**：输入触发实时搜索（200ms 延迟模拟），空结果显示无匹配提示

### 设计系统

- **自定义颜色系统**：Shadow（蓝靛）、Ocean（青）、Lavender（紫）、Rose（粉）四组 12 级色阶
- **渐变**：8 组渐变色方案用于按钮、卡片、图标等
- **矢量图标**：所有图标使用 ArkUI `Path` 组件从 Android Vector Drawable pathData 还原
- **字体**：Montserrat + Karla 字体文件已迁移

---

## 六、从 Android 迁移说明

| Android (Jetpack Compose) | HarmonyOS (ArkUI / ArkTS) |
|---------------------------|---------------------------|
| `@Composable fun` | `@Component struct` + `build()` |
| `Modifier.xxx()` | 链式属性方法 `.xxx()` |
| `Box` / `Column` / `Row` | `Stack` / `Column` / `Row` |
| `LazyColumn` / `LazyRow` | `List` (垂直/水平) |
| `MaterialTheme` | `getColors()` 全局单例 |
| `CompositionLocal` | 全局单例 + `@Prop` 传递 |
| `NavHost` + `NavController` | `@State` 条件渲染 + 回调导航 |
| `Brush.horizontalGradient` | `.linearGradient({ angle: 90, colors: toGradient(...) })` |
| `AsyncImage` (Coil) | `Image($r('app.media.xxx'))` |
| VectorDrawable (XML) | `Path().commands(pathData)` |
| `mutableStateOf` | `@State` |
| `ViewModel` | 组件内状态管理 |

---

## 七、常见问题

**Q: 编译报错 "Cannot find module '@ohos/hvigor-ohos-plugin'"**

A: 需要确保 DevEco Studio 已安装，且 `node_modules/@ohos/hvigor-ohos-plugin` 链接指向 DevEco Studio 的插件目录。项目已配置此链接，如路径变更需重新创建：

```powershell
cmd /c mklink /J "node_modules\@ohos\hvigor-ohos-plugin" "D:\Software\Huawei\DevEcoStudio\tools\hvigor\hvigor-ohos-plugin"
```

**Q: 编译报版本不匹配**

A: 检查 `build-profile.json5` 中的 `compatibleSdkVersion` 与 SDK 版本一致（API 24 = `6.1.1(24)`）。

**Q: 签名警告 "No signingConfigs profile is configured"**

A: 这是正常警告，不影响编译。真机安装运行时需配置签名（见第四节）。

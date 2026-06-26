import { FileSet, TaskInputValue } from '@ohos/hvigor';
import { AbstractGenerateLoaderJson } from './abstract-generate-loader-json.js';
import { TargetTaskService } from './service/target-task-service.js';
/**
 * 生成loader需要的json文件
 *
 * @since 2022/3/3
 */
export declare class GenerateLoaderJson extends AbstractGenerateLoaderJson {
    private readonly aceLoaderJson;
    private readonly aceWidgetLoaderJson;
    private readonly nodeModulesPath;
    private hspNameOhmMap;
    private harNameOhmMap;
    private readonly hspResourcesMap;
    private readonly moduleSrcMainPath;
    private readonly moduleSrcMockPath;
    private readonly insightIntentJsonPath;
    private readonly mockConfigJsonPath;
    private readonly compileEntry;
    private readonly otherCompileFiles;
    private readonly dynamicImportLibInfo;
    private readonly moduleJson5Path;
    private readonly modulePath;
    private insightIntentJson;
    private readonly intermediatesRouterMapObjs;
    protected isPreview: boolean | undefined;
    private readonly etsSourcePath;
    private readonly needSubmitArkTsWidget;
    private readonly apPath?;
    private readonly tempApPath;
    private readonly tempApDir;
    private readonly anBuildOutPutPath;
    private readonly fallbackAnBuild;
    private readonly updateVersionInfo;
    private readonly declarationEntry;
    private pkgContextInfos;
    private readonly byteCodeHarInfo;
    private byteCodeHarInfoDuplicate;
    private pkgContextInfoDuplicate;
    private otherCompileFilesDuplicate;
    private allHspDepTargets;
    private readonly ohExportsFilePaths;
    private get useNormalizedOHMUrl();
    private get isByteCodeHarOptimize();
    declareInputs(): Map<string, TaskInputValue>;
    declareDynamicImportInputs(map: Map<string, TaskInputValue>): void;
    declareInputFiles(): FileSet;
    private addStartupInputFiles;
    /**
     * 通过OHOS_COMPILE_LIB_ENTRY配置的开关判断是否需要编译全部src/main/ets目录文件
     * 特例: 若未配置OHOS_COMPILE_LIB_ENTRY，formWidgetModule默认返回false
     *
     * @returns {boolean}
     */
    private isFullCompilationEnabled;
    private getEtsSourcePath;
    get isBundledDependencies(): boolean;
    /**
     * 增加动态import har包的src/main/ets依赖
     * @param fileSet
     * @private
     */
    private declareDynamicImportInputFiles;
    private declareByteCodeHarInputFiles;
    /**
     * 添加har包去重场景的输入文件
     */
    private addHarDeduplicateInputFiles;
    declareOutputFiles(): FileSet;
    initTaskDepends(): void;
    constructor(taskService: TargetTaskService);
    beforeAlwaysAction(): Promise<void>;
    private isHapOrHsp;
    private setByteCodeHarInfoAndOtherCompileFiles;
    /**
     * byteCodeHarInfo, otherCompileFiles 去重
     */
    private processByteCodeHarInfoAndOtherCompileFilesDeduplicate;
    protected beforeTask(): void;
    protected getWorkerConfig(): string[] | undefined;
    /**
     * 收集sourcePath目录下的.js/.ets./.ts文件到compileEntry中
     * @private
     */
    private collectCompileFiles;
    private allowToCollectEtsFolder;
    private allowToCollectDependencyEtsFolder;
    private collectDepEtsFolderFilesEntry;
    private checkByteCodeHar;
    /**
     * 是否har模块，且是否在跑localTest或ohosTest或preview
     * @private
     */
    private shouldTreatHarAsHap;
    private isHarWithCoverage;
    private getModuleEntryFile;
    /**
     * har模块在进行覆盖率报告的unitTest时，需要把入口文件编译进去，不然初始化的模块无法输出覆盖率报告
     * @private
     */
    private processHarUnitTestWithCoverage;
    private processCodeFiles;
    private setPkgContextInfos;
    protected doTaskAction(): void;
    private processByteCodeHar;
    /**
     * 在编hap/hsp时，如果依赖链中存在字节码HAR（为避免阅读困难，针对该字节码HAR，使用A替代）：
     * 1.需要收集A自身的declarationEntry：储存了自身的worker和runtimeOnly.sources对应的ohmurl
     * 2.需要检测A中的runtimeOnly.packages，如果存在【字节码HAR】依赖，则【字节码HAR】入口的ohmurl，也需要收集；
     *   针对这一步，理论上可以在编译A的时候，进行收集处理。但，如果依赖的版本号不是固定的，则存在编译时的版本号和集成时的版本号不一致，从而导致ohmurl错误。
     *
     * 存在以上处理逻辑的原因，是因为在生成abc的时候，存在针对未使用的代码裁减的逻辑，达到减少abc体积的目的。
     * 然而，worker和变量动态import，属于运行时的范畴，在编译期间无法得知，如果把这部分逻辑裁减掉，就会导致运行时报错。
     * @param dependency
     * @param pkgName2DepMap
     * @private
     */
    private collectByteCodeHarDeclarationEntry;
    private collectRuntimeDynamicImportByteCodeHarDeclarationEntry;
    private shouldCollectDeclarationEntry;
    private processDeclarationEntry;
    private collectMockFileEntry;
    /**
     * 校验规则ability在module.json5下的extensionAbilities数组中存在对应名称的name，
     * 其次对应name的type必须为form，该form ability对应的卡片配置文件下存在一个对应name的form
     *
     * @param intent
     * @param extensionMap
     * @param cause
     * @param detail
     * @private
     */
    private extensionAbilitiesValidate;
    /**
     * formName规则校验，formName需在 form_config.json 中配置
     * @param intent 意图
     * @param formsNames form_config.json中配置的name全集
     * @private
     */
    private intentFormNameValidate;
    /**
     * uiAbility/ability字段的校验
     * serviceExtension/ability字段校验，
     * 校验规则ability在module.json5下的extensionAbilities数组中存在对应名称的name，
     * 其次对应name的type必须为service
     *
     * @param intent
     * @param abilitiesSet
     * @param extensionMap
     * @param cause
     * @param detail
     * @private
     */
    private validateServiceExtensionAbility;
    /**
     * ability字段在module.json中的abilities或extensionAbilities中是否存在
     *
     * @param intent
     * @param abilitiesSet
     * @param extensionMap
     * @param cause
     * @param detail
     * @private
     */
    private uiExtensionValidate;
    /**
     * insight_intent.json文件的业务校验
     *
     * @private
     */
    private validateForInsightIntentJson;
    private getFormConfigNames;
    /**
     *  读取InsightIntent.json中的srcEntry
     */
    private readInsightIntentSrcEntry;
    /**
     * 检查当前Sdk版本是否支持Aot，只检查ohos场景
     * @private
     */
    private checkAotCompatibleSdkVersion;
    private handleAotFields;
    private warnAnBuildMode;
    private getHarNameOhmMap;
    private getHspDependencies;
    /**
     * 生成hspNameOhmMap对象
     * @private
     */
    private getHspNameOhmMap;
    private getHspResourcesMap;
    private getOHMUrlMap;
    /**
     * 共享hsp包配置loader.json的hspNameOhmMap时，获取package.json的main字段，如main字段为空则试图获取types字段
     * @param dependency
     */
    private getHspDependencyPackageMainName;
    /**
     * 共享hsp包配置loader.json的hspNameOhmMap时，获取module.json5的name字段
     * @param dependency
     */
    private getHspDependencyModuleName;
    /**
     * 使用策略模式，
     *
     * @param {AotConfigsParams} params
     * @returns {Record<string, string>}
     * @private
     */
    private getAotStrategy;
    /**
     * 当ap路径存在时返回的loader.json片段
     * @param {AotConfigsParams} conf
     * @private
     */
    private withApPath;
    /**
     * 当ap路径不存在时返回的loader.json片段
     * @param {AotConfigsParams} conf
     * @private
     */
    private withoutApPath;
    /**
     * 当不使能aot编译时，返回空片段
     * @returns {{}}
     * @private
     */
    private withEmpty;
    /**
     * api9上配置了apPath但没有配置aotCompileMode，需要报错
     * @private
     */
    private mismatchAotCompileMode;
    /**
     * api9上配置了partial模式时没有配置apPath，需要报错
     * @private
     */
    private partialEmptyPath;
    /**
     * 配置了partial模式时apPath路径不存在，需要报错
     * @private
     */
    private invalidPath;
    /**
     * 路径非以.ap后缀结尾，需要报错
     * @private
     */
    private invalidSuffix;
    /**
     * 将appStartup的startupTask中定义的srcEntry和configEntry写入compileEntry加载到编译流程中
     * 先写本模块的，再写依赖的har模块的
     * @param appStartupPath
     * @private
     */
    private processAppStartupConfig;
    /**
     * 处理dynamic import
     * @private
     */
    private processDynamicImport;
    /**
     * 处理本地、远程har依赖形式dynamicImport
     * @param dynamicImport
     * @param dynamicImportLibInfo
     * @private
     */
    private processHarDynamicImport;
    /**
     * 处理npm/hsp/.so形式dynamic import
     * @param dynamicImport
     * @param dynamicImportLibInfo
     * @private
     */
    private processOtherDynamicImport;
    private getLocalDependencyRuntimeOnly;
    private getLocalDependencyDynamicImportList;
    private getRemoteDependencyDynamicImportList;
    /**
     * 处理间接依赖
     * @private
     */
    private processIndirectDependency;
    /**
     * 收集package/path数组中的所有dynamicImport
     * @param runtimeOnlyObj
     * @private
     */
    private collectDynamicImport;
    /**
     * 处理间接依赖的dynamicImport相关信息 npm包不作处理
     * @param dependency
     * @param dynamicImportList
     * @private
     */
    private processIndirectDependencyInfo;
    /**
     * 处理文件夹相对路径形式的动态import
     * @param absolutePath
     * @private
     */
    private processDirectoryImport;
    /**
     * 处理.so类型的间接依赖的dynamicImportLibInfo
     * @param dependency
     * @param dynamicImport
     * @private
     */
    private processIndirectSoDependencyInfo;
    /**
     * 写入compileEntry/compileEntryDir和dynamicImportLibInfo
     * @param dependencyList
     * @param dynamicImport
     * @private
     */
    private writeIndirectDependencyInfo;
    /**
     * 获取依赖入口文件
     * @param realDependencyPath
     * @param dynamicImportOhPkgObj
     * @private
     */
    private getEntryMainFilePath;
    /**
     * 获取har dependency的模块 模块名
     * @param dependency
     * @private
     */
    private getHostModuleName;
    /**
     * 获取har依赖的dependencyInfo中的moduleName
     * 本地har取module.json5->module->name;远程har取oh-package.json5->name
     * @param dependency
     * @param dynamicImport
     * @private
     */
    private getHarDependencyModuleName;
    /**
     * 检查dynamicImportLibsInfo中是否已存在依赖信息
     * 处理存在同名但非同版本依赖重复写入dynamicImportLibsInfo的场景
     * 收集依赖遵循距离优先原则 若已写入对象中则跳过后续版本的写入 即模块级优先于工程级依赖调用
     * @param dependencyName
     * @private
     */
    private existInDynamicImportLibsInfo;
    /**
     * 判断dynamic import是否为har dependency
     * @param dynamicImport
     * @private
     */
    private isHarDependency;
    /**
     * 判断dynamic import是否为hsp dependency
     * @param dynamicImport
     * @private
     */
    private isHspDependency;
    /**
     * 将模块routerMap配置信息传递给compileEntry和dynamicImportLibInfo
     * @private
     */
    private processRouterMap;
    /**
     * 背景：生成一个版本号更新表给es2abc使用
     * 对比语境信息表和字节码har中的元数据的版本号，如果不一致在记录，如果一直则置为空
     * 记录的是语境信息表中的数据
     * @private
     */
    private processUpdateVersionInfo;
    /**
     * 将字节码har依赖的本地或远程源码har的worker/runtimeOnly/routerMap相关信息写入compileEntry
     * @private
     */
    private processBundledDependencies;
    private addHarDepInsightSrcEntry;
    /**
     * 编译hap和hsp时将 ResourceTable.ts 文件路径写入到loader.json的compileEntry中
     * @param loaderJson
     * @private
     */
    private addResourceTable2CompileEntry;
    /**
     * 收集直接、间接依赖源码har的module.json的abilities/srcEntry以及extensionAbilities/srcEntry对应的文件写入到hap、hsp的loader.json中的compileEntry中
     * @private
     */
    private collectDepAbilitySrcEntryArr;
    /**
     * 将模块本地或远程依赖har模块对应的runtimeOnly的sources和packages的入口文件写入compileEntry
     * @param dep2RuntimeOnlyObj
     * @private
     */
    private pushDepRuntimeOnlyToCompileEntry;
    /**
     * 将模块本地或远程依赖har模块的worker/runtimeOnly-sources/routerMapObj-pageSourceFile的入口文件写入compileEntry
     * runtimeOnly-packages单独处理
     * @param configMap
     * @private
     */
    private pushConfigToCompileEntry;
    private shouldProcessOhExports;
    /**
     * 添加 oh-exports 中的配置到入口文件， 因为 oh-exports 中的配置可能不是main，也不在src/main 下面，这些文件也要搜集加入到编译入口中
     * @param ohExportsFilePaths oh-exports
     */
    private addOhExports2CompileEntry;
    /**
     * oh-exports 写入到 loader.json
     * @param ohExportsFilePaths oh-exports
     * @param loaderJson loader json
     */
    private writeOhExportsToLoaderJson;
    /**
     * 检查 oh-exports
     * 校验1：useNormalizedOHMUrl必须为true
     * 校验2:只允许相对路径，绝对路径，模块外路径,路径不存在,空字符串都报错
     * 校验3:文件格式过滤，只支持 ets/ts/js 后缀，对于文件直接报错，目录不报错
     * 校验4:路径重复报警告
     */
    private checkOhExports;
    /**
     * 处理har包去重
     */
    private processHarDeduplicate;
    /**
     * 添加hsp搜集到的源码har包去重的文件列表到编译入口
     */
    private addSourceHarDeduplicateFiles;
    /**
     * 合并hsp要去重的字节码har的byteCodeHarInfo 和 otherCompileFiles
     */
    private addDuplicateByteCodeHarInfoAndOtherCompileFiles;
    /**
     * 合并hsp要去重的har包信息
     */
    private addDuplicateHarInfo;
    /**
     * 搜集hsp要去重的byteCodeHarInfo 和 otherCompileFiles
     */
    private collectHspDuplicateByteCodeHarInfoAndOtherCompileFiles;
    /**
     * 处理hsp的har包去重
     */
    private processHspHarDeduplicate;
}
/**
 * 写入dynamicImportLibInfo的dynamicImport对象
 */
export interface DynamicImportObj {
    hostModulesInfo: HostModulesInfoObj[];
    moduleName: string;
    entryFilePath: string;
    isLocalDependency: boolean;
    pkgPath: string;
}
/**
 * 三方包信息对象
 */
export interface HostModulesInfoObj {
    hostDependencyName: string;
    hostModuleName: string;
}

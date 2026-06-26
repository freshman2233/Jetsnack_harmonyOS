import { UIAbility, AbilityConstant, Want } from '@kit.AbilityKit';
import { window } from '@kit.ArkUI';
import hilog from '@ohos.hilog';

export default class EntryAbility extends UIAbility {
  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
    hilog.info(0x0000, 'Jetsnack', 'EntryAbility onCreate');
  }

  onWindowStageCreate(windowStage: window.WindowStage): void {
    windowStage.loadContent('pages/Index', (err) => {
      if (err.code) {
        hilog.error(0x0000, 'Jetsnack', 'Failed to load content. %{public}s', JSON.stringify(err));
        return;
      }
      hilog.info(0x0000, 'Jetsnack', 'Succeeded in loading content.');
    });
  }

  onWindowStageDestroy(): void {
    hilog.info(0x0000, 'Jetsnack', 'EntryAbility onWindowStageDestroy');
  }

  onDestroy(): void {
    hilog.info(0x0000, 'Jetsnack', 'EntryAbility onDestroy');
  }
}

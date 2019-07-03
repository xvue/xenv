import XEnv from '@xvue/xenv';
import Binding from 'weex-bindingx/lib/index.weex.js';

export default {
  isTaobao () {
    const { appName } = weex.config.env;
    return /(tb|taobao|淘宝)/i.test(appName);
  },
  isTrip () {
    const { appName } = weex.config.env;
    return appName === 'LX';
  },
  isBoat () {
    const { appName } = weex.config.env;
    return appName === 'Boat' || appName === 'BoatPlayground';
  },
  isWeb () {
    const { platform } = weex.config.env;
    return typeof (window) === 'object' && platform.toLowerCase() === 'web';
  },
  isIOS () {
    const { platform } = weex.config.env;
    return platform.toLowerCase() === 'ios';
  },
  /**
     * 是否为 iPhone X or iPhoneXS or iPhoneXR or iPhoneXS Max
     * @returns {boolean}
     */
  isIPhoneX () {
    const { deviceModel } = weex.config.env;
    const items = ['iPhone10,3', 'iPhone10,6', 'iPhone11,8', 'iPhone11,2', 'iPhone11,6', 'iPhone11,4'];
    if (XEnv.isWeb()) {
      return typeof window !== undefined && window.screen && window.screen.width && window.screen.height &&
      ((parseInt(window.screen.width, 10) === 375) && (parseInt(window.screen.height, 10) === 812) ||
      (parseInt(window.screen.width, 10) === 414) && (parseInt(window.screen.height, 10) === 896));
    }
    return XEnv.isIOS() && items.indexOf(deviceModel) !== -1;
  },
  isAndroid () {
    const { platform } = weex.config.env;
    return platform.toLowerCase() === 'android';
  },
  isAlipay () {
    const { appName } = weex.config.env;
    return appName === 'AP';
  },
  isTmall () {
    const { appName } = weex.config.env;
    return /(tm|tmall|天猫)/i.test(appName);
  },
  isAliWeex () {
    return XEnv.isTmall() || XEnv.isTrip() || XEnv.isTaobao();
  },
  /**
     * 获取weex屏幕真实的设置高度，需要减去导航栏高度
     * @returns {Number}
     */
  getPageHeight () {
    return new Promise((resolve, reject) => {
      XEnv.getNavBarHeight().then(
        res => {
          const { env } = weex.config;
          const navHeight = res;
          const bottomSafetyDistance = XEnv.getBottomSafetyDistance();
          resolve(env.deviceHeight / env.deviceWidth * 750 - navHeight - bottomSafetyDistance)
        }, rej => {
          reject(rej)
        }
      )
    })
  },
  /** 获取顶部状态栏高度 */
  getNavBarHeight () {
    return new Promise((resolve, reject) => {
      if (XEnv.isAndroid()) {
        const statusBarModule = weex.requireModule('statusBarModule');
        statusBarModule.getStatusBarHeight(e => {
          return e / weex.config.env.deviceWidth * 750;
        });
      } else if (XEnv.isIOS()) {
        return XEnv.isIPhoneX() ? 88 : 40;
      } else {
        return 0;
      }
    });
  },
  /** 获取底部安全距离 */
  getBottomSafetyDistance () {
    return XEnv.isIPhoneX() ? 64 : 0
  },
  /**
     * 获取weex屏幕真实的设置高度
     * @returns {Number}
     */
  getScreenHeight () {
    const { env } = weex.config;
    return env.deviceHeight / env.deviceWidth * 750;
  },

  /**
     * 判断是否支持绑定
     * @returns {boolean}
     */
  supportsEB () {
    return Binding.isSupportBinding && !XEnv.isWeb();
  },

  /**
     * 判断Android容器是否支持是否支持expressionBinding(处理方式很不一致)
     * @returns {boolean}
     */
  supportsEBForAndroid () {
    return (XEnv.isAndroid()) && XEnv.supportsEB();
  },

  /**
     * 判断IOS容器是否支持是否支持expressionBinding
     * @returns {boolean}
     */
  supportsEBForIos () {
    return (XEnv.isIOS()) && XEnv.supportsEB();
  }
};

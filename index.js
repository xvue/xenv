// import XEnv from '@xvue/xenv';
export default function (weex) {
    let XEnv = {
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
        /** 判断是否在webview环境下
   * @returns {boolean}
   */
        isWebview () {
            if (XEnv.isWeb()) {
                var ua = navigator.userAgent.toLowerCase();
                if (ua.match(/MicroMessenger/i) == 'micromessenger') { // 微信浏览器判断
                    return false;
                } else if (ua.match(/QQ/i) == 'qq') { // QQ浏览器判断
                    return false;
                } else if (ua.match(/WeiBo/i) == 'weibo') {
                    return false;
                } else {
                    if (ua.match(/Android/i) != null) {
                        return ua.match(/browser/i) == null;
                    } else if (ua.match(/iPhone/i) != null) {
                        return ua.match(/safari/i) == null;
                    } else {
                        return (ua.match(/macintosh/i) == null && ua.match(/windows/i) == null);
                    }
                }
            } else {
                return false;
            }
        },
        /**
     * 是否为 iPhone X or iPhoneXS or iPhoneXR or iPhoneXS Max
     * @returns {boolean}
     */
        isIPhoneX () {
            // const { deviceModel } = weex.config.env;
            const { deviceHeight } = weex.config.env;
            // const items = ['iPhone10,3', 'iPhone10,6', 'iPhone11,8', 'iPhone11,2', 'iPhone11,6', 'iPhone11,4'];
            if (XEnv.isWeb()) {
                return typeof window !== undefined && window.screen && window.screen.width && window.screen.height &&
      ((parseInt(window.screen.width, 10) === 375) && (parseInt(window.screen.height, 10) === 812) ||
      (parseInt(window.screen.width, 10) === 414) && (parseInt(window.screen.height, 10) === 896));
            }
            return XEnv.isIOS() &&
    (deviceHeight === 2436 || deviceHeight === 2688 || deviceHeight === 1792 || deviceHeight === 1624);//
            // return  XEnv.isIOS() && items.indexOf(deviceModel) !== -1;
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
     * 获取weex屏幕真实的设置高度
     * @returns {Number}
     */
        getPageHeight (customViewport = 750) {
            return new Promise((resolve, reject) => {
                if (weex.config.env.platform.toLocaleLowerCase() === 'ios') {
                    const { env } = weex.config;
                    const defaultViewHeight = env.deviceHeight * customViewport / env.deviceWidth;
                    resolve(defaultViewHeight);
                } else {
                    const dom = weex.requireModule('dom');
                    dom.getComponentRect('viewport', (option) => {
                        if (option.result && option.size.height) {
                            resolve(option.size.height);
                        } else {
                            const { env } = weex.config;
                            const defaultViewHeight = env.deviceHeight * customViewport / env.deviceWidth;
                            resolve(defaultViewHeight);
                        }
                    });
                }
            });
        },
        /** 获取顶部状态栏高度 */
        getNavBarHeight () {
            return new Promise((resolve, reject) => {
                if (XEnv.isAndroid()) {
                    const statusBarModule = weex.requireModule('statusBarModule');
                    statusBarModule.getStatusBarHeight(e => {
                        resolve(e / weex.config.env.deviceWidth * 750);
                    });
                } else if (XEnv.isIOS()) {
                    resolve(XEnv.isIPhoneX() ? 88 : 40);
                } else {
                    resolve(0);
                }
            });
        },
        /** 获取底部安全距离 */
        getBottomSafetyDistance () {
            return XEnv.isIPhoneX() ? 64 : 0;
        },
        /**
     * 获取weex屏幕高度
     * @returns {Number}
     */
        getScreenHeight (customViewport = 750) {
            const { env } = weex.config;
            return env.deviceHeight * customViewport / env.deviceWidth;
        }

    };
    return XEnv;
}

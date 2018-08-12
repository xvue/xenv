import XUtil from '@xvue/index';
import Binding from 'weex-bindingx/lib/index.weex.js';

const XEnv = {
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
     * 是否为 iPhone X
     * @returns {boolean}
     */
    isIPhoneX () {
        const { deviceHeight } = weex.config.env;
        if (XUtil.env.isWeb()) {
            return typeof window !== undefined && window.screen && window.screen.width && window.screen.height && (parseInt(window.screen.width, 10) === 375) && (parseInt(window.screen.height, 10) === 812);
        }
        return XUtil.env.isIOS() && deviceHeight === 2436;
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
        return XUtil.env.isTmall() || XUtil.env.isTrip() || XUtil.env.isTaobao();
    },
    /**
     * 获取weex屏幕真实的设置高度，需要减去导航栏高度
     * @returns {Number}
     */
    getPageHeight () {
        const { env } = weex.config;
        const navHeight = XUtil.env.isWeb() ? 0 : (XUtil.env.isIPhoneX() ? 176 : 132);
        return env.deviceHeight / env.deviceWidth * 750 - navHeight;
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
        return Binding.isSupportBinding && !XUtil.env.isWeb();
    },

    /**
     * 判断Android容器是否支持是否支持expressionBinding(处理方式很不一致)
     * @returns {boolean}
     */
    supportsEBForAndroid () {
        return (XUtil.env.isAndroid()) && XEnv.supportsEB();
    },

    /**
     * 判断IOS容器是否支持是否支持expressionBinding
     * @returns {boolean}
     */
    supportsEBForIos () {
        return (XUtil.env.isIOS()) && XEnv.supportsEB();
    }
};

export default XEnv;

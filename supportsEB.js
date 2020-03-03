import Binding from 'weex-bindingx/lib/index.weex.js';
import XEnv from './index';
export default {
    /**
     * 判断是否支持绑定
     * @returns {boolean}
     */
    supportsEB () {
        return Binding.isSupportBinding && !XEnv(weex).isWeb();
    },
    /**
     * 判断Android容器是否支持是否支持expressionBinding(处理方式很不一致)
     * @returns {boolean}
     */
    supportsEBForAndroid () {
        return (XEnv(weex).isAndroid()) && XEnv(weex).supportsEB();
    },
    /**
     * 判断IOS容器是否支持是否支持expressionBinding
     * @returns {boolean}
     */
    supportsEBForIos () {
        return (XEnv(weex).isIOS()) && XEnv(weex).supportsEB();
    }
};

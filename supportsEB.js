import Binding from 'weex-bindingx/lib/index.weex.js';
import XEnv from './index';
/**
 * 判断是否支持绑定
 * @returns {boolean}
 */
function supportsEB () {
    return Binding.isSupportBinding && !XEnv(weex).isWeb();
}
/**
 * 判断Android容器是否支持是否支持expressionBinding(处理方式很不一致)
 * @returns {boolean}
 */
function supportsEBForAndroid () {
    return (XEnv(weex).isAndroid()) && supportsEB();
}
/**
 * 判断IOS容器是否支持是否支持expressionBinding
 * @returns {boolean}
 */
function supportsEBForIos () {
    return (XEnv(weex).isIOS()) && supportsEB();
}
export default {
    supportsEB,
    supportsEBForAndroid,
    supportsEBForIos
};

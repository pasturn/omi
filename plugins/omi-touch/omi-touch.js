/*!
 *  omi-touch v0.1.0 by dntzhang
 *  AlloyTouch / Omi integration. Smooth scrolling, rotation, pull to refresh, page transition and any motion for your Omi project.
 *  Github: https://github.com/AlloyTeam/omi
 *  MIT Licensed.
 */

;(function () {

    var OmiTouch = {};
    var AlloyTouch = typeof require === 'function' ? require('alloytouch') : window.AlloyTouch;
    var Transform = typeof require === 'function' ? require('css3transform') : window.Transform;
    var Omi = typeof require === 'function' ? require('omi') : window.Omi;

    var noop = function(){

    };

    var getHandler = function(name, dom, instance) {
        var value = dom.getAttribute(name);
        if (value === null) {
            return noop;
        }else{
            return instance[value].bind(instance);
        }
    };

    var getNum = function(name, dom){
        var value = dom.getAttribute(name);
        if(value){
            return parseFloat(value);
        }
    }

    OmiTouch.init = function(){
        Omi.extendPlugin('omi-touch',function(dom, instance){
            var target = instance.refs[ dom.getAttribute('motionRef')];
            Transform(target);
            var initialValue = dom.getAttribute('initialValue');
            if(initialValue){
                target[dom.getAttribute('property') || "translateY"] = parseInt(initialValue);
            }

            new AlloyTouch({
                touch: dom,//����������dom
                vertical: dom.getAttribute('vertical') === 'false' ? false : true,//�����裬Ĭ����true���������ֱ����touch
                target: target, //�˶��Ķ���
                property: dom.getAttribute('property') || "translateY",  //���˶�������
                min:  getNum('min', dom), //������,�˶����Ե���Сֵ
                max:  getNum('max', dom), //������,�������Ե����ֵ
                sensitivity: getNum('sensitivity', dom) ,//������,��������������ȣ�Ĭ��ֵΪ1������Ϊ����
                factor: getNum('factor', dom) ,//������,��ʾ����λ���뱻�˶�����ӳ���ϵ��Ĭ��ֵ��1
                step: getNum('step', dom),//����У����step��������
                bindSelf: dom.getAttribute('bindSelf') === 'true' ? true : false,
                change: getHandler('change', dom, instance),
                touchStart: getHandler('touchStart', dom, instance),
                touchMove: getHandler('touchMove', dom, instance),
                touchEnd: getHandler('touchEnd', dom, instance),
                tap: getHandler('tap', dom, instance),
                pressMove: getHandler('pressMove', dom, instance),
                animationEnd: getHandler('animationEnd', dom, instance)
            })
        });
    }

    if (typeof exports == "object") {
        module.exports = OmiTouch;
    } else if (typeof define == "function" && define.amd) {
        define([], function(){ return OmiTouch });
    } else {
        window.OmiTouch = OmiTouch;
    }

})();
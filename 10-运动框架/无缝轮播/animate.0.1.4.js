/*
* obj 表示运动的对象
* myJSON    表示目标值
* time  表示运动持续的时间
* 新增函数重载
* */
/*
* 第一个参数t    表示当前帧编号(count)
* 第二个参数b    表示起始位置
* 第三个参数c    表示变化量
* 第四个参数d    表示总帧数
*
* 返回值就是t这一帧当前应该在的位置
*
* */
function animate(obj,myJSON,time,TweenString,callBack) {
    /*函数重载*/
    console.log(arguments);
    if(arguments.length === 3){
        TweenString = "Linear";
    }else if(arguments.length === 4){
        switch (typeof arguments[3]){
            case "string" :
                break;
            case "function" :
                callBack = arguments[3];
                TweenString = "Linear";
                break;
        }
    }

    var startJSON = {}; /*存所有属性开始的值*/  //起始位置
    var targetJSON = {}; /*存所有属性目标值*/
    var maxCount = time/20;  //执行的最大次数  总帧数
    var count = 0;   //当前帧编号
    var deltaJSON = {};  //变化量
     obj.isanimate=true;

    for (var k in myJSON) {
        startJSON[k] = parseFloat(getStyle(obj,k)); //获取所有属性值初始值
        targetJSON[k] = parseFloat(myJSON[k]);  //获取所有用户传进来的属性以及值
        deltaJSON[k] = targetJSON[k] - startJSON[k];  //获取变化量
    }


    /*至此，我们得到了三个重要的json
    console.log(startJSON);
    console.log(targetJSON);
    console.log(deltaJSON);*/
    var timer = setInterval(function () {
        for (var k in myJSON) {
            var number = Tween[TweenString](count,startJSON[k],deltaJSON[k],maxCount);
            if(k === "opacity"){
                obj.style[k] = number;
                obj.style.filter = "alpha(opacity = "+number*100+")";
            }
            obj.style[k] = number + "px";
        }
        count++;
        if(count === maxCount){
            for (var k in myJSON) {
                if(k === "opacity"){
                    obj.style[k] = targetJSON[k];
                    obj.style.filter = "alpha(opacity = "+targetJSON[k]*100+")";
                }
                obj.style[k] = targetJSON[k] + "px";
            }
            callBack && callBack.call(obj);
            // if(callBack){
            //     callBack();
            // }
            clearInterval(timer);
            obj.isanimate=false;
        }
    },20);

    function getStyle(obj,property) {
        return obj.currentStyle ? obj.currentStyle[property] : getComputedStyle(obj)[property];
    }

    var Tween = {
        Linear: function(t, b, c, d) {
            return c * t / d + b;
        },
        //二次的
        QuadEaseIn: function(t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        QuadEaseOut: function(t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        QuadEaseInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        },
        //三次的
        CubicEaseIn: function(t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        CubicEaseOut: function(t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        CubicEaseInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        },
        //四次的
        QuartEaseIn: function(t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        },
        QuartEaseOut: function(t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },
        QuartEaseInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        },
        QuartEaseIn: function(t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        QuartEaseOut: function(t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        },
        QuartEaseInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        },
        //正弦的
        SineEaseIn: function(t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },
        SineEaseOut: function(t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        },
        SineEaseInOut: function(t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        },
        ExpoEaseIn: function(t, b, c, d) {
            return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        },
        ExpoEaseOut: function(t, b, c, d) {
            return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        },
        ExpoEaseInOut: function(t, b, c, d) {
            if (t == 0) return b;
            if (t == d) return b + c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        },
        CircEaseIn: function(t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        CircEaseOut: function(t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        },
        CircEaseInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        },
        ElasticEaseIn: function(t, b, c, d, a, p) {
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            if (!a || a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        },
        ElasticEaseOut: function(t, b, c, d, a, p) {
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            if (!a || a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
        },
        ElasticEaseInOut: function(t, b, c, d, a, p) {
            if (t == 0) return b;
            if ((t /= d / 2) == 2) return b + c;
            if (!p) p = d * (.3 * 1.5);
            if (!a || a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else var s = p / (2 * Math.PI) * Math.asin(c / a);
            if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
        },
        //冲过头系列
        BackEaseIn: function(t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        BackEaseOut: function(t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        BackEaseInOut: function(t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        },
        //弹跳系列
        BounceEaseIn: function(t, b, c, d) {
            return c - Tween.BounceEaseOut(d - t, 0, c, d) + b;
        },
        BounceEaseOut: function(t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            } else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        },
        BounceEaseInOut: function(t, b, c, d) {
            if (t < d / 2) return Tween.BounceEaseIn(t * 2, 0, c, d) * .5 + b;
            else return Tween.BounceEaseOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
        }
    }
}
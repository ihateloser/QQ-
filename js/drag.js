/**
 * Created by MengL on 16/4/14.
 */
function getByclas(clsName,parent){            //通过类名来获取元素,parent可有可无
    var oParent = parent?document.getElementById(parent):document;//如果传入了parent,那么赋值,如果没有,那么就从整个document里面开始找
    var eles=[],
        elements = oParent.getElementsByTagName('*'); //获取到父元素下面所有的元素
    for(var i = 0,l = elements.length;i<l;i++){  //在父元素下面的所有元素中遍历类名等于clsName的元素,如果等于,那就放入到数组里面
        if(elements[i].className==clsName){
            eles.push(elements[i]);
        }
    }
    return eles;
}
window.onload = drag;
function drag(){
    var oTitle = getByclas('login_logo_webqq','loginPanel')[0];
    oTitle.onmousedown = fndown;//鼠标按下时执行fndown函数
    
    
    var oClose = document.getElementById('ui_boxyClose');
    oClose.onclick = function () {
        document.getElementById('loginPanel').style.display='none';
    }

}
function fndown(event){
    event = event || window.event;
    var panel = document.getElementById('loginPanel');//得到这个面板,注意,这个面板必须得是绝对定位的,才能改变top,left
    var disX=event.clientX-panel.offsetLeft,//光标按下时,光标和面板的距离
        disY=event.clientY-panel.offsetTop;
    //移动
    document.onmousemove=function(event){
        event = event || window.event;
        fnMove(event,disX,disY);
    }
    //释放
    document.onmouseup=function(event){
        document.onmousemove=null;//释放鼠标的时候不要跟着做了,也就是等于null
        document.onmouseup=null;
    }

    //切换状态
    var loginState = document.getElementById('loginState'),
        stateList = document.getElementById('loginStatePanel'),//ul
        lis=stateList.getElementsByTagName('li'),
        stateTxt = document.getElementById('login2qq_state_txt');

    loginState.onclick = function(){
        alert("hello");
        stateList.style.display='block';
    }

    //鼠标划过时,离开点击状态列表时
    for(var i = 0;i<lis.length;i++){
        lis[i].onmouseover=function(){
            this.style.background='#567';
        }
        lis[i].onmouseout=function(){
            this.style.background='#fff';
        }
    }
}


function fnMove(e,posX,posY){
    var panel = document.getElementById('loginPanel');
    var l = e.clientX-posX;
    var t= e.clientY-posY;
    var winW = document.documentElement.clientWidth ||document.body.clientWidth,
        winH = document.documentElement.clientHeight ||document.body.clientHeight,
        maxW = winW - panel.offsetWidth-10,
        maxH = winH - panel.offsetHeight;
    if(l<0){
        l=0;
    }else if(l>maxW){
        l=maxW;
    }
    if(t<0){
        t=0;
    }else if(t>maxH){
        t=maxH;
    }
    panel.style.left=l+'px';
    panel.style.top=t+'px';
}
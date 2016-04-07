var modle=(function(){//私有作用域
//添加按钮
var oUl=document.getElementsByTagName('ul')[0];
var oBtn1=document.createElement('span');
var oBtn2=document.createElement('span');
var oImg1=document.createElement('img');
var oImg2=document.createElement('img');
oImg1.src='img/left.png';
oImg2.src='img/right.png';
oImg1.className='img';
oImg2.className='img';
oBtn1.className='btn';
oBtn2.className='btn';
var arr=[];//存图片的各项属性
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}
	else{
		return getComputedStyle(obj,false)[attr];
	}
}
function show(num,showWidth,showHeight,singleWidth){
//num是要显示的个数 showWidth是插件宽度  showHeight是插件高度
//定义插件的宽高
var outBox=document.getElementsByTagName('ul')[0];
outBox.style.width=showWidth+'px';
outBox.style.height=showHeight+'px';
//先布局
var middleIndex=Math.floor(num/2);// 找到中间照片的位置
console.log(middleIndex,'中间点');
var oLi=document.getElementsByTagName('li');
(function(){
	for(var k=0;k<oLi.length;k++){
	oLi[k].style.width=singleWidth+'px';
}
})();
//中间盒子照片定位  水平居中
var middle=oLi[middleIndex];
middle.style.height=showHeight+'px';
middle.style.left=0.5*outBox.offsetWidth-0.5*singleWidth+'px';

oBtn1.style.left=middle.offsetLeft+'px';
oBtn2.style.left=middle.offsetLeft+singleWidth-60+'px';
oBtn1.style.top=middle.offsetTop+middle.offsetHeight*0.5-20+'px';
oBtn2.style.top=middle.offsetTop+middle.offsetHeight*0.5-20+'px';
oUl.appendChild(oBtn1);
oUl.appendChild(oBtn2);
oBtn1.appendChild(oImg1);
oBtn2.appendChild(oImg2);
//布局
var long=(outBox.offsetWidth-singleWidth)*0.5;//剩余                            的可以排列图片的地方
var speedX=long/middleIndex;
var speedY=(outBox.offsetHeight-200)*0.5/middleIndex;//图片最矮为200px
	
(function(){
	var moveX=speedX;
	var moveY=speedY;
	var index=0;
	for(var i=middleIndex-1;i>=0;i--){		
	oLi[i].style.left=middle.offsetLeft-moveX+'px';
	oLi[i].style.height=middle.offsetHeight-moveY*2+'px';
	oLi[i].style.top=middle.offsetTop+moveY+'px';
	index=index-1;
	oLi[i].style.zIndex=index;
	oLi[i].style.opacity=(i+1)*0.26;
	moveX=moveX+speedX;
	moveY=moveY+speedY;
}
})();

(function(){
	var moveX=speedX;
	var moveY=speedY;
	var index=0;
	for(var i=middleIndex+1;i<num;i++){
	oLi[i].style.left=middle.offsetLeft+moveX+'px';
	oLi[i].style.height=middle.offsetHeight-moveY*2+'px';
	oLi[i].style.top=middle.offsetTop+moveY+'px';
	index=index-1;
	oLi[i].style.zIndex=index;
	oLi[i].style.opacity=(num-i)*0.26;
	moveX=moveX+speedX;
	moveY=moveY+speedY;
}
})();
//图片轮播效果
//对于非行间样式 用style不能获得？opacity在单独写的时候可以获取到，但是在这里用函数获取不到，而用的是style.opacity
(function(){
		for(var i=0;i<num;i++){
		console.log(getStyle(oLi[i],'opacity'),i);
		arr.push([oLi[i].offsetLeft,oLi[i].offsetTop,getStyle(oLi[i],'zIndex'),oLi[i].style.opacity,oLi[i].offsetHeight]);
	}
	})();
	oBtn1.onclick=function(){
		arr.unshift(arr[arr.length-1]);
		arr.pop();
		for(var i=0;i<num;i++){
			oLi[i].style.left=arr[i][0]+'px';
			oLi[i].style.top=arr[i][1]+'px';
			oLi[i].style.zIndex=arr[i][2];
			console.log(arr[i][3],i);
			oLi[i].style.opacity=arr[i][3];
			oLi[i].style.height=arr[i][4]+'px';
		}
	}
	oBtn2.onclick=function(){		
		arr.push(arr[0]);
		arr.shift();
		for(var i=0;i<num;i++){
			oLi[i].style.left=arr[i][0]+'px';
			oLi[i].style.top=arr[i][1]+'px';
			oLi[i].style.zIndex=arr[i][2];
			oLi[i].style.opacity=arr[i][3];
			oLi[i].style.height=arr[i][4]+'px';
		}
	}
}
return {
	method1:getStyle,
	method2:show
};
})();
//引入js文件
document.write('<script src="js/jquery-3.1.1.min.js" type="text/javascript"></script>');
document.write('<script src="js/util.js" type="text/javascript"></script>');
document.write('<script src="js/jQuery.md5.js" type="text/javascript"></script>');
document.write('<script src="js/share.js" type="text/javascript"></script>');
document.write('<script src="js/layFun.js" type="text/javascript"></script>');
document.write('<script src="js/layer.js" type="text/javascript"></script>');
document.write('<script src="js/cookie.js" type="text/javascript" ></script>');
document.write('<script src="js/iscroll.js" type="text/javascript" ></script>');


//isPhone4inches = (window.screen.height==480);
//isPhone5inches = (window.screen.height==568);
//isPhone6inches = (window.screen.height==667);
//isPhone6pinches = (window.screen.height==736);


//toast定时
//修改人：周文丽
//修改时间 ：2017/4/14
//修改内容：toast内容以及样式

var t = 3;
function toast(status) {
	console.log(t);
	$(".toast_z").show();
	$(".toast_z .toast-su").html(status);
	var i = setTimeout(toast, 1000);
	t--;
	if(t <= 0) {
		$(".toast_z").hide();
		clearTimeout(i);
	}
}


//下拉刷新,上拉加载功能

var num = 0;
var myScroll,
	pullDownEl, pullDownOffset,
	pullUpEl, pullUpOffset,
	generatedCount = 0;

//var o = document.getElementById("fixed-content");
//var h = o.offsetHeight;  //高度
//console.log(h);



function scroll() {
	document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
	document.addEventListener('DOMContentLoaded', function() { setTimeout(loaded, 200); }, false);

}

function pullDownAction() {
	setTimeout(function() { 
		num = 0;
		console.log(num + "666")
		var el, li, i;
		el = document.getElementById('thelist');
		el.innerHTML = '';
		reqData(0);
		myScroll.refresh();
	}, 200); 
}

function pullUpAction() {
	setTimeout(function() {
		console.log(num + "777")
		num++;
		reqData(num);
		myScroll.refresh(); 
		setTimeout(function() { $("#pullUp").hide(); }, 1000);
		
	}, 200); 
					
}

function loaded() {
	pullDownEl = document.getElementById('pullDown');
	console.log(pullDownEl)
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp');
	pullUpOffset = pullUpEl.offsetHeight;
	console.log(pullUpOffset)

	myScroll = new iScroll('wrapper', {
		//					useTransition: true,

		topOffset: pullDownOffset,
		onRefresh: function() {
			if(pullDownEl.className.match('loading')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拽重新刷新';
			} else if(pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多';
			}
		},
		onScrollMove: function() {
			//						console.log("this.y ="+this.y );
			//						console.log("maxScrollY="+this.maxScrollY);
			//						console.log("minScrollY="+this.minScrollY);
			if(this.y > 5 && !pullDownEl.className.match('flip')) {
				pullDownEl.className = 'flip';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拽中';
				this.minScrollY = 0;
			} else if(this.y < 5 && pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拽重新刷新...';
				this.minScrollY = -pullDownOffset;
			} else if(this.y < (this.maxScrollY -5) && !pullUpEl.className.match('flip')) {
				console.log("maxScrollY="+(this.maxScrollY-5));
				console.log("this.y ="+this.y );
				
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉中';
				this.maxScrollY = this.maxScrollY;
				$("#pullUp").show()
			} else if(this.y > (this.maxScrollY +5) && pullUpEl.className.match('flip')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
				this.maxScrollY = pullUpOffset;

			}
		},
		onScrollEnd: function() {
			if(pullDownEl.className.match('flip')) {
				pullDownEl.className = 'loading';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '刷新中...';
				pullDownAction(); // Execute custom function (ajax call?)
			} else if(pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
				pullUpAction(); // Execute custom function (ajax call?)

			}
		}
		
	});
	console.log(myScroll.options)
	console.log(myScroll.maxScrollX + '&' + myScroll.maxScrollY);

	setTimeout(function() { document.getElementById('wrapper').style.left = '0'; }, 200);
}
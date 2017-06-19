var dheight=window.innerHeight;
var layObj = {
	'open': function(url, width, height, title, callback, closeCallback) {
		callback = callback ? callback : false;
		closeCallback = closeCallback ? closeCallback : false;
		console.log(dheight);
		if(dheight<650){
			layer.open({
				type: 2,
				title: title,
				shadeClose: true,
				shade: 0.8,
				area: [width + 'px', height + 'px'],
				fix: false,
				offset: '100px',
				content: url,
				success: function(layero, index) {
					if(callback) {
						callback(layero, index);
					}
				},
				end : function(){
					if(closeCallback){
						closeCallback();
					}
				}
			});
		}else{
			layer.open({
				type: 2,
				title: title,
				shadeClose: true,
				shade: 0.8,
				area: [width + 'px', height + 'px'],
				fix: true,
				content: url,
				success: function(layero, index) {
					if(callback) {
						callback(layero, index);
					}
				},
				end : function(){
					if(closeCallback){
						closeCallback();
					}
				}
			});
		}

	},
	'layerPost': function(url, width, height, title, postData, contentUrl, callback) {
		//Ajax获取
		$.post(url, postData, function() {
			if(dheight<650){
				layer.open({
					type: 2,
					title: title,
					shadeClose: true,
					shade: 0.8,
					area: [width + 'px', height + 'px'],
					fix: false,
					offset: '100px',
					content: contentUrl,
					success: function(layero, index) {
						if(callback) {
							callback(layero, index);
						}
					}
				});
			}else{
				layer.open({
					type: 2,
					title: title,
					shadeClose: true,
					shade: 0.8,
					area: [width + 'px', height + 'px'],
					fix: false,
					content: contentUrl,
					success: function(layero, index) {
						if(callback) {
							callback(layero, index);
						}
					}
				});
			}

		});
	},
	'notice': function(url, width, height, title, callback) {
		layer.open({
			type: 2,
			title: false,
			shadeClose: true,
			shade: 0.8,
			area: [width + 'px', height + 'px'],
			content: url,
			fix: false,
			skin: 'notitleClass',
			success: function(layero, index) {
				if(callback) {
					callback(layero, index);
				}
			}
		});
	},
	'content': function(width, height, title, contentHtml, skin, callback) {
		skin = skin ? skin : '';
		if(dheight<650){
			layer.open({
				type: 1,
				title: title,
				skin: skin,
				fix: false,
				area: [width + 'px', height + 'px'], //宽高
				content: contentHtml,
				offset: '100px',
				success: function(layero,index) {
					if(callback) {
						callback(layero,index);
					}
				}
			});
		}else{
			layer.open({
				type: 1,
				title: title,
				skin: skin,
				fix: false,
				area: [width + 'px', height + 'px'], //宽高
				content: contentHtml,
				success: function(layero,index) {
					if(callback) {
						callback(layero,index);
					}
				}
			});
		}

	},
	msg: function(msg) {
		layer.msg(msg);
	},
	confirm: function(msg, title,width,height,skin, yesFun, noFun) {
		//询问框
		layer.confirm(msg, {
			title: title,
			area: [width + 'px', height + 'px'],
			skin:skin,
			fix: false,
			btn: [yesFun.msg, noFun.msg] //按钮
		}, function(index) {
			yesFun.callback(index);
//			layer.close(index);
		}, function(index) {
			noFun.callback(index);
//			layer.close(index);
		});
	}
}
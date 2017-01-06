window.onload = function () {
	var userType = sessionStorage.getItem('userType')
	var uid = userType == 'student' ? sessionStorage.getItem('stuId') : sessionStorage.getItem('teacId')
	var username = sessionStorage.getItem('username')
	console.log(userType)

	// 根据用户类型显示
	if (userType == 'teacher') {
		$('.teacherOnly').removeClass('teacherOnly')
	} else {
		$('.studentOnly').removeClass('studentOnly')
	}

	// 作业平台
	// 首页加载作业
	fetch('/allHW', {
		method: 'post',
		headers: {
	    'Content-Type': 'application/json'
	  },
		body: JSON.stringify({
			userType: userType,
			id: uid
		})
	}).then(function(res) {
		return res.json()
	}).then(function (json) {
		if (userType == 'student') {
			handleShowHW(json, uid, username)
		} else {
			handleTeacShowHW(json, uid, username)
		}
	})
	// 作业类型切换
	$('.showHW').click(function() {
		$('.tableList.tableHead').css({'display':'table-row'})
		$('.showHW').attr('class', 'showHW')
		$(this).addClass('targetItem')
		var type = $(this).attr('id')
		console.log(type)
		$('.publichView').css({'display':'none'})
		if(userType == 'student' || type == 'teacherAllHW') {
			if (type == 'teacherAllHW') {
				type = 'allHW'
			}
			fetch(type, {
				method: 'post',
				headers: {
			    'Content-Type': 'application/json'
			  },
				body: JSON.stringify({
					userType: userType,
					id: uid
				})
			}).then(function(res) {
				console.log(res)
				return res.json()
			}).then(function (json) {
				if (userType == 'student') {
					handleShowHW(json, uid, username)
				} else {
					handleTeacShowHW(json, uid, username)
				}
			})
		}
		
	})
	// 老师发布作业
	$('#publichHW').click(function() {
		var tableHead = $('.tableList.tableHead')
		$(tableHead).nextAll().remove()
		$('.tableList.tableHead').css({'display':'none'})
		$('.publichView').css({'display':'block'})

		$('#publichHWBtn').click(function(e) {
			var hwTitle = $('#hwTitle').val()
			var hwContent = $('#hwContent').val()
			var deadline = $('#deadline').val()
			console.log(deadline)
			if (hwTitle == '' || hwContent == '' || deadline == '') {
				alert('请填写完整作业内容在提交')
			} else {
				fetch('/publichHW', {
					method: 'post',
					headers: {
				    'Content-Type': 'application/json'
				  },
					body: JSON.stringify({
						id: uid,
						hwTitle: hwTitle,
						hwContent: hwContent,
						deadline: deadline
					})
				}).then(function(res) {
					return res.json()
				}).then(function (json) {
					console.log(json)
				}).catch(function() {
					console.log('冷静一下')
				})
			}
		})
	})

	// 话题社区
	// 加载话题内容
	fetch('/allTopic', {
		method: 'post',
		headers: {
	    'Content-Type': 'application/json'
	  },
		body: JSON.stringify({
			id: uid,
			count: 10
		})
	}).then(function(res) {
		return res.json()
	}).then(function (json) {
		console.log(json)
		handleShowTopic(json, uid, username, userType)
	})

	// 老师发表话题
	$('.publish').click(function(e) {
		var topicTitle = $('#topicTitle').val()
		var topicContent = $('#topicContent').val()
		var myDate = new Date();
		var datetime = myDate.getFullYear()+'-'+(myDate.getMonth()+1)+'-'+myDate.getDate()+' '+myDate.getHours()+':'+myDate.getMinutes()+':'+myDate.getSeconds();
		if (topicTitle == '' || topicContent == '') {
			alert('请输入话题标题和内容')
		} else {
			fetch('/addTopic', {
				method: 'post',
				headers: {
			    'Content-Type': 'application/json'
			  },
				body: JSON.stringify({
					id: uid,
					topicTitle: topicTitle,
					topicContent: topicContent,
					datetime: datetime
				})
			}).then(function(res) {
				return res.json()
			}).then(function (json) {
				if(json.code == 200) {
					// 显示话题
					var text ='<div>' +
						    			'<div class="listItem">' +
							    			'<a href=""><strong>' + topicTitle + '</strong></a>' +
							    		'</div>' +
							    		'<button class="deleteTopic btn btn-default" style="float: right;position: relative;top: -45px;">删除话题</button>' +
						    			'<p>发布人：'+ username +' | 发布时间：' + datetime + '</p>' +
						    			'<hr>' +
						    		'</div>'
					$(text).insertBefore($('.discussContent').children().first());
					$('#topicTitle').val('');
					$('#topicContent').val('');
					// 删除话题
					$('.deleteTopic').click(function(e) {
						var topicId = $(this).prev().prev().text()
						var $_this = $(this)
						fetch('/deleteTopic', {
							method: 'post',
							headers: {
						    'Content-Type': 'application/json'
						  },
							body: JSON.stringify({
								id: topicId
							})
						}).then(function(response) {
							return response.json()
						}).then(function (json) {
							console.log(json)
							$_this.parent().remove()
						})
					})
				}
			})
		}
	})

	$('#myTabs a').click(function (e) {
	  e.preventDefault();
	  $(this).tab('show');
	});

	$('#loginOut').click(function (e) {
		sessionStorage.clear();
		window.location.href='login.html';
	});

	$('.editPassword').click(function (e) {
		console.log($('.unshow'));
		$('.unshow').each(function () {
			$(this).css('display', 'block');
		});
		$('.editPassword')[0].style.display = 'none';
	});

	$('.ensureChange').click(function (e) {
		if($('#newPassword').val() !== $('#newEnsurePassword').val()) {
			alert('两次密码输入不一致');
		} else {
			$('.unshow').each(function () {
				$(this).css('display', 'none');
			});
			$('.editPassword')[0].style.display = 'inline-block';
			$('.editPassword').prev('dd').text($('#newPassword').val());
		}
	});

	// 个人信息
	$('#uid').val(uid)
	$('#username').val(username)
	$('#password').val(sessionStorage.getItem('password'))
	$('#email').val(sessionStorage.getItem('email'))
	$('#age').val(sessionStorage.getItem('age'))
	if (sessionStorage.getItem('sex') == '男') {
		$("input[type='radio'][value='男']").attr("checked", true);
	} else if (sessionStorage.getItem('sex') == '女') {
		$("input[type='radio'][value='女']").attr("checked", true);
	}
	$('#showId').text(uid)
	$('#showName').text(username)
	$('.editButton').click(function(e) {
		$('input[type="text"], input[type="number"], input[type="email"], input[type="password"]').attr("readonly","readonly").css({'border':'0', 'box-shadow':'none'})
		$($(this)[0].parentNode).find('input').removeAttr("readonly").css({'border':'1px solid #ccc', 'box-shadow':'inset 0 1px 1px rgba(0,0,0,.075)'})
	})

	// 提交修改
	$('#submitEdit').click(function() {
		var username = $('#username').val();
		var email = $('#email').val();
		var password = $("input[type='password']").val();
		if(!password) {
			alert('密码不能为空');
			return ;
		}
		var age = $("input[type='number']").val();
		var sex = $("input[type='radio']:checked").val() ? $("input[type='radio']:checked").val() : '';
		fetch('/updateInfo', {
			method: 'post',
			headers: {
		    'Content-Type': 'application/json'
		  },
			body: JSON.stringify({
				userType: userType,
				id: uid,
				username: username,
				email: email,
				password: password,
				age: age,
				sex: sex
			})
		}).then(function(response) {
			return response.json()
		}).then(function (json) {
			console.log(json)
			if (json.code == 500) {
				alert(json.msg)
			} else {
				var info = json.info
				if (userType === 'student') {
					sessionStorage.setItem('stuId', info.stuId);
				} else {
					sessionStorage.setItem('teacId', info.teacId);
				}
				sessionStorage.setItem('userType', userType);
				sessionStorage.setItem('password', info.password);
				sessionStorage.setItem('username', info.username);
				sessionStorage.setItem('email', info.email);
				sessionStorage.setItem('sex', info.sex);
				sessionStorage.setItem('age', info.age);
			}
		})
	})

	// 放弃修改
	$('#resetEdit').click(function() {
		$('#username').val(sessionStorage.getItem('username'))
		$('#password').val(sessionStorage.getItem('password'))
		$('#email').val(sessionStorage.getItem('email'))
		$('#age').val(sessionStorage.getItem('age'))
		if (sessionStorage.getItem('sex') == '男') {
			$("input[type='radio']:first").attr("checked", true);
		} else if (sessionStorage.getItem('sex') == '女') {
			$("input[type='radio']:second").attr("checked", true);
		}
	})
};
function handleTeacShowHW(json, uid, username) {
	var infoArray = json.info
	var tableHead = $('.tableList.tableHead')
	$(tableHead).nextAll().remove();
	infoArray.forEach(function(item) {
		var deadline = item.deadline.slice(0, 10)
		var uploadTime = item.uploadTime ? item.uploadTime.slice(0, 10) : ''
		var title = item.title
		var path = item.path
		console.log(path)
		tableHead.after('<tr class="tableList"><td>'+title+'</td><td>'+username+'</td>' +
			'<td>'+deadline+'</td><td>'+uploadTime+'</td>' +
		'<td><a href="./homework' + path +'" class="downloadHW">下载</a></form></td></tr>')
	})
	$('.downloadHW').click(function(e) {
		e.preventDefault()
		var path = $(this).attr('href')
		if(path == './homework') {
			alert('该作业还没提交')
		} else {
			downloadFile(path.slice(10))
		}
	})
}
function handleShowHW(json, uid, username) {
	var infoArray = json.info
	var tableHead = $('.tableList.tableHead')
	$(tableHead).nextAll().remove();
	infoArray.forEach(function(item) {
		var deadline = item.deadline.slice(0, 10)
		var uploadTime = item.uploadTime ? item.uploadTime.slice(0, 10) : ''
		var title = item.title
		tableHead.after('<tr class="tableList"><td>'+title+'</td><td>'+username+'</td>' +
			'<td>'+deadline+'</td><td>'+uploadTime+'</td>' +
		'<td><form action="/hw" method="post" enctype="multipart/form-data"><a class="fileInputA">上传<input name="homework" type="file"></a>' + 
		'<p class="showFileName"></p><input type="submit" class="toggleClass submitHW btn btn-link"></form></td></tr>')
	})
	// 保存作业路径
	var fileName, title
	$(".fileInputA").on("change","input[type='file']",function(){
		title = $(this).parents('.tableList').children(':first').text()
    var filePath=$(this).val();
    var arr=filePath.split('\\');
    fileName=arr[arr.length-1];
    $(this)[0].parentNode.nextSibling.innerHTML = fileName
    $(this).parents('form').children(':last').toggleClass('toggleClass')
    console.log($(this).parents('form').children(':last'))
	})
	// 添加对提交按钮的监听
	$('.submitHW').click(function (e) {
		var myDate = new Date()
		var uploadTime = myDate.getFullYear()+'-'+(myDate.getMonth()+1)+'-'+myDate.getDate()
		console.log($(this))
			fetch('/submitHW', {
				method: 'post',
				headers: {
			    'Content-Type': 'application/json'
			  },
				body: JSON.stringify({
					id: uid,
					title: title,
					uploadTime: uploadTime,
					hwPath: fileName
				})
			}).then(function(response) {
				return response.json()
			}).then(function (json) {
				console.log(json)	
			})
		$(this).prev().text('')
		$(this).toggleClass('toggleClass')
	})
}
function handleShowTopic(json, uid, username, userType) {
	var infoArray = json.info
	infoArray.forEach(function(item) {
		var topicId = item.topicId
		var topicTitle = item.title
		var publicer = item.username
		var datetime = item.startTime

		// 显示话题
		var text ='<div>' +
								'<div class="topicId" style="display:none">'+topicId+'</div>' +
			    			'<div class="listItem">' +
				    			'<a class="showTopic" href="javascript:void(0)"><strong>' + topicTitle + '</strong></a>' +
				    		'</div>' +
			    			'<p>发布人：'+ publicer +' | 发布时间：' + datetime + '</p>' +
			    			'<hr>' +
			    		'</div>'
		if (publicer == username) {
			// 添加删除按钮
			var text ='<div>' +
									'<div class="topicId" style="display:none">'+topicId+'</div>' +
				    			'<div class="listItem">' +
					    			'<a class="showTopic" href="javascript:void(0)"><strong>' + topicTitle + '</strong></a>' +
					    		'</div>' +
					    		'<button class="deleteTopic btn btn-default" style="float: right;position: relative;top: -45px;">删除话题</button>'+
				    			'<p>发布人：'+ publicer +' | 发布时间：' + datetime + '</p>' +
				    			'<hr>' +
				    		'</div>'
		}
		$('.discussContent').prepend(text)
	})
	// 删除话题
	$('.deleteTopic').click(function(e) {
		var topicId = $(this).prev().prev().text()
		var $_this = $(this)
		fetch('/deleteTopic', {
			method: 'post',
			headers: {
		    'Content-Type': 'application/json'
		  },
			body: JSON.stringify({
				id: topicId
			})
		}).then(function(response) {
			return response.json()
		}).then(function (json) {
			console.log(json)
			console.log($(this).parent())
			$_this.parent().remove()
		})
	})

	// 监听查看话题内容
	$('.showTopic').click(function (e) {
		var topicId = $(this).parent().prev().text()
		var topicTitle = $(this).text()
		var publishMSG = $(this).parent().next().text()
		console.log(publishMSG)
		$('.discussContent').html('')
		fetch('/getTopicDetail', {
			method: 'post',
			headers: {
		    'Content-Type': 'application/json'
		  },
			body: JSON.stringify({
				id: topicId,
				count: 10
			})
		}).then(function(response) {
			return response.json()
		}).then(function (json) {
			console.log(json)
			var infoArray = json.info
			if (infoArray.length == 0) {
				fetch('/getTopicContent', {
					method: 'post',
					headers: {
				    'Content-Type': 'application/json'
				  },
					body: JSON.stringify({
						id: topicId
					})
				}).then(function(response) {
					return response.json()
				}).then(function(json) {
					console.log(json)
					var topicContent = json.info[0].content
					// 显示详细话题内容
					var textHeader ='<h3>' + topicTitle + '</h3>' +
													'<button id="backTopicList" class="btn btn-default" style="float: right;position: relative;top: -45px;"><返回话题列表</button>' +
					    						'<p class="contentShow">' + topicContent + '</p>' +
									    		'<p class="rightMin">' + publishMSG + '</p>'
					$('.discussContent').prepend(textHeader)
					// 乱来了有时间再来改这些垃圾代码
					$('#backTopicList').click(function(e) {
			    	$('.discussContent').html('')
			    	fetch('/allTopic', {
							method: 'post',
							headers: {
						    'Content-Type': 'application/json'
						  },
							body: JSON.stringify({
								id: uid,
								count: 10
							})
						}).then(function(res) {
							return res.json()
						}).then(function (json) {
							console.log(json)
							handleShowTopic(json, uid, username, userType)
						})
			    })
				})
			}
			infoArray.forEach(function(item, index) {
				var commentTime = item.commentTime
				var commentText = item.commentText
				var discusser = item.username
				var topicContent = item.content
				// 显示详细话题内容
				if (index == 0) {
					var textHeader ='<h3>' + topicTitle + '</h3>' +
													'<button id="backTopicList" class="btn btn-default" style="float: right;position: relative;top: -45px;"><返回话题列表</button>' +
					    						'<p class="contentShow">' + topicContent + '</p>' +
									    		'<p class="rightMin">' + publishMSG + '</p>'
					$('.discussContent').html(textHeader)
				}
				var commentlists ='<div class="commentlist">' +
									    			'<hr>' +
									    			'<div class="commentMan">' + discusser + '</div>' +
									    			'<p class="commentContent">' + commentText + '</p>' +
									    			'<p class="rightMin">' + commentTime + '</p>'
									    		'</div>'
				$('.discussContent').append(commentlists)
			})
			if (userType == 'student') {
				var commentField ='<div class="commentField">' +
										    		'<div class="commentDiv">' +
										    			'<textarea id="commentText" class="form-control" rows="4" cols="90" placeholder="请输入评论内容"></textarea>' +
										    		'</div>' +
										    		'<button class="btn btn-default publish">发表评论</button>' +
										    	'</div>'
		    $('.discussContent').append(commentField)
		    // 监听评论
				$('.publish').click(function(e) {
					console.log($(this))
					var commentText = $('#commentText').val()
					var myDate = new Date();
					var commentTime = myDate.getFullYear()+'-'+(myDate.getMonth()+1)+'-'+myDate.getDate()+' '+myDate.getHours()+':'+myDate.getMinutes()+':'+myDate.getSeconds();
					fetch('/comment', {
						method: 'post',
						headers: {
					    'Content-Type': 'application/json'
					  },
						body: JSON.stringify({
							id: topicId,
							stuId: uid,
							commentText: commentText,
							commentTime: commentTime,
						})
					}).then(function(response) {
						return response.json()
					}).then(function (json) {
						if(json.code == 200) {
							// 显示评论
							var commentlists ='<div class="commentlist">' +
												    			'<hr>' +
												    			'<div class="commentMan">' + username + '</div>' +
												    			'<p class="commentContent">' + commentText + '</p>' +
												    			'<p class="rightMin">' + commentTime + '</p>'
												    		'</div>'
							if ($('.discussContent').children('.commentlist')) {
								$(commentlists).insertBefore($('.discussContent').children('.commentlist').first());
							} else {
								$(commentlists).insertAfter($('.discussContent').children('.commentField'));
							}
							$('#commentText').val('');
						}
					})
				})
			}
			
	    // 监听返回
	    $('#backTopicList').click(function(e) {
	    	$('.discussContent').html('')
	    	fetch('/allTopic', {
					method: 'post',
					headers: {
				    'Content-Type': 'application/json'
				  },
					body: JSON.stringify({
						id: uid,
						count: 10
					})
				}).then(function(res) {
					return res.json()
				}).then(function (json) {
					console.log(json)
					handleShowTopic(json, uid, username, userType)
				})
	    })
			    	
			})
		})
}
// 文件下载
function downloadFile(fileName, content){
    var aLink = document.createElement('a');
    var blob = new Blob([content]);
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", false, false);//initEvent 不加后两个参数在FF下会报错, 感谢 Barret Lee 的反馈
    aLink.download = fileName;
    aLink.href = URL.createObjectURL(blob);
    aLink.dispatchEvent(evt);
}
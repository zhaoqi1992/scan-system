$(function() {
	queryData();
});

function queryData() {
	var url = Common.Constants.DATA_INTERFACE_URL
			+ Common.Constants.SYS_USER_LIST;
	var columns = [ {
		"title" : "用户名称",
		"mData" : "username"
	}, {
		"title" : "注册时间",
		"mData" : "register_time"
	}, {
		"title" : "最后登录时间",
		"mData" : "lastlogin_time"
	}, {
		"title" : "登录次数",
		"mData" : "login_times"
	}, {
		"title" : "登录IP",
		"mData" : "login_ip"
	}, {
		"title" : "操作",
		"mData" : "user_id",
		"mRender" : formatOption
	} ];
	var params = [];
	commonDataTables("table", url, columns, params, true, false);
}

function formatOption(data, full, type) {
	return "<a href='javascript:void(0);' onclick='delUser(\""+data+"\");'>删除</a>&nbsp;";;
}

function delUser(userid) {
	var url = Common.Constants.DATA_INTERFACE_URL
			+ Common.Constants.SYS_USER_DEL;
	var params = {
		user_id : userid
	};
	loadDataByAjax(url, params, delUserSuccess);
}

function delUserSuccess(data){
	var status = data.status;
	if (status != 'success') {
		alert(status);
	} else {
		alert("已删除");
		queryData();
	}
}

function addUser(){
	$("#username").val("");
	$("#password").val("");
}

function save(){
	var username = $("#username").val();
	var password = $("#password").val();
	if (null == username || "" == username.trim()) {
		alert("请填写用户名");
		$("#username").focus();
		return false;
	}
	if (null == password || "" == password.trim()) {
		alert("请填写密码");
		$("#password").focus();
		return false;
	}
	// 登录
	var url = Common.Constants.DATA_INTERFACE_URL
			+ Common.Constants.SYS_USER_NEW;
	var params = {
		username : username,
		password : password
	};
	loadDataByAjax(url, params, saveSuccess);
}

function saveSuccess(data){
	var status = data.status;
	if (status != 'success') {
		alert(status);
	} else {
		alert("已提交");
		$("#update-sdk-cancle").click();
		queryData();
	}
}


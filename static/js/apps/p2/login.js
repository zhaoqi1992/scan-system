var username="";
var password="";
function userLogin() {
	username = $("#username").val();
	password = $("#password").val();
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
			+ Common.Constants.SYS_USER_LOGIN;
	var params = {
		username : username,
		password : password
	};
	loadDataByAjax(url, params, loginSuccess);

}

function loginSuccess(data) {
	var status = data.status;
	if (status != 'success') {
		alert(status);
	} else {// 登录成功，将用户信息存储到SESSION里,并跳转页面
		$.cookie('vulner_user', username);
		window.location.href = "./main.html";
	}
}
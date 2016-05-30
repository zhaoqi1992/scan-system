$(function() {
	queryData();
});

function queryData(){
	var username = $("#username").val();
	var url = Common.Constants.DATA_INTERFACE_URL
	+ Common.Constants.SYS_USER_LIST;
	var columns =  [
	                { "title": "姓名","mData" : "username" },
	                { "title": "登录账号" ,"mData" : "account"},
	                { "title": "是否可用" ,"mData" : "status"},
	                { "title": "角色" ,"mData" : "role"}
	            ];
	var params = [
	              {name : "username", value : username}
	              ];
	commonDataTables("table", url, columns, params, true, false);
	
}
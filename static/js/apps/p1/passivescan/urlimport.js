
function urlimport(){
	var ip = $("#ip").val();
	var indexname = $("#indexname").val();
	var domain = $("#domain").val();
	var url = Common.Constants.DATA_INTERFACE_URL + Common.Constants.PASSIVESCAN_URL_IMPORT_URL;
	var params = {
		ip : ip,
		index_name : indexname,
		domain : domain
	};
	loadDataByAjax(url, params, urlimportSuccess);
}

function urlimportSuccess(data){
	var status = data.status;
	if (status != 'success') {
		alert(status);
	} else {
		alert("新建任务成功!");
		clearUrlimport();
	}
}

function clearUrlimport(){
	$("#ip").val("");
	$("#indexname").val("");
	$("#domain").val("");
}
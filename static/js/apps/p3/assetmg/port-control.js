$(function() {
	queryData();
});

function queryData(){
	var url = Common.Constants.DATA_INTERFACE_URL
	+ Common.Constants.ASSET_MG_PORT_LIST;
	var columns =  [
                    { "title": "IP","mData" : "ip", },
                    { "title": "端口","mData" : "port", },
                    { "title": "协议","mData" : "protocol"},
                    { "title": "服务","mData" : "service"},
                    { "title": "banner","mData" : "service_banner"},
                    { "title": "检测脚本","mData" : "nse_script","bVisible": false},
                    { "title": "操作","mData" : "", "mRender" : formatOp},
                ];
	var params = [];
	commonDataTables("table", url, columns, params, true, false);
}

function formatOp(data, type, full){
	var port_id = full['port_id'];
	var re = "<div class=''>"
			+"<a href='javascript:;' class='btn-small btn-white' onclick='delport(\""+port_id+"\")'><i class='fa fa-trash-o' style=\"color:#18A689\"></i>删除记录</a>"
			+"</div></div>"
		;
	return re;
}

function delport(port_id){
	//alert(task_id);
	var url = Common.Constants.DATA_INTERFACE_URL
		+ Common.Constants.ASSET_MG_PORT_DELETE;
	var params = {
		port_id : port_id
	};
	loadDataByAjax(url, params, delSuccess);
}

function delSuccess(data){
	var status = data.status;
	if (status != 'success') {
		alert(status);
	}else {
		alert("删除成功!");
		queryData();
	}
}

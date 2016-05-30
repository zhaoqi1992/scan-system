$(function() {
	queryData();
});
function queryData(){
	var url = Common.Constants.DATA_INTERFACE_URL
	+ Common.Constants.ASSET_MG_URL_LIST;
	var columns =  [
                    { "title": "域名","mData" : "domain"},
                    { "title": "请求URL","mData" : "url"},
                    { "title": "请求方法","mData" : "method"},
                    { "title": "发现时间","mData" : "time"},
                    { "title": "操作","mData" : "", "mRender" : formatOp},
                ];
	var params = [];
	commonDataTables("table", url, columns, params, true, false);
}

function formatOp(data, type, full){
	var url_id = full['url_id'];
	var re = "<div class=''>"
			+"<a href='javascript:;' class='btn-small btn-white' onclick='delurl(\""+url_id+"\")'><i class='fa fa-trash-o' style=\"color:#18A689\"></i>删除记录</a>"
			+"</div></div>"
		;
	return re;
}

function delurl(url_id){
	//alert(task_id);
	var url = Common.Constants.DATA_INTERFACE_URL
		+ Common.Constants.ASSET_MG_URL_DELETE;
	var params = {
		url_id : url_id
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

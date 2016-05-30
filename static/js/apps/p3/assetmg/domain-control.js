$(function() {
	queryData();
});

function queryData(){
	var url = Common.Constants.DATA_INTERFACE_URL
	+ Common.Constants.ASSET_MG_DOMAIN_LIST;
	var columns =  [
                    { "title": "网站地址","mData" : "domain", },
                    { "title": "标题","mData" : "title", },
                    { "title": "网站指纹","mData" : "finger"},
                    { "title": "返回码","mData" : "response_code"},
                    { "title": "检测时间","mData" : "scantime"},
                    { "title": "操作","mData" : "", "mRender" : formatOp},
                ];
	var params = [];
	commonDataTables("table", url, columns, params, true, false);
}


function formatOp(data, type, full){
	var domain_id = full['domain_id'];
	var re = "<div class=''>"
			+"<a href='javascript:;' class='btn-small btn-white' onclick='delDomain(\""+domain_id+"\")'><i class='fa fa-trash-o' style=\"color:#18A689\"></i>删除网站</a>"
			+"</div></div>"
		;
	return re;
}

function delDomain(domain_id){
	//alert(task_id);
	var url = Common.Constants.DATA_INTERFACE_URL
		+ Common.Constants.ASSET_MG_DOMAIN_DELETE;
	var params = {
		domain_id : domain_id
	};
	loadDataByAjax(url, params, delDomainSuccess);
}

function delDomainSuccess(data){
	var status = data.status;
	if (status != 'success') {
		alert(status);
	}else {
		alert("删除成功!");
		queryData();
	}
}

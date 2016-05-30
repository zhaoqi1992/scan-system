$(function() {
	queryData();
});

function queryData(){
	var url = Common.Constants.DATA_INTERFACE_URL
	+ Common.Constants.SCAN_VULN_LIST;
	var columns =  [
                    { "title": "风险级别","mData" : "severity", "mRender" :formatSeverity},
                    { "title": "风险名称","mData" : "title",  },
                    { "title": "风险地址","mData" : "resource"},
                    { "title": "状态","mData" : "action_status", "mRender" :formatStatus},
                    { "title": "发现时间","mData" : "scan_time"},
                    { "title": "操作","mData" : "", "mRender" : formatOp}
                ];
	var params = [];
	commonDataTables("table", url, columns, params, true, false);
}

function formatSeverity(data, type, full){
    if(data=="HIGH"){
        return "<span class=\"label label-danger\">高危</span>"
    }
    if(data=="MIDDLE"){
         return "<span class=\"label label-warning\">中危</span>"
    }
     if(data=="LOW"){
        return "<span class=\"label label-primary\">低危</span>"
    }
}

function formatStatus(data, type, full){
    if(data=="suspending"){
        return "<span class=\"status-over\">待处理</span>"
    }
    if(data=="order"){
         return "<span class=\"status-over\">工单中</span>"
    }
     if(data=="handling"){
        return "<span class=\"status-over\">处理中</span>"
    }
    if(data=="fixed"){
         return "<span class=\"status-over\">已修复</span>"
    }
    if(data=="ignore"){
         return "<span class=\"status-over\">忽略</span>"
    }
}

function formatOp(data, type, full){
	var vuln_id = full['vuln_id'];
	var re = "<div class=''>"
			+"<a href='javascript:;' class='btn-small btn-white'><i class='fa fa-search' style=\"color:#18A689\"></i>详细信息</a>&nbsp;"
			+"<a href='javascript:;' class='btn-small btn-white' onclick='delVuln(\""+vuln_id+"\")'><i class='fa fa-trash-o' style=\"color:#18A689\"></i>删除任务</a>"
			+"</div></div>"
		;
	return re;
}


function delVuln(vuln_id){
	//alert(task_id);
	var url = Common.Constants.DATA_INTERFACE_URL
		+ Common.Constants.SCAN_VULN_DELETE;
	var params = {
		vuln_id : vuln_id
	};
	loadDataByAjax(url, params, callbackStatus);
}


function callbackStatus(data){
	var status = data.status;
	if (status != 'success') {
		alert(status);
	}else {
		alert("Success!");
		queryData();
	}
}

$(function() {
	queryData();
});

function addDomain() {
	var domain = $("#domain").val();
	if (null == domain || "" == domain.trim()) {
		alert("请填写域名!");
		return false;
	}
	var url = Common.Constants.DATA_INTERFACE_URL
			+ Common.Constants.PASSIVESCAN_TESTSET_ADD_URL;
	var params = {
		domain : domain
	};
	loadDataByAjax(url, params, addDomainSuccess);
}

function addDomainSuccess(data){
	var status = data.status;
	if (status != 'success') {
		alert(status);
	} else {
		alert("添加成功!");
		queryData();
	}

}

function queryData() {
	var domain = $("#domain").val();
	var url = Common.Constants.DATA_INTERFACE_URL
			+ Common.Constants.PASSIVESCAN_TESTSET_URL;
	var columns = [ {
		"title" : "<input type='checkbox' onclick='selectAll(this);'>&nbsp;全选",
		"mData" : "domain_id",
		"mRender" : formatSelect
	}, {
		"title" : "域名",
		"mData" : "domain"
	}, {
		"title" : "时间",
		"mData" : "create_time"
	}, {
		"title" : "状态",
		"mData" : "status",
		"mRender" : formatStatus
	}, {
		"title" : "操作",
		"mData" : "domain_id",
		"mRender" : formatOp
	} ];
	var params = [ {
		name : "domain",
		value : domain
	} ];
	commonDataTables("table", url, columns, params, true, false);

}

function formatStatus(data){
	if(data==1){
		return "信任";
	}else{
		return "禁止";
	}
}

function formatOp(data, type, full) {
	var status = full['status'];
	var re = "";
	if(status==1){
		re = "<button class='btn btn-forbid' onclick=updateScan(\""
			+ data + "\",2)>禁止扫描</button>";
	}else{
		re = "<button class='btn btn-success' onclick='updateScan(\""
			+ data
			+ "\",1)'>信任扫描</button>";
	}
	return re;
}

function formatSelect(data){
	return "<input type='checkbox' value='"+data+"' name='ssss'>";
}

function selectAll(obj){
	if($(obj).prop("checked")){ //全选
		$('input[name="ssss"]').prop('checked','true');
	}else{
		$('input[name="ssss"]').removeAttr('checked');
	}
}

function updateScan(data, status) {
	var url = Common.Constants.DATA_INTERFACE_URL
			+ Common.Constants.PASSIVESCAN_TESTSET_UPDATESTATUS_URL;
	var params = {
		domain_id : data,
		status : status
	};
	if (status == 1) {
		loadDataByAjax(url, params, addScanSuccess);
	} else {
		loadDataByAjax(url, params, forbidScanSuccess);
	}

}

function addScanSuccess(data) {
	var status = data.status;
	if (status != 'success') {
		alert(status);
	} else {
		alert("已加入扫描!");
	}

}

function forbidScanSuccess(data) {
	var status = data.status;
	if (status != 'success') {
		alert(status);
	} else {
		alert("已禁止扫描!");
	}
}

function delDomain(){
	var domainArray = new Array();
	$("input[name='ssss']").each(function(){
		if($(this).prop('checked')){
			domainArray.push($(this).val());
		}
	});
	if(null==domainArray || domainArray.length<1){
		alert("请选择要删除的域名!");
		return false;
	}
	var domainids = domainArray.join(",");
	var url = Common.Constants.DATA_INTERFACE_URL
	+ Common.Constants.PASSIVESCAN_TESTSET_DEL_URL;
	var params = {
			domain_id : domainids
	};
	loadDataByAjax(url, params, delDomainSuccess);
}

function delDomainSuccess(data){
	var status = data.status;
	if (status != 'success') {
		alert(status);
	} else {
		alert("已删除任务!");
		queryData();
	}
}

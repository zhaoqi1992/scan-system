var taskid = getUrlParam(window.location.href, "taskid");
$(function() {
	initDateRangeForDetail("datepicker");
	$("input[name='iswg']").change(function() {
		$("#iswg_h").val($(this).val());
	});
	queryData();
});

function queryData(a) {
	var ip = $("#ip").val();
	var port = $("#port").val();
	var protocol = $("#protocol").val();
	var datepicker = $("#datepicker").val();
	var iswg_h = $("#iswg_h").val();
	var tag = "all";
	if (iswg_h == 'yes') {
		tag = "limit";
	}
	if (null == a) {// 查询
		var url = Common.Constants.DATA_INTERFACE_URL
				+ Common.Constants.P2_ASSET_ASSET_GETASSETLIST;
		var columns = [ {
			"title" : "ip",
			"mData" : "ip"
		}, {
			"title" : "域名",
			"mData" : "domain"
		}, {
			"title" : "端口",
			"mData" : "port"
		}, {
			"title" : "协议",
			"mData" : "protocol"
		}, {
			"title" : "服务",
			"mData" : "service"
		}, {
			"title" : "扫描时间",
			"mData" : "scantime"
		}, {
			"title" : "状态(tag)",
			"mData" : "tag"
		} ];
		var params = [ {
			name : "ip",
			value : ip
		}, {
			name : "time",
			value : datepicker
		}, {
			name : "tag",
			value : tag
		}, {
			name : "port",
			value : port
		}, {
			name : "protocol",
			value : protocol
		}, {
			name : "task_id",
			value : taskid
		} ];
		commonDataTables("table", url, columns, params, true, false);
	} else{ // 导出
		var url = Common.Constants.DATA_INTERFACE_URL
				+ Common.Constants.P2_ASSET_ASSET_EXPORT + "?&ip=" + ip
				+ "&port=" + port + "&protocol=" + protocol + "&time="
				+ datepicker + "&tag=" + tag;
		window.location.href = url;
	} 

}

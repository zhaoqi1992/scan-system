// var taskid = "";
// var task_set_id = "";
$(document).ready(function() {
	// initDateRange("datepicker");
	// taskid = getUrlParam(window.location.href, "taskid");
	// task_set_id = getUrlParam(window.location.href, "task_set_id");
	queryData();
});

function queryData() {
	// var domain = $("#domain").val();
	// var vulner_title = $("#vulner_title").val();
	// var resource = $("#resource").val();
	// var servrity = $("#servrity").val();
	// var datepicker = $("#datepicker").val();
	var url = Common.Constants.DATA_INTERFACE_URL
			+ Common.Constants.VULNER_VULNERLIST_URL;
	var columns = [ {
		class : 'details-control',
		orderable : false,
		data : null,
		defaultContent : ''
	}, {
		"title" : "域名",
		"mData" : "domain"
	}, {
		"title" : "漏洞标题",
		"mData" : "title",
		"mRender" : formatShow
	}, {
		"title" : "资源页面",
		"mData" : "resource",
		"mRender" : formatShow
	}, {
		"title" : "风险等级",
		"mData" : "severity"
	}, {
		"title" : "时间",
		"mData" : "time"
	},
	{
		"title" : "任务ID",
		"mData" : "task_id",
		"bVisible" : false
	}, {
		"title" : "任务类型",
		"mData" : "type",
		"bVisible" : false
	}, {
		"title" : "扫描器",
		"mData" : "scanner_name",
		"bVisible" : false
	}, {
		"title" : "请求方法",
		"mData" : "methods",
		"bVisible" : false
	}, {
		"title" : "URI",
		"mData" : "uri",
		"bVisible" : false
	}, {
		"title" : "参数",
		"mData" : "param",
		"bVisible" : false
	}, {
		"title" : "请求信息",
		"mData" : "request",
		"bVisible" : false
	}, {
		"title" : "返回信息",
		"mData" : "response",
		"bVisible" : false
	}, {
		"title" : "描述",
		"mData" : "describe",
		"bVisible" : false
	}, {
		"title" : "修复建议",
		"mData" : "remediation",
		"bVisible" : false
	}, {
		"title" : "引用",
		"mData" : "references",
		"bVisible" : false
	} ];
	var params = [ {
		name : "taskid",
		value : taskid
	}, {
		name : "domain",
		value : domain
	}, {
		name : "title",
		value : vulner_title
	}, {
		name : "resource",
		value : resource
	}, {
		name : "servrity",
		value : servrity
	}, {
		name : "time",
		value : datepicker
	}, {
		name : "task_set_id",
		value : task_set_id
	} ];
	$("#dataTablesDiv")
			.html(
					"<table id='table' class='common-table table table-striped table-bordered table-hover' width='100%' border='0' cellspacing='0'></table>");
	var table = commonDataTables("table", url, columns, params, true, false);
	$('#table tbody').on('click', 'td.details-control', function() {
		var tr = $(this).closest('tr');
		var row = table.row(tr);
		if (row.child.isShown()) {
			// This row is already open - close it
			row.child.hide();
			tr.removeClass('shown');
		} else {
			// Open this row
			row.child(showDetails(row.data())).show();
			tr.addClass('shown');
		}
	});

}

function formatShow(data) {
	if (null != data && data.length > 30) {
		data = data.substr(0, 30);
	}
	return data + "...";
}

function showDetails(d) {
	var domain = d['domain'];
	var title = d['title'];
	var resource = d['resource'];
	var severity = d['severity'];
	var time = d['time'];
	var re = "<div class='container-fluid' style='margin-top:5px;'><dl class='dl-horizontal'>"
			+ "<dt>域名</dt>" + "<dd>"
			+ domain
			+ "</dd>"
			+ "<dt>漏洞标题</dt>"
			+ "<dd>"
			+ title
			+ "</dd>"
			+ "<dt>资源页面</dt>"
			+ "<dd>"
			+ resource
			+ "</dd>"
			+ "<dt>风险等级</dt>"
			+ "<dd>"
			+ severity
			+ "</dd>"
			+ "<dt>时间</dt>"
			+ "<dd>"
			+ time
			+ "</dd>"
			+ "<dt>任务ID</dt>"
			+ "<dd>"
			+ d['task_id']
			+ "</dd>"
			+ "<dt>任务类型</dt>"
			+ "<dd>"
			+ d['type']
			+ "</dd>"
			+ "<dt>扫描器</dt>"
			+ "<dd>"
			+ d['scanner_name']
			+ "</dd>"
			+ "<dt>请求方法</dt>"
			+ "<dd>"
			+ d['methods']
			+ "</dd>"
			+ "<dt>URI</dt>"
			+ "<dd>"
			+ d['uri']
			+ "</dd>"
			+ "<dt>参数</dt>"
			+ "<dd>"
			+ d['param']
			+ "</dd>"
			+ "<dt>请求信息</dt>"
			+ "<dd>"
			+ d['request']
			+ "</dd>"
			+ "<dt>返回信息 </dt>"
			+ "<dd>"
			+ d['response']
			+ "</dd>"
			+ "<dt>描述 </dt>"
			+ "<dd>"
			+ d['describe']
			+ "</dd>"
			+ "<dt>修复建议 </dt>"
			+ "<dd>"
			+ d['remediation']
			+ "</dd>"
			+ "<dt>引用 </dt>"
			+ "<dd>"
			+ d['references']
			+ "</dd>"
			+ "</dl></div>";
	return re;
}
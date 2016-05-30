$(document).ready(function() {
	initDateRange("datepicker");
	queryData();
} );

function queryData(){
	var domain = $("#domain").val();
	var datepicker = $("#datepicker").val();
	var url = Common.Constants.DATA_INTERFACE_URL
	+ Common.Constants.PASSIVESCAN_HISTORY_URL;
	var columns =  [
	                {
	                	class:          'details-control',
	                	orderable:      false,
	                	data:           null,
	                	defaultContent: ''
	                },
	                { "title": "时间","mData" : "time" },
	                { "title": "域名" ,"mData" : "domain"},
	                { "title": "URL" ,"mData" : "url"},
	                { "title": "方法" ,"mData" : "method"},
	                { "title": "状态" ,"mData" : "code"},
	                
	                { "title": "请求头" ,"mData" : "request_header", "bVisible": false},
	                { "title": "请求体" ,"mData" : "request_body", "bVisible": false},
	                { "title": "返回头" ,"mData" : "response_header", "bVisible": false},
	                { "title": "请求耗时" ,"mData" : "request_time", "bVisible": false}
	            ];
	var params = [
	              {name : "domain", value : domain},
	              {name : "time", value : datepicker}
	              ];
	$("#dataTablesDiv").html("<table id='table' class='common-table' width='100%' border='0' cellspacing='0'></table> ");
	var table = commonDataTables("table", url, columns, params, true, false);
	$('#table tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row( tr );
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child( showDetails(row.data()) ).show();
            tr.addClass('shown');
        }
    } );
}

function showDetails ( d ) {
	var re = "<div class='container-fluid' style='margin-top:5px;'><dl class='dl-horizontal'>"
		+ "<dt>时间</dt>"
		+ "<dd>"+d['time']+"</dd>"
		+ "<dt>域名</dt>"
		+ "<dd>"+d['domain']+"</dd>"
		+ "<dt>URL</dt>"
		+ "<dd>"+d['url']+"</dd>"
		+ "<dt>方法</dt>"
		+ "<dd>"+d['method']+"</dd>"
		+ "<dt>状态</dt>"
		+ "<dd>"+d['code']+"</dd>"
		+ "<dt>请求头</dt>"
		+ "<dd>"+JSON.stringify(d['request_header'])+"</dd>"
		+ "<dt>请求体</dt>"
		+ "<dd>"+JSON.stringify(d['request_body'])+"</dd>"
		+ "<dt>返回头</dt>"
		+ "<dd>"+JSON.stringify(d['response_header'])+"</dd>"
		+ "<dt>请求耗时</dt>"
		+ "<dd>"+d['request_time']+"</dd>"
		+"</dl></div>";
    return re;
}
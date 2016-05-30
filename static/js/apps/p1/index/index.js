$(function() {
	initData();
	queryData();
});

function initData(){
	initDateRange("datepicker");
}

function queryData(){
	loadVulnerCountChart();
	loadVulnerTypeChart();
	loadDomainChart();
	loadQueueTaskChart();
}

//漏洞数量图
function loadVulnerCountChart(){
	var time = $("#datepicker").val();
	var url = Common.Constants.DATA_INTERFACE_URL
	+ Common.Constants.INDEX_VULNERCOUNT_CHART_URL;
	var params = {
			time : time
	};
	loadDataByAjax(url, params, loadVulnerCountChartSucess);
}

function loadVulnerCountChartSucess(data){
	var pie_title = data.pie_tile;
	var pie_legendnames = data.pie_legendnames;
	var pie_seriesname = data.pie_seriesname;
	var pie_seriesdata = data.pie_seriesdata;
	loadEchartsPie("vulnercount_chart", pie_title, pie_legendnames, pie_seriesname, pie_seriesdata);
}


//漏洞类别柱状图
function loadVulnerTypeChart(){
	var time = $("#datepicker").val();
	var url = Common.Constants.DATA_INTERFACE_URL
	+ Common.Constants.INDEX_VULNERTYPE_CHART_URL;
	var params = {
			time : time
	};
	loadDataByAjax(url, params, loadVulnerTypeChartSuccess);
}

function loadVulnerTypeChartSuccess(data){
	var pie_title = data.pie_tile;
	var pie_legendnames = data.pie_legendnames;
	var pie_seriesname = data.pie_seriesname;
	var pie_seriesdata = data.pie_seriesdata;
	loadEchartsPie("vulnertype_chart", pie_title, pie_legendnames, pie_seriesname, pie_seriesdata);
}

//域名统计
function loadDomainChart(){
	var time = $("#datepicker").val();
	var url = Common.Constants.DATA_INTERFACE_URL
	+ Common.Constants.INDEX_DOMAIN_CHART_URL;
	var params = {
			time : time
	};
	loadDataByAjax(url, params, loadDomainChartSuccess);
}

function loadDomainChartSuccess(data){
	var bar_title = data.bar_title;
	var bar_legendnames = data.bar_legendnames;
	var bar_yAxisdata = data.bar_yAxisdata;
	var bar_seriesdata = data.bar_seriesdata;
	loadEchartsBar("domain_chart", bar_title, bar_legendnames, bar_yAxisdata, bar_seriesdata);
	
}

//队列任务数量
function loadQueueTaskChart(){
	var time = $("#datepicker").val();
	var url = Common.Constants.DATA_INTERFACE_URL
	+ Common.Constants.INDEX_QUEUETASK_CHART_URL;
	var params = {
			time : time
	};
	loadDataByAjax(url, params, loadQueueTaskChartSuccess);
}

function loadQueueTaskChartSuccess(data){
	var bar_title = data.bar_title;
	var bar_legendnames = data.bar_legendnames;
	var bar_yAxisdata = data.bar_yAxisdata;
	var bar_seriesdata = data.bar_seriesdata;
	loadEchartsBar("queuetask_chart", bar_title, bar_legendnames, bar_yAxisdata, bar_seriesdata);
}
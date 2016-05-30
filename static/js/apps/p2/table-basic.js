$(function() {
	queryData();
});

function queryData() {
    var url = "http://10.12.2.68/auth/engine/module!list";
    var columns =  [
	                {"title":"名称","mData":"name"},
	                {"title":"类型","mData":"version"},
	                {"title":"版本号","mData":"module_id"},
	                {"title":"创建时间","mData":"create_time"},
	                {"title":"修改时间","mData":"modify_time"},
	                {"title":"状态","mData":"status"},
	                {"title":"操作","mData":"type"}
	            ];
    var params = [];
    // $("#dataTablesDiv")
    //     .html(
    //         "<table id='table' class='common-table table table-striped table-bordered table-hover' width='100%' border='0' cellspacing='0'></table>");
    // var table = commonDataTables("table", url, columns, params, true, false);
    createTables(url,columns,params);
};


//在需要的位置上添加表格
function createTables(url,columns,params){
	$("#dataTablesDiv")
        .html(
            "<table id='table' class='common-table table table-striped table-bordered table-hover' width='100%' border='0' cellspacing='0'></table>");
    var table = commonDataTables("table", url, columns, params, true, false);
}

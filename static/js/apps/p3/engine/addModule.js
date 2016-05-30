function queryDataPlus() {
    var url = "http://10.12.2.68/auth/engine/module!list";
    var columns = [
        { "title": "ID", "mData": "module_id" },
        { "title": "名称", "mData": "name" },
        { "title": "类型", "mData": "type" },
        { "title": "版本号", "mData": "version" },
        { "title": "创建时间", "mData": "create_time" },
        { "title": "修改时间", "mData": "modify_time" },
        { "title": "状态", "mData": "status" },
        { "title": "操作", orderable: false, data: null, defaultContent: '<a class="delete">删除</a>' + '|' + '<a class="upload">上传安装包</a>' }
    ];
    var params = [];
    // $("#dataTablesDiv")
    //     .html(
    //         "<table id='table' class='common-table table table-striped table-bordered table-hover' width='100%' border='0' cellspacing='0'></table>");
    // var table = commonDataTables("table", url, columns, params, true, false);
    createTablesPlus(url, columns, params);
};

//在需要的位置上添加表格
function createTablesPlus(url, columns, params) {
    $("#dataTablesDiv")
        .html(
            "<table id='table' class='common-table table table-striped table-bordered table-hover' width='100%' border='0' cellspacing='0'></table>");
    var table = commonDataTables("table", url, columns, params, true, false);
    $('table').on('init.dt', modalControlPlus);
}

function modalControlPlus() {
    //toggle modal delete
    $("#plusNewModal").click(function() {
        $("#plusModal").modal("toggle");
        //确认删除
        $('button#moduleAdd').click(function(event) {
            var type = $('div.modal-body input:checked').val();
            var name = $('input#module_name').val();
            var version = $('input#module_version').val();

            function sfuction() {
                $('#plusModal .modal-body form').replaceWith($('<p class="h4">SUCCESS</p>'));
                setTimeout("$('button#closePlus').trigger('click');", 1000);
                queryDataPlus();

            }
            var url = "http://10.12.2.68/auth/engine/module!add?name=" + name + "&type=" + type + "&version=" + version;
            var params = [];
            loadDataByAjax(url, params, sfuction);
        });
    });
}

$(function() {
    queryDataPlus();
});
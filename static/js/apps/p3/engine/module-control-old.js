function queryData() {
    var url = "http://10.12.2.68/auth/engine/module!list";
    var columns = [{
        "title": "ID",
        "mData": "module_id"
    }, {
        "title": "名称",
        "mData": "name"
    }, {
        "title": "类型",
        "mData": "type"
    }, {
        "title": "版本号",
        "mData": "version"
    }, {
        "title": "创建时间",
        "mData": "create_time"
    }, {
        "title": "修改时间",
        "mData": "modify_time"
    }, {
        "title": "状态",
        "mData": "status"
    }, {
        "title": "操作",
        orderable: false,
        data: null,
        defaultContent: '<a class="delete">删除</a>' + '|' + '<a class="upload">上传安装包</a>'
    }];
    var params = [];
    createTables(url, columns, params);
};


//在需要的位置上添加表格
function createTables(url, columns, params) {
    $("#dataTablesDiv")
        .html(
            "<table id='table' class='common-table table table-striped table-bordered table-hover' width='100%' border='0' cellspacing='0'></table>");
    var table = commonDataTables("table", url, columns, params, true, false);
    $('#table').on('init.dt', modalControl);
}

function modalControlDelete() {
    //toggle modal delete
    $(".delete").click(function() {
        event.stopPropagation();
        $("#deleteModal").modal("toggle");
        var nodes = $(this).parent().prevAll();
        var module_id = nodes[nodes.length - 1].innerText;
        var description = "<p class='h4'>确认删除？</p>";
        $('#deleteModal .modal-body p').replaceWith(description);

        //确认删除
        $('button#submit').click(function(event) {
            event.stopPropagation();

            function sfuction() {
                $('#deleteModal .modal-body p').replaceWith($('<p class="h4">Already delete</p>'));
                setTimeout("$('button#close').trigger('click');", 1000);
                queryData();

            }
            var url = "http://10.12.2.68/auth/engine/module!delete?module_id=" + module_id;
            var params = [];
            loadDataByAjax(url, params, sfuction);
        });
    });
}

function modalControlPlus() {
    //toggle modal plus
    $("#plusNewModal").click(function() {
        event.stopPropagation();
        $("#plusModal").modal("toggle");
        //确认添加
    });
    $('button#moduleAdd').click(function(event) {
        event.stopPropagation();
        var type = $('div.modal-body input:checked').val();
        var name = $('input#module_name').val();
        var version = $('input#module_version').val();

        function sfuction() {
            alert('添加成功');
            setTimeout("$('button#closePlus').trigger('click');", 1000);
            queryData();

        }
        var url = "http://10.12.2.68/auth/engine/module!add?name=" + name + "&type=" + type + "&version=" + version;
        var params = [];
        loadDataByAjax(url, params, sfuction);
    });
}

function modalControl() {
    modalControlDelete();

}

$(function() {
    queryData();
    modalControlPlus();
});
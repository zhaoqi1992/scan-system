var Common = {};
Common.Constants = {
    DATE_FORMAT: "yyyy-MM-dd",
    SDATE_FORMAT: "yyyyMMdd",
    TIME_FORMAT: "yyyy-MM-dd HH:mm:ss",
    HOUR_FORMAT: "yyyy-MM-dd HH",
    MONTH_FORMAT: "yyyy-MM",
    DATA_INTERFACE_URL: "http://10.12.2.68/",

    //一、资产发现
    //1.3任务管理
    ASSET_TASK_PORTTASKADD:"auth/assetfind/active!newporttask",
    ASSET_TASK_DOMAINTASKADD:"auth/assetfind/active!newdomaintask",
    ASSET_TASK_URLTASKADD:"auth/assetfind/active!newurltask",
    ASSET_TASK_LIST:"auth/assetfind/assettask!list",
    ASSET_TASK_DELTE:"auth/assetfind/assettask!delete",

    //资产管理 -域名资产
    ASSET_MG_DOMAIN_LIST:"auth/assetmg/domainasset!list",
    ASSET_MG_DOMAIN_DELETE:"auth/assetmg/domainasset!delete",
    ASSET_MG_PORT_LIST:"auth/assetmg/portasset!list",
    ASSET_MG_PORT_DELETE:"auth/assetmg/portasset!delete",

    //漏洞扫描 --新建任务
    SCAN_TASK_ADD:"auth/vulnscan/newscan!scantask",
    SCAN_TASK_LIST:"auth/vulnscan/scantask!list",

    //模块管理
    MODULE_LIST:"auth/engine/module!list",
    MODULE_DELETE:"auth/engine/module!delete",
    MODULE_ADD:"auth/engine/module!add",

    //模板管理
    TEMPLATE_LIST:"auth/engine/template!list",
    TEMPLATE_DELETE:"auth/egine/tempalte!delete",
    TEMPLATE_ADD:"auth/engine/template!add",
    TEMPLATE_CONFIGTEMPLATE:"auth/engine/template!configtemplate",

    //引擎管理
    ENGINE_LIST:"auth/engine/engine!list",
    ENGINE_DELETE:"auth/engine/engine!delete",
    ENGINE_ADD:"auth/engine/engine!add",
    ENGINE_REMOVEMODULE:"auth/engine/engine!removemodule",
    ENGINE_INSTALLMODULE:"auth/engine/engine!installmodule"
};

var Regs={};
Regs.Content = {

}


function isStrNull(str) {
    if (null == str || "" == str.trim()) {
        return true;
    }
    return false;
}

// 统一AJAX调用方法
function loadDataByAjax(url, params, sfuction, type) {
    if (!type)
        type = "post";
    $.ajax({
        url: url,
        type: type,
        dataType: "jsonp",
        jsonp: "callback",
        data: params,
        async:false,
        success: sfuction,
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(errorThrown);
            alert(textstatus);
        }
    });
}

// 获取树形表格
function getTreeView(parent, nodes, checked, expanded) {
    if (null == checked)
        checked = false;
    if (null == expanded)
        expanded = false;
    var tree = [{
        text: parent,
        state: {
            checked: checked,
            expanded: expanded
        },
        selectable: false,
        nodes: nodes
    }];
    return tree;
}

// 获取当前URL地址中的参数
function getUrlParam(url, name) {
    if (null != url) {
        var carray = url.split("?");
        if (carray.length > 1) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
            var r = carray[1].match(reg); // 匹配目标参数
            if (r != null)
                return unescape(r[2]);
        }
    }
    return ""; // 返回参数值
}

// 获取基本地址，不包括参数
function getBaseUrl() {
    var url = window.location.href;
    var baseUrl = url.split("?")[0];
    return baseUrl;
}
// 输出表格
function commonDataTables(tableId, url, aoColumns, params, page, sort, aSort) {
    aSort = aSort == null ? [
        [0, "desc"]
    ] : aSort;
    var table = $('#' + tableId).DataTable({
        "bPaginate": page,
        "bFilter": false,
        "bSort": sort,
        "aaSorting": aSort,
        "bServerSide": true,
        "bLengthChange": false,
        "iDisplayLength": 15,
        "sAjaxSource": url,
        "bDestroy": true,
        "bAutoWidth": true,
        "sServerMethod": "POST",
        "aoColumns": aoColumns,
        "scrollX": true,
        "scrollCollapse": true,
        "sPaginationType": "full_numbers", // 用这个分页的样式是自己设计的
        "fnServerParams": function(aoData) {
            for (var i = 0; i < params.length; i++) {
                aoData.push(params[i]);
            }
        },
        "fnServerData": function(sSource, aoData, fnCallback) {
            $.ajax({
                url: sSource,
                type: "post",
                dataType: "jsonp",
                jsonp: "callback",
                data: {
                    dt_json: $.toJSON(aoData)
                },
                async: false,
                success: function(records) {
                    $('#loading_data').hide();
                    $.each(aoData, function(n, v) {
                        if (v.name == 'visittime') {
                            aoData[n].value = 2;
                        }
                    });
                    fnCallback(records);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    alert(XMLHttpRequest.status);
                    alert(XMLHttpRequest.readyState);
                    alert(errorThrown);
                }
            });
        },
        "oLanguage": {
            "sLengthMenu": '每页显示 <select>' + '<option value="15">15</option>' + '<option value="30">30</option>' + '<option value="60">60</option>' + '<option value="90">90</option>' + '</select> 条记录',
            "sZeroRecords": "对不起，查询不到任何相关数据",
            "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
            "sInfoEmtpy": "找不到相关数据",
            "sInfoFiltered": "数据表中共为 _MAX_ 条记录)",
            "sProcessing": "正在加载中...",
            "sSearch": "搜索",
            "sUrl": "",
            "oPaginate": {
                "sFirst": "第一页",
                "sPrevious": " 上一页 ",
                "sNext": " 下一页 ",
                "sLast": " 最后一页 "
            }
        }
    });
    return table;
}
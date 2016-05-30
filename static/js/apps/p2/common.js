//使用的时候可以考虑把Common通过单独文件加入
var Common = {};
Common.Constants = {
    DATE_FORMAT: "yyyy-MM-dd",
    SDATE_FORMAT: "yyyyMMdd",
    TIME_FORMAT: "yyyy-MM-dd HH:mm:ss",
    HOUR_FORMAT: "yyyy-MM-dd HH",
    MONTH_FORMAT: "yyyy-MM",
    DATA_INTERFACE_URL: "http://10.12.2.68/",

    //用户管理
    SYS_USER_LOGIN: "auth/usermanage/login",
    SYS_USER_LIST: "auth/usermanage/userlist",
    SYS_USER_NEW: "auth/usermanage/adduser",
    SYS_USER_DEL: "auth/usermanage/deluser",

    //============================== 一期地址=============================/
    INDEX_VULNERCOUNT_CHART_URL: "auth/statistics/pievulncount",
    INDEX_VULNERTYPE_CHART_URL: "auth/statistics/pievulntitle", // auth/statistics/barvulntitle
    INDEX_DOMAIN_CHART_URL: "auth/statistics/barvulndomain",
    INDEX_QUEUETASK_CHART_URL: "auth/statistics/bartaskqueue",
    ACTIVESCAN_NEWTASK_GET_ENGINE_URL: "auth/activetask/enginetype",
    ACTIVESCAN_NEWTASK_NEWTASK_URL: "auth/activetask/addtask",
    ACTIVESCAN_NEWTASK_IMPORTURL_URL: "auth/activetask/uploadtask",
    ACTIVESCAN_TASKMANAGER_LIST_URL: "auth/activetask/gettask",
    ACTIVESCAN_TASKMANAGER_CANCEL_URL: "auth/activetask/stoptask",
    ACTIVESCAN_TASKMANAGER_DEL_URL: "auth/activetask/deltask",
    VULNER_VULNERLIST_URL: "auth/vuln/vulnlist",
    VULNER_GETVULNER_BYID_URL: "auth/vuln/getvuln",
    PASSIVESCAN_URL_IMPORT_URL: "auth/passive/esimport",
    PASSIVESCAN_TESTSET_URL: "auth/passive/domainlist",
    PASSIVESCAN_TESTSET_ADD_URL: "auth/passive/domainadd",
    PASSIVESCAN_TESTSET_DEL_URL: "auth/passive/domaindel",
    PASSIVESCAN_TESTSET_UPDATESTATUS_URL: "auth/passive/domainstatus",
    PASSIVESCAN_HISTORY_URL: "auth/passive/history",
    RULE_LIST_URL: "auth/rule/list",
    RULE_GET_BYID_URL: "auth/rule/getrule",
    RULE_DEL_BYID_URL: "auth/rule/delrule",
    RULE_NEW_URL: "auth/rule/add",
    RULE_UPDATE_URL: "auth/rule/modify",
    STRATEGY_NEW_URL: "auth/policy/add",
    STRATEGY_DEL_URL: "auth/policy/delpolicy",
    STRATEGY_LIST_URL: "auth/policy/list",
    STRATEGY_UPDATE_URL: "auth/policy/modify",
    ENGINETYPE_NEW_URL: "auth/enginetype/addtype",
    ENGINETYPE_LIST_URL: "auth/enginetype/list",
    ENGINETYPE_DEL_URL: "auth/enginetype/deltype",
    ENGINETYPE_UPDATESTATUS_URL: "auth/enginetype/modifystatus",
    ONLINEENGINE_LIST_URL: "auth/engine/list",
    ONLINEENGINE_DEL_URL: "auth/engine/delengine",
    ONLINEENGINE_UPDATE_STRATEGY_DESC_URL: "auth/engine/modifypolicy",

    //============================== 二期地址=============================/
    //资产发现-主动发现
    P2_ASSET_ACTIVE_ADDTASK: "auth/assetactive/addtask",
    P2_ASSET_ACTIVE_GET_ENGINES: "auth/assetactive/getengines",
    //资产发现-被动检测
    P2_ASSET_PASSIVE_GET_ENGINES: "auth/assetpassive/getengines",
    P2_ASSET_PASSIVE_GET_CONFIG: "auth/assetpassive/getconfig",
    P2_ASSET_PASSIVE_SAVE_CONFIG: "auth/assetpassive/config",
    //资产发现-任务管理
    P2_ASSET_TASK_GETALLTASK: "auth/assetactive/getalltask",
    P2_ASSET_TASK_MODIFYSTATUS: "auth/assetactive/modifystatus",
    P2_ASSET_TASK_DELTASK: "auth/assetactive/deltask",
    //资产发现-资产管理
    P2_ASSET_ASSET_GETASSETLIST: "auth/assetmanage/getassetlist",
    P2_ASSET_ASSET_EXPORT: "auth/assetmanage/export",

    //数据管理-同步设置
    P2_DATA_SYNCSET_AGENTLIST: "auth/synagent/agentlist",
    P2_DATA_SYNCSET_DEL: "auth/synagent/delagent",
    P2_DATA_SYNCSET_UPDATE: "auth/synagent/agentconfig",
    P2_DATA_SYNCSET_UPLOADFILE: "auth/synagent/agentlist/uploadassetlist",
    //数据管理-URL库
    P2_DATA_URL_ADDSCAN: "auth/passive/addreqtoscan",

    //漏洞扫描-主动扫描
    P2_VULNER_ACTIVE_ENGINES: "auth/activetask/getactiveengines",
    P2_VULNER_ACTIVE_ADDACTIVETASK: "auth/activetask/addactivetask",
    //漏洞扫描-被动检测
    P2_VULNER_PASSIVE_ENGINES: "auth/passive/getpassiveengines",
    P2_VULNER_PASSIVE_SAVECONFIG: "auth/passive/config",
    P2_VULNER_PASSIVE_GETCONFIG: "auth/passive/getconfig",
    //漏洞扫描-集成扫描
    P2_VULNER_INTEGRATESCAN_LIST: "auth/scanapimanager/list",
    P2_VULNER_INTEGRATESCAN_ADD: "auth/scanapimanager/add",
    P2_VULNER_INTEGRATESCAN_DEL: "auth/scanapimanager/del",
    P2_VULNER_INTEGRATESCAN_UPDATE: "auth/scanapimanager/modify",
    //漏洞扫描-任务管理
    P2_VULNER_TASK_GET_TASKSET: "auth/activetask/gettaskset",
    P2_VULNER_TASK_GET_TASK: "auth/activetask/gettask",
    P2_VULNER_TASK_CANCEL_TASK: "auth/activetask/canceltaskset",
    P2_VULNER_TASK_DELTASK: "auth/activetask/deltaskset"

};

// 单个时间选择
function initDatePicker(targetId, format, timePicker) {
    var option = {
        format: format,
        singleDatePicker: true,
        timePicker: timePicker,
        timePicker24Hour: true,
        timePickerSeconds: true,
        timePickerIncrement: 1,
        locale: {
            daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
            monthNames: ['正月', '二月', '三月', '四', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '腊月']
        },
        opens: 'left'
    };

    $('#' + targetId).daterangepicker(option);
}

// 时间段选择:精确到秒
function initDateRangeForDetail(id, position) {
    var date = new Date();
    var dateString = daysTime(dateFormat(date), -7) + " 00:00:00 ~ " + daysTime(dateFormat(date), 1) + " 00:00:00";
    $('#' + id).val(dateString);
    initDateRangePicker(id, position, "YYYY-MM-DD hh:mm:ss", true);
}

// 时间段选择：精确到日
function initDateRange(id, position) {
    var date = new Date();
    var dateString = daysTime(dateFormat(date), -7) + " ~ " + daysTime(dateFormat(date), 1);
    $('#' + id).val(dateString);
    initDateRangePicker(id, position, "YYYY-MM-DD", false);
}

// 时间段选择：基础方法
function initDateRangePicker(targetId, position, format, timePicker) {
    position = position == null ? 'left' : position;
    var option = {
        format: format,
        timePicker: timePicker,
        timePickerIncrement: 1,
        timePickerSeconds: true,
        separator: ' ~ ',
        locale: {
            applyLabel: '确定',
            cancelLabel: '取消',
            fromLabel: '开始',
            toLabel: '结束',
            customRangeLabel: '自定义',
            daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
            monthNames: ['正月', '二月', '三月', '四', '五月', '六月', '七月', '八月', '九月',
                '十月', '十一月', '腊月'
            ]
        },
        showWeekNumbers: true,
        startDate: moment().subtract('days', 7),
        endDate: moment().subtract('days', 1),
        opens: position,
        ranges: {
            '昨天': [moment().subtract('days', 1), moment().subtract('days', 1)],
            '前7天': [moment().subtract('days', 7),
                moment().subtract('days', 1)
            ],
            '前14天': [moment().subtract('days', 14),
                moment().subtract('days', 1)
            ],
            '前30天': [moment().subtract('days', 30),
                moment().subtract('days', 1)
            ],
            '前90天': [moment().subtract('days', 90),
                moment().subtract('days', 1)
            ],
        }
    };
    $('#' + targetId).daterangepicker(option);
}

function daysTime(_date, day) {
    var time = _date.split("-");
    var now = new Date(time[0], time[1] - 1, time[2]); //
    var milliseconds = day * 1000 * 60 * 60 * 24;
    var testdate = milliseconds + now.getTime();
    var testDate = new Date();
    testDate.setTime(testdate);
    var month = testDate.getMonth() + 1;
    var day = testDate.getDate();
    if (month < 10)
        month = "0" + month;
    if (day < 10)
        day = "0" + day;
    return testDate.getFullYear() + "-" + month + "-" + day;
}

function dateFormat(date) {
    return $.format.date(date, Common.Constants.DATE_FORMAT);
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

// 饼状图
function loadEchartsPie(id, pietitle, legendnames, seriesname, seriesdata) {
    var myChart = echarts.init(document.getElementById(id), macarons_theme);
    option = {
        title: {
            text: pietitle,
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data: legendnames
        },
        toolbox: {
            show: true,
            feature: {
                mark: {
                    show: false
                },
                dataView: {
                    show: false
                },
                magicType: {
                    show: true,
                    type: ['pie', 'funnel'],
                    option: {
                        funnel: {
                            x: '25%',
                            width: '50%',
                            funnelAlign: 'left',
                            max: 1548
                        }
                    }
                },
                restore: {
                    show: true
                },
                saveAsImage: {
                    show: true
                }
            }
        },
        calculable: true,
        series: [{
            name: seriesname,
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: seriesdata,
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        formatter: '{b} : {c} ({d}%)'
                    },
                    labelLine: { show: true }
                }
            }
        }]
    };
    myChart.setOption(option);
    return myChart;
}

// 条形图
function loadEchartsBar(id, title, legendnames, yAxisdata, seriesdata) {
    var myChart = echarts.init(document.getElementById(id), macarons_theme);
    option = {
        title: {
            text: title,
            x: 'center'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data: legendnames
        },
        toolbox: {
            show: true,
            feature: {
                mark: {
                    show: false
                },
                dataView: {
                    show: false,
                    readOnly: false
                },
                magicType: {
                    show: true,
                    type: ['line', 'bar']
                },
                restore: {
                    show: true
                },
                saveAsImage: {
                    show: true
                }
            }
        },
        calculable: true,
        xAxis: [{
            type: 'category',
            data: yAxisdata
                // axisLabel:{
                // interval: 0,
                // formatter:function(val){
                // var size = 10;
                // var re="";
                // if(null!=val&&val.length>size){
                // var len = parseInt(val.length/size);
                // for(var i=0; i<len; i++){
                // re+= val.substr(i*size,size) + "\r\n";
                // }
                // re+=val.substr(i*size,val.length);
                // return re;
                // }
                // return val;
                // }
                // }
        }],
        yAxis: [{
            type: 'value'
        }],
        series: seriesdata
    };
    myChart.setOption(option);
    return myChart;
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

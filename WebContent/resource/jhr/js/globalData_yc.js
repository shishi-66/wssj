﻿var appkeyname="yc";
var jsonYesNoAll=[{"name":"请选择","value":""},{"name":"是","value":"1"},{"name":"否","value":"0"}];
var jsonYesNo=[{"name":"是","value":"1"},{"name":"否","value":"0"}];
var jsonSampIsQualified=[{"value":"0","name":"不合格"},{"value":"1","name":"合格"},{"value":"2","name":"不判"}];
var jsonHhkhData=[{"name":"批号","value":"批号"},{"name":"货号","value":"货号"},{"name":"款号","value":"款号"}];
var jsonAqlbData=[{"name":"","value":""},{"name":"A类","value":"A类"},{"name":"B类","value":"B类"},{"name":"C类","value":"C类"}];
var jsonJyksData=[{"name":"检验科","value":"03"},{"name":"检验科2","value":"05"}];
var jsonCyddData=[{"name":"受检单位成品仓库","value":"受检单位成品仓库"}];
var jsonFyztData=[{"name":"封样完好","value":"封样完好"},{"name":"未封样","value":"未封样"}];
var jsonYpbsData=[{"name":"棉100","value":"棉100"},{"name":"棉：，聚酯纤维：","value":"棉：，聚酯纤维："}];
var jsonYyclData=[{"name":"弃样","value":"弃样"},{"name":"取未损部分样","value":"取未损部分样"},{"name":"取全部余样","value":"取全部余样"}];
var jsonBglqData=[{"name":"自取","value":"自取"},{"name":"快递","value":"快递"}];
var jsonKhyqData=[{"name":"客户要求只破坏面料","value":"客户要求只破坏面料"},{"name":"尽可能的少破坏样品","value":"尽可能的少破坏样品"}];
var strYpslData="套,件,条,床,包,幅,cm,Kg";
var strGgxhData="×";

var jsonExpressData=[{"name":"顺丰快递","value":"顺丰快递"},{"name":"中通快递","value":"中通快递"}];
var jsonExpressTypeData=[{"name":"样品","value":"样品"},{"name":"报告","value":"报告"},{"name":"发票","value":"发票"}];
var sampProdCatArr = new Array(4);
sampProdCatArr[0]  = "服装::学生服,衬衣,大衣,西服,校服,裤,装,衫,T恤,棉服装,服,袜,帽,围巾,衣";
sampProdCatArr[1]  = "面料::面料,里料,布样,丝布,健康布";
sampProdCatArr[2]  = "纱线::纱,线,纱线";
sampProdCatArr[3]  = "棉胎::棉絮,棉胎";

var global_isFree="0"; //是否免费检验,免费时计算实际收费为0
var global_priceTjType="1"; //统计时1按实际收费，2按理论收费
var global_isOpenBarCode="0"; //是否显示条码
var global_dddNo="EYXJ/JL402-2019"; //调度单上的编码，不设置则为空
var global_ypclPageCount=15; //样品处理登记表默认每页行数
var global_ypclNo="EYXJ/JL443-2019"; //样品处理登记表上的编码，不设置则为空
var global_ypclTitle="湖北省纤维检验局宜昌分局&nbsp;&nbsp;湖北省纤维制品检测中心宜昌分中心";
var global_tmTitle="宜昌市纤维检验局样品识别卡";
var global_cydTitle="宜昌市纤维检验局";
var global_cydNo="EYXJ/JL445-2019";
var global_sampNoLenth=8; //条码上显示的报告编号部分长度， 显示成：报告编号（随机数），可以不设置
var globalArr_itemResult = new Array(3);
globalArr_itemResult[0]="4—5";
globalArr_itemResult[1]="4";
globalArr_itemResult[2]="直向沾色：4—5";
var global_inspitem_separator="，"; //检验项目之间的分隔符，不指定时默认为中文逗号
var global_ddd_itembehind="cpbz"; //调度单上检验项目后面跟产品标准
var global_ODR_sld="色牢度1|selaodu00001^色牢度名称自动|selaodu00002^色牢度名称打勾|selaodu00003"; //色牢度的原始记录模板 
//logs.js
var app = getApp();
Page({
  data: {
    /** 
      * 页面配置 
      */
    sfarray: ['1成', '2成', '3成', '4成', '5成', '6成', '7成', '8成', '9成'],
    sfindex: 2,//首付
    sydkact: 0,//选择的哪个商业贷款
    jsfsact: 0, //计算类型
    qxmsg: '20年(240期)',
    sydk: '',//总额
    gjjdk:'',
    dkqx: '20',//期限
    gjjlvdata: [
      { lvmc: '基准利率', lvindex: '0', lv: '3.25' },
      { lvmc: '7折', lvindex: '1', lv: '2.275' },
      { lvmc: '7.5折', lvindex: '2', lv: '2.438' },
      { lvmc: '8折', lvindex: '3', lv: '2.6' },
      { lvmc: '8.5折', lvindex: '4', lv: '2.762' },
      { lvmc: '8.8折', lvindex: '5', lv: '2.86' },
      { lvmc: '9折', lvindex: '6', lv: '2.925' },
      { lvmc: '9.5折', lvindex: '7', lv: '3.087' },
      { lvmc: '1.1倍', lvindex: '8', lv: '3.575' },
      { lvmc: '1.2倍', lvindex: '9', lv: '3.9' },
      { lvmc: '1.3倍', lvindex: '10', lv: '4.225' }
    ],
    dklvdata: [
      { lvmc: '基准利率', lvindex: '0', lv: '4.9' },
      { lvmc: '7折', lvindex: '1', lv: '3.43' },
      { lvmc: '7.5折', lvindex: '2', lv: '3.675' },
      { lvmc: '8折', lvindex: '3', lv: '3.92' },
      { lvmc: '8.5折', lvindex: '4', lv: '4.165' },
      { lvmc: '8.8折', lvindex: '5', lv: '4.312' },
      { lvmc: '9折', lvindex: '6', lv: '4.41' },
      { lvmc: '9.5折', lvindex: '7', lv: '4.655' },
      { lvmc: '1.1倍', lvindex: '8', lv: '5.39' },
      { lvmc: '1.2倍', lvindex: '9', lv: '5.88' },
      { lvmc: '1.3倍', lvindex: '10', lv: '6.37' }
    ],
    lvxz: '',
    sdlv: '4.9',//商贷利率
    zdysdlv:'',
    gjjlv:'3.25',
    zdygjjlv:'',
    lvindex: '0',
    lvindex2:'0',
    jgxs: '',
    bjdj: ''
  },
  onLoad: function () {
  },
  radioChange: function (e) {
    if (e.currentTarget.dataset.lx == 'jsfs') {
      this.setData({
        jsfsact: e.detail.value
      })
    }
    if (e.currentTarget.dataset.lx == 'sydk') {
      console.log('ceshi')
      this.setData({
        sydkact: e.detail.value
      })
    }
  },
  bindPickerChange: function (e) {
    this.setData({
      sfindex: e.detail.value
    })
  },
  slider4change: function (e) {
    this.setData({
      dkqx: e.detail.value,
      qxmsg: e.detail.value + '年(' + e.detail.value * 12 + '期)'
    })
  },
  sydk: function (e) {//贷款总额
    this.setData({
      sydk: e.detail.value
    })
  },
  gjjdk:function(e){
    this.setData({
      gjjdk: e.detail.value
    })
  },
  szpd: function (e) {
    let re = /^[0-9]+\.?[0-9]*$/
    if (e.detail.value != '') {
      if (re.test(e.detail.value)) {
        if (e.detail.value > 10000) {
          wx.showModal({
            content: '超出计算范围',
            showCancel: false,
          })
          return ''
        }
      } else {
        wx.showModal({
          content: '只能输入数字',
          showCancel: false,
        })
        return ''
      }
    }
  },
  lvxzjg: function (e) {
    this.setData({
      lvxz: e.currentTarget.dataset.index
    })
  },
  qxlvxz: function () {
    this.setData({
      lvxz: ''
    })
  },
  lvsrpd: function (e) {
    let re = /^[0-9]+\.?[0-9]*$/
    if (e.detail.value != '') {
      if (re.test(e.detail.value)) {
        if (e.detail.value > 100) {
          wx.showModal({
            content: '不能大于100',
            showCancel: false,
          })
          return ''
        } 
      } else {
        wx.showModal({
          content: '只能输入数字',
          showCancel: false,
        })
        return ''
      }
    }
  },
  lvsr:function(e){
    this.setData({
      zdysdlv: e.detail.value
    })
  },
  lvsr2: function (e) {
    this.setData({
      zdygjjlv: e.detail.value
    })
  },
  lvxzlist: function (e) {
    this.setData({
      lvxz: '',
      sdlv: e.currentTarget.dataset.lv,
      lvindex: e.currentTarget.dataset.index
    })
  },
  lvxzlist2: function (e) {
    this.setData({
      lvxz: '',
      gjjlv: e.currentTarget.dataset.lv,
      lvindex2: e.currentTarget.dataset.index
    })
  },
  lvsrqr: function () {
    if (this.data.zdysdlv == '') {
      wx.showModal({
        content: '自定义利率不能为空',
        showCancel: false,
      })
    } else {
      this.setData({
        lvxz: '',
        sdlv:this.data.zdysdlv,
        lvindex: '11'
      })
    }
  },
  lvsrqr2: function () {
    if (this.data.zdygjjlv == '') {
      wx.showModal({
        content: '自定义利率不能为空',
        showCancel: false,
      })
    } else {
      this.setData({
        lvxz: '',
        gjjlv:this.data.zdygjjlv,
        lvindex2: '11'
      })
    }
  },
  daikuanqh: function (e) {
    this.setData({
      sydkact: e.currentTarget.dataset.qh
    })
  },
  ksjisuan: function () {
    if(this.data.sydk=='' || this.data.gjjdk==''){
      wx.showModal({
        content: '不能为空',
        showCancel: false,
      })
    }
    var month = this.data.dkqx * 12
    var total_sy = parseInt(this.data.sydk)*10000
    var total_gjj = parseInt(this.data.gjjdk)*10000
    var daikuan_total = total_sy + total_gjj;
    var lilv_sd = this.data.sdlv / 100; //得到商贷利率
    var lilv_gjj = this.data.gjjlv / 100; 
    var fmobj = {}
    fmobj.daikuan_total1 = daikuan_total/10000;
    fmobj.daikuan_total2 = daikuan_total/10000;
    var all_total2 = 0;
    var month_money2 = "";
    for (let j = 0; j < month; j++) {
      //调用函数计算: 本金月还款额
      var huankuan = app.getMonthMoney2(lilv_sd, total_sy, month, j) + app.getMonthMoney2(lilv_gjj, total_gjj, month, j);
      all_total2 += huankuan;
      huankuan = Math.round(huankuan * 100) / 100;
      //fmobj.month_money2.options[j] = new Option( (j+1) +"月," + huankuan + "(元)", huankuan);
      month_money2 += (j + 1) + "月," + huankuan + "(元)\n";
    }
    fmobj.month_money2 = Math.round(app.getMonthMoney2(lilv_sd, total_sy, month, 0) + app.getMonthMoney2(lilv_gjj, total_gjj, month, 0));
    //还款总额
    fmobj.all_total2 = Math.round(all_total2 / 100) / 100;
    //支付利息款
    fmobj.accrual2= Math.round((all_total2 - daikuan_total) / 100) / 100;
    var bjdj = Math.round((app.getMonthMoney2(lilv_sd, total_sy, month, 0) + app.getMonthMoney2(lilv_gjj, total_gjj, month, 0)-app.getMonthMoney2(lilv_sd, total_sy, month,1) -app.getMonthMoney2(lilv_gjj, total_gjj, month, 1))*100)/100;
    this.setData({
      bjdj: bjdj
    })
    //2.本息还款
    //月均还款
    var month_money1 = app.getMonthMoney1(lilv_sd, total_sy, month) + app.getMonthMoney1(lilv_gjj, total_gjj, month); //调用函数计算
    fmobj.month_money1 = Math.ceil(month_money1)
    //还款总额
    var all_total1 = month_money1 * month;
    fmobj.all_total1 = Math.round(all_total1 / 100) / 100;
    //支付利息款
    fmobj.accrual1 = Math.round((all_total1 - daikuan_total) / 100) / 100;
    this.setData({
      fmobj: fmobj,
      jgxs: 1
    })
  }
})  
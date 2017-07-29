//logs.js
var app = getApp();
Page({
  data: {
    /** 
      * 页面配置 
      */
    sfarray: ['1成','2成','3成', '4成','5成', '6成', '7成', '8成', '9成'],
    sfindex:2,//首付
    sydkact:0,//选择的哪个商业贷款
    jsfsact:0, //计算类型
    qxmsg:'20年(240期)',
    dkze:'',//总额
    dkqx:'20',//期限
    dklvdata:[
      {lvmc:'基准利率',lvindex:'0',lv:'4.9'},
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
    lvxz:'',
    sdlv:'4.9',//商贷利率
    zdysdlv:'',
    lvindex:'0',
    bjdj:'',//本金递减
    price:'',
    metre:'',
    jgxs:''
  },
  onLoad: function () {
  },
  radioChange:function(e){
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
  bindPickerChange:function(e){
    this.setData({
      sfindex: e.detail.value
    })
  },
  slider4change:function(e){
      this.setData({
        dkqx: e.detail.value,
        qxmsg: e.detail.value + '年('+e.detail.value*12+'期)'
      })
  },
  dkzk:function(e){//贷款总额
    this.setData({
      dkze: e.detail.value
    })
  },
  dkprice:function(e){
     this.setData({
        price: e.detail.value
    })
  },
  dkmetre: function (e) {
    this.setData({
      metre: e.detail.value
    })
  },
  szpd:function(e){
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
  lvxzjg:function(){
    this.setData({
      lvxz:'1'
    })
  },
  qxlvxz:function(){
    this.setData({
      lvxz: ''
    })
  },
  lvsr:function(e){
    this.setData({
      zdysdlv: e.detail.value
    })
  },
  lvszpd: function (e) {
    let re = /^[0-9]+\.?[0-9]*$/
    if (e.detail.value != '') {
      if (re.test(e.detail.value)) {
        if (e.detail.value > 100) {
          wx.showModal({
            content: '不能超过100',
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
  lvxzlist:function(e){
    this.setData({
      lvxz: '',
      sdlv: e.currentTarget.dataset.lv,
      lvindex: e.currentTarget.dataset.index
    })
  },
  lvsrqr:function(){
    if (this.data.zdysdlv==''){
      wx.showModal({
        content: '自定义利率不能为空',
        showCancel: false,
      })
    }else{
      this.setData({
        lvxz: '',
        sdlv: this.data.zdysdlv,
        lvindex: '11'
      })
    }
  },
  daikuanqh:function(e){
    this.setData({
      sydkact: e.currentTarget.dataset.qh
    })
  },
  ksjisuan:function(){
    var month = this.data.dkqx*12
    var lilv = this.data.sdlv/100
    var fmobj = {}
    if (this.data.jsfsact==0){
      fmobj.fangkuan_total1 = "略"
      fmobj.fangkuan_total2 = "略"
      if (this.data.dkze==''){
        wx.showModal({
          content: '不能为空',
          showCancel: false,
        })
        return 
      }
      var daikuan_total = this.data.dkze*10000 
      fmobj.daikuan_total1 = this.data.dkze
      fmobj.daikuan_total2 = this.data.dkze
      //首期付款
      fmobj.money_first1 = 0;
      fmobj.money_first2 = 0;
    }else{
      if (this.data.price == '' || this.data.metre=='') {
        wx.showModal({
          content: '不能为空',
          showCancel: false,
        })
        return
      }
      var fangkuan_total = this.data.price * this.data.metre
      fmobj.fangkuan_total1 = fangkuan_total;
      fmobj.fangkuan_total2 = fangkuan_total;
      //贷款总额 
      var sfindex = parseInt(this.data.sfindex)+1
      var daikuan_total = Math.round((this.data.price * this.data.metre) * (1-sfindex / 10));
      console.log(daikuan_total)
      fmobj.daikuan_total1 =daikuan_total/10000;
      fmobj.daikuan_total2 = daikuan_total / 10000;
      //首期付款
      var money_first = fangkuan_total - daikuan_total;
      fmobj.money_first1 = money_first
      fmobj.money_first2 = money_first;
    }
    var all_total2 = 0;
    for (let j = 0; j < month; j++) {
      //调用函数计算: 本金月还款额
      let huankuan = app.getMonthMoney2(lilv, daikuan_total, month, j);
      all_total2 += huankuan;
      huankuan = Math.round(huankuan * 100) / 100;
    }
   
    fmobj.month_money2 = Math.round(app.getMonthMoney2(lilv, daikuan_total, month, 0));//等额本息
    //还款总额
    fmobj.all_total2 = Math.round(all_total2/100)/100 ;
    //支付利息款
    fmobj.accrual2= Math.round((all_total2 - daikuan_total)/100)/100;
    //2.本息还款
    var bjdj = Math.round((app.getMonthMoney2(lilv, daikuan_total, month, 0)- app.getMonthMoney2(lilv, daikuan_total, month, 1))*100)/100
    this.setData({
      bjdj: bjdj
    })
    //月均还款
    var month_money1 = app.getMonthMoney1(lilv, daikuan_total, month); //调用函数计算
    fmobj.month_money1 = Math.ceil(month_money1);
    
    //还款总额
    var all_total1 = month_money1 * month;
    fmobj.all_total1 = Math.round(all_total1/100)/100;
    //支付利息款
    fmobj.accrual1 = Math.round((all_total1 - daikuan_total)/100) / 100;
    this.setData({
      fmobj: fmobj,
      jgxs:1
    })
  }
})  
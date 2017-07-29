// pages/logs/logxq.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var act=options.act
    var that=this
    var dkze=options.dkze
    var daikuan_total = dkze*10000
    var hkzeo = options.hkzeo * 10000
    var hkzet=options.hkzet*10000
    var lilv=options.lv/100
    var nx=options.nx
    var month = nx*12
    var fangdai_jgt=[];
    for(let i=0;i<nx;i++){
      fangdai_jgt[i]=[]
      for(let j=0;j<12;j++){
        let huankuan = app.getMonthMoney4(lilv, daikuan_total, month, i * 12 + j, hkzet);
        //all_total2 += huankuan;
        //huankuan = Math.round(huankuan * 100) / 100;
        hkzet = huankuan.sy
        fangdai_jgt[i][j] = huankuan
        
      }
    }
    var month_money = Math.round(hkzeo / month);
    var fangdai_jgo = app.getMonthMoney3(lilv, daikuan_total, nx, month_money, hkzeo);
    that.setData({
      fangdai_jgo: fangdai_jgo,
      fangdai_jgt: fangdai_jgt,
      act:act,
      dkze: options.dkze,
      hkzeo: options.hkzeo,
      hkzet: options.hkzet,
      hklxo: (options.hkzeo - options.dkze).toFixed(2),
      hklxt: (options.hkzet - options.dkze).toFixed(2),
      nx: nx,
      loadingHidden:true
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  head_qh:function(e){
    this.setData({
      act: e.currentTarget.dataset.index
    })
  }
})
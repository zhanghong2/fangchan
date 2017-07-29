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
    console.log(options)
    var act = options.act
    var that = this
    var dkze = (parseFloat(options.sydk) + parseFloat(options.gjjdk)).toFixed()
    var sydk=options.sydk
    var gjjdk = options.gjjdk
    var daikuan_total = dkze * 10000
    var hkzeo = options.hkzeo * 10000
    var hkzet = options.hkzet * 10000
    var sylilv = options.sylv / 100
    var gjjlilv=options.gjjlv/100
    var nx = options.nx
    var month = nx * 12
    var fangdai_jgt = app.getMonthMoney5(sylilv,gjjlilv,sydk,gjjdk,nx,hkzet);
    
    var fangdai_jgo = app.getMonthMoney6(sylilv, sydk, gjjlilv, gjjdk, nx, hkzeo);
    
    that.setData({
      fangdai_jgo: fangdai_jgo,
      fangdai_jgt: fangdai_jgt,
      act: act,
      dkze: dkze,
      hkzeo: options.hkzeo,
      hkzet: options.hkzet,
      hklxo: (options.hkzeo - dkze).toFixed(2),
      hklxt: (options.hkzet -dkze).toFixed(2),
      nx: nx,
      loadingHidden:true
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  head_qh: function (e) {
    this.setData({
      act: e.currentTarget.dataset.index
    })
  }
})
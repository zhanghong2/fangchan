// pages/list/ershou/ershou.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    navlist: '',
    qytj: '',
    jgtj: '',
    hxtj: '',
    dectj: '',
    cxtj: '',
    mjtj: '',
    quyu: [
      { quyu: '不限', qykey: '', qysousuo: '' },
      { quyu: '邯山区', qykey: '1', qysousuo: 'a0' },
      { quyu: '丛台区', qykey: '2', qysousuo: 'a1' },
      { quyu: '复兴区', qykey: '3', qysousuo: 'a2' },
      { quyu: '高开区', qykey: '4', qysousuo: 'a3' }
    ],
    jiage: [
      { jg: '不限', jgkey: '', jgsousuo: '' },
      { jg: '500元以下', jgkey: '1', jgsousuo: 'j0' },
      { jg: '500-1000', jgkey: '2', jgsousuo: 'j1' },
      { jg: '1000-1500', jgkey: '3', jgsousuo: 'j2' },
      { jg: '1500-2000', jgkey: '4', jgsousuo: 'j3' },
      { jg: '2000以上', jgkey: '5', jgsousuo: 'j4' }

    ],
    hux: [
      { hux: '不限', hxkey: '', hxsousuo: '' },
      { hux: '一室', hxkey: '1', hxsousuo: '1' },
      { hux: '二室', hxkey: '2', hxsousuo: '2' },
      { hux: '三室', hxkey: '3', hxsousuo: '3' },
      { hux: '四室', hxkey: '4', hxsousuo: '4' },
      { hux: '四室以上', hxkey: '5', hxsousuo: '5' }
    ],
    deco: [
      { deco: '毛坯', deckey: '1', decsousuo: '' },
      { deco: '精装', deckey: '2', decsousuo: '' },
      { deco: '简装', deckey: '3', decsousuo: '' }
    ],
    cx: [
      { cx: '朝东', cxkey: '1', cxsousuo: '' },
      { cx: '朝南', cxkey: '2', cxsousuo: '' },
      { cx: '朝西', cxkey: '3', cxsousuo: '' },
      { cx: '朝北', cxkey: '4', cxsousuo: '' },
      { cx: '南北', cxkey: '5', cxsousuo: '' },
      { cx: '其他', cxkey: '6', cxsousuo: '' }
    ],
    mianji: [
      { mj: '30㎡以下', mjkey: '1', mjsousuo: '' },
      { mj: '30-60㎡', mjkey: '2', mjsousuo: '' },
      { mj: '60-90㎡', mjkey: '3', mjsousuo: '' },
      { mj: '90-120㎡', mjkey: '4', mjsousuo: '' },
      { mj: '120㎡以上', mjkey: '5', mjsousuo: '' },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollheight: res.windowHeight - 66
        })
      }
    })
    wx.request({
      url: 'http://yuanmengjiafc.com/xiao/czcsh.php', //仅为示例，并非真实的接口地址
      data: {
       
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.data)
        if (res.data.data == '暂无数据') {
          that.setData({
            loadingHidden: true,
          })
          wx.showModal({
            content: '暂无数据',
            showCancel: false,
          })
        } else {
          that.setData({
            eslist: res.data.data,
            loadingHidden: true,
            page: that.data.page += 1
          })
        }
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.xiala();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    that.setData({
      loadingHidden: false
    })
    wx.request({
      url: 'http://yuanmengjiafc.com/xiao/czlist.php', //仅为示例，并非真实的接口地址
      data: {
        page: that.data.page,
        qy: that.data.qytj,
        jg: that.data.jgtj,
        hx: that.data.hxtj,
        dec: that.data.dectj,
        cx: that.data.cxtj,
        mj: that.data.mjtj,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.sql)
        if (res.data.data == '暂无数据') {
          that.setData({
            loadingHidden: true
          })
          wx.showModal({
            content: '没有更多数据',
            showCancel: false,
          })
        } else {
          that.setData({
            eslist: that.data.eslist.concat(res.data.data),
            page: that.data.page += 1,
            loadingHidden: true
          })
        }
      }
    })
  },

  quyu: function (e) {
    this.tablist(e.currentTarget.dataset.index);
  },
  qyxz: function (e) {
    this.setData({
      navlist: '',
      qytj: e.currentTarget.dataset.qy,
      dectj: '',
      cxtj: '',
      mjtj: ''
    })
    this.tjqq()
  },
  jiage: function (e) {
    this.tablist(e.currentTarget.dataset.index);
  },
  jgxz: function (e) {
    this.setData({
      navlist: '',
      jgtj: e.currentTarget.dataset.jg,
      dectj: '',
      cxtj: '',
      mjtj: ''
    })
    this.tjqq()
  },
  hux: function (e) {
    this.tablist(e.currentTarget.dataset.index);
  },
  huxxz: function (e) {
    this.setData({
      navlist: '',
      hxtj: e.currentTarget.dataset.jg,
      dectj: '',
      cxtj: '',
      mjtj: ''
    })
    this.tjqq()
  },
  gengd: function (e) {
    this.tablist(e.currentTarget.dataset.index);
  },
  decxz: function (e) {
    this.setData({
      dectj: e.currentTarget.dataset.dec
    })
  },
  cxxz: function (e) {
    this.setData({
      cxtj: e.currentTarget.dataset.cx
    })
  },
  mjxz: function (e) {
    this.setData({
      mjtj: e.currentTarget.dataset.mj
    })
  },
  gdqx: function () {
    this.setData({
      dectj: '',
      cxtj: '',
      mjtj: '',
      navlist: ''
    })
    this.tjqq()
  },
  gdxz: function (e) {
    this.setData({
      navlist: ''
    })
    this.tjqq()
  },
  tiaojianbg: function () {
    this.setData({
      navlist: ''
    })
  },
  tablist: function (navlist) {
    if (this.data.navlist == '') {
      this.setData({
        navlist: navlist
      })
    } else if (this.data.navlist == navlist) {
      this.setData({
        navlist: ''
      })
    } else {
      this.setData({
        navlist: navlist
      })
    }
  },
  xiala: function () {
    var that = this
    that.setData({
      loadingHidden: false
    })
    wx.request({
      url: 'http://yuanmengjiafc.com/xiao/czcsh.php', //仅为示例，并非真实的接口地址
      data: {
        
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.stopPullDownRefresh()
        that.setData({
          eslist: res.data.data,
          page: 2,
          loadingHidden: true,
          qytj: '',
          jgtj: '',
          hxtj: '',
          dectj: '',
          cxtj: '',
          mjtj: '',
         
        })
      }
    })
  },
  tjqq: function () {//条件请求
    var that = this
    that.setData({
      loadingHidden: false,
      page: 1
    })

    wx.request({
      url: 'http://yuanmengjiafc.com/xiao/czlist.php', //仅为示例，并非真实的接口地址
      data: {
        page: that.data.page,
        qy: that.data.qytj,
        jg: that.data.jgtj,
        hx: that.data.hxtj,
        dec: that.data.dectj,
        cx: that.data.cxtj,
        mj: that.data.mjtj,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.sql)
        if (res.data.data == '暂无数据') {
          that.setData({
            loadingHidden: true,
            eslist: ''
          })
          wx.showModal({
            content: '暂无数据',
            showCancel: false,
          })
        } else {
          that.setData({
            eslist: res.data.data,
            page: 2,
            loadingHidden: true
          })
        }
      }
    })
  }
})
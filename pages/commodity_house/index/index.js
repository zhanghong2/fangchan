var app = getApp();

Page({
  data: {
    houseMetaStatus: 0
    //   house: {
    //     name: '楼盘名称'
    //   }
  },

  onLoad: function (options) {
    this.setData({
      id: options.id
    })

    var that = this
    wx.request({
      url: app.globalData.siteUrl + '/api/commodity-house/index',
      data: {
        id: options.id,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
  //       console.log(res.data.data)
        that.setData({
          house: res.data.data
        })
      }
    })
  },

  houseMetaShowDetail() {
    this.setData({
      houseMetaStatus: 1
    })
  },

  houseMetaHideDetail() {
    this.setData({
      houseMetaStatus: 0
    })
  }
})

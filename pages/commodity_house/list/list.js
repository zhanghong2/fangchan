
var app = getApp();

Page({
  data: {
    currentCity: 0,
    currentCategory: 0,
    currentPriceRange: 0,
    currentDecoration: 0,
    currentRoom: 0,
    currentStyle: 0,
    page: 1,
    isFilterExpanded: false
  },

  bindFilterToggle() {
     this.setData({
      isFilterExpanded: !this.data.isFilterExpanded
    })
  },

  toCommodityHouseIndex: function (e) {
    wx.navigateTo({
      url: '../index/index?id=' + e.target.id
    })
  },
  onLoad: function (option) {
    var self = this
    wx.request({
      url: app.globalData.siteUrl + '/api/commodity-house/get-filter',
      method: 'GET',
      success: function (res) {

        // console.log(res.data.data)

        self.setData({
          cityFilterRange: res.data.data.cities,
          categoryFilterRange: res.data.data.categories,
          priceRangeFilterRange: res.data.data.price_ranges,
          decorationFilterRange: res.data.data.decoration_standards,
          roomFilterRange: res.data.data.room_types,
          styleFilterRange: res.data.data.styles
        });
        // 异步
        wx.request({
          url: app.globalData.siteUrl + '/api/commodity-house/get-list',
          data: {
            region: self.data.cityFilterRange[[self.data.currentCity]].id,
            cat: self.data.currentCategory,
            price: self.data.currentPriceRange,
            decoration: self.data.currentDecoration,
            style: self.data.currentStyle,
            pagesize: 10,
            photo_cover_size: '300x300'
          },
          success: function (res) {

            // console.log(res.data.data);

            self.setData({
              house_list: res.data.data
            })
          }
        });
      },
    })

  },

  bindCityChange: function (e) {
    this.setData({
      currentCity: e.detail.value
    })
    this.filterChanged()
  },

  bindCategoryChange: function (e) {
    this.setData({
      currentCategory: e.detail.value
    })
    this.filterChanged()
  },

  bindPriceRangeChange: function (e) {
    this.setData({
      currentPriceRange: e.detail.value
    })
    this.filterChanged()
  },

  bindDecorationChange: function (e) {
    this.setData({
      currentDecoration: e.target.dataset.id
    })
  },

  bindRoomChange: function (e) {
    this.setData({
      currentRoom: e.target.dataset.id
    })
  },

  bindStyleChange: function (e) {
    this.setData({
      currentStyle: e.target.dataset.id
    })
  },

  filterCancel() {
    this.setData({
      currentCity: 0,
      currentCategory: 0,
      currentPriceRange: 0,
      currentDecoration: 0,
      currentStyle: 0,
      currentRoom: 0,
      isFilterExpanded: false
    });
    this.filterChanged()
  },

  filterChanged() {
    this.setData({
      isFilterExpanded: false
    })
    var self = this
    wx.showToast({
      title: '载入中',
      icon: 'loading',
      duration: 60000
    })
    wx.request({
      url: app.globalData.siteUrl + '/api/commodity-house/get-list',
      data: {
        region: self.data.cityFilterRange[[self.data.currentCity]].id,
        cat: self.data.currentCategory,
        price: self.data.currentPriceRange,
        decoration: self.data.currentDecoration,
        style: self.data.currentStyle,
        page: 1,
        pagesize: 10,
        photo_cover_size: '300x300'
      },
      success: function (res) {
        // console.log(res.data.data);
        var new_house_list = res.data.data
        self.setData({
          house_list: new_house_list,
          page: self.data.page + 1
        })
      },
      fail: function () {
        console.log("获取数据失败");
      },
      complete: function () {
        wx.hideToast();
      }
    })
  },

  getMore() {
    var self = this
    wx.showToast({
      title: '载入中',
      icon: 'loading',
      duration: 60000
    })
    var self = this;
    wx.request({
      url: app.globalData.siteUrl + '/api/commodity-house/get-list',
      data: {
        region: self.data.cityFilterRange[[self.data.currentCity]].id,
        cat: self.data.currentCategory,
        price: self.data.currentPriceRange,
        decoration: self.data.currentDecoration,
        style: self.data.currentStyle,
        page: self.data.page + 1,
        pagesize: 10,
        photo_cover_size: '300x300'
      },
      success: function (res) {
        // console.log(res.data.data);
        var new_house_list = self.data.house_list.concat(res.data.data)
        self.setData({
          house_list: new_house_list,
          page: self.data.page + 1
        })
      },
      fail: function () {
        console.log("获取数据失败");
      },
      complete: function () {
        wx.hideToast();
      }
    })
  }
})

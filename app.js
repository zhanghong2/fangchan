//app.js
App({
 
  
  getMonthMoney2: function (lilv, total, month, cur_month) {
    var lilv_month = lilv / 12; //月利率
    //return total * lilv_month * Math.pow(1 + lilv_month, month) / ( Math.pow(1 + lilv_month, month) -1 );
    var benjin_money = total / month;
    return (total - benjin_money * cur_month) * lilv_month + benjin_money;
  },
  getMonthMoney1: function (lilv, total, month) {
    var lilv_month = lilv / 12; //月利率
    var denge_money = total * lilv_month * Math.pow(1 + lilv_month, month) / (Math.pow(1 + lilv_month, month) - 1)
    return denge_money
  },
  getMonthMoney3: function (lilv, total, nx, denge, ze) {
    var month = nx * 12
    var lilv_month = lilv / 12; //月利率
    var total = total//贷款总额
    var money = denge//每月还款
    var ze = ze//还款总额
    var fangdai_jgo = [];
    for (let i = 0; i < nx; i++) {
      fangdai_jgo[i] = []
      for (let j = 0; j < 12; j++) {
        fangdai_jgo[i][j] = {}
        let lixi = Math.round(total * lilv_month)
        fangdai_jgo[i][j].lixi = lixi
        fangdai_jgo[i][j].bj = money - lixi
        fangdai_jgo[i][j].yg = money
        fangdai_jgo[i][j].ze = ze - money
        ze -= money
        total = total - (money - lixi)
      }
    }
    return fangdai_jgo
  },
  getMonthMoney4: function (lilv, total, month, cur_month, hkze) {
    let daikuan = {}

    var lilv_month = lilv / 12; //月利率
    //return total * lilv_month * Math.pow(1 + lilv_month, month) / ( Math.pow(1 + lilv_month, month) -1 );
    var benjin_money = total / month;
    daikuan.bj = Math.round(total / month);
    daikuan.yg = Math.round((total - benjin_money * cur_month) * lilv_month + benjin_money)
    daikuan.lx = Math.round((total - benjin_money * cur_month) * lilv_month)
    daikuan.sy = hkze - daikuan.yg
    return daikuan
  },
  getMonthMoney5: function (sylilv, gjjlilv, sytotal, gjjtotal, nx, hkze) {
    var sylilv = sylilv / 12//等额本金
    var gjjlilv = gjjlilv / 12
    var sytotal = sytotal * 10000
    var gjjtotal = gjjtotal * 10000
    var nx = nx
    var month = nx * 12
    var hkze = hkze
    var fangdai_jgt = [];
    for (let i = 0; i < nx; i++) {
      fangdai_jgt[i] = []
      for (let j = 0; j < 12; j++) {
        fangdai_jgt[i][j] = {}
        let cur_month = i * 12 + j
        var benjin_moneyo = Math.round(sytotal / month)
        var benjin_moneyt = Math.round(gjjtotal / month)
        var lxo = (sytotal - benjin_moneyo * cur_month) * sylilv
        var lxt = (gjjtotal - benjin_moneyt * cur_month) * gjjlilv
        let ygbj = benjin_moneyo + benjin_moneyt
        let yglx = Math.round(lxo + lxt)
        let ygzh = ygbj + yglx
        fangdai_jgt[i][j].yg = Math.round(ygzh)
        fangdai_jgt[i][j].bj = ygbj
        fangdai_jgt[i][j].lx = yglx
        fangdai_jgt[i][j].sy = hkze - fangdai_jgt[i][j].yg
        hkze -= fangdai_jgt[i][j].yg
      }
    }
    return fangdai_jgt
  },
  getMonthMoney6: function (sylilv, sytotal, gjjlilv, gjjtotal, nx, ze) {
    var month = nx * 12
    var moneyo = this.getMonthMoney1(sylilv, sytotal * 10000, month)
    var moneyt = this.getMonthMoney1(gjjlilv, gjjtotal * 10000, month)
    var sylilv = sylilv / 12
    var gjjlilv = gjjlilv / 12
    var sytotal = sytotal * 10000//贷款总额
    var gjjtotal = gjjtotal * 10000//每月还款
    var ze = ze//还款总额
    var fangdai_jgo = [];
    var yg = Math.round(moneyo + moneyt)
    for (let i = 0; i < nx; i++) {
      fangdai_jgo[i] = []
      for (let j = 0; j < 12; j++) {
        fangdai_jgo[i][j] = {}
        let lixio = Math.round(sytotal * sylilv)
        let lixit = Math.round(gjjtotal * gjjlilv)
        let lxzh = Math.round(lixio + lixit)
        let bjo = moneyo - lixio
        let bjt = moneyt - lixit
        let bjzh = Math.round(bjo + bjt)
        fangdai_jgo[i][j].lixi = lxzh
        fangdai_jgo[i][j].bj = bjzh
        fangdai_jgo[i][j].yg = yg
        fangdai_jgo[i][j].ze = ze - yg
        ze -= yg
        sytotal = sytotal - (moneyo - lixio)
        gjjtotal = gjjtotal - (moneyt - lixit)
      }
    }
    return fangdai_jgo
  }
})

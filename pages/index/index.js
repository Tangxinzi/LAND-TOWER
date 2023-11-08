// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    userinfo: false
  },
  
  onLoad() {
    
  },

  getPhoneNumber(e) {
    wx.login({
      success: (res) => {
        this.setData({ userinfo: true })
        console.log(res)
        console.log(e);
        console.log(e.detail.code)  // 动态令牌
        console.log(e.detail.errMsg) // 回调信息（成功失败都会返回）
        console.log(e.detail.errno)  // 错误码（失败时返回）
      },
    })
  }
})

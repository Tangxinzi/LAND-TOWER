import siteinfo from '../../lib/siteinfo';
const app = getApp()

Page({
  data: {
    siteinfo,
    userinfo: wx.getStorageSync('userinfo')
  },
  
  onShow() {
    wx.request({
      url: `${ siteinfo.site }/land/user/info?openid=${ this.data.userinfo.wechat_open_id }`,
      method: 'GET',
      success: (response) => {
        this.setData({ userinfo: response.data })
        wx.setStorageSync('userinfo', response.data)
      },
      fail: () => {
        wx.showToast({
          title: '登录失败',
          icon: 'none'
        })
      }
    })
  },

  getPhoneNumber(e) {
    wx.login({
      success: (login) => {
        wx.request({
          url: `${ siteinfo.site }/land/user/wx-login?code=${ login.code }`,
          success: (response) => {
            this.setData({ userinfo: response.data })
            wx.setStorageSync('userinfo', response.data)
          },
          fail: () => {
            wx.showToast({
              title: '登录失败',
              icon: 'none'
            })
          }
        })

        console.log(e);
        console.log(e.detail.code)  // 动态令牌
        console.log(e.detail.errMsg) // 回调信息（成功失败都会返回）
        console.log(e.detail.errno)  // 错误码（失败时返回）
      },
    })
  }
})

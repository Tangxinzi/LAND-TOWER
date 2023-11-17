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

  navigator(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  },

  getPhoneNumber(e) {
    wx.showLoading({ title: 'Loading...' })
    wx.login({
      success: (login) => {
        wx.request({
          url: `${ siteinfo.site }/land/user/wx-login?code=${ login.code }`,
          success: (loginResponse) => {
            wx.request({
              url: `${ siteinfo.site }/land/user/get-phone-number?code=${ e.detail.code }&openid=${ loginResponse.data.wechat_open_id }`,
              success: (response) => {
                if (response.data.status == 200) {
                  loginResponse.data.phone = response.data.phoneNumber
                  this.setData({ userinfo: loginResponse.data })
                  wx.setStorageSync('userinfo', loginResponse.data)     
                  wx.hideLoading()
                }
              },
              fail: () => {
                wx.hideLoading()
                wx.showToast({ title: '登录失败', icon: 'none' })
              }
            })
          },
          fail: () => {
            wx.hideLoading()
            wx.showToast({ title: '登录失败', icon: 'none' })
          }
        })
      },
    })
  }
})

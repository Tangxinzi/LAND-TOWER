import siteinfo from '../../lib/siteinfo';
const app = getApp()

Page({
  data: {
    siteinfo,
    userinfo: wx.getStorageSync('userinfo') || {},
    coll: {},
    work: {}
  },

  onLoad(options) {
    wx.request({
      url: `${ siteinfo. apiroot }/land/work/show/${ options.id }?type=json`,
      method: 'GET',
      success: (response) => {
        if (response.data.status == 200) {
          response.data.data.detail = app.towxml(`${ response.data.data.detail }`, 'html', {
            base: siteinfo.media,
            theme: 'light',
            events: {
              tap: (e)=>{
                console.log('tap',e);
              }
            }
          })

          this.setData({ options, work: response.data.data })
          this.collStatus()
        }
      }
    })
  },


  collStatus() {
    wx.request({
      url: `${ siteinfo. apiroot }/land/user/like/${ this.data.options.id }`,
      method: 'GET',
      data: {
        type: 'work',
        openid: this.data.userinfo.wechat_open_id,
      },
      success: (response) => {
        if (response.data.status == 200) {
          this.setData({
            coll: response.data.data
          })
        }
      }
    })
  },

  bindColl() {
    if (!this.data.userinfo.wechat_open_id) {
      wx.showModal({
        title: '提示',
        content: '您当前尚未登录，无法进行操作哦',
        confirmText: '去登录',
        complete: (res) => {
          if (res.confirm) {
            wx.switchTab({ url: '/pages/user/user' })
          }
        }
      })

      return
    }

    wx.request({
      url: `${ siteinfo. apiroot }/land/user/like/${ this.data.options.id }`,
      method: 'POST',
      data: {
        type: 'work',
        openid: this.data.userinfo.wechat_open_id,
      },
      success: (response) => {
        if (response.data.status == 200) {
          this.collStatus()
          wx.vibrateShort()
        }
      }
    })
  },

  onShareAppMessage() {

  }
})
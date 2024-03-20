import siteinfo from '../../lib/siteinfo';
const app = getApp()

Page({
  data: {
    siteinfo,
    userinfo: wx.getStorageSync('userinfo') || {},
    option: {},
    coll: {},
    desginer: {}
  },

  fetch(options) {
    wx.request({
      url: `${ siteinfo. apiroot }/land/desginer/show/${ options.id }?type=json`,
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
          
          this.setData({ desginer: response.data.data, options })
          this.collStatus()
        }
      }
    })
  },

  barLeft() {
    const options = this.data.options
    if (options.scene == '1001' || options.scene == '1005' || options.scene == '1006') {
      wx.navigateBack()
    } else {
      wx.switchTab({ url: '/pages/desginer/desginer' })
    }
  },

  collStatus() {
    wx.request({
      url: `${ siteinfo. apiroot }/land/user/like/${ this.data.options.id }`,
      method: 'GET',
      data: {
        type: 'desginer',
        openid: this.data.userinfo.wechat_open_id,
      },
      success: (response) => {
        if (response.data.status == 200) {
          this.setData({ coll: response.data.data })
        }
      }
    })
  },

  onLoad(options) {
    const option = wx.getLaunchOptionsSync()
    console.log(option);
    this.setData({ option })
    this.fetch(options)
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
        type: 'desginer',
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

  onShareAppMessage(event) {
    return {
      title: `${ this.data.desginer.nickname } - 办公设计大师`,
      path: 'pages/desginer-detail/desginer-detail?id=' + this.data.options.id
    }
  },

  onShareTimeline() {
    return {
      title: `${ this.data.desginer.nickname } - 办公设计大师`,
      path: 'pages/desginer-detail/desginer-detail?id=' + this.data.options.id
    }
  }
})
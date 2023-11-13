import siteinfo from '../../lib/siteinfo';

Page({
  data: {
    siteinfo,
    userinfo: wx.getStorageSync('userinfo'),
    coll: {},
    designer: []
  },

  fetch(options) {
    wx.request({
      url: `${ siteinfo.site }/land/designer/show/${ options.id }?type=json`,
      method: 'GET',
      success: (response) => {
        if (response.data.status == 200) {
          this.setData({ designer: response.data.data, options })
          this.collStatus()
        }
      }
    })
  },

  collStatus() {
    wx.request({
      url: `${ siteinfo.site }/land/user/like/${ this.data.options.id }`,
      method: 'GET',
      data: {
        type: 'designer',
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

  onLoad(options) {
    this.fetch(options)
  },

  bindColl() {
    wx.request({
      url: `${ siteinfo.site }/land/user/like/${ this.data.options.id }`,
      method: 'POST',
      data: {
        type: 'designer',
        openid: this.data.userinfo.wechat_open_id,
      },
      success: (response) => {
        if (response.data.status == 200) {
          this.collStatus()
        }
      }
    })
  }
})
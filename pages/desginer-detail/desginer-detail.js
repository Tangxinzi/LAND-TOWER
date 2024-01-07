import siteinfo from '../../lib/siteinfo';
const app = getApp()

Page({
  data: {
    siteinfo,
    userinfo: wx.getStorageSync('userinfo') || {},
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
      url: `${ siteinfo. apiroot }/land/user/like/${ this.data.options.id }`,
      method: 'POST',
      data: {
        type: 'desginer',
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
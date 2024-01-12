import siteinfo from '../../lib/siteinfo';
const app = getApp()

Page({
  data: {
    siteinfo,
    userinfo: wx.getStorageSync('userinfo') || {},
    options: {},
    good: {},
    coll: {},
    current: 1
  },

  swiperChange(event) {
    const { current, source } = event.detail
    this.setData({ current: current + 1 })
  },

  onLoad(options) {
    wx.request({
      url: `${ siteinfo. apiroot }/land/good/show/${ options.id }?type=json`,
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

          this.setData({ options, good: response.data.data })
          this.collStatus()
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
        type: 'good',
        openid: this.data.userinfo.wechat_open_id,
      },
      success: (response) => {
        if (response.data.status == 200) {
          this.collStatus()
        }
      },
      fail: (err) => {
        console.log(err);
      }
    })
  },

  collStatus() {
    wx.request({
      url: `${ siteinfo. apiroot }/land/user/like/${ this.data.options.id }`,
      method: 'GET',
      data: {
        type: 'good',
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

  contact() {
    wx.openCustomerServiceChat({
      extInfo: {
        url: 'https://work.weixin.qq.com/kfid/kfcc165f42e757e49cb'
      },
      corpId: 'ww38c652abe66e0fc1',
      success(res) {}
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
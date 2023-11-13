import siteinfo from '../../lib/siteinfo';
const app = getApp()

Page({
  data: {
    siteinfo,
    userinfo: wx.getStorageSync('userinfo'),
    designer: [],
    type: 0
  },

  switch(event) {
    console.log(event);
    this.setData({
      type: event.currentTarget.dataset.type
    })
  },

  onLoad(options) {
    wx.request({
      url: `${ siteinfo.site }/land/user/collection?openid=${ this.data.userinfo.wechat_open_id }&type=designer`,
      method: 'GET',
      success: (response) => {
        this.setData({ designer: response.data.data })
      },
      fail: () => {
        wx.showToast({
          title: '登录失败',
          icon: 'none'
        })
      }
    })

    // wx.request({
    //   url: `${ siteinfo.site }/land/designer?type=json`,
    //   method: 'GET',
    //   success: (response) => {
    //     if (response.data.status == 200) {
    //       this.setData({ designer: response.data.data })
    //     }
    //   }
    // })
  },

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
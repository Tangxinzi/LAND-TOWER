import siteinfo from '../../lib/siteinfo';
const app = getApp()

Page({
  data: {
    siteinfo,
    userinfo: wx.getStorageSync('userinfo') || {},
    data: [],
    type: 0,
    search: ''
  },

  bindClear() {
    this.setData({ search: '' })
    this.catalog()
  },

  onLoad(options) {
    this.setData({ search: '' })
    this.catalog()
  },

  bindInput(event) {
    this.setData({ search: event.detail.value })
    this.catalog(event.detail.value)
  },

  switch(event) {
    this.setData({ type: event.currentTarget.dataset.type })
    this.fetch()
  },

  fetch(search) {
    const type = ['designer', 'work', 'good']
    wx.request({
      url: `${ siteinfo.site }/land/user/collection?openid=${ this.data.userinfo.wechat_open_id }&type=${ type[this.data.type] }&search=${ this.data.search || '' }`,
      method: 'GET',
      success: (response) => {
        console.log(response.data.data);
        this.setData({ data: response.data.data })
      },
      fail: () => {
        wx.showToast({
          title: '登录失败',
          icon: 'none'
        })
      }
    })
  },

  onLoad(options) {
    this.fetch()
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
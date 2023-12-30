import siteinfo from '../../lib/siteinfo';

Page({
  data: {
    siteinfo,
    goods: [],
    type: 1,
    page: 1,
    loading: false,
    search: ''
  },

  bindClear() {
    this.setData({ search: '' })
    this.catalog()
  },

  onLoad(options) {
    this.setData({ options, search: '' })
    this.catalog()
  },

  bindInput(event) {
    this.setData({ search: event.detail.value })
    this.catalog(event.detail.value)
  },

  switch(event) {
    this.setData({
      page: 1,
      goods: [],
      loading: false,
      type: event.currentTarget.dataset.type
    })

    this.catalog()
  },

  catalog() {
    wx.request({
      url: `${ siteinfo. apiroot }/land/good?type=json&search=${ this.data.search || '' }&catalog=${ this.data.options.catalog || '' }&page=${ this.data.page || 1 }`,
      method: 'GET',
      success: (response) => {
        this.setData({ loading: false })
        if (response.data.data.length == 0) {
          wx.showToast({ title: '没有更多了', icon: 'none' })
        }

        if (response.data.status == 200 && response.data.data.length) {
          this.setData({ goods: [...this.data.goods, ...response.data.data] })
        }
      }
    })
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
    this.setData({ page: this.data.page + 1, loading: true })
    setTimeout(() => this.catalog(), 1500)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
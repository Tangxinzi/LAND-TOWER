import siteinfo from '../../lib/siteinfo';

Page({
  data: {
    siteinfo,
    designer: [],
    type: 1
  },

  switch(event) {
    this.setData({
      type: event.currentTarget.dataset.type
    })

    this.catalog()
  },

  catalog() {
    wx.request({
      url: `${ siteinfo.site }/land/work/catalog/${ this.data.type }?type=json`,
      method: 'GET',
      success: (response) => {
        if (response.data.status == 200) {
          this.setData({ works: response.data.data })
        }
      }
    })
  },

  onLoad(options) {
    this.catalog()
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
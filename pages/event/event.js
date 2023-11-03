import siteinfo from '../../lib/siteinfo';

Page({
  data: {
    siteinfo,
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    articles: {},
  },
  
  onLoad(options) {
    wx.request({
      url: `${ siteinfo.site }/land/article?type=json`,
      method: 'GET',
      success: (response) => {
        if (response.data.status == 200) {
          this.setData({ articles: response.data.data })
        }
      }
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
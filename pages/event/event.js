import siteinfo from '../../lib/siteinfo';

Page({
  data: {
    siteinfo,
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    items: [
      {
        text: '项目分享',
        icon: '/assets/icons/shouye-anli.png'
      },
      {
        text: '设计师',
        icon: '/assets/icons/shouye-shejishi.png'
      },
      {
        text: '计算器',
        icon: '/assets/icons/shouye-jisuanqi.png'
      },
      {
        text: '联系我们',
        icon: '/assets/icons/shouye-guanzhuwomen.png'
      },
    ],
    works: [],
    designer: {},
    articles: {},
    goods: {}
  },
  
  onLoad(options) {
    wx.request({
      url: `${ siteinfo.site }/land/article/catalog/1?type=json`,
      method: 'GET',
      success: (response) => {
        if (response.data.status == 200) {
          this.setData({ articles: response.data.data })
        }
      }
    })

    wx.request({
      url: `${ siteinfo.site }/land/designer?type=json`,
      method: 'GET',
      success: (response) => {
        if (response.data.status == 200) {
          this.setData({ designer: response.data.data })
        }
      }
    })


    wx.request({
      url: `${ siteinfo.site }/land/good?type=json`,
      method: 'GET',
      success: (response) => {
        if (response.data.status == 200) {
          this.setData({ goods: response.data.data })
        }
      }
    })
    
    wx.request({
      url: `${ siteinfo.site }/land/work/catalog/1?type=json`,
      method: 'GET',
      success: (response) => {
        if (response.data.status == 200) {
          this.setData({ works: response.data.data })
        }
      }
    })
  },

  block(event) {
    switch (event.currentTarget.dataset.text) {
      case '项目分享':
        wx.navigateTo({ url: '/pages/cases/cases' })
        break;
      case '设计师':
        wx.switchTab({ url: '/pages/designer/designer' })
        break;
      case '办公好物':
        wx.navigateTo({ url: '/pages/mall/mall' })
        break;
      case '计算器':
        wx.switchTab({ url: '/pages/calculator-level-0/calculator-level-0' })
        break;
      case '联系我们':
        wx.navigateTo({ url: '/pages/map/map' })
        // wx.switchTab({ url: '/pages/calculator-level-0/calculator-level-0' })
        break;
    }
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
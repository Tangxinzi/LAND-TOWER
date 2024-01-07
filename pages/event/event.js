import siteinfo from '../../lib/siteinfo';

Page({
  data: {
    siteinfo,
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    items: [{
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
    desginer: {},
    articles: {},
    goods: {},
    search: '',
    searchResult: {}
  },

  bindClear() {
    this.setData({ search: '' })
  },

  bindInput(event) {
    this.setData({ search: event.detail.value })
    this.search()
  },

  search() {
    wx.request({
      url: `${ siteinfo. apiroot }/land/search?search=${ this.data.search || '' }`,
      method: 'GET',
      success: (response) => {
        if (response.data.status == 200) {
          this.setData({
            searchResult: response.data.data
          })
        }
      }
    })
  },

  onLoad(options) {
    wx.setStorageSync('recommend_openid', options.recommend_openid || '') // 推荐注册

    wx.request({
      url: `${ siteinfo. apiroot }/land/article/catalog/1?type=json`,
      method: 'GET',
      success: (response) => {
        if (response.data.status == 200) {
          this.setData({
            articles: response.data.data
          })
        }
      }
    })

    wx.request({
      url: `${ siteinfo. apiroot }/land/desginer?type=json`,
      method: 'GET',
      success: (response) => {
        if (response.data.status == 200) {
          this.setData({
            desginer: response.data.data
          })
        }
      }
    })


    wx.request({
      url: `${ siteinfo. apiroot }/land/good?type=json`,
      method: 'GET',
      success: (response) => {
        if (response.data.status == 200) {
          this.setData({
            goods: response.data.data
          })
        }
      }
    })

    wx.request({
      url: `${ siteinfo. apiroot }/land/work/catalog/1?type=json`,
      method: 'GET',
      success: (response) => {
        if (response.data.status == 200) {
          this.setData({
            works: response.data.data
          })
        }
      }
    })
  },

  onShow() {
    this.setData({ search: '' })
  },

  block(event) {
    switch (event.currentTarget.dataset.text) {
      case '项目分享':
        wx.navigateTo({
          url: '/pages/cases/cases'
        })
        break;
      case '设计师':
        wx.switchTab({
          url: '/pages/desginer/desginer'
        })
        break;
      case '办公好物':
        wx.navigateTo({
          url: '/pages/mall/mall'
        })
        break;
      case '计算器':
        wx.switchTab({
          url: '/pages/calculator-level-0/calculator-level-0'
        })
        break;
      case '联系我们':
        wx.navigateTo({
          url: '/pages/map/map'
        })
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

  onShareAppMessage(event) {
    return {
      title: `欢迎使用办公室设计大师`,
      path: 'pages/event/event?recommend_openid=' + this.data.userinfo.wechat_open_id
    }
  }
})
import siteinfo from '../../lib/siteinfo';

const contents = {
  renovation: {title: '选择您的装修类型', description: '', show: true},
  area: {title: '选择您的办公室面积', description: '', show: true},
  space: {title: '您需要配置的空间类型', description: '', show: true},
  style: {title: '风格', description: '', show: true},
  service: {title: '倾向我们提供何种服务', description: '', show: true},
  result: {title: '结果已提交，获取您的专属规划方案', description: '', show: true},
}

Page({
  data: {
    siteinfo,
    options: {},
    swiper: {
      contents,
      current: 0,
      currentItemId: 'userSex',
      startTime: '', // 开始时间
      itemStayType: [], // 记录每个 swiper-item 的类型
      itemStayTime: [], // 记录每个 swiper-item 的停留时长
    },
    toptips: {
      msg: '',
      type: '',
      show: false,
      delay: '2000'
    }
  },

  onLoad(options) {
    this.startTimeRecord();
  },

  inputBlur(event) {
    console.log(event)
  },

  stopTouchMove: function () {
    return false;
  },

  prev() {
    this.setData({ ['swiper.current']: this.data.swiper.current - 1 })
  },

  next() {
    this.setData({ ['swiper.current']: this.data.swiper.current + 1 })
    this.updateStayValue(), this.startTimeRecord(); // 埋点时间监控
  },

  reportData (data) {
    console.log('report', data);
    wx.request({
      url: `${ siteinfo.apiroot }/datas/tracking/information-improvement-process`,
      method: 'POST',
      header: {
        'User-Sign': wx.getStorageSync('sign')
      },
      data: {
        id: data.data,
        type: this.data.options.type == 'hongniang' ? 'customer' : 'users',
        startTime: this.data.swiper.startTime,
        itemStayType: this.data.swiper.itemStayType,
        itemStayTime: this.data.swiper.itemStayTime
      },
      success: (response) => {

      },
      fail: (err) => {
        console.log(err)
      }
    })
  },

  startTimeRecord () {
    this.data.swiper.startTime = Date.now();
  },

  updateStayValue () {
    const currentIndex = this.data.swiper.current
    const stayTime = Math.round((Date.now() - this.data.swiper.startTime) / 1000); // 转换成秒
    this.setData({
      [`swiper.itemStayType[${ currentIndex - 1 }]`]: this.data.swiper.currentItemId,
      [`swiper.itemStayTime[${ currentIndex - 1 }]`]: (this.data.swiper.itemStayTime[currentIndex] || 0) + stayTime
    })
    console.log(currentIndex - 1, this.data.swiper.itemStayType);
  },

  swiperChange(event) {
    this.setData({
      // ['swiper.current']: event.detail.current,
      ['swiper.currentItemId']: event.detail.currentItemId
    })
  },

  bindChange(event) {
    
  }
})
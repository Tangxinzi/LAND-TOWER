import siteinfo from '../../lib/siteinfo';

Page({
  data: {
    siteinfo,
    options: {},
    swiper: {
      contents: {
        renovation: {
          title: '选择您的装修类型（单选）', 
          description: '', 
          show: true,
          items: [
            {
              image: '/assets/office-demand-marketing/1-1.jpg',
              text: '仅设计',
              checked: false,
            },
            {
              image: '/assets/office-demand-marketing/1-2.jpg',
              text: '设计施工一体',
              checked: false,
            },
            {
              image: '/assets/office-demand-marketing/1-3.jpg',
              text: '利旧改造',
              checked: false,
            },
            {
              image: '/assets/office-demand-marketing/1-4.jpg',
              text: '工程管理',
              checked: false,
            }
          ]
        },
        area: {
          title: '选择您的办公室面积（单选）', 
          description: '', 
          show: true,
          items: [
            {
              image: '/assets/office-demand-marketing/2-1.jpg',
              text: '300m² 以下',
              checked: false,
            },
            {
              image: '/assets/office-demand-marketing/2-2.jpg',
              text: '300m² ~ 1000m²',
              checked: false,
            },
            {
              image: '/assets/office-demand-marketing/2-3.jpg',
              text: '1000m² ~ 2000m²',
              checked: false,
            },
            {
              image: '/assets/office-demand-marketing/2-4.jpg',
              text: '2000m² 以上',
              checked: false,
            }
          ]
        },
        space: {
          title: '您需要配置的空间类型（多选）', 
          description: '', 
          show: true,
          items: [
            {
              image: '/assets/office-demand-marketing/3-1.jpg',
              text: '个人办公：开放工位、独立办公室',
              checked: false,
            },
            {
              image: '/assets/office-demand-marketing/3-2.jpg',
              text: '协作空间：电话间、洽谈间、头脑风暴区',
              checked: false,
            },
            {
              image: '/assets/office-demand-marketing/3-3.jpg',
              text: '支持空间：茶水区、打印区、储藏室',
              checked: false,
            },
            {
              image: '/assets/office-demand-marketing/3-4.jpg',
              text: '公共空间：前台接待、展示区',
              checked: false,
            },
            {
              image: '/assets/office-demand-marketing/3-5.jpg',
              text: '配套空间：休息室、卫生间',
              checked: false,
            }
          ]
        },
        style: {
          title: '请选择您喜欢办公室风格（多选）', 
          description: '', 
          show: true,
          items: [
            {
              image: '/assets/office-demand-marketing/4-1.jpeg',
              text: '现代简约',
              checked: false,
            },
            {
              image: '/assets/office-demand-marketing/4-2.jpeg',
              text: '工业风',
              checked: false,
            },
            {
              image: '/assets/office-demand-marketing/4-3.jpg',
              text: '绿植风',
              checked: false,
            },
            {
              image: '/assets/office-demand-marketing/4-4.jpg',
              text: '智能办公',
              checked: false,
            },
            {
              image: '/assets/office-demand-marketing/4-5.jpg',
              text: '创意空间',
              checked: false,
            }
          ]
        },
        service: {
          title: '倾向我们提供何种服务（多选）', 
          description: '', 
          show: true,
          items: [
            {
              image: '/assets/office-demand-marketing/4-1.jpeg',
              text: '精确报价无增项',
              checked: false,
            },
            {
              image: '/assets/office-demand-marketing/4-2.jpeg',
              text: '免费上门量房',
              checked: false,
            },
            {
              image: '/assets/office-demand-marketing/4-3.jpg',
              text: '工程管理不踩坑',
              checked: false,
            },
            {
              image: '/assets/office-demand-marketing/4-4.jpg',
              text: '实景案例更多灵感',
              checked: false,
            }
          ]
        },
        result: {title: '结果已提交，获取您的专属规划方案', description: '', show: true},
      },
      current: 0,
      currentItemId: 'renovation',
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

  home() {
    wx.reLaunch({ url: '/pages/event/event' })
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
    const current = this.data.swiper.current - 1
    this.setData({ ['swiper.current']: current < 0 ? 0 : current })
  },

  next() {
    const current = this.data.swiper.current + 1
    this.setData({ ['swiper.current']: current > 5 ? 5 : current })
    this.updateStayValue(), this.startTimeRecord(); // 埋点时间监控

    if (current == 5) {
      wx.showToast({
        title: '提交成功',
        icon: 'success'
      })
    }
  },

  over(event) {
  },

  reportData (data) {
    
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

  bindChecked(event) {
    let items = [], contents = {
      renovation: {
        title: '选择您的装修类型（单选）', 
        description: '', 
        show: true,
        items: [
          {
            image: '/assets/office-demand-marketing/1-1.jpg',
            text: '仅设计',
            checked: false,
          },
          {
            image: '/assets/office-demand-marketing/1-2.jpg',
            text: '设计施工一体',
            checked: false,
          },
          {
            image: '/assets/office-demand-marketing/1-3.jpg',
            text: '利旧改造',
            checked: false,
          },
          {
            image: '/assets/office-demand-marketing/1-4.jpg',
            text: '工程管理',
            checked: false,
          }
        ]
      },
      area: {
        title: '选择您的办公室面积（单选）', 
        description: '', 
        show: true,
        items: [
          {
            image: '/assets/office-demand-marketing/2-1.jpg',
            text: '300m² 以下',
            checked: false,
          },
          {
            image: '/assets/office-demand-marketing/2-2.jpg',
            text: '300m² ~ 1000m²',
            checked: false,
          },
          {
            image: '/assets/office-demand-marketing/2-3.jpg',
            text: '1000m² ~ 2000m²',
            checked: false,
          },
          {
            image: '/assets/office-demand-marketing/2-4.jpg',
            text: '2000m² 以上',
            checked: false,
          }
        ]
      },
    }

    switch (event.currentTarget.dataset.type) {
      case 'renovation':
        this.setData({ ['swiper.contents.renovation.items']: contents.renovation.items })
        console.log(contents.renovation.items);
        items = this.data.swiper.contents.renovation.items
        break;
      case 'area':
        this.setData({ ['swiper.contents.area']: contents.area })
        items = this.data.swiper.contents.area.items
        break;
      case 'space':
        items = this.data.swiper.contents.space.items
        break;
      case 'style':
        items = this.data.swiper.contents.style.items
        break;
      case 'service':
        items = this.data.swiper.contents.service.items
        break;
      case 'result':
        items = this.data.swiper.contents.result.items
        break;
    }
    
    this.setData({
      [`swiper.contents.${ event.currentTarget.dataset.type }.items[${ event.currentTarget.dataset.item }].checked`]: !items[event.currentTarget.dataset.item].checked
    })
  },

  bindChange(event) {
    
  },

  onShareAppMessage(event) {
    return {
      title: `办公设计大师营销方案`,
      path: 'pages/office-demand-marketing/office-demand-marketing'
    }
  },

  onShareTimeline() {
    return {
      title: `办公设计大师营销方案`,
      path: 'pages/office-demand-marketing/office-demand-marketing'
    }
  }
})
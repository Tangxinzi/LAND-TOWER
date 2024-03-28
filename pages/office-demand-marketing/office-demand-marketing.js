import siteinfo from '../../lib/siteinfo';

Page({
  data: {
    siteinfo,
    options: {},
    swiper: {
      userinfo: {},
      contents: {
        renovation: {
          title: '选择您的装修类型（单选）', 
          description: '', 
          show: true,
          checked: false,
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
          checked: false,
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
          checked: false,
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
          checked: false,
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
          checked: false,
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
        result: {title: '结果已提交\n获取您的专属规划方案', description: '', show: true},
      },
      form: {
        name: '',
        number: ''
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
    wx.reLaunch({ url: '/pages/event/event?source=odm' })
  },

  onLoad(options) {
    this.startTimeRecord();
  },

  contact() {
    if (!this.data.swiper.form.name) {
      wx.showToast({ title: '填写您的姓名', icon: 'none' })
      return
    }

    if (!this.data.swiper.form.number || !this.data.swiper.userinfo.phone.phoneNumber) {
      wx.showToast({ title: '请输入手机号', icon: 'none' })
      return
    }

    if (!this.data.swiper.form.number || !this.data.swiper.userinfo.phone.phoneNumber) {
      if (!(/^1[0-9]{10}$/.test(this.data.swiper.form.number)) || !(/^1[0-9]{10}$/.test(this.data.swiper.userinfo.phone.phoneNumber))) {
        wx.showToast({ title: '手机号格式有误', icon: 'none' })
        return
      }
    }

    this.reportData()

    wx.openCustomerServiceChat({
      extInfo: {
        url: 'https://work.weixin.qq.com/kfid/kfcc165f42e757e49cb'
      },
      corpId: 'ww38c652abe66e0fc1',
      success(res) {}
    })
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
  },

  getPhoneNumber(e) {
    wx.showLoading({ title: 'Loading...' })
    wx.login({
      success: (login) => {
        wx.request({
          url: `${ siteinfo. apiroot }/land/user/wx-login?code=${ login.code }&recommend=${ wx.getStorageSync('recommend_openid') || '' }`,
          success: (loginResponse) => {
            wx.request({
              url: `${ siteinfo. apiroot }/land/user/get-phone-number?code=${ e.detail.code }&openid=${ loginResponse.data.wechat_open_id }`,
              success: (response) => {
                if (response.data.status == 200) {
                  loginResponse.data.phone = {
                    ...response.data.data
                  }
                  this.setData({ ['swiper.userinfo']: loginResponse.data })
                  wx.setStorageSync('userinfo', loginResponse.data)
                  this.reportData()
                  wx.hideLoading()
                }
                this.next()
              },
              fail: () => {
                wx.hideLoading()
                this.next()
              }
            })
          },
          fail: () => {
            wx.hideLoading()
            this.next()
          }
        })
      },
      fail: (error) => {
        console.log(error);
        wx.hideLoading()
        this.next()
      }
    })
    wx.hideLoading()
  },

  reportData () {
    wx.request({
      url: `${ siteinfo.apiroot }/land/datas/tracking/odm`,
      method: 'POST',
      data: {
        ...this.data.swiper
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
    this.setData({
      [`swiper.form.${ event.currentTarget.dataset.name }`]: event.detail.value
    })
  },

  bindChecked(event) {
    let items = [], contents = {
      renovation: {
        title: '选择您的装修类型（单选）', 
        description: '', 
        show: true,
        checked: false,
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
        checked: false,
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
        items = this.data.swiper.contents.renovation.items
        if (!items[event.currentTarget.dataset.item].checked) {
          this.setData({ ['swiper.contents.renovation.checked']: true })
        }
        break;
      case 'area':
        this.setData({ ['swiper.contents.area']: contents.area })
        items = this.data.swiper.contents.area.items
        if (!items[event.currentTarget.dataset.item].checked) {
          this.setData({ ['swiper.contents.area.checked']: true })
        }
        break;
      case 'space':
        this.setData({ ['swiper.contents.space.checked']: false })
        items = this.data.swiper.contents.space.items
        if (!items[event.currentTarget.dataset.item].checked) {
          this.setData({ ['swiper.contents.area.checked']: true })
        }
        break;
      case 'style':
        this.setData({ ['swiper.contents.style.checked']: false })
        items = this.data.swiper.contents.style.items
        if (!items[event.currentTarget.dataset.item].checked) {
          this.setData({ ['swiper.contents.style.checked']: true })
        }
        break;
      case 'service':
        this.setData({ ['swiper.contents.service.checked']: false })
        items = this.data.swiper.contents.service.items
        if (!items[event.currentTarget.dataset.item].checked) {
          this.setData({ ['swiper.contents.service.checked']: true })
        }
        break;
      case 'result':
        items = this.data.swiper.contents.result.items
        break;
    }
    
    this.setData({
      [`swiper.contents.${ event.currentTarget.dataset.type }.items[${ event.currentTarget.dataset.item }].checked`]: !items[event.currentTarget.dataset.item].checked
    })
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
  },

  onUnload() {
    console.log('onUnload');
    this.setData({ ['swiper.current']: this.data.swiper.current + 1 })
    this.updateStayValue(), this.startTimeRecord(), this.reportData()
  },
})
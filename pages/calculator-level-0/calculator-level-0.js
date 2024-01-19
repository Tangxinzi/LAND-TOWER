Page({
  data: {
    userinfo: wx.getStorageSync('userinfo') || {},
    count: 0,
    countArea: 0,
    estimatedNumber: ['0.00', '0.00', '0.00', '0.00'],
    multiValue: [
      [
        {area: 0, number: 0, text: '工位数', value: 0},
        {area: 0, number: 0, text: '独立办公室', value: 0},
        {area: 0, number: 0, text: '8人会议室', value: 0},
        {area: 0, number: 0, text: '14人会议室', value: 0},
        {area: 0, number: 0, text: '20人会议室', value: 0},
      ],
      [
        {area: 0, number: 0, text: '前厅', value: 0},
        {area: 0, number: 0, text: '等候区', value: 0}
      ],
      [
        {area: 0, number: 0, text: '茶水间', value: 0},
        {area: 0, number: 0, text: '打印区', value: 0},
        {area: 0, number: 0, text: '储藏间', value: 0}
      ],
    ],
    input: {
      showPrice: false,
      area: 0,
      phone: '17725386753'
    },
  },

  onShow() {
    this.setData({
      userinfo: wx.getStorageSync('userinfo') || {}
    })
  },
  
  contact() {
    wx.openCustomerServiceChat({
      extInfo: {
        url: 'https://work.weixin.qq.com/kfid/kfcc165f42e757e49cb'
      },
      corpId: 'ww38c652abe66e0fc1',
      success(res) {}
    })
  },

  inputChange(event) {
    if (event.currentTarget.dataset.type == 'area' && event.detail.value > 0 && event.detail.value < 150) {
      wx.showModal({
        title: '提示',
        content: '办公面积过低了哦，需要联系我们的客服咨询吗？',
        confirmText: '去联系',
        complete: (res) => {
          if (res.cancel) {
            
          }
      
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/kefu/kefu',
            })
          }
        }
      })
    } else if (event.currentTarget.dataset.type == 'area' && event.detail.value > 2000) {
      wx.showModal({
        title: '提示',
        content: '您输入的办公面积过大，需要联系我们的客服咨询吗？',
        confirmText: '去联系',
        complete: (res) => {
          if (res.cancel) {
            
          }
      
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/kefu/kefu',
            })
          }
        }
      })
    } else if (event.currentTarget.dataset.type == 'gongweishu') {
      // 输入工位数
      const dataset = event.currentTarget.dataset, multiValue = this.data.multiValue
      this.setData({
        [`multiValue[${ dataset.multiindex }][${ dataset.index }].number`]: parseInt(event.detail.value)
      })
      this.bindMultiPickerChange(event)
    } else {
      this.setData({ ['input.showPrice']: false })
      this.setData({ [ `input.${ event.currentTarget.dataset.type }` ]: parseFloat(event.detail.value) })  
    }
  },

  calcPrice() {
    if (!this.data.userinfo.wechat_open_id) {
      wx.showModal({
        title: '提示',
        content: '您尚未登录账号，当前无法使用计算器功能，请前往登录。',
        complete: (res) => {
          if (res.cancel) {
          }
      
          if (res.confirm) {
            wx.switchTab('/pages/index/index')
          }
        }
      })
      return
    }

    if (!this.data.input.area) {
      wx.showModal({
        title: '提示',
        content: '您尚未输入办公面积，请输入。',
        showCancel: false
      })

      this.setData({ ['input.showPrice']: false })
      return
    }

    wx.pageScrollTo({ scrollTop: 0 })
    this.countEstimatedNumber()
    this.setData({ ['input.showPrice']: true })
  },

  bindMultiPickerChange(event) {
    this.setData({ ['input.showPrice']: false })

    let area = 0, value = 0
    let index = event.currentTarget.dataset.index, multiindex = event.currentTarget.dataset.multiindex, flag = true
    let arrayValue = this.data.multiValue[multiindex][index]
    let unit = arrayValue.number
    switch (arrayValue.text) {
      case '前厅':
        area = this.getAreaBetween(arrayValue.text); // 获得区间的面积
        value = 700 * area * unit;
        flag = unit <= 12
        break;
      case '工位数':
        area = this.getAreaBetween(arrayValue.text);
        value = 500 * area * unit;
        // flag = unit <= parseInt(this.data.input.area / 7.2) // 工位最大值 = 办公面积 / 7.2
        flag = unit <= 300
        break;
      case '茶水间':
        area = this.getAreaBetween(arrayValue.text);
        value = 500 * area * unit;
        flag = unit <= 15
        break;
      case '储藏间':
        area = this.getAreaBetween(arrayValue.text);
        value = 1200 * area * unit;
        flag = unit <= 10
        break;
      case '打印区':
        area = this.getAreaBetween(arrayValue.text);
        value = 837 * area * unit;
        flag = unit <= 8
        break;
      case '独立办公室':
        area = this.getAreaBetween(arrayValue.text);
        value = 1400 * area * unit;
        flag = unit <= 18
        break;
      case '8人会议室':
        area = this.getAreaBetween(arrayValue.text);
        value = 2600 * area * unit;
        flag = unit <= 26
        break;
      case '14人会议室':
        area = this.getAreaBetween(arrayValue.text);
        value = 2000 * area * unit;
        flag = unit <= 20
        break;
      case '20人会议室':
        area = this.getAreaBetween(arrayValue.text);
        value = 1600 * area * unit;
        flag = unit <= 12
        break;
    }

    if (!flag) {
      wx.showModal({
        title: arrayValue.text + '提示',
        content: '您选取的单位值过大，请重新选择。',
        showCancel: false,
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })

      return
    }
    this.setData({
      [`multiValue[${ multiindex }][${ index }].area`]: area,
      [`multiValue[${ multiindex }][${ index }].value`]: value
    })

    let count = 0, countArea = 0
    for (let i = 0; i < 3; i++) {
      for (let index = 0; index < this.data.multiValue[i].length; index++) {
        count += this.data.multiValue[i][index].value || 0
        countArea += parseInt(this.data.multiValue[i][index].number || 0) * this.data.multiValue[i][index].area; // 数量 * 面积
      }
    }
    
    this.setData({ count: count.toFixed(2), countArea: countArea.toFixed(2) }) // 计算总预估价格、面积
    this.countEstimatedNumber() // 统计三个分类价格
  },

  getAreaBetween(text) {
    let i = this.getBetweenLocation(), area = null
    // 150-300㎡	400-800㎡	900-1200㎡	1300-2000㎡
    switch(text) {
      case '前厅':
        area = [7.8, 15.6, 23.4, 35.1]
        break;
      case '工位数':
        area = [7.2, 7.2, 7.2, 7.2]
        break;
      case '茶水间':
        area = [25.727, 50.544, 75.816, 113.724]
        break;
      case '储藏间':
        area = [7.3125, 14.625, 21.9375, 32.90625]
        break;
      case '打印区':
        area = [7.8, 15.6, 23.4, 35.1]
        break;
      case '独立办公室':
        area = [15.6, 15.6, 15.6, 15.6]
        break;
      case '8人会议室':
        area = [15.6, 15.6, 15.6, 15.6]
        break;
      case '14人会议室':
        area = [26, 26, 26, 26]
        break;
      case '20人会议室':
        area = [39, 39, 39, 39]
        break;
      case '等候座位':
        area = [6.5, 13, 19.5, 29.25]
        break;
      default:
        area = [0, 0, 0, 0]
    }

    return area[i]
  },

  getBetweenLocation() {
    let area = this.data.input.area
    if (area <= 400) {
      return 0
    } else if (area <= 900) {
      return 1
    } else if (area <= 1300) {
      return 2
    } else if (area <= 2000) {
      return 3
    }
  },

  countEstimatedNumber() {
    let estimatedNumber = [0.00, 0.00, 0.00, 0.00], multiValue = this.data.multiValue
    for (let multiindex = 0; multiindex < 3; multiindex++) {
      for (let index = 0; index < multiValue[multiindex].length; index++) {
        const text = multiValue[multiindex][index].text, value = multiValue[multiindex][index].value;
        console.log(text, value);
        switch (text) {
          case '前厅':
            estimatedNumber[0] += value * 0.3, estimatedNumber[1] += value * 0.15, estimatedNumber[2] += value * 0.55;
            break;
          case '工位数':
            estimatedNumber[0] += value * 0.4, estimatedNumber[1] += value * 0.24, estimatedNumber[2] += value * 0.36;
            break;
          case '茶水间':
            estimatedNumber[0] += value * 0.4, estimatedNumber[1] += value * 0.23, estimatedNumber[2] += value * 0.37;
            break;
          case '独立办公室':
            estimatedNumber[0] += value * 0.38, estimatedNumber[1] += value * 0.27, estimatedNumber[2] += value * 0.35;
            break;
          case '等候座位':
            estimatedNumber[0] += value * 0.25, estimatedNumber[1] += value * 0.25, estimatedNumber[2] += value * 0.5;
            break;
          case '8人会议室':
            estimatedNumber[0] += value * 0.3, estimatedNumber[1] += value * 0.17, estimatedNumber[2] += value * 0.53;
            break;
          case '14人会议室':
            estimatedNumber[0] += value * 0.33, estimatedNumber[1] += value * 0.20, estimatedNumber[2] += value * 0.47;
            break;
          case '20人会议室':
            estimatedNumber[0] += value * 0.35, estimatedNumber[1] += value * 0.30, estimatedNumber[2] += value * 0.35;
            break;
          case '储藏间':
            estimatedNumber[0] += value * 0.42, estimatedNumber[1] += value * 0.28, estimatedNumber[2] += value * 0.3;
            break;
          case '打印区':
            estimatedNumber[0] += value * 0.42, estimatedNumber[1] += value * 0.34, estimatedNumber[2] += value * 0.24;
            break;
        }
      }
    }    

    this.setData({
      estimatedNumber: [
        estimatedNumber[0].toFixed(2),
        estimatedNumber[1].toFixed(2),
        estimatedNumber[2].toFixed(2),
        parseFloat(estimatedNumber[0] + estimatedNumber[1] + estimatedNumber[2]).toFixed(2)
      ]
    })
  },

  bindCalcMultiValue(event) {
    if (!this.data.userinfo.wechat_open_id) {
      wx.showModal({
        title: '提示',
        content: '您尚未登录账号，当前无法使用计算器功能，请前往登录。',
        complete: (res) => {
          if (res.cancel) {
          }
      
          if (res.confirm) {
            wx.switchTab('/pages/index/index')
          }
        }
      })
      return
    }

    if (!this.data.input.area) {
      wx.showModal({
        title: '提示',
        content: '您尚未输入办公面积，请输入。',
        showCancel: false
      })

      this.setData({ ['input.showPrice']: false })
      return
    }

    const dataset = event.currentTarget.dataset, multiValue = this.data.multiValue
    if (dataset.calc == '＋') {
      this.setData({
        [`multiValue[${ dataset.multiindex }][${ dataset.index }].number`]: multiValue[dataset.multiindex][dataset.index].number + 1
      })        
    }

    if (dataset.calc == 'ー') {
      let number = multiValue[dataset.multiindex][dataset.index].number > 1 ? multiValue[dataset.multiindex][dataset.index].number - 1 : 0
      this.setData({
        [`multiValue[${ dataset.multiindex }][${ dataset.index }].number`]: number
      })
    }

    this.bindMultiPickerChange(event)
  },

  ifReload() {
    wx.showModal({
      title: '提示',
      content: '需要重新修改面积吗？',
      complete: (res) => {
        if (res.cancel) {
          
        }
    
        if (res.confirm) {
          this.reload()
        }
      }
    })
  },

  reload() {
    wx.reLaunch({ url: '/pages/calculator-level-0/calculator-level-0' })
  },

  onShareTimeline() {
    return {
      title: '办公设计大师'
    }
  }
})
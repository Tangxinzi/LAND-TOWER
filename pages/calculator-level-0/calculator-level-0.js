Page({
  data: {
    estimatedNumber: ['0.00', '0.00', '0.00'],
    spaceArea: ['前厅', '等候区', '洽谈间', '会议室', '办公室', '工位数'],
    multiArray: [
      [''],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]
    ],
    multiValue: [
      {area: 0, number: 0, text: [], value: []},
      {area: 0, number: 0, text: [], value: []},
      {area: 0, number: 0, text: [], value: []},
      {area: 0, number: 0, text: [], value: []},
      {area: 0, number: 0, text: [], value: []},
    ],
    input: {
      showPrice: true,
      area: null,
      phone: null
    }
  },

  inputChange(event) {
    this.setData({ ['input.showPrice']: false })
    this.setData({ [ `input.${ event.currentTarget.dataset.type }` ]: event.detail.value })
  },

  bindSelectorPickerChange(event) {
    this.setData({ ['input.showPrice']: false })
    let spaceArea = this.data.spaceArea
    spaceArea.push(spaceArea[event.detail.value])
    this.setData({ spaceArea })
  },

  getBetweenLocation() {
    let area = this.data.input.area
    if (area <= 400) {
      return 0
    } else if (area <= 900) {
      return 1
    } else if (area <= 1200) {
      return 2
    } else if (area <= 5000) {
      return 3
    }
  },

  getAreaBetween(text) {
    let i = this.getBetweenLocation(), area = null
    // 150-300㎡	400-800㎡	900-1200㎡	3200-5000㎡
    switch(text) {
      case '　':
        area = [6, 12, 18, 27]
        break;
      case '　　':
        area = [2.3, 2.3, 2.3, 2.3]
        break;
      case '茶水区':
        area = [19.44, 38.88, 52.32, 87.48]
        break;
      case '储物间':
        area = [5.625, 11.25, 16.875, 25.3125]
        break;
      case '打印区':
        area = [6, 12, 18, 27]
        break;
      case '财务室':
        area = [10, 20, 20, 20]
        break;
      case '经理室':
        area = [11, 15, 15, 15]
        break;
      case '行政办公室':
        area = [12, 20, 20, 20]
        break;
      case '4人洽谈间':
        area = [6, 6, 6, 6]
        break;
      case '8人会议室':
        area = [12, 12, 12, 12]
        break;
      case '14人会议室':
        area = [20, 20, 20, 20]
        break;
      case '20人会议室':
        area = [30, 30, 30, 30]
        break;
      default:
        area = [0, 0, 0, 0]
    }

    return area[i]
  },

  bindMultiPickerChange(event) {
    this.setData({ ['input.showPrice']: false })

    console.log(event);
    let index = event.currentTarget.dataset.index, value = event.detail.value, number = 0, flag = true
    let text = [ 
      this.data.multiArray[0][value[0] || 0], 
      this.data.multiArray[1][value[1] || 0] 
    ]
    let unit = text[1], area = this.data.multiValue[index] ? parseFloat(this.data.multiValue[index].area) : 0

    switch (text[0]) {
      case '　':
        // 前厅
        area = this.getAreaBetween(text[0]); // 获得区间的面积
        number = 700 * area * unit;
        flag = unit <= 12
        break;
      case '　　':
        // 工位数
        area = this.getAreaBetween(text[0]);
        number = 500 * area * unit;
        flag = unit <= parseInt(this.data.input.area / 7.5)
        break;
      case '等候座位':
        area = 6;
        number = 650 * area * unit;
        flag = unit <= 12
        break;
      case '4人洽谈间':
        area = this.getAreaBetween(text[0]);
        number = 3000 * area * unit;
        flag = unit <= 12
        break;
      case '8人会议室':
        area = this.getAreaBetween(text[0]);
        number = 2600 * area * unit;
        flag = unit <= 26
        break;
      case '14人会议室':
        area = this.getAreaBetween(text[0]);
        number = 2000 * area * unit;
        flag = unit <= 20
        break;
      case '20人会议室':
        area = this.getAreaBetween(text[0]);
        number = 1600 * area * unit;
        flag = unit <= 12
        break;
      case '财务室':
        area = this.getAreaBetween(text[0]);
        number = 1300 * area * unit;
        flag = unit <= 11
        break;
      case '经理室':
        area = this.getAreaBetween(text[0]);
        number = 1500 * area * unit;
        flag = unit <= 15
        break;
      case '行政办公室':
        area = this.getAreaBetween(text[0]);
        number = 1400 * area * unit;
        flag = unit <= 18
        break;
      case '储物间':
        area = this.getAreaBetween(text[0]);
        number = 1200 * area * unit;
        flag = unit <= 10
        break;
      case '打印区':
        area = this.getAreaBetween(text[0]);
        number = 837 * area * unit;
        flag = unit <= 8
        break;
      case '茶水区':
        area = this.getAreaBetween(text[0]);
        number = 500 * area * unit;
        flag = unit <= 15
        break;
    }

    if (!flag) {
      wx.showModal({
        title: text[0] + '提示',
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
      ["multiValue[" + index + "].value"]: value,
      ["multiValue[" + index + "].text"]: text,
      ["multiValue[" + index + "].number"]: number,
      ["multiValue[" + index + "].area"]: area,
    })

    let count = 0, countArea = 0
    for (let index = 0; index < this.data.multiValue.length; index++) {
      count += this.data.multiValue[index] ? this.data.multiValue[index].number : 0;
      countArea += parseInt(this.data.multiValue[index].text[1] || 0) * this.data.multiValue[index].area; // 数量 * 面积
    }
    this.setData({ count: count.toFixed(2), countArea: countArea.toFixed(2) }) // 计算总预估价格、面积
    this.countEstimatedNumber() // 统计三个分类价格
  },

  setMultiArray(value) {
    switch (value) {
      case '前厅':
        this.setData({ ['multiArray[0]']: ['　'] })
        break;
      case '工位数':
        this.setData({ ['multiArray[0]']: ['　　'] })
        break;
      case '洽谈间':
        this.setData({ ['multiArray[0]']: ['4人洽谈间'] })
        break;
      case '等候区':
        this.setData({ ['multiArray[0]']: ['等候座位'] })
        break;
      case '会议室':
        this.setData({ ['multiArray[0]']: ['8人会议室', '14人会议室', '20人会议室'] })
        break;
      case '办公室':
        this.setData({ ['multiArray[0]']: ['财务室', '经理室', '行政办公室', '储物间', '打印区'] })
        break;
      default:
        this.setData({ ['multiArray[0]']: [] })
    }
  },

  bindPicker(event) {    
    const index = event.currentTarget.dataset.index;
    this.setMultiArray(this.data.spaceArea[index])
  },

  countEstimatedNumber() {
    let estimatedNumber = [0, 0, 0], multiValue = this.data.multiValue
    for (let index = 0; index < multiValue.length; index++) {
      const text = multiValue[index].text[0], number = multiValue[index].number;
      switch (text) {
        case '　':
          // 前厅
          estimatedNumber[0] += number * 0.3, estimatedNumber[1] += number * 0.15, estimatedNumber[2] += number * 0.55;
          break;
        case '　　':
          // 工位数
          estimatedNumber[0] += number * 0.4, estimatedNumber[1] += number * 0.24, estimatedNumber[2] += number * 0.36;
          break;
        case '等候座位':
          estimatedNumber[0] += number * 0.25, estimatedNumber[1] += number * 0.25, estimatedNumber[2] += number * 0.5;
          break;
        case '4人洽谈间':
          estimatedNumber[0] += number * 0.29, estimatedNumber[1] += number * 0.14, estimatedNumber[2] += number * 0.57;
          break;
        case '8人会议室':
          estimatedNumber[0] += number * 0.3, estimatedNumber[1] += number * 0.17, estimatedNumber[2] += number * 0.53;
          break;
        case '14人会议室':
          estimatedNumber[0] += number * 0.33, estimatedNumber[1] += number * 0.20, estimatedNumber[2] += number * 0.47;
          break;
        case '20人会议室':
          estimatedNumber[0] += number * 0.35, estimatedNumber[1] += number * 0.30, estimatedNumber[2] += number * 0.35;
          break;
        case '财务室':
          estimatedNumber[0] += number * 0.38, estimatedNumber[1] += number * 0.25, estimatedNumber[2] += number * 0.37;
          break;
        case '经理室':
          estimatedNumber[0] += number * 0.41, estimatedNumber[1] += number * 0.29, estimatedNumber[2] += number * 0.3;
          break;
        case '行政办公室':
          estimatedNumber[0] += number * 0.38, estimatedNumber[1] += number * 0.27, estimatedNumber[2] += number * 0.35;
          break;
        case '储物间':
          estimatedNumber[0] += number * 0.42, estimatedNumber[1] += number * 0.28, estimatedNumber[2] += number * 0.3;
          break;
        case '打印区':
          estimatedNumber[0] += number * 0.42, estimatedNumber[1] += number * 0.34, estimatedNumber[2] += number * 0.24;
          break;
        case '茶水区':
          estimatedNumber[0] += 0.4, estimatedNumber[1] += 0.23, estimatedNumber[2] += 0.37;
          break;
      }
    }

    this.setData({ 
      estimatedNumber: [
        estimatedNumber[0].toFixed(2),
        estimatedNumber[1].toFixed(2),
        estimatedNumber[2].toFixed(2)
      ]
    })
  },

  calcPrice() {
    if (!this.data.input.area) {
      wx.showModal({
        title: '提示',
        content: '您尚未输入办公面积，请输入。',
        showCancel: false,
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })

      this.setData({ ['input.showPrice']: false })
      return
    }

    if (!this.data.input.phone) {
      wx.showModal({
        title: '提示',
        content: '您尚未输入联系方式，请输入。',
        showCancel: false,
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })

      this.setData({ ['input.showPrice']: false })
      return
    }

    let pattern = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
    if (this.data.input.phone && !pattern.test(this.data.input.phone)) {
      wx.showModal({
        title: '提示',
        content: '您输入的联系方式有误，请重新输入。',
        showCancel: false,
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })

      this.setData({ ['input.showPrice']: false })
      return
    }

    if (!this.data.count) {
      wx.showModal({
        title: '提示',
        content: '您尚未选择功能项，请选择。',
        showCancel: false,
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })

      this.setData({ ['input.showPrice']: false })
      return
    }

    this.setData({ ['input.showPrice']: true })
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
  }
})
Page({
  data: {
    estimatedNumber: ['0.00', '0.00', '0.00'],
    spaceArea: ['前厅', '等候区', '会议室', '办公室', '工位数'],
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
      showPrice: false,
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

  bindMultiPickerChange(event) {
    this.setData({ ['input.showPrice']: false })

    // console.log(event);
    let index = event.currentTarget.dataset.index, value = event.detail.value, number = 0, flag = true
    let text = [ 
      this.data.multiArray[0][value[0] || 0], 
      this.data.multiArray[1][value[1] || 0] 
    ]
    let unit = text[1], area = this.data.multiValue[index] ? parseFloat(this.data.multiValue[index].area) : 0

    switch (text[0]) {
      case '　':
        // 前厅
        area = 6;
        number = 700 * area * unit;
        flag = unit <= 12
        break;
      case '　　':
        // 工位数
        area = 5;
        number = 600 * area * unit;
        flag = unit <= 60
        break;
      case '等候座位':
        area = 6;
        number = 650 * area * unit;
        flag = unit <= 12
        break;
      case '8人会议室':
        area = 26;
        number = 690 * area * unit;
        flag = unit <= 26
        break;
      case '6人会议室':
        area = 20;
        number = 700 * area * unit;
        flag = unit <= 20
        break;
      case '4人会议室':
        area = 12;
        number = 750 * area * unit;
        flag = unit <= 12
        break;
      case '财务室':
        area = 11;
        number = 650 * area * unit;
        flag = unit <= 11
        break;
      case '经理室':
        area = 15;
        number = 750 * area * unit;
        flag = unit <= 15
        break;
      case '行政办公间':
        area = 12;
        number = 750 * area * unit;
        flag = unit <= 18
        break;
      case '储物间':
        area = 5;
        number = 450 * area * unit;
        flag = unit <= 10
        break;
      case '打印区':
        area = 6;
        number = 3000 * area * unit;
        flag = unit <= 8
        break;
      case '茶水区':
        area = 6;
        number = 3000 * area * unit;
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

    let count = 0
    for (let index = 0; index < this.data.multiValue.length; index++) {
      count += this.data.multiValue[index] ? this.data.multiValue[index].number : 0;
    }
    this.setData({ count: count.toFixed(2) }) // 计算总预估价格
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
      case '等候区':
        this.setData({ ['multiArray[0]']: ['等候座位'] })
        break;
      case '会议室':
        this.setData({ ['multiArray[0]']: ['8人会议室', '4人会议室', '6人会议室'] })
        break;
      case '办公室':
        this.setData({ ['multiArray[0]']: ['财务室', '经理室', '行政办公室', '储物间', '打印机'] })
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
        case '':
          // 前厅
          estimatedNumber[0] += number * 0.3, estimatedNumber[1] += number * 0.15, estimatedNumber[2] += number * 0.55;
          break;
        case '等候座位':
          estimatedNumber[0] += number * 0.25, estimatedNumber[1] += number * 0.25, estimatedNumber[2] += number * 0.5;
          break;
        case '8人会议室':
          estimatedNumber[0] += number * 0.35, estimatedNumber[1] += number * 0.30, estimatedNumber[2] += number * 0.35;
          break;
        case '6人会议室':
          estimatedNumber[0] += number * 0.35, estimatedNumber[1] += number * 0.30, estimatedNumber[2] += number * 0.35;
          break;
        case '4人会议室':
          estimatedNumber[0] += number * 0.35, estimatedNumber[1] += number * 0.30, estimatedNumber[2] += number * 0.35;
          break;
        case '财务室':
          estimatedNumber[0] += number * 0.25, estimatedNumber[1] += number * 0.30, estimatedNumber[2] += number * 0.45;
          break;
        case '经理室':
          estimatedNumber[0] += number * 0.3, estimatedNumber[1] += number * 0.2, estimatedNumber[2] += number * 0.5;
          break;
        case '行政办公间':
          estimatedNumber[0] += number * 0.2, estimatedNumber[1] += number * 0.2, estimatedNumber[2] += number * 0.6;
          break;
        case '储物间':
          estimatedNumber[0] += number * 0.2, estimatedNumber[1] += number * 0.2, estimatedNumber[2] += number * 0.6;
          break;
        case '打印区':
          estimatedNumber[0] += 0, estimatedNumber[1] += 0, estimatedNumber[2] += 0;
          break;
        case '工位数量':
          estimatedNumber[0] += number * 0.2, estimatedNumber[1] += number * 0.2, estimatedNumber[2] += number * 0.6;
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
  }
})
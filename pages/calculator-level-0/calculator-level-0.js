var multiArrayNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]

Page({
  data: {
    count: 0,
    countArea: 0,
    estimatedNumber: ['0.00', '0.00', '0.00', '0.00'],
    // spaceArea: ['前厅', '等候区', '洽谈间', '会议室', '独立办公室', '工位数', '打印区', '茶水间', '储藏间'],
    // spaceAreaOrignal: ['前厅', '等候区', '洽谈间', '会议室', '独立办公室', '工位数', '打印区', '茶水间', '储藏间'],
    spaceArea: [
      ['工位数', '独立办公室', '会议室', '洽谈间'],
      ['前厅', '等候区'],
      ['茶水间', '打印区', '储藏间']
    ],
    spaceAreaOrignal: [
      ['工位数', '独立办公室', '会议室', '洽谈间'],
      ['前厅', '等候区'],
      ['茶水间', '打印区', '储藏间']
    ],
    multiArray: [ [''], multiArrayNumber ],
    multiValue: [
      [
        {area: 0, number: 0, text: [], value: []},
        {area: 0, number: 0, text: [], value: []},
        {area: 0, number: 0, text: [], value: []},
        {area: 0, number: 0, text: [], value: []}
      ],
      [
        {area: 0, number: 0, text: [], value: []},
        {area: 0, number: 0, text: [], value: []}
      ],
      [
        {area: 0, number: 0, text: [], value: []},
        {area: 0, number: 0, text: [], value: []},
        {area: 0, number: 0, text: [], value: []}
      ],
    ],
    input: {
      showPrice: true,
      area: '',
      phone: '17725386753'
    },
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
    } else {
      this.setData({ ['input.showPrice']: false })
      this.setData({ [ `input.${ event.currentTarget.dataset.type }` ]: parseFloat(event.detail.value) })  
    }
  },

  bindSelectorPickerChange(event) {
    if (!this.data.input.area) {
      wx.showModal({
        title: '提示',
        content: '您尚未输入办公面积，请输入。',
        showCancel: false
      })

      this.setData({ ['input.showPrice']: false })
      return
    }
    console.log(event)
    this.setData({ ['input.showPrice']: false })
    let spaceArea = this.data.spaceArea, spaceAreaOrignal = this.data.spaceAreaOrignal, multiValue = this.data.multiValue
    spaceArea[event.currentTarget.dataset.spacetype].push(spaceAreaOrignal[event.currentTarget.dataset.spacetype][event.detail.value])
    multiValue.splice(event.detail.value + 1, 0, {area: 0, number: 0, text: [], value: []})
    this.setData({ multiValue, spaceArea })
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

  getAreaBetween(text) {
    let i = this.getBetweenLocation(), area = null
    // 150-300㎡	400-800㎡	900-1200㎡	1300-2000㎡
    switch(text) {
      case '　':
        // 前厅
        area = [7.8, 15.6, 23.4, 35.1]
        break;
      case '　　':
        // 工位数
        area = [7.2, 7.2, 7.2, 7.2]
        break;
      case '　　　':
        // 茶水间
        area = [25.727, 50.544, 75.816, 113.724]
        break;
      case '　　　　':
        // 储藏间
        area = [7.3125, 14.625, 21.9375, 32.90625]
        break;
      case '　　　　　':
        // 打印区
        area = [7.8, 15.6, 23.4, 35.1]
        break;
      case '　　　　　　':
        // 独立办公室
        area = [15.6, 15.6, 15.6, 15.6]
        break;
      case '财务室':
        area = [13, 13, 13, 13]
        break;
      case '经理室':
        area = [14.3, 14.3, 14.3, 14.3]
        break;
      case '4人洽谈间':
        area = [7.8, 7.8, 7.8, 7.8]
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

  bindMultiPickerChange(event) {
    if (!this.data.input.area) {
      wx.showModal({
        title: '提示',
        content: '您尚未输入办公面积，请输入。',
        showCancel: false
      })

      this.setData({ ['input.showPrice']: false })
      return
    }

    this.setData({ ['input.showPrice']: false })

    console.log(event);
    let index = event.currentTarget.dataset.index, multiindex = event.currentTarget.dataset.multiindex, value = event.detail.value, number = 0, flag = true
    let text = [ 
      this.data.multiArray[0][value[0] || 0], 
      this.data.multiArray[1][value[1] || 0] 
    ]
    console.log(text);
    let unit = text[1], area = this.data.multiValue[multiindex][index] ? parseFloat(this.data.multiValue[multiindex][index].area) : 0

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
        // flag = unit <= parseInt(this.data.input.area / 7.2) // 工位最大值 = 办公面积 / 7.2
        flag = unit <= 300
        break;
      case '　　　':
        // 茶水间
        area = this.getAreaBetween(text[0]);
        number = 500 * area * unit;
        flag = unit <= 15
        break;
      case '　　　　':
        // 储藏间
        area = this.getAreaBetween(text[0]);
        number = 1200 * area * unit;
        flag = unit <= 10
        break;
      case '　　　　　':
        // 打印区
        area = this.getAreaBetween(text[0]);
        number = 837 * area * unit;
        flag = unit <= 8
        break;
      case '　　　　　　':
        // 独立办公室
        area = this.getAreaBetween(text[0]);
        number = 1400 * area * unit;
        flag = unit <= 18
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
      [`multiValue[${ multiindex }][${ index }].value`]: value,
      [`multiValue[${ multiindex }][${ index }].text`]: text,
      [`multiValue[${ multiindex }][${ index }].number`]: number,
      [`multiValue[${ multiindex }][${ index }].area`]: area
    })

    let count = 0, countArea = 0
    for (let index = 0; index < this.data.multiValue[multiindex].length; index++) {
      count += this.data.multiValue[multiindex][index] ? this.data.multiValue[multiindex][index].number : 0;
      countArea += parseInt(this.data.multiValue[multiindex][index].text[1] || 0) * this.data.multiValue[multiindex][index].area; // 数量 * 面积
    }
    this.setData({ count: count.toFixed(2), countArea: countArea.toFixed(2) }) // 计算总预估价格、面积
    this.countEstimatedNumber() // 统计三个分类价格
  },

  setMultiArray(value) {
    switch (value) {
      case '前厅':
        var multiArrayNumber = [1, 2]
        this.setData({ ['multiArray[0]']: ['　'], ['multiArray[1]']: multiArrayNumber })
        break;
      case '等候区':
        var multiArrayNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        this.setData({ ['multiArray[0]']: ['等候座位'], ['multiArray[1]']: multiArrayNumber })
        break;
      case '洽谈间':
        var multiArrayNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        this.setData({ ['multiArray[0]']: ['4人洽谈间'], ['multiArray[1]']: multiArrayNumber })
        break;
      case '会议室':
        var multiArrayNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        this.setData({ ['multiArray[0]']: ['8人会议室', '14人会议室', '20人会议室'], ['multiArray[1]']: multiArrayNumber })
        break;
      case '独立办公室':
        var multiArrayNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        this.setData({ ['multiArray[0]']: ['　　　　　　'], ['multiArray[1]']: multiArrayNumber })
        break;
      case '工位数':
        var multiArrayNumber = [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300]
        this.setData({ ['multiArray[0]']: ['　　'], ['multiArray[1]']: multiArrayNumber })
        break;
      case '打印区':
        var multiArrayNumber = [1, 2]
        this.setData({ ['multiArray[0]']: ['　　　　　'], ['multiArray[1]']: multiArrayNumber })
        break;
      case '茶水间':
        var multiArrayNumber = [1, 2]
        this.setData({ ['multiArray[0]']: ['　　　'], ['multiArray[1]']: multiArrayNumber })
        break;
      case '储藏间':
        var multiArrayNumber = [1, 2]
        this.setData({ ['multiArray[0]']: ['　　　　'], ['multiArray[1]']: multiArrayNumber })
        break;
      default:
        this.setData({ ['multiArray[0]']: [], ['multiArray[1]']: multiArrayNumber })
    }
  },

  bindPicker(event) {    
    const index = event.currentTarget.dataset.index, multiindex = event.currentTarget.dataset.multiindex;
    this.setMultiArray(this.data.spaceArea[multiindex][index])
  },

  countEstimatedNumber() {
    let estimatedNumber = [0, 0, 0], multiValue = this.data.multiValue
    for (let multiindex = 0; multiindex < 3; multiindex++) {
      for (let index = 0; index < multiValue[multiindex].length; index++) {
        const text = multiValue[multiindex][index].text[0], number = multiValue[multiindex][index].number;
        console.log(text);
        switch (text) {
          case '　':
            // 前厅
            estimatedNumber[0] += number * 0.3, estimatedNumber[1] += number * 0.15, estimatedNumber[2] += number * 0.55;
            break;
          case '　　':
            // 工位数
            estimatedNumber[0] += number * 0.4, estimatedNumber[1] += number * 0.24, estimatedNumber[2] += number * 0.36;
            break;
          case '　　　':
            // 茶水间
            estimatedNumber[0] += number * 0.4, estimatedNumber[1] += number * 0.23, estimatedNumber[2] += number * 0.37;
            break;
          case '　　　　　　':
            // 独立办公室
            estimatedNumber[0] += number * 0.38, estimatedNumber[1] += number * 0.27, estimatedNumber[2] += number * 0.35;
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
          // case '财务室':
          //   estimatedNumber[0] += number * 0.38, estimatedNumber[1] += number * 0.25, estimatedNumber[2] += number * 0.37;
          //   break;
          // case '经理室':
          //   estimatedNumber[0] += number * 0.41, estimatedNumber[1] += number * 0.29, estimatedNumber[2] += number * 0.3;
          //   break;
          case '　　　　':
            // 储藏间
            estimatedNumber[0] += number * 0.42, estimatedNumber[1] += number * 0.28, estimatedNumber[2] += number * 0.3;
            break;
          case '　　　　　':
            // 打印区
            estimatedNumber[0] += number * 0.42, estimatedNumber[1] += number * 0.34, estimatedNumber[2] += number * 0.24;
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

  calcPrice() {
    if (!this.data.input.area) {
      wx.showModal({
        title: '提示',
        content: '您尚未输入办公面积，请输入。',
        showCancel: false
      })

      this.setData({ ['input.showPrice']: false })
      return
    }

    if (!this.data.input.phone) {
      wx.showModal({
        title: '提示',
        content: '您尚未输入联系方式，请输入。',
        showCancel: false
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

    wx.pageScrollTo({ scrollTop: 0 })
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
  },

  onLoad(options) {
    this.setData({
      slideShow: [
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false]
      ],
      slideButtons: [
        {
          type: 'default',
          text: '添加该功能',
        },
        {
          type: 'warn',
          text: '删除',
        },
      ]
    })
  },

  slideButtonTap(e) {
    const index = e.currentTarget.dataset.index, value = e.currentTarget.dataset.value, spacetype = e.currentTarget.dataset.spacetype
    this.setData({ slideShow: [[], [], []] })

    if (e.detail.index == 0) {
      const multiValue = this.data.multiValue, spaceArea = this.data.spaceArea
      spaceArea[spacetype].splice(index + 1, 0, value);
      multiValue[spacetype].splice(index + 1, 0, {area: 0, number: 0, text: [], value: []})
      this.setData({ multiValue, spaceArea })
      wx.showToast({ title: `添加${ value }`, icon: 'success' })
    }

    if (e.detail.index == 1) {
      const multiValue = this.data.multiValue, spaceArea = this.data.spaceArea
      multiValue[spacetype].splice(index, 1)
      spaceArea[spacetype].splice(index, 1)
      this.setData({ multiValue, spaceArea })
      wx.showToast({ title: `删除${ value }`, icon: 'success' })
    }

    this.countEstimatedNumber() // 统计三个分类价格
  },

  checkArea() {
    if (!this.data.input.area) {
      
      return 
    }
  },

  tapSlideShow(event) {
    console.log(event.currentTarget);
    const dataset = event.currentTarget.dataset
    // this.setData({ ['slideShow[' + dataset.index + ']']: !this.data.slideShow[dataset.index] })
    this.setData({ [`slideShow[${ dataset.slide }][${ dataset.index }]`]: !this.data.slideShow[dataset.slide][dataset.index] })
  },

  bindAddMultiValue(e) {
    const index = e.currentTarget.dataset.index, multiindex = e.currentTarget.dataset.multiindex
    this.setData({
      [`multiValue[${ multiindex }][${ index }].text[1]`]: (this.data.multiValue[multiindex][index].text[1] || 0) + 1
    })
  },

  bindSubMultiValue(e) {
    const index = e.currentTarget.dataset.index, multiindex = e.currentTarget.dataset.multiindex, text = this.data.multiValue[multiindex][index].text[1]
    this.setData({
      [`multiValue[${ multiindex }][${ index }].text[1]`]: text > 1 ? text - 1 : 0
    })
  }
})
Page({
  data: {
    count: 0,
    countArea: 0,
    number: [],
    estimatedNumber: [0.00, 0.00, 0.00],
    multiArray: [
      ['前厅', '等候区', '会议室', '办公室', '办公区'], 
      [''],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    ],
    multiValue: []
  },

  bindInputChange(event) {
    console.log(event, `multiArray[${ event.target.dataset.indexnumber }].area`)
    this.setData({
      ['multiValue[' + event.target.dataset.indexnumber + '].area']: parseFloat(event.detail.value || 0)
    })
    let index = event.target.dataset.indexnumber
    let value = this.data.multiValue[index].value || [0, 0, 0]
    
    this.totalCalculation(index, value)
    this.countEstimatedNumber() // 统计三个分类价格
    this.countAreaFunc() // 统计面积
  },

  countAreaFunc() {
    let countArea = 0
    const multiValue = this.data.multiValue
    for (let index = 0; index < multiValue.length; index++) {
      countArea += multiValue[index].area
    }
    this.setData({ countArea })
  },

  handleInputTouchStart(event) {
    // console.log(event);
  },

  handlePickerTap() {},

  add() {
    let number = this.data.number
    number.push(0)
    this.setData({
      number
    })
  },

  totalCalculation(_index, _value) {
    let index = _index, value = _value, number = 0
    let text = [
      this.data.multiArray[0][value[0]],
      this.data.multiArray[1][value[1]],
      this.data.multiArray[2][value[2]],
    ]
    let unit = text[2], area = this.data.multiValue[index] ? parseFloat(this.data.multiValue[index].area) : 0

    switch (text[1]) {
      case '':
        // 前厅
        number = 700 * area * unit;
        break;
      case '等候座位':
        number = 650 * area * unit;
        break;
      case '8人会议室':
        number = 690 * area * unit;
        break;
      case '6人会议室':
        number = 700 * area * unit;
        break;
      case '4人会议室':
        number = 750 * area * unit;
        break;
      case '财务室':
        number = 650 * area * unit;
        break;
      case '经理室':
        number = 750 * area * unit;
        break;
      case '行政办公间':
        number = 750 * area * unit;
        break;
      case '储物间':
        number = 450 * area * unit;
        break;
      case '打印机':
        number = 3000 * area * unit;
        break;
      case '工位数量':
        number = 600 * area * unit;
        break;
    }

    this.setData({
      ["multiValue[" + index + "].value"]: value,
      ["multiValue[" + index + "].text"]: text,
      ["multiValue[" + index + "].number"]: number,
      ["multiValue[" + index + "].area"]: area,
      ["number[" + index + "]"]: number
    })

    let count = 0
    for (let index = 0; index < this.data.number.length; index++) {
      count += this.data.number[index];
    }
    this.setData({ count })
    this.countEstimatedNumber() // 统计三个分类价格
    this.countAreaFunc() // 统计面积
  },

  countEstimatedNumber() {
    let estimatedNumber = [0, 0, 0]
    const multiValue = this.data.multiValue

    for (let index = 0; index < multiValue.length; index++) {
      const text = multiValue[index].text[1], number = multiValue[index].number;
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
        case '打印机':
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

  bindMultiPickerChange(event) {
    let index = event.currentTarget.dataset.index, value = event.detail.value  
    console.log(index, value);
    this.totalCalculation(index, value)
  },

  bindMultiPickerChangeColumnChange(event) {
    const { column, value } = event.detail, multiArray = this.data.multiArray;
    console.log('修改的列为', event.detail.column, '，值为', event.detail.value, multiArray[column][value]);
    if (column == 0) {
      switch (multiArray[column][value]) {
        case '前厅':
          this.setData({ ['multiArray[1]']: [''] })
          break;
        case '等候区':
          this.setData({ ['multiArray[1]']: ['等候座位'] })
          break;
        case '会议室':
          this.setData({ ['multiArray[1]']: ['8人会议室', '4人会议室', '6人会议室'] })
          break;
        case '办公室':
          this.setData({ ['multiArray[1]']: ['财务室', '经理室', '行政办公室', '储物间', '打印机'] })
          break;
        case '办公区':
          this.setData({ ['multiArray[1]']: ['工位数量'] })
          break;
        default:
          this.setData({ ['multiArray[1]']: [] })
      }
    }
  },
  
  onLoad(options) {
    
  }
})
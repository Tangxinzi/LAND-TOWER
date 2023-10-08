Page({
  data: {
    count: 0,
    number: [],
    estimatedNumber: [0, 0, 0],
    multiArray: [
      ['办公室入口', '等候区', '会议室', '休闲区', '独立办公室', '辅助区', '办公区'], 
      // ['网络布线要求', '机房配置要求', '家具采购要求', 'IT设备采购要求', '门禁及相关安全管理需求', '办公设施设备采购项目', '加班餐电源需求', '其他特殊需求'],
      ['前台'],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    ],
    multiValue: []
  },

  add() {
    let number = this.data.number
    number.push(0)
    this.setData({
      number
    })
  },

  bindMultiPickerChange(event) {
    let index = event.currentTarget.dataset.index, value = event.detail.value, number = 0, estimatedNumber = this.data.estimatedNumber
    let text = [
      this.data.multiArray[0][value[0]],
      this.data.multiArray[1][value[1]],
      this.data.multiArray[2][value[2]],
    ]
    // console.log(text);

    switch (text[1]) {
      case '前台':
        number = 1700 * 4 * 7; // 1700元/平米*4人（每个人7平米）=47,600
        estimatedNumber[0] += number * 0.3, estimatedNumber[1] += number * 0.1, estimatedNumber[2] += number * 0.6;
        break;
      case '等候座位':
        number = 500; // 500元/组
        estimatedNumber[0] += number * 0.2, estimatedNumber[1] += number * 0.2, estimatedNumber[2] += number * 0.6;
        break;
      case '等候座位':
        number = 4000; // 4000元/个
        estimatedNumber[0] += number * 0.25, estimatedNumber[1] += number * 0.25, estimatedNumber[2] += number * 0.5;
        break;
      case '大（30人）':
        number = 800 * 30 * 7; // 800元/平米*30人（每人7平米）=168,000
        estimatedNumber[0] += number * 0.25, estimatedNumber[1] += number * 0.15, estimatedNumber[2] += number * 0.6;
        break;
      case '中（10-20人）':
        number = 800 * 15 * 7; // 800元/平米*15人（每人7平米）=84,000
        estimatedNumber[0] += number * 0.25, estimatedNumber[1] += number * 0.15, estimatedNumber[2] += number * 0.6;
        break;
      case '小（7-8人）':
        number = 800 * 7 * 7; // 800元/平米*7人（每人7平米）=39,200
        estimatedNumber[0] += number * 0.25, estimatedNumber[1] += number * 0.15, estimatedNumber[2] += number * 0.6;
        break;
      case '水吧':
        number = 1600 * 3; // 1600元/平米*3人（每人7平米）=4,800
        estimatedNumber[0] += number * 0.3, estimatedNumber[1] += number * 0.15, estimatedNumber[2] += number * 0.55;
        break;
      case '多功能区 10-20㎡':
        number = 19500; // 1300元/平米*15平米（10-20平米）=19,500; 1300元/平米*25平米（20-30平米）=32,500; 1300元/平米*40平米（30-50平米）=52,000
        estimatedNumber[0] += number * 0.3, estimatedNumber[1] += number * 0.15, estimatedNumber[2] += number * 0.55;
        break;
      case '多功能区 20-30㎡':
        number = 32500;
        estimatedNumber[0] += number * 0.3, estimatedNumber[1] += number * 0.15, estimatedNumber[2] += number * 0.55;
        break;
      case '多功能区 30-50㎡':
        number = 52000;
        estimatedNumber[0] += number * 0.3, estimatedNumber[1] += number * 0.15, estimatedNumber[2] += number * 0.55;
        break;
      case 'CEO办公室':
        number = 1500 * 1 * 11; // 1500元/平米*1人/间（每人11平米）=16,500
        estimatedNumber[0] += number * 0.35, estimatedNumber[1] += number * 0.15, estimatedNumber[2] += number * 0.5;
        break;
      case '财务室':
        number = 700 * 4 * 7; // 700元/平米*4人/间（每人7平米）=19,600
        estimatedNumber[0] += number * 0.2, estimatedNumber[1] += number * 0.2, estimatedNumber[2] += number * 0.6;
        break;
      case '经理室':
        number = 1300 * 1 * 9; // 1300元/平米*1人/间（每人9平米）=11,700
        estimatedNumber[0] += number * 0.1, estimatedNumber[1] += number * 0.2, estimatedNumber[2] += number * 0.7;
        break;
      case '行政办公室':
        number = 1300 * 1 * 9; // 1300元/平米*1人/间（每人9平米）=11,700
        estimatedNumber[0] += number * 0.35, estimatedNumber[1] += number * 0.15, estimatedNumber[2] += number * 0.5;
        break;
      case '卫生间':
        number = 1500 * 6 * 2; // 1500元/平米*6人（每人2平米）=18,000
        estimatedNumber[0] += number * 0.2, estimatedNumber[1] += number * 0.2, estimatedNumber[2] += number * 0.6;
        break;
      case '储物间':
        number = 700 * 2 * 3; // 700元/平米*2人（每人3平米）=14,000 ?
        estimatedNumber[0] += number * 0.2, estimatedNumber[1] += number * 0.2, estimatedNumber[2] += number * 0.6;
        break;
      case '打印机':
        number = 2000; // 每台2000元
        estimatedNumber[0] += number * 0.1, estimatedNumber[1] += number * 0.2, estimatedNumber[2] += number * 0.7;
        break;
      case '快递柜':
        number = 3000; // 3000元/个
        estimatedNumber[0] += number * 0.1, estimatedNumber[1] += number * 0.2, estimatedNumber[2] += number * 0.7;
        break;
      case '工位数量':
        number = 7 * 900; // 每个工位7平米*900元/平米=6300
        estimatedNumber[0] += number * 0.25, estimatedNumber[1] += number * 0.2, estimatedNumber[2] += number * 0.55;
        break;
    }

    this.setData({
      // multiIndex: event.detail.value
      ["multiValue[" + index + "].value"]: value,
      ["multiValue[" + index + "].text"]: text,
      ["multiValue[" + index + "].number"]: number,
      ["number[" + index + "]"]: number,
      estimatedNumber
    })

    let count = 0
    for (let index = 0; index < this.data.number.length; index++) {
      count += this.data.number[index];
    }
    this.setData({ count })
  },

  bindMultiPickerChangeColumnChange(event) {
    const { column, value } = event.detail, multiArray = this.data.multiArray;
    console.log('修改的列为', event.detail.column, '，值为', event.detail.value, multiArray[column][value]);
    if (column == 0) {
      switch (multiArray[column][value]) {
        case '办公室入口':
          this.setData({ ['multiArray[1]']: ['前台'] })
          break;
        case '等候区':
          this.setData({ ['multiArray[1]']: ['等候座位', '显示屏'] })
          break;
        case '会议室':
          this.setData({ ['multiArray[1]']: ['大（30人）', '中（10-20人）', '小（7-8人）'] })
          break;
        case '休闲区':
          this.setData({ ['multiArray[1]']: ['水吧', '多功能区 10-20㎡', '多功能区 20-30㎡', '多功能区 30-50㎡'] })
          break;
        case '独立办公室':
          this.setData({ ['multiArray[1]']: ['CEO办公室', '财务室', '经理室', '行政办公室'] })
          break;
        case '辅助区':
          this.setData({ ['multiArray[1]']: ['卫生间', '储物间', '打印机', '快递柜', '其它需求'] })
          break;
        case '办公区':
          this.setData({ ['multiArray[1]']: ['工位数量', '天花装饰形式', '地面装饰材质', '其他需求'] })
          break;
        default:
          this.setData({ ['multiArray[1]']: [] })
      }
    }
  },
  
  onLoad(options) {
    
  }
})
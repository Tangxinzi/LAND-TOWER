import siteinfo from '../../lib/siteinfo';

Page({
  data: {
    siteinfo,
    userinfo: wx.getStorageSync('userinfo') || {},
    input: {}
  },
  
  onLoad(options) {

  },
  
  inputChange(event) {
    this.setData({ 
      [ `input.${ event.currentTarget.dataset.type }` ]: event.detail.value || ''
    })
  },

  submit() {
    if (!this.data.input.name) {
      wx.showToast({ title: '填写您的姓名', icon: 'none' })
      return
    }

    if (!this.data.input.number) {
      wx.showToast({ title: '请输入完整座机或手机号', icon: 'none' })
      return
    }

    if (this.data.input.number) {
      if (!(/^1[0-9]{10}$/.test(this.data.input.number))) {
        wx.showToast({ title: '手机号格式有误', icon: 'none' })
        return
      }
    }
    
    wx.request({
      url: `${ siteinfo.apiroot }/land/feedback/submit?openid=${ this.data.userinfo.wechat_open_id || '' }`,
      method: 'POST',
      data: this.data.input,
      success: (response) => {
        if (response.data.status == 200) {
          wx.showToast({ title: '提交成功', icon: 'success' })
          setTimeout(() => wx.navigateBack(), 1500)
        }
      }
    })
  },
  
  onShareAppMessage() {

  }
})
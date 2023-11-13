import siteinfo from '../../lib/siteinfo';
import fileUpload from '../../lib/fileUpload';

Page({
  data: {
    siteinfo,
    userinfo: wx.getStorageSync('userinfo')
  },
  
  onLoad(options) {

  },

  nicknameReview(event) {
    console.log(event)
  },

  inputBlur(event) {
    console.log(event)
  },

  inputUserinfo(event) {
    this.setData({
      [`userinfo.nickname`]: event.detail.value
    })
  },

  onChooseAvatar(e) {
    wx.showLoading({ title: '头像上传中', mask: true })
    const { avatarUrl } = e.detail 
    this.setData({ [`userinfo.avatar`]: avatarUrl })

    const response = {
      tempFiles: [ 
        { path: avatarUrl }
      ]
    }

    fileUpload(response).then((data) => {
      this.setData({
        ['userinfo.avatar_url']: data.upload.data.url
      })
    })

    wx.hideLoading()
  },

  updateUserinfo() {
    wx.login({
      success: (login) => {
        wx.showLoading({ title: 'Loading...', mask: true })
        wx.request({
          url: `${ siteinfo.site }/land/user/info/upload?code=${ login.code }`,
          data: {
            ...this.data.userinfo
          },
          method: 'POST',
          header: {},
          success: (response) => {
            wx.hideLoading()
            if (response) {
              console.log(response)
              this.setData({ userinfo: response.data })
              wx.setStorageSync('userinfo', response.data)
            }
          },
          fail: (err) => {
            console.log(err)
            wx.hideLoading()
            wx.showModal({
              title: '报错',
              content: JSON.stringify(err) || '',
              complete: (res) => {
                if (res.cancel) {
                  
                }
            
                if (res.confirm) {
                  
                }
              }
            })
          }
        })
      }
    })
  }
})
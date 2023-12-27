import siteinfo from './siteinfo';

// 封装一个函数，用于上传多张图片
const fileUpload = (files) => {
  const uploadTasks = files.tempFiles.map(async(file) => {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: `${ siteinfo. apiroot }/land/file/upload`,
        filePath: file.path,
        name: 'files',
        header: {},
        success: (response) => {
          if (response.data) {
            response.data = JSON.parse(response.data)
          }

          if (response.data.errno == 0 && response.data.data.url) {
            resolve({
              path: file.path,
              upload: response.data
            })
          } else {
            wx.showToast({ title: '上传失败', icon: 'none' });
            resolve()
          }
        },
        fail: (error) => {
          wx.showToast({ title: '上传失败', icon: 'none' });
          reject(error)
        }
      })
    })
  })

  return Promise.all(uploadTasks).then(response => {
    if (response.length == 1) {
      return response[0]
    } else {
      return response
    }
  }).catch((error) => {
    console.error(error)
  })
}

// const fileUpload = (files) => {
//   return new Promise((resolve, reject) => {
//     wx.uploadFile({
//       url: `${ siteinfo.apiroot }/file/upload`,
//       filePath: files.tempFiles[0]['path'],
//       name: 'files',
//       formData: {
//         'token': 'test' // 用户 token
//       },
//       success: (response) => {
//         response.data = JSON.parse(response.data)
//         console.log(response.data)
//         if (response.data.errno == 0 && response.data.data.url) {
//           // wx.showToast({ title: '上传成功', icon: 'success' });
//           resolve({
//             ...files.tempFiles[0],
//             upload: response.data
//           })
//         } else {
//           wx.showToast({ title: '上传失败', icon: 'none' });
//           resolve()
//         }
//       },
//       fail: (e) => {
//         reject(e)
//       }
//     })
//   })
// }

export default fileUpload;
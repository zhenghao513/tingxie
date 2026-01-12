// pages/login/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 微信登录事件处理
   */
  onWechatLogin: function() {
    // 调用微信登录接口获取登录凭证
    wx.showLoading({
      title: '登录中...'
    });

    // 获取用户信息
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        // 调用云函数进行登录
        wx.cloud.callFunction({
          name: 'login',
          data: {
            type: 'login',
            nickName: res.userInfo.nickName,
            avatarUrl: res.userInfo.avatarUrl,
            gender: res.userInfo.gender,
            city: res.userInfo.city,
            province: res.userInfo.province,
            country: res.userInfo.country
          },
          success: (result) => {
            console.log('登录成功', result);
            wx.hideLoading();
            
            if(result.result.success) {
              wx.showToast({
                title: result.result.message,
                icon: 'success'
              });
              
              // 登录成功后跳转到首页或其他页面
              setTimeout(() => {
                wx.switchTab({
                  url: '../index/index'
                });
              }, 1500);
            } else {
              wx.showToast({
                title: result.result.message || '登录失败',
                icon: 'none'
              });
            }
          },
          fail: (error) => {
            console.error('登录失败', error);
            wx.hideLoading();
            wx.showToast({
              title: '网络错误，请重试',
              icon: 'none'
            });
          }
        });
      },
      fail: (error) => {
        console.error('获取用户信息失败', error);
        wx.hideLoading();
        wx.showToast({
          title: '需要授权才能登录',
          icon: 'none'
        });
      }
    });
  }
});
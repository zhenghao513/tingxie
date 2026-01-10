// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID;

  try {
    // 尝试从数据库查找用户
    const userQuery = await db.collection('user').where({
      _openid: openid
    }).get();

    let result;
    if (userQuery.data.length === 0) {
      // 新用户 - 自动注册
      result = await db.collection('user').add({
        data: {
          _openid: openid,
          // 如果前端传来了用户信息，则保存这些信息
          nickName: event.nickName || '',
          avatarUrl: event.avatarUrl || '',
          grade: event.grade || null, // 学习年级，默认为null
          studySetting: event.studySetting || {}, // 学习偏好设置，默认为空对象
          createTime: db.serverDate(), // 首次登录时间
          lastLoginTime: db.serverDate() // 最近登录时间
        }
      });

      return {
        success: true,
        isNewUser: true,
        openid: openid,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
        message: '用户注册并登录成功'
      };
    } else {
      // 老用户 - 自动登录，同时更新最后登录时间
      await db.collection('user').where({
        _openid: openid
      }).update({
        data: {
          nickName: event.nickName || userQuery.data[0].nickName,
          avatarUrl: event.avatarUrl || userQuery.data[0].avatarUrl,
          grade: event.grade !== undefined ? event.grade : userQuery.data[0].grade,
          studySetting: event.studySetting || userQuery.data[0].studySetting,
          lastLoginTime: db.serverDate() // 每次登录都更新最后登录时间
        }
      });

      return {
        success: true,
        isNewUser: false,
        openid: openid,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
        userInfo: {
          _openid: userQuery.data[0]._openid,
          nickName: userQuery.data[0].nickName,
          avatarUrl: userQuery.data[0].avatarUrl,
          grade: userQuery.data[0].grade,
          createTime: userQuery.data[0].createTime,
          lastLoginTime: userQuery.data[0].lastLoginTime,
          studySetting: userQuery.data[0].studySetting
        },
        message: '用户登录成功'
      };
    }
  } catch (error) {
    console.error('登录/注册失败', error);
    return {
      success: false,
      error: error.message,
      message: '登录/注册过程中发生错误'
    };
  }
}
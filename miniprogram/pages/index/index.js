const data = {
  areaList: [
    {
      label: '小学',
      value: 'primary',
      children: [
        {
          value: 'grade1',
          label: '一年级',
          children: [
            { value: 'unit1-1', label: '第一单元' },
            { value: 'unit1-2', label: '第二单元' },
            { value: 'unit1-3', label: '第三单元' },
            { value: 'unit1-4', label: '第四单元' },
            { value: 'unit1-5', label: '第五单元' },
            { value: 'unit1-6', label: '第六单元' },
            { value: 'unit1-7', label: '第七单元' },
            { value: 'unit1-8', label: '第八单元' },
          ],
        },
        {
          value: 'grade2',
          label: '二年级',
          children: [
            { value: 'unit2-1', label: '第一单元' },
            { value: 'unit2-2', label: '第二单元' },
            { value: 'unit2-3', label: '第三单元' },
            { value: 'unit2-4', label: '第四单元' },
            { value: 'unit2-5', label: '第五单元' },
            { value: 'unit2-6', label: '第六单元' },
            { value: 'unit2-7', label: '第七单元' },
            { value: 'unit2-8', label: '第八单元' },
          ],
        },
        {
          value: 'grade3',
          label: '三年级',
          children: [
            { value: 'unit3-1', label: '第一单元' },
            { value: 'unit3-2', label: '第二单元' },
            { value: 'unit3-3', label: '第三单元' },
            { value: 'unit3-4', label: '第四单元' },
            { value: 'unit3-5', label: '第五单元' },
            { value: 'unit3-6', label: '第六单元' },
            { value: 'unit3-7', label: '第七单元' },
            { value: 'unit3-8', label: '第八单元' },
          ],
        },
        {
          value: 'grade4',
          label: '四年级',
          children: [
            { value: 'unit4-1', label: '第一单元' },
            { value: 'unit4-2', label: '第二单元' },
            { value: 'unit4-3', label: '第三单元' },
            { value: 'unit4-4', label: '第四单元' },
            { value: 'unit4-5', label: '第五单元' },
            { value: 'unit4-6', label: '第六单元' },
            { value: 'unit4-7', label: '第七单元' },
            { value: 'unit4-8', label: '第八单元' },
          ],
        },
        {
          value: 'grade5',
          label: '五年级',
          children: [
            { value: 'unit5-1', label: '第一单元' },
            { value: 'unit5-2', label: '第二单元' },
            { value: 'unit5-3', label: '第三单元' },
            { value: 'unit5-4', label: '第四单元' },
            { value: 'unit5-5', label: '第五单元' },
            { value: 'unit5-6', label: '第六单元' },
            { value: 'unit5-7', label: '第七单元' },
            { value: 'unit5-8', label: '第八单元' },
          ],
        },
        {
          value: 'grade6',
          label: '六年级',
          children: [
            { value: 'unit6-1', label: '第一单元' },
            { value: 'unit6-2', label: '第二单元' },
            { value: 'unit6-3', label: '第三单元' },
            { value: 'unit6-4', label: '第四单元' },
            { value: 'unit6-5', label: '第五单元' },
            { value: 'unit6-6', label: '第六单元' },
            { value: 'unit6-7', label: '第七单元' },
            { value: 'unit6-8', label: '第八单元' },
          ],
        },
      ],
    },
    {
      label: '初中',
      value: 'junior',
      children: [
        {
          value: 'grade7',
          label: '七年级',
          children: [
            { value: 'unit7-1', label: '第一单元' },
            { value: 'unit7-2', label: '第二单元' },
            { value: 'unit7-3', label: '第三单元' },
            { value: 'unit7-4', label: '第四单元' },
            { value: 'unit7-5', label: '第五单元' },
            { value: 'unit7-6', label: '第六单元' },
          ],
        },
        {
          value: 'grade8',
          label: '八年级',
          children: [
            { value: 'unit8-1', label: '第一单元' },
            { value: 'unit8-2', label: '第二单元' },
            { value: 'unit8-3', label: '第三单元' },
            { value: 'unit8-4', label: '第四单元' },
            { value: 'unit8-5', label: '第五单元' },
            { value: 'unit8-6', label: '第六单元' },
          ],
        },
        {
          value: 'grade9',
          label: '九年级',
          children: [
            { value: 'unit9-1', label: '第一单元' },
            { value: 'unit9-2', label: '第二单元' },
            { value: 'unit9-3', label: '第三单元' },
            { value: 'unit9-4', label: '第四单元' },
            { value: 'unit9-5', label: '第五单元' },
            { value: 'unit9-6', label: '第六单元' },
          ],
        },
      ],
    },
  ],
};

Page({
  /**
   * 页面的初始数据
   */
  data: {
    options: data.areaList,
    note: '请选择年级和单元',
    visible: false,
    value: '',
  },

  showCascader() {
    this.setData({ visible: true });
  },
  onPick(e) {
    console.log(e.detail);
  },
  onChange(e) {
    const { selectedOptions, value } = e.detail;

    this.setData({
      value,
      note: selectedOptions.map((item) => item.label).join('/'),
    });
    
    // 根据选择的年级和单元启动对应的听写任务
    this.startDictationTask(selectedOptions);
  },
  
  startDictationTask(selectedOptions) {
    const [level, grade, unit] = selectedOptions;
    console.log(`启动${level.label}-${grade.label}-${unit.label}的听写任务`);
    // 这里可以添加跳转到具体听写页面的逻辑
    wx.navigateTo({
      url: `/pages/learning/index?grade=${grade.value}&unit=${unit.value}`,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  learning() {
    wx.navigateTo({
      url: '../learning/index',
    });
  },
});

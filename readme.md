组件功能：
===
* 渲染图层。包括：点图层（包括单点和聚合点），热力图层，几何区域图层等

* 特殊功能。画区，轨迹播放，线动画，点位冒泡

* 监听事件。点位点击，鼠标悬浮，地图移动，弹框关闭，区域移除，框选结束等

初始化：
===
npm run build打包生成olMap.js，在页面引入该js。初始化方式如下：

```
const myMap = olMap.init('mapContainerId');  // 容器dom id
const option = {
    useOSM: true
};
myMap.setOption(option);
```
这样页面上会生成地图，可以继续调用组件的其他方法。

option配置项：
===
```
const option = {
    useOSM: true,
    mapCenter: [97.03125, 29.362721750200926],
    zoom: 3,
    data: aggreData,
    draw: {
        showArea: true,
        showMultiArea: false
    },
    area: {
        type: 'normal',
        showTooltip: true,
        data: [{
            areaType: 2,  // 圆形
            areaLocation: "",
            areaName: 'hello',
            areaDetail: 'lala',
            center: '100, 60',
            radius: '1000'
        }, {
            areaLocation: "100,60,100,20,120,20,120,60",
            areaName: 'hello',
            areaDetail: 'lala'
        }],
        showCancelBtn: true,
        showSearchBtn: true
    },
    pointModal: {
        autoClose: 'all'
    },
    effectLine: {
        lineData: [
            {label: 1, gps: [[20, 20], [80, 30]]},
            {label: '2222', gps: [[30, 40], [80, 30]]},
            {label: '2222', gps: [[-175, 40], [175, 30]]}
        ],
        pointData: [
            {label: '中国', gps: [80, 30]}
        ]
    }
};
```

* `useOSM` | boolean | 是否使用OSM在线地图（为true时mapUrl将无效）

    默认值：false

* `mapUrl` | string | 本地地图服务的地址

    默认值：''

* `tileLayer` | string | 本地地图服务的瓦片类型

    默认值：''

* `mapCenter` | [number, number] | 地图视角中心点

    默认值：[97.03125, 29.362721750200926]

* `data` | array<object> | 地图打点数据

    默认值：[]

* `draw` | 框选交互

* `draw.showArea` | boolean | 框选完成后是否显示选框

    默认值: false（若为true, 可在option.area配置选框样式）

* `draw. showMultiArea` | Boolean | 是否允许框选出多个选框

    默认值: false

* `area` | 选框图层

* `area.type` | string | 选框类别

    可选：’normal’ 或 ‘bigScreen’

    默认值：’normal’

* `area.showTooltip` | boolean | 鼠标悬浮到area上时是否显示详情框

    默认值：’false’

* `area.data` | array<object> | 区域图层的数据

    默认值：[ ] （draw出来的选框不用配置此项）

* `area.showCancelBtn` | boolean | 是否显示取消选框按钮

    默认值：false （点击后选框移除）

* `area.showSearchBtn` | Boolean | 是否显示选框搜索按钮

    默认值：false

*  `pointModal` | 点详情弹框

* `pointModal.autoClose` | string | 弹框在何时进行自动关闭

    可选：’move’ 或 ‘zoom’ 或 ‘all’ (拖动时，缩放时，拖动或缩放时)

    默认值：’zoom’

* `pointModal.autoPan` | boolean | 弹框打开时若在视角外，是否自动移入视角

    默认值：false

* `effectLine` | 线动画

* `effectLine.lineData` | array<object> | 连线的数据

    默认值：null

* `effectLine.pointData` | array<object> | 顶点的数据

    默认值：null

API:
===

* `renderPoint()`: 渲染点

* `renderHeatLayer()`: 渲染热力图

* `renderArea()`: 渲染区域的几何图形，必须先配置option.area.data

* `renderPointModal( gps, domId )`: 渲染点详情的弹框

    gps：必选，可以监听pointclick事件，从函数参数中获取

    domId：可选，弹框的domId, 默认为 ‘popup’

* `closePointModal()`: 关闭弹框，可以绑定在弹框的关闭按钮上

* `removeAllFeature()`: 清空所有feature

* `removeAllArea()`: 清空所有area

* `startTrail()`: 开始轨迹播放

* `stopTrail()`: 暂停轨迹播放

* `startEffectLine()`: 开始线动画播放

* `continueTrail()`: 继续轨迹播放

* `startDraw(type)`: 开始画区

    type: 可选 box,circle,polygon, 默认为box

* `event.bubbleOverlay()`: 点位冒泡

* `util`

* `util.getViewGps()`: 获取当前视图左上角和右下角的坐标

    return: [[number, number],[number, number]]

* `util.setCenter(gps)`: 设置地图中心点
import getMap from './view/renderMap';
import getHeatLayer from './view/heatLayer';
import getDraw from './action/draw';
import getPointLayer from './view/pointLayer';
import getTrail from './action/trail';
import getPointModalOverlay from './view/pointModal';
import getAreaLayer from './view/areaLayer';
import EffectLine from './action/effectLine';
import Events from './event/events';
import EventsHandler from './event/eventsHandler';
import utils from './common/utils';
import ol from 'openlayers';
import bubblePng from './assets/images/bubble.png';
import './assets/css/index.css';
class OlMap {
    constructor(domId) {
        this.domId = domId;
        this.eventsHandler = new EventsHandler();
        this.ol = ol;
        this.options = {
            useOSM: false,
            mapUrl: '',
            tileLayer: '',
            mapCenter: [97.03125, 29.362721750200926],
            zoom: 3,
            data: [],
            draw: {},
            pointModal: {
                autoClose: 'zoom'
            }
        };
        this.heatLayer = null;
        this.pointLayer = null;
        this.pointModal = null;
        this.trail = null;
        this.draw = null;
    }

    setOption(opts) {
        this.options = Object.assign(this.options, opts);
        if (!this.map) {
            this.map = getMap(this.domId, this.options);
            this.events = new Events(this.map, this.options, this.eventsHandler);
            this.map.on('click', (ev) => this.events.clickEvent(ev));
            this.map.on('pointermove', (ev) => this.events.moveEvent(ev));
            this.map.on('moveend', (ev) => this.events.dragAndMove(ev, this.pointModal));
            this.map.addInteraction(this.events.getSelectInteraction());
        }
        this.trail && this.trail.cleanTrailLines();
        this.trail = null;
    }

    /**
     * 给组件绑定自定义事件
     * @param eventType  [事件名]
     * @param cb  [回调函数]
     */
    on(eventType, cb) {
        this.eventsHandler['on' + eventType] = cb;
    }

    /**
     * 移除所有feature
     */
    removeAllFeature() {
        this.map.removeLayer(this.heatLayer);
        this.map.removeLayer(this.pointLayer);
        this.trail && this.trail.cleanTrailLines();
        this.effectLine && this.effectLine.clear();
    }

    /**
     * 渲染热力图层
     */
    renderHeatLayer() {
        this.removeAllFeature();
        this.heatLayer = getHeatLayer(this.options.data);
        this.map.addLayer(this.heatLayer);
    }

    /**
     * 渲染点图层
     */
    renderPoint() {
        this.removeAllFeature();
        this.pointLayer = getPointLayer(this.options);
        this.map.addLayer(this.pointLayer);
    }

    /**
     * 打开弹框
     * @param gps
     * @param domId
     */
    renderPointModal(gps, domId) {
        gps = [parseFloat(gps[0]), parseFloat(gps[1])];
        this.pointModal = this.pointModal || getPointModalOverlay(domId, this.options);
        this.pointModal.setPosition(ol.proj.fromLonLat(gps));
        this.map.addOverlay(this.pointModal);
    }

    /**
     * 关闭弹框
     */
    closePointModal() {
        this.events.closePointModal(this.pointModal);
    }

    /**
     * 开始轨迹播放
     */
    startTrail() {
        if (this.trail) {
            this.trail.cleanTrailLines();
        }
        this.trail = this.trail || getTrail(this.map, this.options.data, this.eventsHandler);
        this.trail.doPlayTrail();
        if (this.heatLayer) {
            this.map.removeLayer(this.heatLayer);
            this.map.removeLayer(this.pointLayer);
            this.map.addLayer(this.pointLayer);
        }
    }

    /**
     * 暂停轨迹播放
     */
    stopTrail() {
        this.trail && this.trail.stopTrail();
    }

    /**
     * 继续轨迹播放
     */
    continueTrail() {
        this.trail && this.trail.continueTrail();
    }

    /**
     * 开始线动画播放（相当于是不停播放的单轨迹）
     */
    startEffectLine() {
        if (this.effectLine) {
            this.effectLine.clear();
        }
        this.effectLine = new EffectLine(this.map ,this.options.effectLine);
        this.effectLine.start();
    }

    /**
     * 开始画区
     * @param type   box,circle,polygon
     */
    startDraw(type) {
        type = type || 'box';
        if (this.draw && this.draw.isDrawing) {
            this.map.removeInteraction(this.draw);
            if (this.draw.type === type) {
                this.draw.isDrawing = false;
                return;
            }
        }
        this.draw = getDraw(type, this.options, this.map, this.eventsHandler);
        this.map.addInteraction(this.draw);
        this.draw.isDrawing = true;
    }

    /**
     * 渲染选区，目前包括圆形，矩形和多边形
     */
    renderArea() {
        const areaData = utils.formatAreaData(this.options.area.areaData);
        this.removeAllArea();
        areaData.forEach((item, i) => {
            let areaLayer = getAreaLayer(this.options, item.areaLocation, 'area' + i, item);
            this.map.addLayer(areaLayer);
            areaLayer.btnOverlay && this.map.addOverlay(areaLayer.btnOverlay);
        });
    }

    /**
     * 移除所有选区
     */
    removeAllArea() {
        const layers = this.map.getLayers().a;
        const _layers = [...layers];
        for(let i = 0, l = _layers.length; i < l; i++) {
            let layer = _layers[i];
            if (layer.featureType === 'polygon' || layer.featureType === 'circle') {
                this.map.removeLayer(layer);
                layer.btnOverlay && this.map.removeOverlay(layer.btnOverlay);
                layer.dataOverlay && this.map.removeOverlay(layer.dataOverlay);
            }
        }
    }

    /**
     * 获取当前地图视口左上角和右下角的坐标
     * @returns {[number,number]}
     */
    getViewGps() {
        return utils.getViewGps(this.map);
    }

    /**
     * 设置地图中心点
     * @param gps
     */
    setCenter(gps) {
        return utils.setCenter(this.map, gps);
    }

    /**
     * 冒泡
     * @param data 冒泡数据
     */
    bubbleOverlay(data) {
        const bubble = [];
        let GPS, div;

        data.map((d, i) => {
            div = document.createElement('div');
            div.className = 'bubble';
            div.innerHTML =
                `<img src="${bubblePng}" class="big hiden"/>
                 <img src="${bubblePng}" class="small"/>`;
            document.body.appendChild(div);

            bubble[i] = new ol.Overlay({
                element: div,
                positioning: 'center-center',
                autoPanMargin: 400
            });
            this.map.addOverlay(bubble[i]);
            GPS = d.aggreCount > 1 ? d.gpsPosition : d.gps;
            GPS = typeof(GPS) === 'string' ? JSON.parse(GPS) : GPS;
            bubble[i].setPosition(ol.proj.fromLonLat(GPS));
        });

        // 3s之后移除冒泡效果
        setTimeout(() => {
            bubble.map((d) => {
                this.map.removeOverlay(d);
            });
        }, 3000);
    }
}
const olMap = {
    init: domId => new OlMap(domId)
}
window.olMap = olMap;
export default olMap;

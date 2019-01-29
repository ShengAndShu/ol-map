import ol from 'openlayers';
import utils from '../common/utils';
import bezierSpline from '@turf/bezier-spline';

class EffectLine {
    constructor(map, option) {
        this.map = map;
        this.lineData = option.lineData;
        this.pointData = option.pointData;
        this.duration = 3000;           // 动画时间
        this.curveness = 0.1;           // 贝塞尔曲线的弯曲程度，0~1，值越大越弯曲
        this.startTime = 0;             // 动画开始的时间
        this.lineFeatures = [];              // lineFeatures集合
        this.pointFeatures = [];             // pointFeatures
        this.layer = null;              // 线的图层
        this.animateFun = (ev) => this.animate(ev);    // 渲染的回调（用箭头函数确保animate中的this指向）
    }

    start() {
        this.getFeaturesAndLayer();
        this.startTime = new Date().getTime();
        this.map.on('postcompose', this.animateFun);
        this.map.render();
    }

    clear() {
        this.map.un('postcompose', this.animateFun);
        this.map.removeLayer(this.layer);
    }

    // 获取features 和 layer
    getFeaturesAndLayer() {
        const lineData = this.lineData;
        for (let i = 0, l = lineData.length; i < l; i++) {
            const item = lineData[i];
            const gps = item.gps;
            const line = this.getBezierLine(ol.proj.fromLonLat(gps[0]), ol.proj.fromLonLat(gps[1]));

            const label = String(item.label);
            const lineFeature = new ol.Feature({
                name: 'line',
                label: label,
                geometry: line,
                originData: item
            });
            const lineStyle = utils.getLineStyle(label);
            lineFeature.setStyle(lineStyle);
            this.lineFeatures.push(lineFeature);
        }
        const pointData = this.pointData;
        for (let i = 0, l = pointData.length; i < l; i++) {
            const item = pointData[i];
            const label = String(item.label);
            const pointFeature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat(item.gps)),
                originData: item
            });
            const pointStyle = utils.getCircleStyle(label);
            pointFeature.setStyle(pointStyle);
            this.pointFeatures.push(pointFeature);
        }
        this.layer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: this.lineFeatures.concat(this.pointFeatures),
                wrapX: false
            }),
            wrapX: false
        });
        this.map.addLayer(this.layer);
    }

    // 开始动画（箭头和闪光点）
    animate(event) {
        const vectorContext = event.vectorContext;
        const elapsed = event.frameState.time - this.startTime;
        const elapsedRatio = elapsed % this.duration / this.duration;

        // 开始画箭头
        const zoom = this.map.getView().getZoom();
        const unitDistance = 10000 * Math.pow(2, 5 - zoom);
        const arrowHeight = 5 * unitDistance;
        const features = this.lineFeatures;
        for (let i = 0, l = features.length; i < l; i++) {
            const feature = features[i];
            const isActive = feature.get('isActive');
            const coords = feature.getGeometry().getCoordinates();
            const index = Math.floor((coords.length - 2) * elapsedRatio);
            const start = coords[index];
            const end = coords[index + 1];
            const arrow = utils.getArrow(start, end, arrowHeight);
            vectorContext.setStyle(utils.getArrowStyle(isActive));
            vectorContext.drawGeometry(arrow);
        }

        // 开始画闪光点
        // const radius = ol.easing.easeOut(elapsedRatio) * 25 + 3;
        // const opacity = ol.easing.easeOut(1 - elapsedRatio);
        // const cirCleStyle = new ol.style.Style({
        //     image: new ol.style.Circle({
        //         radius: radius,
        //         snapToPixel: false,
        //         stroke: new ol.style.Stroke({
        //             color: 'rgba(255,0,0,' + opacity + ')',
        //             width: 0.25 + opacity
        //         })
        //     })
        // });
        // vectorContext.setStyle(cirCleStyle);
        // for (let i = 0, l = features.length; i < l; i++) {
        //     const coords = feature.getGeometry().getCoordinates();
        //     const point = new ol.geom.Point(coords[coords.length - 1]);
        //     vectorContext.drawGeometry(point);
        // }

        // 触发地图重新渲染
        this.map.render();
    }

    // 根据起点和终点获取贝塞尔曲线
    getBezierLine(p1, p2) {
        const middle = [
            (p1[0] + p2[0]) / 2 - (p1[1] - p2[1]) * this.curveness,
            (p1[1] + p2[1]) / 2 - (p2[0] - p1[0]) * this.curveness
        ];
        const geoJson = {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "LineString",
                "coordinates": [p1, middle, p2]
            }
        };
        const curved = bezierSpline(geoJson);
        return new ol.geom.LineString(curved["geometry"]["coordinates"]);
    }
}

export default EffectLine;
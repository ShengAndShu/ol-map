import ol from 'openlayers';
import utils from '../common/utils';
import bezierSpline from '@turf/bezier-spline';

class EffectLine {
    constructor(map, option) {
        this.map = map;
        this.data = option.data;
        this.duration = 3000;           // 动画时间
        this.curveness = 0.1;           // 贝塞尔曲线的弯曲程度，0~1，值越大越弯曲
        this.startTime = 0;             // 动画开始的时间
        this.features = [];             // features集合
        this.layer = null;              // 线的图层
        this.animateFun = (ev) => this.animate(ev);    // 渲染的回调（用箭头函数确保animate中的this指向）
    }

    start() {
        this.getLinesAndLayer();
        this.startTime = new Date().getTime();
        this.map.on('postcompose', this.animateFun);
        this.map.render();
    }

    clear() {
        this.map.un('postcompose', this.animateFun);
        this.map.removeLayer(this.layer);
    }

    // 获取line features 和 layer
    getLinesAndLayer() {
        const data = this.data;
        for (let i = 0, l = data.length; i < l; i++) {
            const item = data[i];
            const coords = item.coords;
            const line = this.getBezierLine(ol.proj.fromLonLat(coords[0]), ol.proj.fromLonLat(coords[1]));

            const label = String(item.label);
            const feature = new ol.Feature({
                name: 'line',
                label: label,
                geometry: line,
                originData: item
            });
            const lineStyle = utils.getLineStyle(label);
            feature.setStyle(lineStyle);
            this.features.push(feature);
        }
        this.layer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: this.features,
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
        const features = this.features;
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
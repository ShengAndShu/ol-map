import ol from 'openlayers';
import utils from '../common/utils';
import {bezier} from '@turf/turf';

class EffectLine {
    constructor(map, option) {
        this.map = map;
        this.data = option.data;
        this.duration = 3000;
        this.curveness = 0.1;
        this.startTime = 0;
        this.lines = [];                // lines geometry 集合
        this.features = [];             // features集合
        this.layer = null;              // 线的图层
        this.animateFun = (ev) => this.animate(ev);    // 渲染的回调（用箭头函数确保animate中的this指向）
        this.arrowStyle = new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#0000FF',
                width: 2
            }),
            fill: new ol.style.Fill({
                color: '#0000FF'
            })
        });
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
            this.lines.push(line);

            const label = item.label;
            const feature = new ol.Feature({
                name: 'line',
                label: label,
                geometry: line
            });
            const lineStyle = new ol.style.Style({
                text: new ol.style.Text({
                    text: label,
                    font: '16px arial,sans-serif',
                    padding: [10, 10, 10, 10],
                    stroke: new ol.style.Stroke({   // 不加透明的stroke的话，点击背景不会选中
                        color: 'rgba(255,255,255,.1)',
                        width: 8
                    }),
                    fill: new ol.style.Fill({
                        color: '#000'
                    }),
                    placement: 'line',
                    textBaseline: 'bottom',
                    offsetY: -2
                }),
                stroke: new ol.style.Stroke({
                    color: '#0000FF',
                    width: 2
                })
            });
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
        vectorContext.setStyle(this.arrowStyle);
        const zoom = this.map.getView().getZoom();
        const unitDistance = 10000 * Math.pow(2, 5 - zoom);
        const arrowHeight = 5 * unitDistance;
        const lines = this.lines;
        for (let i = 0, l = lines.length; i < l; i++) {
            const coords = lines[i].getCoordinates();
            const index = Math.floor((l - 2) * elapsedRatio);
            const start = coords[index];
            const end = coords[index + 1];
            const arrow = utils.getArrow(start, end, arrowHeight);
            vectorContext.drawGeometry(arrow);
        }

        // 开始画闪光点
        const radius = ol.easing.easeOut(elapsedRatio) * 25 + 3;
        const opacity = ol.easing.easeOut(1 - elapsedRatio);
        const cirCleStyle = new ol.style.Style({
            image: new ol.style.Circle({
                radius: radius,
                snapToPixel: false,
                stroke: new ol.style.Stroke({
                    color: 'rgba(255,0,0,' + opacity + ')',
                    width: 0.25 + opacity
                })
            })
        });
        vectorContext.setStyle(cirCleStyle);
        for (let i = 0, l = lines.length; i < l; i++) {
            const coords = lines[i].getCoordinates();
            const point = new ol.geom.Point(coords[coords.length - 1]);
            vectorContext.drawGeometry(point);
        }

        // 触发地图重新渲染
        this.map.render();
    }

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
        const curved = bezier(geoJson);
        return new ol.geom.LineString(curved["geometry"]["coordinates"]);
    }
}

export default EffectLine;
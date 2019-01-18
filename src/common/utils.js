import ol from 'openlayers';
import juhePng from '../assets/images/juhe.png';
import crPng from '../assets/images/cr.png';
import luPng from '../assets/images/lu.png';
import smsPng from '../assets/images/sms.png';
import crAttentionPng from '../assets/images/cr-attention.png';
import luAttentionPng from '../assets/images/lu-attention.png';
import smsAttentionPng from '../assets/images/sms-attention.png';
import circlePng from '../assets/images/circle.png';

/**
 * 公共方法
 */
const utils = {
    isBigScreen: false,
    styleFunction: (feature) => {
        const count = feature.N.aggreCount,
            type = feature.N.type,
            type_ope = feature.N.type_ope;
        if (count > 1) {
            return utils.setJuheIconStyle(count);
        } else {
            return utils.setSingleIconStyle(type, type_ope);
        }
    },
    /**
     * 聚合点样式
     * len 聚合个数
     * hover 点击或悬浮
     */
    setJuheIconStyle: (len, hover) => {
        return new ol.style.Style({
            image: new ol.style.Icon(({
                color: hover === 'hover' ? '#3da6f5' : '#F54336',
                src: juhePng,
                anchor: [0.5, 1]
            })),
            text: new ol.style.Text({
                text: len && len.toString(),
                fill: new ol.style.Fill({
                    color: '#fff'
                }),
                offsetY: -16,
                scale: 0.9
            })
        });
    },

    /**
     * 单点样式
     * type: cr听音 sms短信 lu位置
     * opType: unOperate未操作 operated已操作 attention预警  today 24小时
     * hover: 点击或悬浮
     */
    setSingleIconStyle: (type, opType, hover) => {
        let src,
            color = '#f00',
            isAttention = opType === 'attention';
        if (hover) {
            color = '#0096ff';
        } else if (opType === 'operated') {
            color = '#9fa2bd';
        } else if (opType === 'unOperate') {
            color = '#3db94c';
        } else if (opType === 'attention') {
            color = '#f00';
        }

        if (type === 'cr') {
            src = isAttention ? crAttentionPng : crPng;
        } else if (type === 'lu') {
            src = isAttention ? luAttentionPng : luPng;
        } else if (type === 'sms') {
            src = isAttention ? smsAttentionPng : smsPng;
        }

        if (opType.indexOf('today') > -1 || !type || !opType) {
            return new ol.style.Style({
                image: new ol.style.Icon(({
                    color: color,
                    src: circlePng,
                    anchor: [0.5, 0.5]
                }))
            })
        } else {
            return new ol.style.Style({
                image: new ol.style.Icon(({
                    color: color,
                    src: src,
                    anchor: [0.5, 1]
                }))
            })
        }
    },

    /**
     * 区域样式
     * @param type
     * @param isHover
     */
    getAreaStyle: (type, isHover) => {
        const isBigscreen = type && type.toLowerCase() === 'bigscreen';
        return new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: isBigscreen ? '#EF8F8F' : '#00B7EE',
                width: isBigscreen && !isHover ? 1 : 2,
                lineDash: isBigscreen ? [10, 10] : [0, 0]
            }),
            fill: new ol.style.Fill({
                color: isHover ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0)'
            })
        })
    },

    /**
     * 获取当前地图视口左上角和右下角的坐标
     * @param map
     */
    getViewGps: (map) => {
        let extent = map.getView().calculateExtent(map.getSize()),
            //上左的坐标
            getTopLeft = ol.proj.transform(ol.extent.getTopLeft(extent), 'EPSG:3857', 'EPSG:4326'),
            //下右的坐标
            getBottomRight = ol.proj.transform(ol.extent.getBottomRight(extent), 'EPSG:3857', 'EPSG:4326');
        return [getTopLeft, getBottomRight];
    },

    /**
     * 格式化区域的data
     * @param data
     */
    formatAreaData: (data) => {
        return data.map(item => {
            if(item.areaType === '2' || item.areaType === 2) {
                let center = item.center.split(',').map(str => parseFloat(str));
                center = ol.proj.fromLonLat(center);
                const location = {
                    center: center,
                    radius: item.radius * 1000
                };
                return Object.assign({}, item, {areaLocation: location});
            }else {
                const gpsList = item.areaLocation.split(',').map(str => parseFloat(str));
                const location = utils.getCoordinates(gpsList).map(d => ol.proj.fromLonLat(d));
                return Object.assign({}, item, {areaLocation: location});
            }
        })
    },

    /**
     * 将坐标集合格式从 number[] 转换为 [number, number][]
     * @param data  坐标集合  number[]
     * @returns {Array}
     */
    getCoordinates: (data) => {
        let coordinates = [];
        let len = data.length;
        // 矩形区域有时在项目中保存的只有左上角和右下角的坐标，兼容性考虑
        if (len === 4) {
            const [x1, y1, x2, y2] = data;
            coordinates = [[x1, y1], [x1, y2], [x2, y2], [x2, y1], [x1, y1]];
        }else {
            // 如果 data 中的坐标数据不是闭合的（终点不等于起点）, 将其闭合
            if (data[0] !== data[len - 2] || data[1] !== data[len - 1]) {
                data.push(data[0]);
                data.push(data[1]);
                len = data.length;
            }
            for (let i = 0; i < len / 2; i++) {
                coordinates[i] = [data[i * 2], data[i * 2 + 1]]
            }
        }

        return coordinates;
    },

    /**
     * coordinate转换为经纬度，经度可以大于180或小于-180 （toLonLat 会把不合法的经纬度换成合法的，画区超过地图边界时需要不合法坐标）
     * @param coordinate
     */
    toGps: (coordinate) => {
        let gps = ol.proj.toLonLat(coordinate);
        if (coordinate[0] > 20037508.342789244) {
            gps[0] = gps[0] + 360;
        } else if (coordinate[0] < -20037508.342789244) {
            gps[0] = gps[0] - 360;
        }
        return gps;
    },

    /**
     * 获取地图中心点坐标，经纬度坐标或者投影坐标
     * @param map
     * @param type 'coordinate' 或 不填
     * @returns {ol.Coordinate}
     */
    getCenter: (map, type) => {
        const center = map.getView().getCenter();
        if (type === 'coordinate') {
            return center;
        } else {
            return ol.proj.toLonLat(center);
        }
    },

    /**
     * 设置地图中心点
     * @param map
     * @param gps
     */
    setCenter: (map, gps) => {
        const center = ol.proj.fromLonLat([parseFloat(gps[0]), parseFloat(gps[1])]);
        map.getView().setCenter(center);
    },

    /**
     * 生成箭头
     * @param rPoint 参照节点的位置（用于确定箭头的方向）
     * @param endPoint 箭头的头的位置
     * @param arrowHeight 箭头的高度
     * @returns {ol.geom.Polygon}
     */
    getArrow: (rPoint, endPoint, arrowHeight) => {
        //箭头底和高的交点位置
        const mPoint = [];
        //头与交点的位移差
        let diffX, diffY;
        //头与参照点的位移差
        let rdiffX, rdiffY;

        rdiffX = endPoint[0] - rPoint[0];
        rdiffY = endPoint[1] - rPoint[1];
        //头与参照点的距离
        const rlength = Math.sqrt(rdiffX * rdiffX + rdiffY * rdiffY);
        //头与交点的位移差
        diffX = rdiffX * arrowHeight / rlength;
        diffY = rdiffY * arrowHeight / rlength;

        mPoint[0] = endPoint[0] - diffX;
        mPoint[1] = endPoint[1] - diffY;
        // 三角形箭头的底的一半长度
        const halfBottomLen = arrowHeight / 3;
        // 箭头的另外两个顶点
        const point1 = [],
            point2 = [];
        const _x = halfBottomLen * Math.abs(diffY / arrowHeight);
        const _y = halfBottomLen * Math.abs(diffX / arrowHeight);
        if (diffY === 0) {
            point1[0] = mPoint[0];
            point1[1] = mPoint[1] - halfBottomLen;

            point2[0] = mPoint[0];
            point2[1] = mPoint[1] + halfBottomLen;
        } else if (diffX === 0) {
            point1[0] = mPoint[0] - halfBottomLen;
            point1[1] = mPoint[1];

            point2[0] = mPoint[0] + halfBottomLen;
            point2[1] = mPoint[1];
        } else if (diffX > 0 && diffY > 0 || diffX < 0 && diffY < 0) {
            point1[0] = mPoint[0] + _x;
            point1[1] = mPoint[1] - _y;

            point2[0] = mPoint[0] - _x;
            point2[1] = mPoint[1] + _y;
        } else if (diffX < 0 && diffY > 0 || diffX > 0 && diffY < 0) {
            point1[0] = mPoint[0] - _x;
            point1[1] = mPoint[1] - _y;

            point2[0] = mPoint[0] + _x;
            point2[1] = mPoint[1] + _y;
        }
        return new ol.geom.Polygon([
            [endPoint, point1, point2, endPoint]
        ]);
    }
};
export default utils;
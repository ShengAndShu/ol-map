import ol from 'openlayers';
import utils from '../common/utils';
import arc from './arc';

const TrailStatus = {
    START: 'start',
    STOPED: 'stoped'
};
const GLOBAL = {
    BACK_LIST: [],
    NUM: 1,         // 多个终端时，终端的index
    ZOOM: 3.0,
    MIN_TIME: 0,
    MAX_TIME: 0
};
let globalNum = 0,      // 轨迹的index
    timer = null,
    _timer = null,
    $THIS = null;

const TrailStatusParam = function () {
    let status = TrailStatus.START;
    this.getStatus = function () {
        return status;
    };
    this.setStatus = function (st) {
        status = st;
    };
    let time = null;
    this.getTime = function () {
        return time;
    };
    this.setTime = function (st) {
        time = st;
    };
};

const PlayTrail = function (opt_options) {
    const _options = opt_options;
    this.lineStyle = _options.lineStyle || new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#0000FF',
            width: 2
        }),
        fill: new ol.style.Fill({
            color: '#0000FF'
        }),
    });
    this.markStyle = _options.markStyle || new ol.style.Style({
        image: new ol.style.Circle({
            radius: 7,
            snapToPixel: false,
            fill: new ol.style.Fill({
                color: 'red'
            }),
            stroke: new ol.style.Stroke({
                color: 'white',
                width: 2
            })
        })
    });
    this.duration = _options.duration;
    this.flag = _options.flag;
    this.pointsPerMs = 100.0 / this.duration;
    this.pointsFeatureStore = [];
    this.onPlayFinished = _options.onPlayFinished;
    this.lineFeatures = [];
    this.trailStatus = new TrailStatusParam();
    this.pointsFeatureStore = _options.pointFeatures || {};
    this.map = _options.map;
    this._animatePoint = null;
    $THIS = this;
};

/**
 * 轨迹渲染
 * @param event
 */
PlayTrail.prototype.animateTrail = function (event) {
    const vectorContext = event.vectorContext;
    const frameState = event.frameState;
    vectorContext.setStyle($THIS.lineStyle);

    const features = $THIS.lineFeatures;
    const zoom = $THIS.map.getView().getZoom();
    // 箭头的高度
    const unitDistance = 10000 * Math.pow(2, 5 - zoom);
    const arrowHeight = 5 * unitDistance;
    let lineLength = 0;

    //轨迹暂停的时候所有播放的轨迹都
    for (let i = 0; i < features.length; i++) {
        for (let j = 0; j < features[i].length; j++) {
            const feature = features[i][j];
            if ($THIS.trailStatus.getStatus() === TrailStatus.STOPED) {
                feature.set('start', feature.get('start') + (frameState.time - $THIS.trailStatus.getTime()));
            }
        }
        lineLength += features[i].length;
    }

    for (let j = 0; j < features.length; j++) {
        for (let i = 0; i < features[j].length; i++) {
            const feature = features[j][i];
            if (!feature.get('finished')) {
                if (!feature.get('started')) {
                    continue;
                }
                const coords = feature.getGeometry().getCoordinates();
                if ($THIS.trailStatus.getStatus() === TrailStatus.STOPED) {
                    $THIS.trailStatus.setTime(frameState.time);
                }

                const elapsedTime = frameState.time - feature.get('start');
                const elapsedPoints = elapsedTime * $THIS.pointsPerMs;

                const maxIndex = Math.min(elapsedPoints, coords.length);
                const currentLine = new ol.geom.LineString(coords.slice(0, maxIndex));
                vectorContext.drawGeometry(currentLine);

                // 画箭头
                const endIndex = Math.floor(Math.min(elapsedPoints, coords.length - 1));
                if (endIndex > 2) {
                    let mIndex = Math.max(0, endIndex - 1);
                    mIndex = Math.floor(mIndex);
                    if (endIndex > mIndex) {
                        const arrow = utils.getArrow(coords[mIndex], coords[endIndex], arrowHeight);
                        vectorContext.drawGeometry(arrow);
                    }
                }
                if (elapsedPoints >= coords.length) {
                    feature.set('finished', true);
                    globalNum++;
                    if (feature.secondLine) {
                        const nextLineFeature = feature.secondLine;
                        nextLineFeature.set('started', true);
                        nextLineFeature.set('start', new Date().getTime());
                    } else {
                        const targetPoint = feature.get('targetPoint');
                        targetPoint.trailStatus = TrailStatus.STOPED;
                        const nextLineFeature = targetPoint.get('line');
                        if (nextLineFeature) {
                            nextLineFeature.set('started', true);
                            nextLineFeature.set('start', new Date().getTime());
                            const nextPoint = nextLineFeature.get('targetPoint');
                            nextPoint.trailStatus = TrailStatus.START;
                            $THIS.animatePoint(nextPoint, $THIS.duration + 500);
                        } else {
                            // 轨迹播放结束
                            if (globalNum >= lineLength) {
                                // 轨迹播放结束
                                $THIS.onPlayFinished && $THIS.onPlayFinished({ pointCount: globalNum + 1 });
                                globalNum = 0;
                                clearInterval(timer);
                                timer = null;
                                $THIS.status = 'finished';
                                break;
                            }
                        }
                    }
                }
            } else {
                const coors = feature.getGeometry().getCoordinates();
                vectorContext.drawGeometry(new ol.geom.LineString(coors));
                // 画箭头
                const targetPoint = feature.get('targetPoint');
                // const radius = targetPoint.getStyle().getImage().getRadius();
                const radius = 7;
                const distance = radius * unitDistance / 2;
                const targetCoords = targetPoint.getGeometry().getCoordinates();
                const halfLen = coors.length / 2;
                let _index = coors.length - 1;
                let _line;
                for (_index = coors.length - 1; _index >= 0; --_index) {
                    _line = new ol.geom.LineString([coors[_index], targetCoords]);
                    if (distance < _line.getLength()) {
                        break;
                    }
                }
                if (_index < halfLen) {
                    _index = halfLen;
                }
                if (feature.secondLine) continue;
                // 画箭头
                if (distance < _line.getLength()) {
                    const rIdx = Math.max(0, _index - 1);
                    const ratio = distance / _line.getLength();
                    const arrowHead = [];
                    arrowHead[0] = targetCoords[0] - (targetCoords[0] - coors[rIdx][0]) * ratio;
                    arrowHead[1] = targetCoords[1] - (targetCoords[1] - coors[rIdx][1]) * ratio;
                    const arrow = utils.getArrow(coors[rIdx], arrowHead, arrowHeight);
                    vectorContext.drawGeometry(arrow);
                } else {
                    const arrowIdx = Math.max(0, _index);
                    const rIdx = Math.max(0, arrowIdx - 1);
                    if (arrowIdx > rIdx) {
                        const arrow = utils.getArrow(coors[rIdx], coors[arrowIdx],
                            arrowHeight);
                        vectorContext.drawGeometry(arrow);
                    }
                }
            }
        }
    }
    clearInterval(_timer);
    _timer = setTimeout(function () {
        $THIS.map.render();
    }, 20);
};

/**
 * 使点闪光
 * @param pointFeature 点
 * @param animateDuaration 单次时长
 */
PlayTrail.prototype.animatePoint = function (pointFeature, animateDuaration) {
    let start = new Date().getTime();
    let listenerKey;
    $THIS.map.un('postcompose', $THIS._animatePoint);
    $THIS._animatePoint = function (event) {
        if (pointFeature.trailStatus === TrailStatus.STOPED) {
            ol.Observable.unByKey(listenerKey);
            return;
        }
        const vectorContext = event.vectorContext;
        const frameState = event.frameState;
        const flashGeom = pointFeature.getGeometry().clone();
        flashGeom.A = ol.proj.transform(pointFeature.coordinates, 'EPSG:4326', 'EPSG:3857');
        const elapsed = frameState.time - start;
        const elapsedRatio = elapsed / animateDuaration;
        const radius = ol.easing.easeOut(elapsedRatio) * 25 + 3;
        const opacity = ol.easing.easeOut(1 - elapsedRatio);

        const style = new ol.style.Style({
            image: new ol.style.Circle({
                radius: radius,
                snapToPixel: false,
                stroke: new ol.style.Stroke({
                    color: 'rgba(255,0,0,' + opacity + ')',
                    width: 0.25 + opacity
                })
            })
        });
        vectorContext.setStyle(style);
        vectorContext.drawGeometry(flashGeom);
        if (elapsed > animateDuaration) {
            if ($THIS.trailStatus.getStatus() === TrailStatus.STOPED) {
                // 如果是暂停状态则继续动画
                start = new Date().getTime();
            }
        }
    };
    listenerKey = $THIS.map.on('postcompose', $THIS._animatePoint);
};

/**
 * 播放轨迹
 */
PlayTrail.prototype.doPlayTrail = function () {
    $THIS.status = 'started';
    const pointStore = $THIS.pointsFeatureStore;
    for (let k = 0; k < pointStore.length; k++) {
        if (pointStore[k].length < 2) {
            pointStore.splice(k, 1);
            k--;
        }
    }
    if (pointStore.length === 0) return;
    for (let k = 0; k < pointStore.length; k++) {
        // 初始点
        let startPoint = pointStore[k][0].coordinates,
            endPoint;
        if (pointStore[k].length > 1) {
            const _lines = [];
            for (let i = 1; i < pointStore[k].length; i++) {
                endPoint = pointStore[k][i].coordinates;
                const arcGenerator = new arc.GreatCircle(
                    {x: startPoint[0], y: startPoint[1]},
                    {x: endPoint[0], y: endPoint[1]}
                );
                // 把点往后移z
                startPoint = endPoint;

                const arcLine = arcGenerator.Arc(100, {
                    offset: 20
                });
                arcLine.geometries.forEach(function (geometry, _idx) {
                    const line = new ol.geom.LineString(geometry.coords);
                    line.transform(ol.proj.get('EPSG:4326'), ol.proj.get('EPSG:3857'));
                    const lineFeature = new ol.Feature({
                        geometry: line,
                        finished: false,
                        started: false,
                        targetPoint: pointStore[k][i]
                    });
                    if (_idx == 0) {
                        if ('move' == $THIS.flag) {
                            if (i == 1) {
                                lineFeature.set('start', new Date().getTime());
                                lineFeature.set('started', true);
                                pointStore[k][i].trailStatus = TrailStatus.START;
                                $THIS.animatePoint(pointStore[k][i],
                                    $THIS.duration);
                            }
                        } else {
                            if (i == 1 && k == 0) {
                                lineFeature.set('start', new Date().getTime());
                                lineFeature.set('started', true);
                                pointStore[k][i].trailStatus = TrailStatus.START;
                                $THIS.animatePoint(pointStore[k][i],
                                    $THIS.duration);
                            }
                        }
                        pointStore[k][i - 1].set('line', lineFeature);
                    } else if (_idx == 1) {
                        _lines[_lines.length - 1].secondLine = lineFeature;
                    }
                    _lines.push(lineFeature);
                });
            }
            $THIS.lineFeatures.push(_lines);
        }
    }
    $THIS.map.on('postcompose', $THIS.animateTrail);
    $THIS.map.render();

    // 多个轨迹时逐个播放
    GLOBAL.NUM = 1;
    if (timer === null) {
        timer = setInterval(function () {
            if (GLOBAL.NUM <= $THIS.lineFeatures.length - 1) {
                if (GLOBAL.NUM <= $THIS.lineFeatures.length - 1) {
                    if ($THIS.lineFeatures[GLOBAL.NUM].length > 0) {
                        const feature = $THIS.lineFeatures[GLOBAL.NUM][0];
                        feature.set('start', new Date().getTime());
                        feature.set('started', true);
                    }
                    GLOBAL.NUM += 1;
                }
            }
        }, 2000);
    }
};

/**
 * 清除播放轨迹
 */
PlayTrail.prototype.cleanTrailLines = function (num) {
    const pointLength = $THIS.pointsFeatureStore.length;
    $THIS.trailStatus.setStatus(TrailStatus.START);
    let length = 0;
    for (let i = pointLength - num; i < pointLength; i++) {
        $THIS.pointsFeatureStore[i].trailStatus = TrailStatus.STOPED;
        length += $THIS.pointsFeatureStore[i].length - 1;
    }
    $THIS.lineFeatures.splice(length, $THIS.lineFeatures.length);
    $THIS.map.un('postcompose', $THIS.animateTrail);
    $THIS.map.un('postcompose', $THIS._animatePoint);
    $THIS.status = null;
};

/**
 * 暂停播放
 */
PlayTrail.prototype.stopTrail = function () {
    clearInterval(timer);
    if ($THIS.trailStatus.getStatus() !== TrailStatus.STOPED) {
        $THIS.trailStatus.setStatus(TrailStatus.STOPED);
        $THIS.trailStatus.setTime(new Date().getTime());
    }
    $THIS.status = 'stopped';
};

/**
 * 继续播放
 */
PlayTrail.prototype.continueTrail = function () {
    $THIS.trailStatus.setStatus(TrailStatus.START);
    timer = setInterval(function () {
        if (GLOBAL.NUM <= $THIS.lineFeatures.length - 1) {
            if ($THIS.lineFeatures[GLOBAL.NUM].length > 0) {
                const feature = $THIS.lineFeatures[GLOBAL.NUM][0];
                feature.set('start', new Date().getTime());
                feature.set('started', true);
            }
            GLOBAL.NUM += 1;
        }
    }, 2000);
    $THIS.status = 'started';
};

/**
 * 回放
 */
PlayTrail.prototype.backTrail = function (time) {
    const backTime = GLOBAL.MAX_TIME - parseInt(time);
    for (let i = 0; i < $THIS.lineFeatures.length; i++) {
        if ($THIS.lineFeatures[i].T.start > backTime) {
            GLOBAL.BACK_LIST.push($THIS.lineFeatures[i]);
            $THIS.lineFeatures.splice(i, 1);
            i--;
        }
    }
    $THIS.trailStatus.setStatus(TrailStatus.STOPED);
    $THIS.trailStatus.setTime(new Date().getTime());
};

/**z
 * 回放
 */
PlayTrail.prototype.runTrail = function (time) {
    const backTime = GLOBAL.MIN_TIME - parseInt(time);
    for (let i = 0; i < GLOBAL.BACK_LIST.length; i++) {
        if (GLOBAL.BACK_LIST[i].T.start < backTime) {
            $THIS.lineFeatures.push(GLOBAL.BACK_LIST[i]);
        }
    }
    $THIS.trailStatus.setStatus(TrailStatus.STOPED);
    $THIS.trailStatus.setTime(new Date().getTime());
};

/**
 * 格式化后台数据
 * @param data 轨迹播放后台数据
 */
const formatData = (data) => {
    const terminalArr = [];
    const trailData = [];
    const format = new ol.format.GeoJSON();
    for (let i = 0, len = data.length; i < len; i++) {
        const terminalId = data[i].prop_terminalId;
        let terminalIndex = terminalArr.indexOf(terminalId);
        if (terminalIndex < 0) {
            terminalArr.push(terminalId);
            terminalIndex = terminalArr.length - 1;
            trailData[terminalIndex] = [];
        }
        let gps = data[i].gps;
        gps = typeof (gps) === 'string' ? JSON.parse(gps) : gps;
        const point = format.readFeature({
            coordinates: gps,
            type: 'Point'
        }, {
            featureProjection: 'EPSG:3857'
        });
        point.type = 'point';
        point.trailStatus = TrailStatus.STOPED;
        point.coordinates = gps;
        point.coordinate = ol.proj.fromLonLat(gps);

        trailData[terminalIndex].push(point);
    }
    return trailData;
};

/**
 * 创建 trail 对象
 * @param map
 * @param data
 * @param eventsHandler
 * @returns {PlayTrail}
 */
export default (map, data, eventsHandler) => {
    return new PlayTrail({
        pointFeatures: formatData(data),
        map: map,
        duration: 1000,
        flag: 'init',
        onPlayFinished: eventsHandler.ontrailend
    });
}

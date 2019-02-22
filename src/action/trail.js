import ol from 'openlayers';
import utils from '../common/utils';

export default class Trail {
    constructor(map, data, eventsHandler) {
        this.map = map;
        this.ontrailend = eventsHandler.ontrailend;
        this.status = null;             // 轨迹播放的状态, 'started':已开始, 'stopped':已暂停, 'finished': 已结束
        this.data = this.formatData(data);    // 所有的gps数据，二维数组，按terminalId分组  [[gps]]
        this.lines = [];                // 所有的线，二维数组，按terminalId分组 [[line]]
        this.duration = 1800;           // 单条线的动画时间
        this.curveness = 0.1;           // 贝塞尔曲线的弯曲程度，0~1，值越大越弯曲
        this.startTime = 0;             // 动画开始的时间
        this.elapsed = 0;               // 动画已执行的时长
        this.elapsedWhenPaused = 0;     // 暂停时动画已执行的时长
        this.continuedTime = 0;         // 暂停后，点击继续播放时的时间
        this.animateFun = (ev) => this.animate(ev);    // 渲染的回调（用箭头函数确保animate中的this指向）
        this.isPaused = false;          // 是否已暂停
    }

    start() {
        this.getLines();
        this.startTime = new Date().getTime();
        this.map.on('postcompose', this.animateFun);
        this.map.render();
        this.status = 'started';
    }

    clear() {
        this.map.un('postcompose', this.animateFun);
    }

    // 暂停轨迹播放
    stopTrail() {
        if (!this.isPaused) {
            this.elapsedWhenPaused = this.elapsed;
            this.isPaused = true;
            this.status = 'stopped';
        }
    }

    // 继续轨迹播放
    continueTrail() {
        if (this.isPaused === true) {
            this.continuedTime = new Date().getTime();
            this.isPaused = false;
            this.status = 'started';
        }
    }

    // 将gps转换为ol.geom.LineString
    getLines() {
        const data = this.data;
        const lines = [];
        for(let i = 0, l = data.length; i < l; i++) {
            const item = data[i];
            const len = item.length;
            if (len > 1) {
                lines[i] = [];
                for (let j = 0; j < len - 1; j++) {
                    const start = ol.proj.fromLonLat(item[j]);
                    const end = ol.proj.fromLonLat(item[j + 1]);
                    const line = utils.getBezierLine(start, end, this.curveness);
                    lines[i].push(line);
                }
            }
        }
        this.lines = lines;
    }

    // 开始动画
    animate(event) {
        const vectorContext = event.vectorContext;
        const frameState = event.frameState;
        const zoom = this.map.getView().getZoom();
        const unitDistance = 10000 * Math.pow(2, 5 - zoom);
        const arrowHeight = 5 * unitDistance;
        const lines = this.lines;
        if (!this.isPaused) {
            this.elapsed = frameState.time - this.startTime;
            // 若执行过暂停和继续播放
            if (this.continuedTime) {
                this.elapsed = this.elapsedWhenPaused + (frameState.time - this.continuedTime);
            }
        }

        vectorContext.setStyle(new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#0096ff',
                width: 2
            }),
            fill: new ol.style.Fill({
                color: '#0096ff'
            })
        }));
        // 渲染所有终端轨迹和箭头(不同终端轨迹会隔2s再播放下一个)
        for (let i = 0, l = lines.length; i < l; i++) {
            const terminalLines = lines[i];                            // 终端轨迹的所有线
            const elapsed = this.elapsed - i * 2000;                   // 该终端的轨迹已经播放的时长（隔2s播放下一个）
            const lineIdx = Math.floor(elapsed / this.duration);       // 该终端正在播放第几条线
            const ratio = (elapsed % this.duration) / this.duration;   // 该终端正在播放的线已渲染的比例
            // 渲染单个终端的所有轨迹线
            for (let _i = 0, _l = terminalLines.length; _i < _l; _i++) {
                // 已播放过的线的播放比例为1，正在播放的为ratio, 还未播放的为0
                const lineRatio = _i > lineIdx ? 0 : (_i === lineIdx ? ratio : 1);
                if (lineRatio > 0) {
                    this.drawSingleLineAndArrow(vectorContext, terminalLines[_i], lineRatio, arrowHeight);
                } else {
                    break;
                }
                // 最后一个终端的最后一条轨迹线若播放完成，则整个轨迹播放完成
                if ((i === l - 1) && (_i === _l - 1) && (lineRatio === 1)) {
                    if(this.ontrailend && this.status !== 'finished') {
                        this.ontrailend();
                    }
                    this.status = 'finished';
                }
            }
        }
        // 渲染闪光点(轨迹暂停时，闪光点不会暂停)
        for (let i = 0, l = lines.length; i < l; i++) {
            let ratio;
            const terminalLines = lines[i];
            const elapsed = this.elapsed - i * 2000;
            const lineIdx = Math.floor(elapsed / this.duration);     // 计算轨迹已经到了第几条线，用来确定闪光点的位置
            ratio = (elapsed % this.duration) / this.duration;       // 计算闪光点已渲染的比例
            if (this.isPaused) {
                const _elapsed = event.frameState.time - this.startTime - i * 2000;
                ratio = (_elapsed % this.duration) / this.duration;  // 即使暂停，闪光点仍然继续执行动画
            }
            for (let _i = 0, _l = terminalLines.length; _i < _l; _i++) {
                if (_i === lineIdx) {
                    this.drawPoint(vectorContext, terminalLines[_i], ratio);
                }
            }
        }
        // 触发地图重新渲染
        this.map.render();
    }

    // 渲染单条线的轨迹，箭头
    drawSingleLineAndArrow(vectorContext, line, ratio, arrowHeight) {
        const coords = line.getCoordinates();
        const index = Math.floor((coords.length - 1) * ratio);

        // 渲染单条轨迹线
        const _coords = coords.slice(0, index + 1);
        const _line = new ol.geom.LineString(_coords);
        vectorContext.drawGeometry(_line);

        // 渲染单个箭头
        if (index > 10) {
            const start = coords[index - 1];
            const end = coords[index];
            const arrow = utils.getArrow(start, end, arrowHeight);
            vectorContext.drawGeometry(arrow);
        }
    }

    // 渲染单个闪光点
    drawPoint(vectorContext, line, ratio) {
        const coords = line.getCoordinates();
        const radius = ol.easing.easeOut(ratio) * 25 + 3;
        const opacity = ol.easing.easeOut(1 - ratio);
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
        const point = new ol.geom.Point(coords[coords.length - 1]);
        vectorContext.drawGeometry(point);
    }

    /**
     * 格式化data，按terminalId分组，将gps转化为二维数组
     * @param data {[Object]}
     * @returns {[[[number,number]]]}
     */
    formatData(data) {
        const trailData = {};
        for (let i = 0, l = data.length; i < l; i++) {
            const item = data[i];
            const gps = item['gps'];
            const gpsArr = typeof (gps) === 'string' ? JSON.parse(gps) : gps;
            const terminalId = item['prop_terminalId'];
            const terminalData = trailData[terminalId];
            if (!terminalData) {
                trailData[terminalId] = [gpsArr];
            } else {
                terminalData.push(gpsArr);
            }
        }
        return Object.values(trailData);
    }
}

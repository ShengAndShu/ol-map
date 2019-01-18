import ol from 'openlayers';
import utils from '../common/utils';

/**
 * 地图事件
 */
export default class Events {
    constructor(map, options, eventsHandler) {
        this.map = map;
        this.options = options;
        this.eventsHandler = eventsHandler;
        this.lastClick = null;   // 上一次点击的点
        this.lastZoom = null;    // 缩放前的层级
        this.hoverPoints = [];   // 悬浮选中的点(用数组来解决feature重叠的问题，重叠feature之间移动鼠标不会触发移出事件)
        this.areaOverlay = null; // ol select 事件
    }

    /**
     * 点击地图
     */
    clickEvent(ev) {
        this.areaBtnClick(ev);
        const feature = ev.map.forEachFeatureAtPixel(ev.pixel, point => point);
        if (!feature) {
            return;
        }
        const name = feature.N.name;
        switch (name) {
        case 'point':
            this.pointClick(feature);
            break;
        case 'area':
            break;
        case 'line':
            this.lineClick(feature);
            break;
        }
    }

    /**
     * 点击地图数据点事件
     */
    pointClick(feature) {
        // 如果点击的是上一次点击的同一个点，则不进行操作
        if (this.lastClick && feature.N.aggreGPS === this.lastClick.N.aggreGPS) {
            return;
        }
        const num = feature.N.aggreCount || 1,
            type = feature.N.type,
            type_ope = feature.N.type_ope;
        const style = num === 1 ? utils.setSingleIconStyle(type, type_ope, 'hover') : utils.setJuheIconStyle(num, 'hover');
        feature.setStyle(style);

        if (this.lastClick) {
            const lastClick = this.lastClick,
                count = lastClick.N.aggreCount || 1,
                type_ope = lastClick.N.type_ope;
            lastClick.N.type_ope = (type_ope === 'attention' || type_ope === 'today') ? type_ope : 'operated';
            lastClick.setStyle(count === 1 ? utils.setSingleIconStyle(lastClick.N.type, lastClick.N.type_ope) : utils.setJuheIconStyle(count));
        }
        this.lastClick = feature;
        this.eventsHandler.onpointclick(feature);
    }

    /**
     * area 点击选区按钮事件
     */
    areaBtnClick(ev) {
        let target = ev.originalEvent.target;
        let classList = target.classList;
        if (classList.contains('overlay-btn')) {
            let id = target.parentNode.id;
            let layers = this.map.getLayers().a;
            let currentLayer = {};
            layers.some(layer => {
                if (layer.N.id === id) {
                    currentLayer = layer;
                    return true;
                }
            });
            if (classList.contains('overlay-cancel')) {
                this.map.removeLayer(currentLayer);
                this.map.removeOverlay(currentLayer.btnOverlay);
                this.eventsHandler.onareacancel(currentLayer.gpsData);
            }
            if (classList.contains('overlay-search')) {
                this.eventsHandler.onareasearch(currentLayer.gpsData);
            }
        }
    }

    /**
     * 点击线事件
     */
    lineClick(feature) {
        const coords = feature.getGeometry().getCoordinates();
        const l = coords.length;
        const data = {
            start: ol.proj.toLonLat(coords[0]),
            middle: ol.proj.toLonLat(coords[Math.floor(l / 2)]),
            end: ol.proj.toLonLat(coords[l - 1]),
            feature: feature
        }
        this.eventsHandler.onlineclick(data);
    }

    /**
     * 移动鼠标时，选区的tooltip也跟随移动
     */
    moveEvent(ev) {
        if (this.areaOverlay) {
            this.areaOverlay.setPosition(ev.coordinate);
        }
    }

    /**
     * 关闭点弹框
     * @param pointModal 弹框对象
     */
    closePointModal(pointModal) {
        if (!pointModal) return;
        pointModal.setPosition(undefined);
        if (!this.lastClick) return;

        const num = this.lastClick.N.aggreCount || 1,
            type = this.lastClick.N.type,
            type_ope = this.lastClick.N.type_ope;
        if (num === 1) {
            this.lastClick.N.type_ope = (type_ope === 'attention' || type_ope === 'today') ? type_ope : 'operated';
            this.lastClick.setStyle(utils.setSingleIconStyle(type, this.lastClick.N.type_ope));
        } else {
            this.lastClick.setStyle(utils.setJuheIconStyle(num));
        }
        this.eventsHandler.onmodalclose(this.lastClick);

        this.lastClick = null;
    }

    /**
     * 地图点悬浮事件
     */
    getSelectInteraction() {
        const selectInteraction = new ol.interaction.Select({
            wrapX: false,
            condition: ol.events.condition.pointerMove,
            filter: function (e) {
                const name = e.N.name;
                return name === 'point' || name === 'area' || name === 'line';
            }
        });
        selectInteraction.on('select', (e) => {
            // 移入事件
            if (e.selected.length) {
                const selP = e.selected[0],
                    name = selP.N.name,
                    dataOverlay = selP.dataOverlay;

                // 移除上一个点样式
                if (this.hoverPoints.length) {
                    const P = this.hoverPoints[0],
                        isNotLastClick = !this.lastClick || P.N.pointGPS !== this.lastClick.N.pointGPS;
                    if (isNotLastClick && P.N.name === 'point') {
                        if (!P.N.aggreCount || P.N.aggreCount === 1) {
                            P.setStyle(utils.setSingleIconStyle(P.N.type, P.N.type_ope));
                        } else {
                            P.setStyle(utils.setJuheIconStyle(P.N.aggreCount));
                        }
                    }
                }

                //移除上一个区域弹框, 解决overlay重叠时不触发移出事件的bug
                if (this.areaOverlay) {
                    this.areaOverlay.targetFeature.setStyle(utils.getAreaStyle(this.options.area.type));
                    this.map.removeOverlay(this.areaOverlay);
                }

                // 移入区域
                if (name === 'area' && dataOverlay) {
                    selP.setStyle(utils.getAreaStyle(this.options.area.type, true));
                    this.map.addOverlay(dataOverlay);
                    this.areaOverlay = dataOverlay;
                }

                // 移入点
                if (name === 'point') {
                    const count = selP.N.aggreCount;
                    if (!count || count === 1) {
                        selP.setStyle(utils.setSingleIconStyle(selP.N.type, selP.N.type_ope, 'hover'));
                    } else {
                        selP.setStyle(utils.setJuheIconStyle(count, 'hover'));
                    }
                    this.hoverPoints = [selP];
                }

            } else if (e.deselected.length) {
                // 移出事件
                const deSelP = e.deselected[0],
                    name = deSelP.N.name,
                    dataOverlay = deSelP.dataOverlay;

                // 移出区域
                if (name === 'area' && dataOverlay) {
                    deSelP.setStyle(utils.getAreaStyle(this.options.area.type));
                    this.map.removeOverlay(dataOverlay);
                    this.areaOverlay = null;
                }

                const isNotLastClick = !this.lastClick || deSelP.N.pointGPS !== this.lastClick.N.pointGPS;
                // 移出点
                if (name === 'point' && isNotLastClick) {
                    const count = deSelP.N.aggreCount;
                    if (!count || count === 1) {
                        deSelP.setStyle(utils.setSingleIconStyle(deSelP.N.type, deSelP.N.type_ope));
                    } else {
                        deSelP.setStyle(utils.setJuheIconStyle(count));
                    }
                }
                this.hoverPoints = [];
            }
        });
        return selectInteraction;
    }

    /**
     * 移动缩放事件
     */
    dragAndMove(e, pointModal) {
        if (e.frameState.animate) {
            return false;
        }
        const modalOption = this.options.pointModal;
        const curZoom = this.map.getView().getZoom();
        const lastZoom = this.lastZoom || this.options.zoom;
        // 当前是拖动还是缩放
        const type = lastZoom === curZoom ? 'move' : 'zoom';
        this.lastZoom = curZoom;

        // 自动关闭点详情弹框
        if (pointModal && modalOption) {
            if ((modalOption.autoClose === type) || (modalOption.autoClose === 'all')) {
                this.closePointModal(pointModal);
            }
        }
        this.eventsHandler.onmoveend({ type: type });
    }
}
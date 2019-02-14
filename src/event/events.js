import ol from 'openlayers';
import utils from '../common/utils';

/**
 * 地图事件
 */
 export default class Events {
    constructor(map, options, eventsHandler) {
        this.map = map;          // 地图对象
        this.options = options;  // 配置项
        this.eventsHandler = eventsHandler;
        this.lastClick = null;   // 上一次点击的点或线
        this.lastZoom = null;    // 缩放前的层级
        this.lastHover = null;   // 上一次hover的点或线
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
        const name = feature.get('name');
        // reset lastClick
        const lastP = this.lastClick;
        if (lastP && lastP !== feature) {
            if (name === 'point') {
                const opType = lastP.get('type_ope');
                const newOpType = (opType === 'attention' || opType === 'today') ? opType : 'operated';
                lastP.set('type_ope', newOpType);
            }
            lastP.set('isActive', false);
            lastP.setStyle(utils.styleFunction(lastP));
        }

        feature.set('isActive', true);
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
        if (this.lastClick && feature === this.lastClick) {
            return;
        }
        const num = feature.get('aggreCount') || 1,
        type = feature.get('type'),
        type_ope = feature.get('type_ope');
        const style = num === 1 ? utils.getSingleIconStyle(type, type_ope, 'hover') : utils.getJuheIconStyle(num, 'hover');
        feature.setStyle(style);

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
                if (layer.get('id') === id) {
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
        const start = ol.proj.toLonLat(coords[0]);
        const middle = ol.proj.toLonLat(coords[Math.floor(l / 2)]);
        const end = ol.proj.toLonLat(coords[l - 1]);
        const data = {
            coords: [start, middle, end],
            feature: feature
        };
        this.lastClick = feature;
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

        const lastP = this.lastClick;
        if (!lastP) return;

        if (lastP.get('name') === 'point') {
            const type_ope = lastP.get('type_ope');
            const new_type_poe = (type_ope === 'attention' || type_ope === 'today') ? type_ope : 'operated';
            lastP.set('type_ope', new_type_poe);
        }
        lastP.set('isActive', false);
        lastP.setStyle(utils.styleFunction(lastP));
        this.eventsHandler.onmodalclose(lastP);

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
                const name = e.get('name');
                return name === 'point' || (name === 'area' && e.dataOverlay) || name === 'line';
            }
        });
        selectInteraction.on('select', (e) => {
            // 移入事件
            if (e.selected.length) {
                const selP = e.selected[0],
                name = selP.get('name'),
                dataOverlay = selP.dataOverlay;

                // reset lastHover
                if (this.lastHover && this.lastHover !== this.lastClick) {
                    this.lastHover.set('isActive', false);
                    this.lastHover.setStyle(utils.styleFunction(this.lastHover));
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

                // select point or line
                if (name === 'point' || name === 'line') {
                    selP.set('isActive', true);
                    selP.setStyle(utils.styleFunction(selP, true));
                    this.lastHover = selP;
                }

            } else if (e.deselected.length) {
                // 移出事件
                const deSelP = e.deselected[0],
                name = deSelP.get('name'),
                dataOverlay = deSelP.dataOverlay;

                // 移出区域
                if (name === 'area' && dataOverlay) {
                    deSelP.setStyle(utils.getAreaStyle(this.options.area.type));
                    this.map.removeOverlay(dataOverlay);
                    this.areaOverlay = null;
                }

                const isNotLastClick = !this.lastClick || deSelP !== this.lastClick;
                // reset point or line
                if (isNotLastClick && (name === 'point' || name === 'line') ) {
                    deSelP.set('isActive', false);
                    deSelP.setStyle(utils.styleFunction(deSelP));
                }
                this.lastHover = null;
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
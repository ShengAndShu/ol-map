import ol from 'openlayers';
import utils from '../common/utils';

/**
 * 创建 area 右上角的按钮 overlay
 * @param position  [[number,number],[number,number]]
 * @param index  string
 * @param showCancelBtn   boolean
 * @param showSearchBtn   boolean
 * @returns {ol.Overlay}
 */
const getBtnOverlay = (position, index, showCancelBtn, showSearchBtn) => {
    const div = document.createElement('div');
    div.innerHTML =
        `<span id="${index}" class="overlay-btn-ct">
            <span class="overlay-btn overlay-cancel ${!!showCancelBtn}"  data-id="${index}">X</span>
            <span class="overlay-btn overlay-search ${!!showSearchBtn}"  data-id="${index}">⊙</span>
        </span>`;
    document.body.appendChild(div);

    return new ol.Overlay({
        position: position,
        element: document.getElementById(index),
        autoPan: true,
        positioning: 'top-left',
        offset: [0, -3],
        stopEvent: false
    });
};

/**
 * 创建 area tooltip
 * @param pos  [[number,number],[number,number]]
 * @param index  string
 * @param areaData  object
 * @param overlayType  'normal' | 'bigscreen'
 * @returns {ol.Overlay}
 */
const getInfoOverlay = (pos, index, areaData, overlayType) => {
    let type = overlayType || '';
    type = type.toLowerCase() === 'bigscreen' ? 'bigscreen' : 'normal';
    const div = document.createElement('div');
    div.innerHTML =
        `<div id="${index}" class="ol-${type}-tooltip">
            <div style="margin-top: 10px">Title:  ${areaData.areaName}</div>
            <div style="margin-top: 10px">Description:  ${areaData.areaDetail}</div>
        </div>`;
    document.body.appendChild(div);

    return new ol.Overlay({
        position: pos,
        element: document.getElementById(index),
        autoPan: false,
        positioning: 'top-left',
        offset: [0, -3],
        stopEvent: false
    });
};

/**
 * 获取圆形layer
 * @param options
 * @param geometryData
 * @param index
 * @param areaData
 * @returns {ol.layer.Vector}
 */
const getCircleLayer = (options, geometryData, index, areaData) => {
    let dataOverlay;
    const feature = new ol.Feature({
        name: 'area',
        geometry: new ol.geom.Circle(geometryData.center, geometryData.radius)
    });
    const source = new ol.source.Vector({
        features: [feature],
        wrapX: false
    });
    const areaLayer = new ol.layer.Vector({
        id: index,
        source: source,
        style: function () {
            return utils.getAreaStyle(options.area.type);
        }
    });
    if (areaData) {
        dataOverlay = getInfoOverlay(geometryData.center, index, areaData, options.area.type);
        dataOverlay.setOffset([15, 15]);
        dataOverlay.targetFeature = feature;
    }
    areaLayer.dataOverlay = feature.dataOverlay = dataOverlay;
    return areaLayer;
};

/**
 * 获取多边形layer (包括矩形)
 * @param options
 * @param geometryData  顶点坐标的集合  number[]
 * @param index
 * @param areaData  可选
 * @returns {ol.layer.Vector}
 */
const getLinesLayer = (options, geometryData, index, areaData) => {
    let btnOverlay, dataOverlay;
    const topRight = geometryData[3] || geometryData[0];
    const areaOption = options.area;

    const geojsonObject = {
        'type': 'FeatureCollection',
        'crs': { 'type': 'name', 'properties': { 'name': 'EPSG:3857' } },
        'features': [{
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [geometryData]
            }
        }]
    };
    const features = (new ol.format.GeoJSON()).readFeatures(geojsonObject);
    features.forEach(feature => feature.set('name', 'area'));
    const vectorSource = new ol.source.Vector({
        features: features,
        wrapX: false
    });

    // 若显示取消和搜索按钮，添加overlay
    if (areaOption.showCancelBtn || areaOption.showSearchBtn) {
        btnOverlay = getBtnOverlay(topRight, index, areaOption.showCancelBtn, areaOption.showSearchBtn);
    }
    // 若hover时显示详情框，添加overlay
    if (areaData) {
        dataOverlay = getInfoOverlay(topRight, index, areaData, areaOption.type);
        dataOverlay.setOffset([15, 15]);
        dataOverlay.targetFeature = features[0];
    }

    const areaLayer = new ol.layer.Vector({
        id: index,
        source: vectorSource,
        style: function () {
            return utils.getAreaStyle(areaOption.type);
        }
    });

    areaLayer.dataOverlay = features[0].dataOverlay = dataOverlay;
    areaLayer.btnOverlay = btnOverlay;
    return areaLayer;
};

/**
 * 创建选区图层
 * @param options
 * @param geometryData  图形数据
 * @param index    string
 * @param areaData object  可选(手动画区后的展示不传此项)
 * @returns {ol.layer.Vector}
 */
const getAreaLayer = (options, geometryData, index, areaData) => {
    let layer;
    // 圆形
    if (geometryData.radius) {
        layer = getCircleLayer(options, geometryData, index, areaData);
        layer.featureType = 'circle';
    } else {
        layer = getLinesLayer(options, geometryData, index, areaData);
        layer.featureType = 'polygon';
    }
    return layer;
};
export default getAreaLayer;
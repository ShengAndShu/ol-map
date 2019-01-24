import ol from 'openlayers';
import utils from '../common/utils';
/**
 * 点图层
 * @param options
 * @returns {ol.layer.Vector}
 */
const getPointLayer = (options) => {
    const pointFeatures = [];
    const data = options.data;
    const len = data.length;
    for (let i = 0; i < len; i++) {
        const item = data[i];
        let GPS = (item.aggreCount > 1 || !item.gps) ? item.gpsPosition : item.gps;
        GPS = typeof(GPS) === 'string' ? JSON.parse(GPS) : GPS;
        if (GPS[0] < -180 || GPS[0] > 180 || GPS[1] < -90 || GPS[1] > 90) {
            continue;
        }
        const feature = new ol.Feature({
            name: 'point',
            id: item.prop_crId || item.id, // 话单id
            aggreGPS: GPS, //原始的坐标
            aggreCount: item.aggreCount,
            type: item.prop_dataType,
            type_ope: item.type,
            pointGPS: ol.proj.fromLonLat(GPS),
            geometry: new ol.geom.Point(ol.proj.fromLonLat(GPS))
        });
        feature.setStyle(utils.styleFunction(feature));
        pointFeatures.push(feature);
    }

    const source = new ol.source.Vector({
        features: pointFeatures,
        wrapX: false
    });

    return new ol.layer.Vector({
        source: source,
        wrapX: false,
        zIndex: 9
    });
};

export default getPointLayer;
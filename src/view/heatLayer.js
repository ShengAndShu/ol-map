import ol from 'openlayers';
/**
 * 创建热力图图层
 * @param data
 * @returns {ol.layer.Heatmap}
 */
const getHeatLayer = (data) => {
    const gpsData = data.map(d => {
        const gps = (d.aggreCount > 1 || !d.gps) ? d.gpsPosition : d.gps;
        return typeof(gps) === 'string' ? JSON.parse(gps) : gps;
    }).filter(d => d[0] > -180 && d[0] < 180 && d[1] > -90 && d[1] < 90);
    const heatFeatures = [];
    for (let i = 0, len = data.length; i < len; i++) {
        heatFeatures.push(new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat(gpsData[i])),
            name: 'heatPoint',
            weight: 0.1 + data[i].aggreCount / data[0].aggreCount * 0.9
        }));
    }

    const source = new ol.source.Vector({
        wrapX: false,
        features: heatFeatures
    });

    return new ol.layer.Heatmap({
        source: source,
        blur: 15,
        radius: 18
    });
};
export default getHeatLayer;
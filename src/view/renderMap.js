import ol from 'openlayers';
/**
 * 创建地图对象
 * @param domId
 * @param opts
 * @returns {ol.Map}
 */
const getMap = (domId, opts) => {
    const params = {
        LAYERS: opts.tileLayer,
        tiled: true,
        SRS: 'EPSG:3857',
        TRANSPARENT: false
    };
    const rasterLayer = new ol.layer.Tile({
        visiable: true,
        source: new ol.source.TileWMS({
            url: opts.mapUrl,
            params: params,
            wrapX: false
        })
    });
    const OSMLayer = new ol.layer.Tile({
        source: new ol.source.OSM({wrapX: false})
    });
    const mapCenter = opts.mapCenter || [97.03125, 29.362721750200926];
    return new ol.Map({
        layers: [opts.useOSM ? OSMLayer : rasterLayer],
        target: domId,
        view: new ol.View({
            center: ol.proj.fromLonLat(mapCenter),
            zoom: opts.zoom || 3,
            minZoom: opts.minZoom || 3,
            maxZoom: opts.maxZoom || 20,
            extent: [-20037508.34, -20037508.34, 20037508.34, 20037508.34]
        }),
        controls: ol.control.defaults({
            attributionOptions: {
                collapsible: true
            },
            attribution: false
        })
    });
};
export default getMap;
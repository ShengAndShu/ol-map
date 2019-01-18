import ol from 'openlayers';
import getAreaLayer from '../view/areaLayer';
import utils from '../common/utils';

let areaLayer,
    drawNum = 0;

/**
 * 创建矩形 draw 时需要定义geometryFunction
 * @param coordinates
 * @param geometry
 * @returns {*}
 */
function geometryFunction(coordinates, geometry) {
    if (!geometry) {
        geometry = new ol.geom.Polygon(null);
    }
    let minX = Math.min(coordinates[0][0], coordinates[1][0]),
        maxX = Math.max(coordinates[0][0], coordinates[1][0]),
        minY = Math.min(coordinates[0][1], coordinates[1][1]),
        maxY = Math.max(coordinates[0][1], coordinates[1][1]);
    // 设置左上角为第一个点
    geometry.setCoordinates([
        [[minX, maxY], [minX, minY], [maxX, minY], [maxX, maxY], [minX, maxY]]
    ]);
    return geometry;
}

/**
 * 获取 draw 出的图形的顶点坐标集合
 * @param feature
 * @returns [] | {}
 */
function getGeomData(feature) {
    const geometry = feature.getGeometry();
    // 圆形
    if (geometry.getType() === 'Circle') {
        const center = geometry.getCenter(),
            radius = geometry.getRadius();
        return { center: center, radius: radius };
    } else {
        return geometry.getCoordinates()[0];
    }
}

/**
 * 创建 Draw 对象
 * @param type
 * @param options
 * @param map
 * @param eventsHandler
 * @returns {ol.interaction.Draw}
 */
const getDraw = (type, options, map, eventsHandler) => {
    const drawOption = options.draw;
    let draw;

    if (!drawOption.showMultiArea && areaLayer) {
        map.removeLayer(areaLayer);
        areaLayer.btnOverlay && map.removeOverlay(areaLayer.btnOverlay);
    }

    switch (type) {
    case 'circle':
        draw = new ol.interaction.Draw({ type: 'Circle' });
        break;
    case 'polygon':
        draw = new ol.interaction.Draw({ type: 'Polygon' });
        break;
    default:
        draw = new ol.interaction.Draw({
            type: ('LineString'),
            geometryFunction: geometryFunction,
            maxPoints: 2
        });
        break;
    }
    draw.type = type;

    draw.on('drawstart', () => {
        eventsHandler.ondrawstart();
    });
    draw.on('drawend', (ev) => {
        let emitData;         // ondrawend 事件的参数
        const geometryData = getGeomData(ev.feature);     // 图形的数据
        draw.isDrawing = false;
        map.removeInteraction(draw);

        if (type === 'box') {
            // 左上角和右下角坐标
            emitData = [utils.toGps(geometryData[0]), utils.toGps(geometryData[2])];
        } else if (type === 'circle') {
            // 中心点和半径（单位千米）
            emitData = {
                center: utils.toGps(geometryData.center),
                radius: geometryData.radius / 1000
            }
        } else {
            // 所有坐标
            emitData = geometryData.map(coordinate => utils.toGps(coordinate));
        }

        eventsHandler.ondrawend(emitData);

        // 框选完成后是否显示选框
        if (drawOption.showArea) {
            areaLayer = getAreaLayer(options, geometryData, 'draw' + drawNum);
            areaLayer.gpsData = emitData;
            map.addLayer(areaLayer);
            if (areaLayer.btnOverlay) {
                map.addOverlay(areaLayer.btnOverlay);
            }
            drawNum++;
        }
    });
    return draw;
};
export default getDraw;
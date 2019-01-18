import ol from 'openlayers';

// 创建地图点弹框覆盖物
const getPointModal = (domId, options) => {
    const id = domId || 'popup';
    return new ol.Overlay({
        element: document.getElementById(id),
        autoPan: options.pointModal.autoPan,
        autoPanAnimation: {
            duration: 250
        },
        offset: [0, 0]
    });
};
export default getPointModal;
export default (lat1, lng1, lat2, lng2) => {
    const p = Math.PI / 180;
    const cos = Math.cos;
    const a = 0.5 - cos((lat2 - lat1) * p) / 2 +
        cos(lat1 * p) * cos(lat2 * p) *
        (1 - cos((lng2 - lng1) * p)) / 2;

    return 12742 * Math.asin(Math.sqrt(a));
};
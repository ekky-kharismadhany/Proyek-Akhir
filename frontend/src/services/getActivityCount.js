export default function getActivityCount(obj, isBenignIncluded) {
    let values = Object.values(obj);
    let sum = 0;
    if (isBenignIncluded) {
        for (let index = 0; index < values.length; index++) {
            sum += values[index];
        }
        return sum;
    } else {
        for (let index = 0; index < values.length; index++) {
            sum += values[index];
        }
        return sum - Number(obj.Benign);
    }
}
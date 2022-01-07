export function getActivityCount(obj, isBenignIncluded) {
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

export function getColumn() {
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },   
        {
            field: 'Name',
            headerName: 'Activity Name',
            width: 150,
            editable: true,
        },
        {
            field: 'Count',
            headerName: 'Count',
            width: 150,
            editable: true,
        },
    ];
    return columns;
}
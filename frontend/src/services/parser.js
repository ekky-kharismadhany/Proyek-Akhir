export default function parser(obj) {
    let keys = Object.keys(obj);
    let values = Object.values(obj);
    const rows = [
        { id: 1, Name: keys[0], Count: values[0] },
        { id: 2, Name: keys[1], Count: values[1] },
        { id: 3, Name: keys[2], Count: values[2] },
        { id: 4, Name: keys[3], Count: values[3] },
        { id: 5, Name: keys[4], Count: values[4] },
        { id: 6, Name: keys[5], Count: values[5] },
        { id: 7, Name: keys[6], Count: values[6] },
        { id: 8, Name: keys[7], Count: values[7] },
        { id: 9, Name: keys[8], Count: values[8] },
        { id: 10, Name: keys[9], Count: values[9] },
        { id: 11, Name: keys[10], Count: values[10] },
    ];

    return rows;
}
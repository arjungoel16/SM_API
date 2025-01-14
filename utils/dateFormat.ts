import { Timestamp } from "mongodb";

const addDate = (date) => {
    let dateSTR = date.string();


const lChar  = dateSTR [dateSTR.length - 1];

if (lChar ==='1' && dateSTR !== '11') {
    return `${dateSTR}st`;
} else if (lChar === '2' && dateSTR !== '12') {
    return `${dateSTR}nd`;
} else if (lChar === '3' && dateSTR !== '13') {
    return `${dateSTR}rd`;
} else {
    return `${dateSTR}th`;
}

module.exports = (
    timestamp,
    { monthLength = 'short', dateSuffix = true } = {}
) => {
    const date = new Date(timestamp);
    const months = {
        short: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ],
        long: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ]
    };
    const month = months[monthLength][date.getMonth()];
    const day = dateSuffix
        ? addDate(date.getDate())
        : date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
}
const formatDate = (timestamp) => {
    return dateSTR(timestamp, { dateSuffix: true });
}
};



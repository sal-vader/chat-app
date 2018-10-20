let generateMessage = (from, text) => {
    return {
        from,
        text,
        createdDate: new Date().getTime()
    };
};

let generateLocationMessage = (from, latitude, longitude) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdDate: new Date().getTime()
    };
};

module.exports = {generateMessage, generateLocationMessage};
let generateMessage = (from, text) => {
    return {
        from,
        text,
        createdDate: new Date().getTime()
    };
};

module.exports = {generateMessage};
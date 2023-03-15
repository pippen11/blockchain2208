const initialState = {
    mainCg: [
        {
            idx: 0,
            name: 'board',
            subCg: [{idx: 0, name: 'notice'}, {idx: 1, name: 'freeboard'}]
        }
    ]
}

const ADD = 'CATEGORY/ADD'

const category = (state=initialState, action) => {
    // console.log(action)
    return state
}

module.exports = category;
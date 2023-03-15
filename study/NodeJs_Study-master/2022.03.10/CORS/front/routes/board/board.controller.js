const list = (req, res)=>{
    res.render('board_list.html')
}

const view = (req, res)=>{
    res.render('board_view.html')
}

const modify = (req, res)=>{
    res.render('board_modify.html')
}

const write = (req, res)=>{
    res.render('board_write.html')
}


module.exports = {
    list,
    view,
    modify,
    write
}
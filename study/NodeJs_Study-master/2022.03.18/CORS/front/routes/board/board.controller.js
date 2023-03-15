exports.list = (req,res)=>{
    res.render('board_list')
}

exports.view = (req,res)=>{
    res.render('board_view')
}

exports.modify = (req,res)=>{
    res.render('board_modify')
}

exports.write = (req,res)=>{
    res.render('board_write')
}
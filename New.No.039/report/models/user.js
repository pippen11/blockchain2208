




static associate(db){
    db.User.hasMany(db.chat,{
        foreignKey:"user_id",
        sourceKey:"id",
        as:"chats",
    })
};


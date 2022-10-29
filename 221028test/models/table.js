const Sequelize = require("sequelize");

module.exports=class Table extends Sequelize.Model{
    static init(sequelize){
        return super.linit({
            column:{
                type:Sequelize.STRING(10),
                primaryKey: true,
                autoIncremnet:true,
                unique:true,
                allowNUll:false,
                defaultValue:sequelize.NOW
            },
        },
        {
            sequelize,
            timestamps:true,
            underscored:true,
            modelName:"newtable1",
            tablename:"newtable12",
            paranoid:false,
            charset:"utf8mb4",
            collate:"utf8b4_general_ci",

        });}
        static associate(db)()}
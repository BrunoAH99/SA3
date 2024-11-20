import sequelize from '../database.js'
import { DataTypes } from 'sequelize'

const RELATORIO = sequelize.define('relatorio', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    idFuncionario: {
        type: DataTypes.STRING    
    },
    nomeFuncionario: {
        type: DataTypes.STRING
    },
    idEpi: {
        type: DataTypes.STRING    
    },
    nomeEpi:{
        type: DataTypes.STRING
    },
    quantidade:{
        type: DataTypes.INTEGER
    },
    data:{
        type: DataTypes.DATE
    },
    status:{
        type: DataTypes.STRING
    }
}, {
    createdAt: false, updatedAt: false, tableName: 'relatorio'
})

RELATORIO.sync()
// RELATORIO.sync({ force: true })

export { RELATORIO }
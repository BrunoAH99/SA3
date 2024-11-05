import sequelize from '../database.js'
import { DataTypes } from 'sequelize'

const EPI = sequelize.define('epis', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING    
    },
    quantidade:{
        type: DataTypes.INTEGER
    }
}, {
    createdAt: false, updatedAt: false, tableName: 'epis'
})

// Verificar se existe a tabela, se não existir vai criar
EPI.sync()

export { EPI }
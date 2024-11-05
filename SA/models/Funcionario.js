import sequelize from '../database.js'
import { DataTypes } from 'sequelize'

const FUNCIONARIO = sequelize.define('funcionario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING    
    },
    senha: {
        type: DataTypes.STRING    
    },
    email:{
        type: DataTypes.STRING
    },
    telefone: {
        type: DataTypes.STRING 
    },
    setor: {
        type: DataTypes.STRING    
    },
    nivel: {
        type: DataTypes.INTEGER,
        defaultValue: 1 
    },
}, {
    createdAt: false, updatedAt: false, tableName: 'funcionario'
})

FUNCIONARIO.sync()

export { FUNCIONARIO }
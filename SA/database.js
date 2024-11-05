import { Sequelize } from 'sequelize'

const conexao = new Sequelize('postgresql://bruno:SLNpRLsX8QM1RurgJlPaSQ@sleek-elk-1686.jxf.gcp-southamerica-east1.cockroachlabs.cloud:26257/epis?sslmode=verify-full')

try {
    await conexao.authenticate()
    console.log('Banco conectado com sucesso')
} catch (error) {
    console.error('Erro ao conectar', error)
}

export default conexao

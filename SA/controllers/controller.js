
import { EPI } from "../models/EPI.js"
import { FUNCIONARIO } from "../models/Funcionario.js"
import { RELATORIO } from "../models/Relatorio.js"
import bcrypt from 'bcrypt'

const cadastrarEPI = async (req, res) => {
    try {
        const { nome, quantidade } = req.body
        if (!nome || !quantidade) {
            return res.status(404).send({ mensagem: 'Favor informar nome e quantidade' })
        }

        const epi = await EPI.create({ nome, quantidade })

        res.status(201).send({ mensagem: 'EPI cadastrado com sucesso!', epi })

    } catch (erro) {
        console.log(erro)
        res.status(500).send({ mensagem: 'Erro interno' })
    }
}

const cadastrarFuncionario = async (req, res) => {
    try {
        const { nome, email, senha, setor, telefone } = req.body
        if (!nome || !email || !senha || !setor || !telefone) {
            return res.status(404).send({ mensagem: 'Favor informar todos os campos necessários' })
        }

        // Hash da senha antes de salvar no banco
        const hashedPassword = await bcrypt.hash(senha, 10)

        const funcionario = await FUNCIONARIO.create({ nome, email, senha: hashedPassword, setor, telefone })

        res.status(201).send({ mensagem: 'Funcionário cadastrado com sucesso!', funcionario });
    } catch (erro) {
        console.log(erro);
        res.status(500).send({ mensagem: 'Erro interno' });
    }
}

const login = async (req, res) => {
    try {
        const { email, senha } = req.body

        const funcionario = await FUNCIONARIO.findOne({ where: { email } })

        if (!funcionario) {
            return res.status(404).send({ success: false, mensagem: 'Funcionário não encontrado.' })
        }

        const senhaCorreta = await bcrypt.compare(senha, funcionario.senha)
        if (!senhaCorreta) {
            return res.status(401).send({ success: false, mensagem: 'Senha incorreta.' })
        }

        res.send({
            success: true,
            funcionario: {
                id: funcionario.id,
                nome: funcionario.nome,
                email: funcionario.email
            }
        })
    } catch (erro) {
        console.log(erro)
        res.status(500).send({ mensagem: 'Erro interno' })
    }
}

const validarSenha = async (req, res) => {
    try {
        const id = req.params.id
        const { senha } = req.body

        const funcionario = await FUNCIONARIO.findOne({ where: { id } })

        if (!funcionario) {
            return res.status(404).send({ valido: false, mensagem: 'Funcionário não encontrado.' })
        }

        const senhaCorreta = await bcrypt.compare(senha, funcionario.senha)
        res.send({ valido: senhaCorreta })
    } catch (erro) {
        console.log(erro)
        res.status(500).send({ mensagem: 'Erro interno' })
    }
}

const relatorio = async (req, res) => {
    try {
        const { idFuncionario, nomeFuncionario, idEpi, nomeEpi, quantidade, data, status } = req.body

        await RELATORIO.create({ idFuncionario, nomeFuncionario, idEpi, nomeEpi, quantidade, data, status })

        res.status(201).send("adicionado")

    } catch (erro) {
        console.log(erro)
        res.status(500).send({ mensagem: 'Erro interno' })
    }
}

const listaRelatorio = async (req, res) => {
    try {
        const lista_relatorio = await RELATORIO.findAll()
        res.status(200).send(lista_relatorio)
    } catch (erro) {
        res.status(500).send({ mensagem: 'Erro ao exibir relatório' })
    }
}

const listaRelatorioFuncionario = async (req, res) => {
    const { id } = req.params

    try {
        const lista_relatorio = await RELATORIO.findAll({
            where: { idFuncionario: id }
        })

        if (lista_relatorio.length === 0) {
            return res.status(204).send({ mensagem: 'Nenhum relatório encontrado para este funcionário.' })
        }

        res.status(200).send(lista_relatorio)
        console.log(lista_relatorio)
    } catch (erro) {
        console.error('Erro ao buscar relatórios:', erro)
        res.status(500).send({ mensagem: 'Erro ao exibir relatórios. Tente novamente mais tarde.' })
    }
}



const funcionarios = async (req, res) => {
    try {
        const listaFuncionarios = await FUNCIONARIO.findAll()
        res.status(200).send(listaFuncionarios)
    } catch (erro) {
        res.status(500).send({ mensagem: 'Erro ao buscar funcionários' })
    }
}

const funcionario = async (req, res) => {
    const { id } = req.params
    try {
        const funcionarioEncontrado = await FUNCIONARIO.findByPk(id)
        if (!funcionarioEncontrado) {
            return res.status(404).send({ mensagem: 'Funcionário não encontrado' })
        }
        res.status(200).send(funcionarioEncontrado)
    } catch (erro) {
        console.error(erro)
        res.status(500).send({ mensagem: 'Erro ao buscar funcionário' })
    }
}

const epi = async (req, res) => {
    const { id } = req.params
    try {
        const epiEncontrado = await EPI.findByPk(id)
        if (!epiEncontrado) {
            return res.status(404).send({ mensagem: 'EPI não encontrado' })
        }
        res.status(200).send(epiEncontrado)
    } catch (erro) {
        console.error(erro)
        res.status(500).send({ mensagem: 'Erro ao buscar EPI' })
    }
}


const epis = async (req, res) => {
    try {
        const listaEPIs = await EPI.findAll()
        res.status(200).send(listaEPIs)
    } catch (erro) {
        res.status(500).send({ mensagem: 'Erro ao buscar funcionários' })
    }
}

const atualizarFuncionario = async (req, res) => {
    try {
        const id = req.params.id
        const { nome, senha, email, telefone, setor } = req.body
        const atualizar = await FUNCIONARIO.update({ nome, senha, email, telefone, setor }, { where: { id } })
        res.status(200).send({ mensagem: "Cadastro de funcionario atualizado" })
    } catch (erro) {
        console.log(erro)
        res.status(500).send({ mensagem: 'Erro interno' })
    }
}

const apagarFuncionario = async (req, res) => {
    try {
        const id = req.params.id
        const { senha } = req.body // Recebe a senha do corpo da requisição

        const admFuncionario = await FUNCIONARIO.findOne({ where: { nivel: 2 } })

        // Verifique se a senha fornecida é igual à senha do administrador
        const senhaCorreta = await bcrypt.compare(senha, admFuncionario.senha)
        if (!senhaCorreta) {
            return res.status(401).send({ mensagem: 'Senha incorreta. Exclusão não realizada.' })
        }

        // Tente encontrar o funcionário a ser excluído
        const funcionario = await FUNCIONARIO.findOne({ where: { id } })
        if (!funcionario) {
            return res.status(404).send({ mensagem: 'Funcionário não encontrado.' })
        }

        // Se a senha estiver correta, proceder com a exclusão
        await FUNCIONARIO.destroy({ where: { id } })
        res.status(200).send({ mensagem: 'Cadastro de funcionário apagado com sucesso' })
    } catch (erro) {
        console.log(erro)
        res.status(500).send({ mensagem: 'Erro interno' })
    }
}

const atualizarEpi = async (req, res) => {

    try {
        const id = req.params.id
        const { nome, quantidade } = req.body
        const atualizar = await EPI.update({ nome, quantidade }, { where: { id } })
        res.status(200).send({ mensagem: "EPI atualizado", atualizar })
    } catch (erro) {
        console.log(erro)
        res.status(500).send({ mensagem: 'Erro interno' })
    }
}

const apagarEpi = async (req, res) => {

    try {
        const id = req.params.id
        const { senha } = req.body

        const admFuncionario = await FUNCIONARIO.findOne({ where: { nivel: 2 } })

        const senhaCorreta = await bcrypt.compare(senha, admFuncionario.senha)
        if (!senhaCorreta) {
            return res.status(401).send({ mensagem: 'Senha incorreta. Exclusão não realizada.' })
        }

        const funcionario = await EPI.findOne({ where: { id } })
        if (!funcionario) {
            return res.status(404).send({ mensagem: 'EPI não encontrado.' })
        }

        await EPI.destroy({ where: { id } })
        res.status(200).send({ mensagem: 'EPI apagado com sucesso' })
    } catch (erro) {
        console.log(erro)
        res.status(500).send({ mensagem: 'Erro interno' })
    }
}

export { cadastrarEPI, cadastrarFuncionario, login, funcionarios, funcionario, validarSenha, relatorio, listaRelatorio, listaRelatorioFuncionario, epis, epi, atualizarFuncionario, apagarFuncionario, atualizarEpi, apagarEpi }
import { readFile, writeFile } from 'fs/promises'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DB_PATH = join(__dirname, '../data/db.json')

async function readDB() {
  const raw = await readFile(DB_PATH, 'utf-8')
  return JSON.parse(raw)
}

async function writeDB(data) {
  await writeFile(DB_PATH, JSON.stringify(data, null, 2))
}

function dataHoje() {
  const d = new Date()
  const dia = String(d.getDate()).padStart(2, '0')
  const mes = String(d.getMonth() + 1).padStart(2, '0')
  return `${dia}/${mes}/${d.getFullYear()}`
}

export async function getUsuario(req, res) {
  try {
    const db = await readDB()
    res.json(db.usuario)
  } catch (e) {
    res.status(500).json({ erro: 'Erro ao ler dados' })
  }
}

export async function getRanking(req, res) {
  try {
    const db = await readDB()
    res.json({ usuarios: db.usuarios, equipes: db.equipes })
  } catch (e) {
    res.status(500).json({ erro: 'Erro ao ler dados' })
  }
}

export async function getMissoes(req, res) {
  try {
    const db = await readDB()
    res.json(db.missoes)
  } catch (e) {
    res.status(500).json({ erro: 'Erro ao ler dados' })
  }
}

export async function getRecompensas(req, res) {
  try {
    const db = await readDB()
    res.json(db.recompensas)
  } catch (e) {
    res.status(500).json({ erro: 'Erro ao ler dados' })
  }
}

export async function resgatarRecompensa(req, res) {
  try {
    const id = Number(req.params.id)
    const db = await readDB()

    const recompensa = db.recompensas.find(r => r.id === id)
    if (!recompensa) {
      return res.status(404).json({ erro: 'Recompensa não encontrada' })
    }
    if (db.usuario.carepoints < recompensa.custo) {
      return res.status(400).json({ erro: 'Saldo insuficiente' })
    }

    db.usuario.carepoints -= recompensa.custo
    db.carepoints.saldo -= recompensa.custo

    const novoId = db.historico.length > 0
      ? Math.max(...db.historico.map(h => h.id)) + 1
      : 1

    db.historico.unshift({
      id: novoId,
      data: dataHoje(),
      atividade: `RESGATE: ${recompensa.nome.toUpperCase()}`,
      pontos: -recompensa.custo,
      tipo: 'debito',
    })

    const idxLogado = db.usuarios.findIndex(u => u.userId === 'usr_logado')
    if (idxLogado !== -1) {
      db.usuarios[idxLogado].carepoints = db.usuario.carepoints
    }

    await writeDB(db)
    res.json({ saldo: db.usuario.carepoints, historico: db.historico })
  } catch (e) {
    res.status(500).json({ erro: 'Erro ao processar resgate' })
  }
}

export async function getCarepoints(req, res) {
  try {
    const db = await readDB()
    res.json({ ...db.carepoints, historico: db.historico })
  } catch (e) {
    res.status(500).json({ erro: 'Erro ao ler dados' })
  }
}

export async function getConquistas(req, res) {
  try {
    const db = await readDB()
    res.json(db.conquistas)
  } catch (e) {
    res.status(500).json({ erro: 'Erro ao ler dados' })
  }
}

export async function updateDestaque(req, res) {
  try {
    const { destaque } = req.body
    if (!destaque) return res.status(400).json({ erro: 'Destaque obrigatório' })

    const db = await readDB()
    db.conquistas.destaqueAtual = destaque
    await writeDB(db)
    res.json({ destaqueAtual: db.conquistas.destaqueAtual })
  } catch (e) {
    res.status(500).json({ erro: 'Erro ao salvar destaque' })
  }
}

export async function getCaremoodPerguntas(req, res) {
  try {
    const db = await readDB()
    res.json(db.caremood.perguntas)
  } catch (e) {
    res.status(500).json({ erro: 'Erro ao ler dados' })
  }
}

export async function getAdmin(req, res) {
  try {
    const db = await readDB()
    res.json(db.admin)
  } catch (e) {
    res.status(500).json({ erro: 'Erro ao ler dados' })
  }
}

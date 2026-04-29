import { fetchRanking } from '../../../services/api'

const formatadores = {
  pontos: v => v.toLocaleString('pt-BR'),
  nivel:  v => `Nível ${v}`,
  streak: v => `${v} ${v === 1 ? 'dia' : 'dias'}`,
  equipe: v => v.toLocaleString('pt-BR'),
}

const MEDALHAS = ['🥇', '🥈', '🥉']

const CHAVE_MAP = {
  pontos: 'carepoints',
  nivel:  'nivel',
  streak: 'streak',
}

export async function getRanking(aba = 'nivel', usuarioId = null) {
  const { usuarios, equipes } = await fetchRanking()
  const fmt = formatadores[aba] ?? formatadores.pontos

  if (aba === 'equipe') {
    const ordenadas = [...equipes].sort((a, b) => b.carepoints - a.carepoints)

    const top3 = ordenadas.slice(0, 3).map((eq, i) => ({
      equipeId: eq.equipeId,
      nome:     eq.nome,
      valor:    fmt(eq.carepoints),
      medalha:  MEDALHAS[i],
      posicao:  i + 1,
      avatar:   'emoji',
      emoji:    eq.emoji,
    }))

    const lista = ordenadas.slice(3).map((eq, i) => ({
      pos:      i + 4,
      equipeId: eq.equipeId,
      nome:     eq.nome,
      valor:    fmt(eq.carepoints),
    }))

    const usuario     = usuarios.find(u => u.userId === usuarioId)
    const minhaEquipe = usuario ? ordenadas.find(eq => eq.equipeId === usuario.equipeId) : null
    const posEquipe   = minhaEquipe ? ordenadas.indexOf(minhaEquipe) + 1 : null
    const equipeInfo  = equipes.find(eq => eq.equipeId === usuario?.equipeId)

    const voce = minhaEquipe ? {
      pos:   posEquipe,
      nome:  `Sua Equipe (${equipeInfo?.nome ?? '—'})`,
      valor: fmt(minhaEquipe.carepoints),
    } : null

    return { podio: top3, lista, voce }
  }

  const chave = CHAVE_MAP[aba] ?? 'carepoints'

  const todosOrdenados = [...usuarios].sort((a, b) => b[chave] - a[chave])
  const semEuOrdenados = todosOrdenados.filter(u => u.userId !== usuarioId)

  const top3 = semEuOrdenados.slice(0, 3).map((u, i) => ({
    userId:  u.userId,
    nome:    u.nome,
    valor:   fmt(u[chave]),
    medalha: MEDALHAS[i],
    posicao: i + 1,
    avatar:  'letra',
    letra:   u.nome.charAt(0),
  }))

  const lista = semEuOrdenados.slice(3).map((u, i) => ({
    pos:    i + 4,
    userId: u.userId,
    nome:   u.nome,
    valor:  fmt(u[chave]),
  }))

  const posEu = todosOrdenados.findIndex(u => u.userId === usuarioId) + 1
  const eu    = usuarios.find(u => u.userId === usuarioId)

  const voce = eu ? {
    pos:    posEu || todosOrdenados.length,
    userId: eu.userId,
    nome:   'Você',
    valor:  fmt(eu[chave]),
  } : null

  return { podio: top3, lista, voce }
}

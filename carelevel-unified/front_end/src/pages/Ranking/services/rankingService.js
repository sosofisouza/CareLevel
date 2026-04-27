import data from '../data/ranking.json'

const formatadores = {
  pontos: v => v.toLocaleString('pt-BR'),
  nivel:  v => `Nível ${v}`,
  streak: v => `${v} ${v === 1 ? 'dia' : 'dias'}`,
  equipe: v => v.toLocaleString('pt-BR'),
}

const MEDALHAS = ['🥇', '🥈', '🥉']

export async function getRanking(aba = 'nivel', usuarioId = null) {
  const fmt = formatadores[aba] ?? formatadores.pontos

  
  if (aba === 'equipe') {
    const ordenadas = [...data.equipes].sort((a, b) => b.pontos - a.pontos)

    const top3 = ordenadas.slice(0, 3).map((eq, i) => ({
      equipeId: eq.equipeId,
      nome:     eq.nome,
      valor:    fmt(eq.pontos),
      medalha:  MEDALHAS[i],
      posicao:  i + 1,
      avatar:   'emoji',
      emoji:    eq.emoji,
    }))

    const lista = ordenadas.slice(3).map((eq, i) => ({
      pos:      i + 4,
      equipeId: eq.equipeId,
      nome:     eq.nome,
      valor:    fmt(eq.pontos),
    }))

    const usuario     = data.usuarios.find(u => u.userId === usuarioId)
    const minhaEquipe = usuario ? ordenadas.find(eq => eq.equipeId === usuario.equipeId) : null
    const posEquipe   = minhaEquipe ? ordenadas.indexOf(minhaEquipe) + 1 : null
    const equipeInfo  = data.equipes.find(eq => eq.equipeId === usuario?.equipeId)

    const voce = minhaEquipe ? {
      pos:   posEquipe,
      nome:  `Sua Equipe (${equipeInfo?.nome ?? '—'})`,
      valor: fmt(minhaEquipe.pontos),
    } : null

    return { podio: top3, lista, voce }
  }

  
  const chave = aba === 'pontos' ? 'pontos' : aba === 'nivel' ? 'nivel' : 'streak'

  const todosOrdenados = [...data.usuarios].sort((a, b) => b[chave] - a[chave])
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
  const eu    = data.usuarios.find(u => u.userId === usuarioId)

  const voce = eu ? {
    pos:    posEu || todosOrdenados.length,
    userId: eu.userId,
    nome:   'Você',
    valor:  fmt(eu[chave]),
  } : null

  return { podio: top3, lista, voce }
}

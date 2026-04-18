/**
 * services/rankingService.js
 * SERVIÇO DE RANKING — retorna dados mock por aba.
 *
 * @param {string} aba — 'pontos' | 'nivel' | 'streak' | 'equipe'
 */

const mockDados = {
  pontos: {
    podio: [
      { nome: 'Maicon K.', valor: '15.000', medalha: '🥈', avatar: 'letra', letra: 'M' },
      { nome: 'Lina M.',   valor: '15.000', medalha: '🥇', avatar: 'letra', letra: 'L' },
      { nome: 'Lana J.',   valor: '15.000', medalha: '🥉', avatar: 'letra', letra: 'L' },
    ],
    lista: [
      { pos: 4, nome: 'Arthur Costa',      valor: '10.000' },
      { pos: 5, nome: 'Linus Torvalds',    valor: '10.000' },
      { pos: 6, nome: 'Giovanna Bezerra',  valor: '10.000' },
      { pos: 7, nome: 'Eduarda Costa',     valor: '10.000' },
      { pos: 8, nome: 'Deyverson Sanches', valor: '10.000' },
    ],
    voce: { pos: 99, nome: 'Você', valor: '10.000' },
  },

  nivel: {
    podio: [
      { nome: 'Walter S.',  valor: 'Nível 33', medalha: '🥈', avatar: 'letra', letra: 'W' },
      { nome: 'Heloisa F.', valor: 'Nível 40', medalha: '🥇', avatar: 'letra', letra: 'H' },
      { nome: 'Ana B.',     valor: 'Nível 32', medalha: '🥉', avatar: 'letra', letra: 'A' },
    ],
    lista: [
      { pos: 4, nome: 'Felix Kjellberg',   valor: 'Nível 30' },
      { pos: 5, nome: 'Gabriel Toledo',    valor: 'Nível 28' },
      { pos: 6, nome: 'Beatrice Laus',     valor: 'Nível 27' },
      { pos: 7, nome: 'Giuseppe Roncalli', valor: 'Nível 25' },
      { pos: 8, nome: 'Lucas Marques',     valor: 'Nível 20' },
    ],
    voce: { pos: 99, nome: 'Você', valor: 'Nível 10' },
  },

  streak: {
    podio: [
      { nome: 'Theo S.',  valor: '35 dias', medalha: '🥈', avatar: 'letra', letra: 'T' },
      { nome: 'Ana B.',   valor: '40 dias', medalha: '🥇', avatar: 'letra', letra: 'A' },
      { nome: 'Denis B.', valor: '29 dias', medalha: '🥉', avatar: 'letra', letra: 'D' },
    ],
    lista: [
      { pos: 4, nome: 'João Cena',     valor: '28 dias' },
      { pos: 5, nome: 'Kim Seung Min', valor: '28 dias' },
      { pos: 6, nome: 'Lucas Montano', valor: '27 dias' },
      { pos: 7, nome: 'Manoel Gomes',  valor: '26 dias' },
      { pos: 8, nome: 'Iran Ferreira', valor: '20 dias' },
    ],
    voce: { pos: 99, nome: 'Você', valor: '11 dias' },
  },

  equipe: {
    podio: [
      { nome: 'RH',        valor: '15.000', medalha: '🥈', avatar: 'emoji', emoji: '👥' },
      { nome: 'Logística', valor: '15.000', medalha: '🥇', avatar: 'emoji', emoji: '🌐' },
      { nome: 'Produção',  valor: '15.000', medalha: '🥉', avatar: 'emoji', emoji: '⚙️' },
    ],
    lista: [
      { pos: 4, nome: 'Vendas',                valor: '10.000' },
      { pos: 5, nome: 'CyberSegurança',         valor: '10.000' },
      { pos: 6, nome: 'Atendimento ao Cliente', valor: '10.000' },
      { pos: 7, nome: 'Jurídico',               valor: '10.000' },
      { pos: 8, nome: 'Pesquisa',               valor: '10.000' },
    ],
    voce: { pos: 99, nome: 'Sua Equipe (Devops)', valor: '10.000' },
  },
}

export function getRanking(aba = 'nivel') {
  return Promise.resolve(mockDados[aba] ?? mockDados.nivel)
}

import { GameEventTypes } from "../../../../frontend/src/models/game_event";
import {
  Color,
  GameRecord,
  Sgf,
} from "../../../../frontend/src/models/game_record";

export const fakeSgf1: Sgf =
  "(;GM[1]FF[4]CA[UTF-8]AP[Sabaki:0.52.1]KM[0]SZ[19]DT[2022-09-12])";
export const fakeSgf2: Sgf = `
  (;FF[4]CA[UTF-8]GM[1]DT[2022-02-12]PC[OGS: https://online-go.com/game/41207174]GN[Grupo A | Fev 2022 | DOGemP]PB[psygo]PW[Fabrício]BR[3d]WR[3k]TM[3600]OT[15/600 canadian]RE[B+R]SZ[19]KM[6.5]RU[Japanese]C[Fabrício: Bom jogo!]AP[Sabaki:0.52.1];B[pd]C[Fabrício: Bom jogo!];W[dd]C[psygo: Boa partida!];B[pq];W[dp];B[pn];W[kq];B[cq];W[cp];B[dq];W[ep];B[fr];W[nc];B[dj];W[qf];B[nd];W[md];B[ne];W[pc];B[qc];W[oc];B[pf];W[re];B[qd];W[qh];B[pg];W[ph];B[oh];W[ql];B[qj];W[pj];B[pk];W[qk];B[oj];W[pi];B[oi];W[rj];B[kd];W[me];B[mf];W[ke];B[le];W[ld];B[lf];W[kc];B[jd];W[jc];B[ic];W[id];B[je];W[ie];B[jf];W[if];B[ig];W[hg];B[ih];W[hc];B[gq];W[bq];B[br];W[dl];B[mq];W[dh];B[en];W[cn];B[el];W[hh];B[dm];W[ii];B[cm];W[jg];B[jh];W[kf];B[hi];W[bm];B[bo];W[cl];B[bn];W[bk];B[co];W[ek];B[fk];W[fj];B[gk];W[hj];B[gi];W[gj];B[ej];W[dk];B[ij];W[hk];B[ji];W[fi];B[cc];W[cd];B[dc];W[eb];B[bd];W[be];B[bb];W[ac];B[ad];W[db];B[ce];W[bf];B[cg];W[bg];B[ch];W[bh];B[fb];W[fc];B[ec];W[gb];B[fd];W[de];B[gc];W[fa];B[hb];W[ib];B[ga];W[ol];B[lo];W[jo];B[iq];W[ko];B[ln];W[gp];B[hp];W[go];B[ho];W[gn];B[bp];W[hn];B[in];W[jm];B[im];W[km];B[hl];W[fl];B[gl];W[fm];B[ik];W[em];B[ml];W[pp];B[op];W[qq];B[oq];W[qp];B[om];W[pm];B[qm];W[pl];B[rn];W[on];B[oo];W[nm];B[po];W[mm];B[lm];W[ll];B[lp];W[lk];B[lh];W[mk];B[kp];W[mi];B[pb];W[mh];B[ng];W[kg];B[io];W[lg];B[ob];W[nb];B[qg];W[rg];B[rd];W[oa];B[fh];W[ei];B[di];W[qb];B[rb];W[pa];B[ra];W[pr];B[or];W[rr];B[bi];W[cf];B[dg];W[ai];B[aj];W[fe];B[dn];W[bj];B[ah];W[cj];B[ci];W[al];B[ge];W[eg];B[eh];W[fg];B[gf];W[ff];B[gg];W[df];B[ps]C[psygo: Obg pela partida.psygo: Até a metade eu realmente estava achando que vc estava mtu melhor.Fabrício: obrigado... achei que no meio da partida estava competitivo, mas no fim perdi muito feio
  Fabrício: Foi a forma como lidei com a invasão em C17 que desequlibrou, não é? Achei que dava pra matar, mas é muito dificil
  psygo: É mtu difícil de matar esse tipo de grupo msm. Em geral, algo como E18 é só se vc estivesse com muita força e pelo menos duas pedras no canto já.
  psygo: Achei que vc nao precisava ter tentado matar o grupo, era só jogar normal, vc estava bem à frente.
  psygo: S15 nao é joseki, mas é dificil de se lidar realmente.
  Fabrício: é, eu saí na frente ali, acho que deu mais certo do que deveria
  Fabrício: bom, obrigado! Depois eu assito a sua stream, sempre é legal assistir a própria partida pelo outro ponto de vista :P
  psygo: Legal, se quiser assistir lá, eu estou revisando agora.
  ])
`;

export const fakeGameRecords: readonly GameRecord[] = [
  {
    blackRef: "0",
    whiteRef: "1",
    result: {
      whoWins: Color.Black,
    },
    sgf: fakeSgf2,
    date: new Date(2022, 1, 1).getTime(),
    gameEventRef: GameEventTypes.online,
  },
  {
    blackRef: "0",
    whiteRef: "1",
    result: {
      whoWins: Color.White,
    },
    sgf: fakeSgf1,
    date: new Date(2022, 1, 2).getTime(),
    gameEventRef: GameEventTypes.online,
  },
  {
    blackRef: "1",
    whiteRef: "2",
    date: new Date(2022, 8, 10).getTime(),
    result: {
      whoWins: Color.Black,
      difference: 20.5,
    },
    sgf: fakeSgf1,
    gameEventRef: "0",
  },
];
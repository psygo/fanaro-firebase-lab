import { Globals as g } from "../../infra/globals";
import { RouteEnum } from "../../routing/router";
import { EnvState, envState } from "../../infra/env";

import { FirebaseRef } from "../../models/firebase_models";
import { GameRecord, resultString } from "../../models/game_record";

import { UiUtils } from "../ui_utils";
import Elo from "../../models/elo";
import { DateUtils } from "../../infra/date_utils";

declare const glift: any;

export default class GameRecordView extends HTMLElement {
  static readonly tag: string = "game-record-view";

  private declare gameRecord: GameRecord;

  constructor(public readonly gameRecordRef: FirebaseRef) {
    super();
  }

  private getGameRecord = async (): Promise<void> => {
    const response = await fetch(
      `${g.apiUrl}${RouteEnum.gameRecords}/${this.gameRecordRef}`
    );
    const json = await response.json();
    this.gameRecord = json["data"]["gameRecord"];
  };

  async connectedCallback(): Promise<void> {
    this.prepareGameRecordPage();

    await this.getGameRecord();

    if (this.gameRecord) {
      document.title = `
        Partida | 
          ${this.gameRecord.blackPlayer!.name} 
          vs 
          ${this.gameRecord.whitePlayer!.name}
      `;

      this.setGameRecordPage();
    }
  }

  private prepareGameRecordPage = (): void => {
    this.innerHTML += /*html*/ `
      <div id="players-names"></div>
      
      <div id="game-record-card"></div>

      <div id="glift" style="width=400px; height=400px"></div>
    `;
  };

  private setGameRecordPage = (): void => {
    this.setPlayersNames();
    this.setGameRecordCard();
    this.addSgfDiagram();

    // TODO2: Other games from both players in a table
  };

  private setPlayersNames = (): void => {
    const playerNamesDiv: HTMLDivElement =
      this.querySelector("#players-names")!;

    const black = this.gameRecord.blackPlayer!;
    const white = this.gameRecord.whitePlayer!;

    const blackFlags = UiUtils.allFlags(black.countries);
    const whiteFlags = UiUtils.allFlags(white.countries);

    const blackElo = new Elo(black.elo);
    const whiteElo = new Elo(white.elo);

    playerNamesDiv.innerHTML = /*html*/ `
      <h2 id="black">${blackElo.danKyuLevel()} ${blackFlags} ${black.name}</h2>
      <h2>vs</h2>
      <h2 id="white">${white.name} ${whiteFlags} ${whiteElo.danKyuLevel()}</h2>
    `;
  };

  private setGameRecordCard = (): void => {
    const gameRecordCardDiv: HTMLDivElement =
      this.querySelector("#game-record-card")!;
    const gameDate = new Date(this.gameRecord.date);

    const formattedDate = DateUtils.formatDate(gameDate);

    gameRecordCardDiv.innerHTML = /*html*/ `
      <div id="card">
        <div id="legend">
          <span>Dia</span>
          <span>Resultado</span>
          <span>Baixar</span>
        </div>

        <div id="content">
          <span>${formattedDate}</span>
          <span>${resultString(this.gameRecord.result)}</span>
          <a id="download">SGF</a>
        </div>
      </div>
    `;

    this.setDownloadButton();
  };

  private setDownloadButton = (): void => {
    const sgfDownloadA: HTMLAnchorElement = this.querySelector("a#download")!;

    const gameDate = new Date(this.gameRecord.date);

    const formattedDate = DateUtils.formatDate(gameDate).replaceAll("/", "-");

    const blackName = this.gameRecord.blackPlayer!.name;
    const whiteName = this.gameRecord.whitePlayer!.name;

    const blob = new Blob([this.gameRecord.sgf!], {
      type: "text/plain;charset=utf-8",
    });
    const fileUrl = URL.createObjectURL(blob);
    const fileName = `${formattedDate} - ${blackName} vs ${whiteName}`;
    sgfDownloadA.download = `${fileName}.sgf`;
    sgfDownloadA.href = fileUrl;
  };

  private addSgfDiagram = (): void => {
    const gliftScript = document.createElement("script");
    gliftScript.type = "text/javascript";
    const gliftScriptName = "glift_1_1_2.min.js";
    gliftScript.src =
      envState === EnvState.dev ? `/local/${gliftScriptName}` : gliftScriptName;
    gliftScript.toggleAttribute("async");

    gliftScript.onload = () => {
      try {
        glift.create({
          divId: "glift",
          sgf: {
            sgfString: this.gameRecord!.sgf,
          },
          display: {
            theme: "DEPTH",
            goBoardBackground: "images/purty_wood.png",
            disableZoomForMobile: true,
          },
        });
      } catch (e) {
        console.log(e);
      }
    };

    document.head.appendChild(gliftScript);
  };
}

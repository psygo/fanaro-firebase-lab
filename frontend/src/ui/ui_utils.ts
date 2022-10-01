import { DateUtils } from "../infra/date_utils";

import { RouteEnum } from "../routing/router";

import { Country, getFlag } from "../models/country";
import { Player } from "../models/player";
import { HtmlString } from "../infra/utils";

export namespace UiUtils {
  export const allFlags = (countries: readonly Country[]): HtmlString =>
    countries
      .map(
        (c) => /*html*/ `
          <span title="${c.name}">
            ${getFlag(c.name)}
          </span>
        `
      )
      .reduce((pflag, cflag) => pflag + cflag);

  export const lastGameLink = (player: Player): HtmlString => {
    if (player.lastGame) {
      const lastGameDate = DateUtils.formatDate(new Date(player.lastGame.date));

      return /*html*/ `
        <route-link 
          class="centered" 
          href="${RouteEnum.gameRecords}/${player.lastGame.firebaseRef}">
            <span>${lastGameDate}</span>
        </route-link>
      `;
    } else return /*html*/ `<span class="centered">&mdash;</span>`;
  };

  export const playerPicture = (picture: string | undefined): HtmlString =>
    !picture
      ? /*html*/ `<span class="centered" id="picture-placeholder">&mdash;</span>`
      : /*html*/ `<img id="picture" src="${picture}"/>`;
}

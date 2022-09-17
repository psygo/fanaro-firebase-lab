import { ExpressApiRoute } from "../../infra";

import { TimeStamp } from "../../../../go_brasil_ranking/src/infra/serializable";

import {
  GameEvent,
  GameEventTypes,
} from "../../../../go_brasil_ranking/src/models/game_event";

import { gameEventsCol } from "../collections/game_events_col";

export const fakeGameEvents: readonly GameEvent[] = [
  {
    type: GameEventTypes.tournament,
    name: "Copa do Brasil 2022",
    dates: [
      TimeStamp.fromDate(new Date(2022, 9, 10)),
      TimeStamp.fromDate(new Date(2022, 9, 11)),
    ],
    gamesTotal: 0,
  },
  {
    type: GameEventTypes.tournament,
    name: "Copa do Brasil 2018",
    dates: [
      TimeStamp.fromDate(new Date(2018, 9, 10)),
      TimeStamp.fromDate(new Date(2018, 9, 11)),
    ],
    gamesTotal: 0,
  },
];

export const mockPopulateGameEvents = async (): Promise<GameEvent[]> => {
  const mockGameEventsWithFirebaseRef: GameEvent[] = [];

  for (let i = 0; i < fakeGameEvents.length; i++) {
    const gameEvent = fakeGameEvents[i];
    const ref = i.toString();

    await gameEventsCol.col.doc(ref).set(gameEvent);

    let gameEventToReturn = gameEvent;
    if (gameEvent.type === GameEventTypes.tournament)
      gameEventToReturn = { ...gameEvent, firebaseRef: ref };

    mockGameEventsWithFirebaseRef.push(gameEventToReturn);
  }

  return mockGameEventsWithFirebaseRef;
};

export const mockPopulateGameEventsApi: ExpressApiRoute = async (_, res) => {
  try {
    const mockGameEventsWithFirebaseRef = await mockPopulateGameEvents();

    res.status(200).send({
      status: "success",
      message: "Player added successfully",
      data: { gameEvents: mockGameEventsWithFirebaseRef },
    });
  } catch (e) {
    res.status(500).json((e as Error).message);
  }
};

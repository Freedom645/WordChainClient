import { JavEngWord } from "../../model/Response";

export type QueryState = "NotExist" | "Used" | "OK" | "Failed";

export interface WordHistory {
  position: number,
  playerName: string,
  state: QueryState,
  word: JavEngWord,
}

export interface Chain {
  previous: JavEngWord;
  now: JavEngWord;
};

export type DifficultyName = "Free" | "Easy" | "Normal" | "Hard" | "VeryHard";

export interface DifficultySetting {
  difficulty: DifficultyName,
  randomTry: number,
  answerTime: number,
  failedNum: number,
}

export const DifficultySettingsTemplate: { [key: string]: DifficultySetting; } = {
  easy: {
    difficulty: "Easy",
    randomTry: 3,
    answerTime: 30,
    failedNum: 10,
  },
  normal: {
    difficulty: "Normal",
    randomTry: 6,
    answerTime: 20,
    failedNum: 7,
  },
  hard: {
    difficulty: "Hard",
    randomTry: 20,
    answerTime: 10,
    failedNum: 3,
  },
  veryHard: {
    difficulty: "VeryHard",
    randomTry: 40,
    answerTime: 5,
    failedNum: 1,
  }
};


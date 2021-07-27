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

export const DifficultySettingsTemplate: DifficultySetting[] = [
  {
    difficulty: "Easy",
    randomTry: 1,
    answerTime: 30,
    failedNum: 10,
  },
  {
    difficulty: "Normal",
    randomTry: 5,
    answerTime: 15,
    failedNum: 7,
  },
  {
    difficulty: "Hard",
    randomTry: 20,
    answerTime: 7,
    failedNum: 3,
  },
  {
    difficulty: "VeryHard",
    randomTry: 40,
    answerTime: 5,
    failedNum: 1,
  }
];


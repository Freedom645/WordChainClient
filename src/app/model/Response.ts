
export interface JavEngWord {
  Lemma?: string,
  Rank?: number,
  Japanese?: string,
  Commentary?: string,
}

export interface WordCountResponse {
  Prefix: string,
  Count: number;
}

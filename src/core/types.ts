export interface DictEntry {
  reading: string; // よみ
  word: string; // 単語
  pos: string; // parts of speech
  comment?: string; // コメント
  kind: string;
  source: string;
}

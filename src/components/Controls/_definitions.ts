export type PropsType = {
  columns: number;
  flags: number;
  time: number;
  restart: () => void;
  gameStatus: string;
};

export interface HeaderType {
  columns: number;
}

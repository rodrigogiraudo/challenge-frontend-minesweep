export type PropsType = {
  columns: number;
  rows: number;
  mines: number;
  newGame: () => void;
  saveOptions: () => void;
};

export interface HeaderType {
  columns: number;
}

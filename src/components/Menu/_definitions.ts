export type PropsType = {
  columns: number;
  rows: number;
  mines: number;
  newGame: () => void;
  saveOptions: (newRows: number, newColumns: number, newMines: number) => void;
};

export interface HeaderType {
  columns: number;
}

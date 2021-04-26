export interface IColumn {
  position: number,
  value: string
}

export interface IRow {
  position: number,
  columns: IColumn[]
}

import { Component, OnInit } from '@angular/core';

interface IColumn {
  position: number,
  value: string
}

interface IRow {
  position: number,
  columns: IColumn[]
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  
  rows: IRow[] = undefined;
  playerTurn: number = 1;

  constructor() { }

  ngOnInit(): void {
    this.initGame();
  }

  initGame(): void {
    this.playerTurn = 1;

    this.rows = [
      {
        position: 0,
        columns: [
          {position: 0, value: ''},
          {position: 1, value: ''},
          {position: 2, value: ''}
        ]
      },
      {
        position: 1,
        columns: [
          {position: 0, value: ''},
          {position: 1, value: ''},
          {position: 2, value: ''}
        ]
      },
      {
        position: 2,
        columns: [
          {position: 0, value: ''},
          {position: 1, value: ''},
          {position: 2, value: ''}
        ]
      }
    ];
  }

  markCloumn(row: number, column: number) {
    const mark = this.playerTurn === 1 ? 'X' : 'O';
    const markedValue = this.rows[row].columns[column].value;

    if(markedValue !== '') {
      alert('Erro! Posição já foi marcada.');
      return;
    }

    this.rows[row].columns[column].value = mark;

    let winner = this.checkWinner();
    if(winner) {
      const winnerName = winner === 'X' 
        ? 'Player 1'
        : 'Player 2';
        
      alert(winnerName + ', você venceu!!');
      
      this.initGame();
    } else {
      this.changePlayer();
    }
  }

  checkWinner(): string {
    let row1 = this.rows[0], row2 = this.rows[1], row3 = this.rows[2];  
    let winner = '';

    // Vencedor na posição horizontal
    this.rows.forEach(row => {
      if(this.areEqualAndNotEmpty(
        row.columns[0].value,
        row.columns[1].value,
        row.columns[2].value
      )){
        winner = row.columns[0].value;
      }
    });

    if(winner !== '') {
      return winner;
    }

    // Vencedor na posição vertical
    for(let i=0; i<3; i++) {
      
      if(this.areEqualAndNotEmpty(
        row1.columns[i].value,
        row2.columns[i].value,
        row3.columns[i].value
      )){
        return row1.columns[i].value;
      }
    }

    // Vencedor em diagonal Up to Down
    if(this.areEqualAndNotEmpty(
      row1.columns[0].value,
      row2.columns[1].value,
      row3.columns[2].value
    )) {
      return row1.columns[0].value;
    }

    // Vencedor em diagonal Down to Up
    if(this.areEqualAndNotEmpty(
      row1.columns[2].value,
      row2.columns[1].value,
      row3.columns[0].value
    )) {
      return row1.columns[2].value;
    }

    return undefined;
  }

  areEqualAndNotEmpty(v0: string, v1: string, v2: string): boolean {
    if(v0 === v1 && v1 === v2 && v0 !== '') {
      return true;
    }
    return false;
  }

  changePlayer() {
    this.playerTurn = this.playerTurn === 1
      ? 2
      : 1;
  }

}

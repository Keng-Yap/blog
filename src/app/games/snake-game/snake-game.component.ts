import { Component, ElementRef, ViewChild, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-snake-game',
  templateUrl: './snake-game.component.html',
  styleUrls: ['./snake-game.component.css']
})
export class SnakeGameComponent implements OnInit {
  @ViewChild('gameCanvas', { static: true }) gameCanvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;

  private boxSize = 20;
  private snake: { x: number; y: number }[] = [];
  private direction: string = 'RIGHT';
  private food = { x: 0, y: 0 };
  private gameInterval: any;
  score = 0;

  ngOnInit(): void {
    this.ctx = this.gameCanvas.nativeElement.getContext('2d')!;
    this.resetGame();
    this.drawGame();
  }

  startGame(): void {
    clearInterval(this.gameInterval);
    this.resetGame();
    this.gameInterval = setInterval(() => this.drawGame(), 150);
  }

  resetGame(): void {
    this.snake = [{ x: 5 * this.boxSize, y: 5 * this.boxSize }];
    this.direction = 'RIGHT';
    this.score = 0;
    this.spawnFood();
  }

  spawnFood(): void {
    const canvas = this.gameCanvas.nativeElement;
    this.food = {
      x: Math.floor(Math.random() * (canvas.width / this.boxSize)) * this.boxSize,
      y: Math.floor(Math.random() * (canvas.height / this.boxSize)) * this.boxSize
    };
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft' && this.direction !== 'RIGHT') this.direction = 'LEFT';
    if (event.key === 'ArrowUp' && this.direction !== 'DOWN') this.direction = 'UP';
    if (event.key === 'ArrowRight' && this.direction !== 'LEFT') this.direction = 'RIGHT';
    if (event.key === 'ArrowDown' && this.direction !== 'UP') this.direction = 'DOWN';
  }

  drawGame(): void {
    const canvas = this.gameCanvas.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw food
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(this.food.x, this.food.y, this.boxSize, this.boxSize);

    // Move snake
    const head = { ...this.snake[0] };
    if (this.direction === 'LEFT') head.x -= this.boxSize;
    if (this.direction === 'UP') head.y -= this.boxSize;
    if (this.direction === 'RIGHT') head.x += this.boxSize;
    if (this.direction === 'DOWN') head.y += this.boxSize;

    // Check collision with wall
    if (
      head.x < 0 || head.y < 0 ||
      head.x >= canvas.width || head.y >= canvas.height ||
      this.snake.some(seg => seg.x === head.x && seg.y === head.y)
    ) {
      clearInterval(this.gameInterval);
      alert('Game Over! Your score: ' + this.score);
      return;
    }

    // Check if eats food
    if (head.x === this.food.x && head.y === this.food.y) {
      this.score++;
      this.spawnFood();
    } else {
      this.snake.pop(); // Remove tail
    }

    this.snake.unshift(head);

    // Draw snake
    this.ctx.fillStyle = 'lime';
    for (const part of this.snake) {
      this.ctx.fillRect(part.x, part.y, this.boxSize, this.boxSize);
    }
  }
}

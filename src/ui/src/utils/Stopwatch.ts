export class Stopwatch {
  private startTime: number = 0;
  private elapsedTime: number = 0;
  private timerInterval: NodeJS.Timeout | null = null;
  private isRunning: boolean = false;
  private updateCallback: (elapsedTime: number) => void;

  constructor(updateCallback: (elapsedTime: number) => void) {
    this.updateCallback = updateCallback;
  }

  start(): void {
    if (this.isRunning) return;

    this.isRunning = true;
    this.startTime = Date.now() - this.elapsedTime;

    this.timerInterval = setInterval(() => {
      this.elapsedTime = Date.now() - this.startTime;
      this.updateCallback(this.elapsedTime);
    }, 1000); // Update every 100ms
  }

  stop(): void {
    if (!this.isRunning) return;

    this.isRunning = false;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  reset(): void {
    stop();
    this.elapsedTime = 0;
    this.updateCallback(this.elapsedTime);
  }

  getElapsedTime(): number {
    return this.elapsedTime;
  }

  toString(): string {
    const hours = Math.floor(this.elapsedTime / 360000);
    const minutes = Math.floor((this.elapsedTime % 360000) / 6000);
    const seconds = Math.floor((this.elapsedTime % 6000) / 100);

    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }
}

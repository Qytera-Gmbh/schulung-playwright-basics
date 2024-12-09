import { Reporter, TestCase, TestResult } from "@playwright/test/reporter";

export default class SortReporter implements Reporter {

  private readonly stdout : string[]= [];
  private readonly stderr : string[]= [];

  public onTestEnd(__: TestCase, result: TestResult): void {
    if (result.stdout.length > 0) {
      this.stdout.push(...result.stdout.map(line => line.toString().trim()));
    }
    if (result.stderr.length > 0) {
      this.stdout.push(...result.stderr.map(line => line.toString().trim()));
    }
  }

  public onEnd() {
    console.log([...this.stdout].sort((a, b) => a.localeCompare(b)).join("\n"));
    console.log([...this.stderr].sort((a, b) => a.localeCompare(b)).join("\n"));
  }

}
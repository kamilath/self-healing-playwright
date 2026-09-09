import fs from "fs";
import { HealingDashboard } from "./HealingDashboard";

class TestResultReporter {
  results: any[] = [];

  onTestEnd(test: any, result: any) {
    this.results.push({
      name: test.title,
      status: result.status,
      duration: result.duration
    });
  }

  onEnd() {
    const total = this.results.length;

    const passed = this.results.filter(
      item => item.status === "passed"
    ).length;

    const failed = this.results.filter(
      item => item.status === "failed"
    ).length;

    const skipped = this.results.filter(
      item => item.status === "skipped"
    ).length;

    const duration = this.results.reduce(
      (sum, item) => sum + item.duration,
      0
    );

    fs.writeFileSync(
      "utils/test-results.json",
      JSON.stringify(
        {
          total,
          passed,
          failed,
          skipped,
          duration,
          tests: this.results
        },
        null,
        2
      )
    );

    // Generate dashboard after test results are saved
    const dashboard = new HealingDashboard();
    dashboard.generate();
  }
}

export default TestResultReporter;
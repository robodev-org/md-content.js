import { test } from 'vitest';
import { DiagnosticsProbe } from './diagnosticsProbe';

export function diagnosticsTest(
  name: string,
  fn: (probe: DiagnosticsProbe) => Promise<void> | void,
  options: { traceId?: string } = {}
): void {
  test(name, async () => {
    const probe = new DiagnosticsProbe({ testName: name, traceId: options.traceId });
    try {
      await fn(probe);
    } catch (err) {
      probe.setError(err);
      await probe.writeFailureArtifacts();
      throw err;
    }
  });
}

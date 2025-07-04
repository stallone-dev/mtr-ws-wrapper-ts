import { FnWithInstrumentation } from "~util/instrumentation.ts";

export { instrumentationSupportForTests };

// deno-lint-ignore no-explicit-any
function instrumentationSupportForTests<FN extends (...args: any[]) => any>(
    fn: FN,
): (...args: Parameters<FN>) => Promise<ReturnType<FN>> {
    return async (...args: Parameters<FN>) =>
        await FnWithInstrumentation(
            () => fn(...args),
            {
                sessionId: "SESSION_TEST",
                userPersistentId: "USER_TEST",
                userRole: "TEST",
                spanName: "TEST",
            },
            "TESTE-CHILD-LOGGER",
        );
}

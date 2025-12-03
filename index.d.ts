/** Changes the return type of a function to `any`. */
type ReturningAny<T extends (...args: any[]) => any> = (...a: Parameters<T>) => any;

/** @see {@link https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/node/globals.d.ts|Process.on()} */
type ProcessEventOrSignal =
  NodeJS.Signals
  | 'beforeExit'
  | 'disconnect'
  | 'exit'
  | 'rejectionHandled'
  | 'uncaughtException'
  | 'unhandledRejection'
  | 'warning'
  | 'message'
  | 'newListener'
  | 'removeListener'
  | 'multipleResolves';

declare namespace AsyncExitHook {

  /** The callback to call when the event handling is finished. */
  type AsycHookCallback = () => void;

  /** Async hook called for uncaught exceptions or unhandled rejections. Call the callback when finished. */
  type AsyncErrorHook = (err: Error | any, stepTowardExit: AsycHookCallback) => void;

  /** Async hook. Call the callback when finished. */
  type AsyncHook = (stepTowardExit: AsycHookCallback) => void;

  /** Sync hook called for uncaught exception or unhandled rejection. */
  type SyncErrorHook = (err: Error | any) => void;

  /** Sync hook. */
  type SyncHook = () => void;

  /** @see {@link https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/node/globals.d.ts|Process.on()} */
  interface HookEventFunction {
    (event: 'beforeExit', code?: number | null, filter?: ReturningAny<NodeJS.BeforeExitListener>): void;

    (event: 'disconnect', code?: number | null, filter?: ReturningAny<NodeJS.DisconnectListener>): void;

    (event: 'exit', code?: number | null, filter?: ReturningAny<NodeJS.ExitListener>): void;

    (event: 'rejectionHandled', code?: number | null, filter?: ReturningAny<NodeJS.RejectionHandledListener>): void;

    (event: 'uncaughtException', code?: number | null, filter?: ReturningAny<NodeJS.UncaughtExceptionListener>): void;

    (event: 'unhandledRejection', code?: number | null, filter?: ReturningAny<NodeJS.UnhandledRejectionListener>): void;

    (event: 'warning', code?: number | null, filter?: ReturningAny<NodeJS.WarningListener>): void;

    (event: 'message', code?: number | null, filter?: ReturningAny<NodeJS.MessageListener>): void;

    (event: NodeJS.Signals, code?: number | null, filter?: ReturningAny<NodeJS.SignalsListener>): void;

    (event: 'newListener', code?: number | null, filter?: ReturningAny<NodeJS.NewListenerListener>): void;

    (event: 'removeListener', code?: number | null, filter?: ReturningAny<NodeJS.RemoveListenerListener>): void;

    (event: 'multipleResolves', code?: number | null, filter?: ReturningAny<NodeJS.MultipleResolveListener>): void;
  }

  interface AsyncExitHook {
    /** Register a new exit hook. */
    (hook: SyncHook | AsyncHook): void;

    /**
     * Register new signal / event to hook to.
     *
     * @param event The signal or event name to listen to, using `process.on()`. eg 'SIGBREAK' or 'beforeExit'.
     * @param code The code to exit the process with.
     * @param filter A function that will be called with the `process.on()` signal/event handler arguments.
     *   Returning `true` will not cause the exit hook to fire.
     */
    hookEvent: HookEventFunction;

    /**
     * Unhook signal / event.
     *
     * @param event The signal or event name to stop listen to. eg 'SIGBREAK' or 'beforeExit'.
     */
    unhookEvent: (event: ProcessEventOrSignal) => void;

    /** List hooked events. */
    hookedEvents: () => ProcessEventOrSignal[];

    /**
     * Add an uncaught exception handler.
     * Note: it will be called for 'uncaughtException', but also for 'unhandledRejection'
     */
    uncaughtExceptionHandler: (hook: SyncErrorHook | AsyncErrorHook) => void;

    /** Add an unhandled rejection handler. */
    unhandledRejectionHandler: (hook: SyncErrorHook | AsyncErrorHook) => void;

    /**
     * Configure the time to wait for async hooks to finish, in total, after which the process will forcefully exit.
     * The default is 10000 = 10 seconds.
     * The maximum is the upper bound of a signed integer, which is (2^31 - 1) = 2147483647 = ~25 days!
     *
     * @param ms The time in milliseconds.
     */
    forceExitTimeout: (ms: number) => void;
  }
}


declare const add: AsyncExitHook.AsyncExitHook;

declare module 'async-exit-hook' {
  export = add;
}

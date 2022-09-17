type booleanFunction = () => boolean;

/**
 * @param fn
 * @param time
 * @link https://blog.openreplay.com/forever-functional-waiting-with-promises
 * @example
 * ```
 * type booleanFunction = () => boolean;
 * let effectFinished = false;
 * store.signIn({ credentials, onFinish: () => (effectFinished = true) });
 * await until(() => effectFinished);
 * ```
 */
export const until = (fn: booleanFunction, time = 1000) => {
  if (fn()) {
    // console.log('until: fn true');
    return Promise.resolve(true);
  } else {
    return new Promise((resolve) => {
      // console.log('until: fn false');
      const timer = setInterval(() => {
        if (fn()) {
          // console.log('until: fn true A');
          clearInterval(timer);
          resolve(true);
        }
      }, time);
    });
  }
};

/* @flow */
//jshint ignore:start

// Returns a wrapped version of the function which throws an exception if it's
// called more than count times within period amount of time.
export default function rateLimit<T: Function>(fn: T, period: number, count: number): T {
  let calls: number[] = [];
  return (function() {
    const now = Date.now();
    calls = calls.filter(time => time >= now-period);
    if (calls.length >= count) {
      throw new Error("Function rate limit exceeded");
    }
    calls.push(Date.now());
    return fn.apply(this, arguments);
  }: any);
}

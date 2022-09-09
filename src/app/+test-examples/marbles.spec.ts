import { debounceTime, delay, throttleTime } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
/*
  https://rxjs.dev/guide/testing/marble-testing#marble-syntax

  '-' frame
  '|' complete
*/

//  Kind represents the kind of notification, 'N' for next notification, 'E' for error and 'C' for completion
function logFrames(label: string, frames: any) {
  console.group(label);

  frames.forEach((frame: any) => {
    console.log(
      'Frame:',
      frame.frame,
      'Kind',
      frame.notification.kind,
      'Value:',
      frame.notification.value
    );
  });

  console.groupEnd();
}

describe('marbles testing', () => {
  function setup() {
    const testScheduler = new TestScheduler((actual, expected) => {
      // logFrames('actual', actual);
      // logFrames('expected', expected);
      expect(actual).toEqual(expected);
    });

    return { testScheduler };
  }

  it('test 1', () => {
    /*
        actual
            Frame: 2 Kind N Value: a
            Frame: 5 Kind N Value: b
            Frame: 8 Kind C Value: undefined
    */
    const { testScheduler } = setup();

    testScheduler.run(({ cold, expectObservable }) => {
      // On frame 2 emit a, on frame 5 emit b, and on frame 8, complete.
      const source = '--a--b--|';
      const expected = '--a--b--|';

      expectObservable(cold(source)).toBe(expected);
    });
  });

  it('test 2', () => {
    /*
        actual
            Frame: 5 Kind N Value: a
            Frame: 5 Kind C Value: undefined
    */
    const { testScheduler } = setup();

    testScheduler.run(({ cold, expectObservable }) => {
      // on frame 5 emit a and complete.
      const source = '-----(a|)';
      const expected = '-----(a|)';

      expectObservable(cold(source)).toBe(expected);
    });
  });

  it('should delay', () => {
    /*
        actual
            Frame: 4 Kind N Value: a
            Frame: 7 Kind N Value: b
            Frame: 8 Kind C Value: undefined            
    */
    const { testScheduler } = setup();

    testScheduler.run(({ cold, expectObservable }) => {
      const time = 2;
      const operation = delay(time);
      // On frame 2 emit a, on frame 5 emit b, and on frame 8, complete.
      const source = '--a--b--|';
      const expected = '----a--b|';

      expectObservable(cold(source).pipe(operation)).toBe(expected);
    });
  });

  it('should throttleTime', () => {
    /*
        actual
            Frame: 0 Kind N Value: a
            Frame: 3 Kind N Value: d
            Frame: 9 Kind C Value: undefined           
    */
    const { testScheduler } = setup();

    testScheduler.run(({ cold, expectObservable }) => {
      const time = 2;
      const operation = throttleTime(time);
      const source = 'abcdef---|';
      const expected = 'a--d-----|';

      expectObservable(cold(source).pipe(operation)).toBe(expected);
    });
  });

  it('should debounceTime', () => {
    const { testScheduler } = setup();

    testScheduler.run(({ cold, expectObservable }) => {
      const time = 2;
      const operation = debounceTime(time);
      const source = 'abcdef--|';
      const expected = '-------f|';

      expectObservable(cold(source).pipe(operation)).toBe(expected);
    });
  });

  it('should throttleTime and debounceTime', () => {
    const { testScheduler } = setup();

    testScheduler.run(({ cold, expectObservable }) => {
      const time = 2;
      const operation1 = throttleTime(time);
      const operation2 = debounceTime(time);
      const source = 'abcdef---|';
      const expected = '--a--d---|';

      expectObservable(cold(source).pipe(operation1, operation2)).toBe(
        expected
      );
    });
  });
});

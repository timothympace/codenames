// @flow

import { useCallback } from 'react';

/**
 * Provides a hook for handling keyboard input.
 * @param keyCodes The integer values for which keys you want to listen for.
 * @param callback A callback to call when the enter key is pressed.
 * @return {Function} A function that can be passed into onKeyDown, onKeyPress, etc...
 */
export default function useKeyCodeHandler(
  keyCodes: number | Array<number>,
  callback: Function
): Function {
  // Wrap non array inputs back into an array.
  keyCodes = Array.isArray(keyCodes) ? keyCodes : [keyCodes];

  return useCallback(
    (ev, ...args) => {
      // Return key
      if (keyCodes.indexOf(ev.keyCode) !== -1) {
        callback?.call(undefined, ev, ...args);
      }
    },
    [callback, ...keyCodes]
  );
}

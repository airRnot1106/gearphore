import { useRecoilCallback } from 'recoil';

import { animationAtom } from '@/stores/animation/atoms';
import type { AnimationKey } from '@/stores/animation/types';
import { animationKeyToMs } from '@/stores/animation/types';

import type { CallbackInterface } from 'recoil';

/* Operation */

const enableAnimation = (
  callback: CallbackInterface,
  param: { id: string; animationKey: AnimationKey }
) => {
  const { set } = callback;
  const { id, animationKey } = param;
  set(animationAtom({ id, animationKey }), true);
};

const disableAnimation = (
  callback: CallbackInterface,
  param: { id: string; animationKey: AnimationKey }
) => {
  const { set } = callback;
  const { id, animationKey } = param;
  set(animationAtom({ id, animationKey }), false);
};

/* Hook */

export const useEnableAnimation = () => {
  return useRecoilCallback(
    (callback) => (param: { id: string; animationKey: AnimationKey }) => {
      const { animationKey } = param;
      const ms = animationKeyToMs[animationKey];
      enableAnimation(callback, param);
      setTimeout(() => {
        disableAnimation(callback, param);
      }, ms);
    }
  );
};

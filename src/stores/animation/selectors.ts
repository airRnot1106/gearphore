import { selectorFamily } from 'recoil';

import { animationAtom } from '@/stores/animation/atoms';
import type {
  Animation,
  AnimationKey,
  AnimationState,
  AnimationStateParam,
} from '@/stores/animation/types';
import { animationKeys } from '@/stores/animation/types';

import type { RecoilSelectorGetter } from '@/types';

// Getter

const getAnimation = (
  getter: RecoilSelectorGetter,
  param: { id: string; animationKey: AnimationKey }
) => {
  const { get } = getter;
  const animation = get(animationAtom(param));
  return animation;
};

// Hook

export const animationState = selectorFamily<
  AnimationState,
  AnimationStateParam
>({
  key: 'animationState',
  get: (param) => (getter) => {
    const states = Object.fromEntries(
      animationKeys.map((animationKey) => [
        animationKey,
        getAnimation(getter, { ...param, animationKey }),
      ])
    ) as Animation['animations'];
    return {
      id: param.id,
      animations: states,
    };
  },
});

import { atomFamily } from 'recoil';

import type {
  AnimationAtom,
  AnimationAtomParam,
} from '@/stores/animation/types';

export const animationAtom = atomFamily<AnimationAtom, AnimationAtomParam>({
  key: 'animationAtom',
  default: false,
});

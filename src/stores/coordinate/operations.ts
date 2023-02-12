import { useRecoilCallback } from 'recoil';
import { v4 as uuidV4 } from 'uuid';
import { z } from 'zod';

import { useEnableAnimation } from '@/stores/animation/operations';
import {
  coordinateAtom,
  coordinateIdsAtom,
  powerAtom,
} from '@/stores/coordinate/atoms';
import { coordinateIdIndexState } from '@/stores/coordinate/selectors';
import type {
  CoordinateAtomParam,
  CoordinateBase,
  CoordinateFull,
  CoordinateId,
  CoordinateName,
  PowerAtomParam,
  PowerName,
} from '@/stores/coordinate/types';
import {
  coordinateBaseSchema,
  gearSchema,
  slotSchema,
  coordinateFullSchema,
  coordinateIdSchema,
  slots,
  gears,
} from '@/stores/coordinate/types';

import { safeParseJson } from '@/utils';

import type { CallbackInterface } from 'recoil';

/* Operation */

// CoordinateId

const addCoordinateId = (callback: CallbackInterface, id: CoordinateId) => {
  const { set } = callback;
  set(coordinateIdsAtom, (ids) => [...ids, id]);
};

const interruptCoordinateId = (
  callback: CallbackInterface,
  id: CoordinateId,
  index: number
) => {
  const { set } = callback;
  set(coordinateIdsAtom, (ids) => {
    const newIds = [...ids];
    newIds.splice(index, 0, id);
    return newIds;
  });
};

const deleteCoordinateId = (callback: CallbackInterface, id: CoordinateId) => {
  const { set } = callback;
  set(coordinateIdsAtom, (ids) => ids.filter((v) => v !== id));
};

// CoordinateName

const updateCoordinateName = (
  callback: CallbackInterface,
  param: CoordinateAtomParam,
  newName: CoordinateName
) => {
  const { set } = callback;
  set(coordinateAtom(param), (coordinate) => ({
    ...coordinate,
    name: newName,
  }));
};

const copyCoordinateName = (
  callback: CallbackInterface,
  sourceParam: CoordinateAtomParam,
  targetParam: CoordinateAtomParam,
  opt: { shouldPutSuffix: boolean }
) => {
  const { snapshot, set } = callback;
  const { shouldPutSuffix } = opt;
  const sourceName = snapshot
    .getLoadable(coordinateAtom(sourceParam))
    .getValue().name;
  const suffix = shouldPutSuffix ? ' (copy)' : '';
  const targetName = sourceName + suffix;
  set(coordinateAtom(targetParam), (coordinate) => ({
    ...coordinate,
    name: targetName,
  }));
};

// Coordinate

const copyCoordinate = (
  callback: CallbackInterface,
  sourceParam: CoordinateAtomParam,
  targetParam: CoordinateAtomParam
) => {
  copyCoordinateName(callback, sourceParam, targetParam, {
    shouldPutSuffix: true,
  });
  copyPowerAll(callback, sourceParam, targetParam);
};

const importCoordinate = (
  callback: CallbackInterface,
  coordinate: CoordinateFull
) => {
  const { id, name, gears: powers } = coordinate;
  addCoordinateId(callback, id);
  updateCoordinateName(callback, { id }, name);
  gears.forEach((gear) => {
    powers[gear].forEach((power) => {
      const { slot, name } = power;
      updatePower(callback, { id, gear, slot }, name);
    });
  });
};

// Power

const updatePower = (
  callback: CallbackInterface,
  param: PowerAtomParam,
  newPower: PowerName
) => {
  const { set } = callback;
  const { id, gear, slot } = param;
  set(powerAtom({ id, gear, slot }), (power) => ({
    ...power,
    name: newPower,
  }));
};

const copyPower = (
  callback: CallbackInterface,
  sourceParam: PowerAtomParam,
  targetParam: PowerAtomParam
) => {
  const { snapshot, set } = callback;
  const sourcePower = snapshot
    .getLoadable(powerAtom(sourceParam))
    .getValue().name;
  set(powerAtom(targetParam), (power) => ({
    ...power,
    name: sourcePower,
  }));
};

const copyPowerAll = (
  callback: CallbackInterface,
  sourceParam: CoordinateAtomParam,
  targetParam: CoordinateAtomParam
) => {
  gears.forEach((gear) => {
    slots.forEach((slot) => {
      copyPower(
        callback,
        { id: sourceParam.id, gear, slot },
        { id: targetParam.id, gear, slot }
      );
    });
  });
};

const scrollIntoView = (id: CoordinateId) => {
  const elm = document.getElementById(`c-${id}`);
  elm?.scrollIntoView({ behavior: 'smooth', block: 'center' });
};

/* Hook */

// Coordinate

export const useCreateCoordinate = () => {
  const enableAnimation = useEnableAnimation();
  return useRecoilCallback((callback) => () => {
    const id = uuidV4();
    addCoordinateId(callback, id);
    enableAnimation({ id, animationKey: 'SLIDE_IN_LEFT' });
    process.nextTick(() => {
      scrollIntoView(id);
    });
  });
};

export const useDuplicateCoordinate = () => {
  return useRecoilCallback((callback) => (param: CoordinateAtomParam) => {
    const { id: sourceId } = param;
    const targetId = uuidV4();
    const result = coordinateIdSchema.safeParse(sourceId);
    if (!result.success) return;
    const { data } = result;
    const index = callback.snapshot
      .getLoadable(coordinateIdIndexState(data))
      .getValue();
    interruptCoordinateId(callback, targetId, index + 1);
    copyCoordinate(callback, { id: data }, { id: targetId });
    process.nextTick(() => {
      scrollIntoView(targetId);
    });
  });
};

export const useDeleteCoordinate = () => {
  return useRecoilCallback((callback) => (param: CoordinateAtomParam) => {
    const { id } = param;
    const result = coordinateIdSchema.safeParse(id);
    if (!result.success) return;
    const { data } = result;
    deleteCoordinateId(callback, data);
  });
};

export const useUpdateCoordinateName = () => {
  return useRecoilCallback((callback) => (param: CoordinateBase) => {
    const result = coordinateBaseSchema.safeParse(param);
    if (!result.success) return;
    const {
      data: { id, name },
    } = result;
    updateCoordinateName(callback, { id }, name);
  });
};

export const useImportCoordinateFromJson = () => {
  return useRecoilCallback((callback) => (jsonStr: string) => {
    const parseJsonResult = safeParseJson(jsonStr);
    if (!parseJsonResult.success) return;
    const { data } = parseJsonResult;
    const parseCoordinateResult = coordinateFullSchema.safeParse(data);
    if (!parseCoordinateResult.success) return;
    const { data: coordinate } = parseCoordinateResult;
    const id = uuidV4();
    importCoordinate(callback, { ...coordinate, id });
  });
};

export const useImportCoordinatesArrayFromJson = () => {
  return useRecoilCallback((callback) => (jsonStr: string) => {
    const parseJsonResult = safeParseJson(jsonStr);
    if (!parseJsonResult.success) return;
    const { data } = parseJsonResult;
    const parseCoordinateResult = coordinateFullSchema.array().safeParse(data);
    if (!parseCoordinateResult.success) return;
    const { data: coordinate } = parseCoordinateResult;
    coordinate.forEach((coordinate) => {
      const id = uuidV4();
      importCoordinate(callback, { ...coordinate, id });
    });
  });
};

// Power

export const useUpdatePower = () => {
  return useRecoilCallback(
    (callback) => (param: PowerAtomParam & { power: PowerName }) => {
      const { id, gear, slot, power } = param;
      const result = z
        .object({
          id: coordinateIdSchema,
          gear: gearSchema,
          slot: slotSchema,
        })
        .safeParse({ id, gear, slot });
      if (!result.success) return;
      updatePower(callback, param, power);
    }
  );
};

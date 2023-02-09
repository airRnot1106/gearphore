import { useRecoilCallback } from 'recoil';
import { v4 as uuidV4 } from 'uuid';

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
  gearSchema,
  powerNameSchema,
  slotSchema,
  coordinateFullSchema,
  coordinateNameSchema,
  coordinateIdSchema,
  slots,
  gears,
} from '@/stores/coordinate/types';

import { useSafeParseData } from '@/hooks/useSafeParse';

import type { CallbackInterface } from 'recoil';
import type { z } from 'zod';

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
  addCoordinateId(callback, targetParam.id);
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
  set(powerAtom(param), (power) => ({
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

/* Hook */

// Coordinate

export const useCreateCoordinate = () => {
  return useRecoilCallback((callback) => () => {
    const id = uuidV4();
    addCoordinateId(callback, id);
  });
};

export const useDuplicateCoordinate = () => {
  const { safeParseData } = useSafeParseData();
  return useRecoilCallback((callback) => (param: CoordinateAtomParam) => {
    const id = uuidV4();
    const result = safeParseData(coordinateIdSchema, param.id);
    if (!result.success) return;
    const index = callback.snapshot
      .getLoadable(coordinateIdIndexState(param.id))
      .getValue();
    interruptCoordinateId(callback, id, index + 1);
    copyCoordinate(callback, param, { id });
  });
};

export const useDeleteCoordinate = () => {
  const { safeParseData } = useSafeParseData();
  return useRecoilCallback((callback) => (param: CoordinateAtomParam) => {
    const { id } = param;
    const result = safeParseData(coordinateIdSchema, id);
    if (!result.success) return;
    deleteCoordinateId(callback, id);
  });
};

export const useUpdateCoordinateName = () => {
  const { safeParseData } = useSafeParseData();
  return useRecoilCallback((callback) => (param: CoordinateBase) => {
    const { id, name } = param;
    const idResult = safeParseData(coordinateIdSchema, id);
    if (!idResult.success) return;
    const nameResult = safeParseData(coordinateNameSchema, name);
    if (!nameResult.success) return;
    updateCoordinateName(callback, { id }, name);
  });
};

export const useImportCoordinateFromJson = () => {
  const { safeParseData, safeParseJson } = useSafeParseData();
  return useRecoilCallback((callback) => (jsonStr: string) => {
    const parseJsonResult = safeParseJson(jsonStr);
    if (!parseJsonResult.success) return;
    const { data } = parseJsonResult;
    const parseCoordinateResult = safeParseData<CoordinateFull, z.Schema>(
      coordinateFullSchema,
      data
    );
    if (!parseCoordinateResult.success) return;
    const { data: coordinate } = parseCoordinateResult;
    const id = uuidV4();
    importCoordinate(callback, { ...coordinate, id });
  });
};

export const useImportCoordinatesArrayFromJson = () => {
  const { safeParseData, safeParseJson } = useSafeParseData();
  return useRecoilCallback((callback) => (jsonStr: string) => {
    const parseJsonResult = safeParseJson(jsonStr);
    if (!parseJsonResult.success) return;
    const { data } = parseJsonResult;
    const parseCoordinateResult = safeParseData<CoordinateFull[], z.Schema>(
      coordinateFullSchema.array(),
      data
    );
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
  const { safeParseData } = useSafeParseData();
  return useRecoilCallback(
    (callback) => (param: PowerAtomParam & { power: PowerName }) => {
      const { id, gear, slot, power } = param;
      const idResult = safeParseData(coordinateIdSchema, id);
      if (!idResult.success) return;
      const gearResult = safeParseData(gearSchema, gear);
      if (!gearResult.success) return;
      const slotResult = safeParseData(slotSchema, slot);
      if (!slotResult.success) return;
      const powerResult = safeParseData(powerNameSchema, power);
      if (!powerResult.success) return;
      updatePower(callback, param, power);
    }
  );
};

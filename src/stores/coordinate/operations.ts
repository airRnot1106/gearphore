import {
  coordinateAtom,
  coordinateIdsAtom,
  powerAtom,
} from '@/stores/coordinate/atoms';
import type {
  CoordinateAtomParam,
  CoordinateFull,
  CoordinateId,
  CoordinateName,
  PowerAtomParam,
  PowerName,
} from '@/stores/coordinate/types';
import { slots, gears } from '@/stores/coordinate/types';

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

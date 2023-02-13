import { z } from 'zod';

/* Type & Schema */

// Coordinate

export const coordinateBaseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
});
export type CoordinateBase = z.infer<typeof coordinateBaseSchema>;

export const coordinateIdSchema = coordinateBaseSchema.shape.id;
export type CoordinateId = z.infer<typeof coordinateIdSchema>;

export const coordinateNameSchema = coordinateBaseSchema.shape.name;
export type CoordinateName = z.infer<typeof coordinateNameSchema>;

// Gear

export const gears = ['HEAD', 'CLOTHES', 'SHOES'] as const;
export const gearSchema = z.enum(gears);
export type Gear = z.infer<typeof gearSchema>;

export const gearsWithCommon = [...gears, 'COMMON'] as const;
export const gearWithCommonSchema = z.enum(gearsWithCommon);
export type GearWithCommon = z.infer<typeof gearWithCommonSchema>;

export const slots = [0, 1, 2, 3] as const;
export const slotSchema = z.union([
  z.literal(slots[0]),
  z.literal(slots[1]),
  z.literal(slots[2]),
  z.literal(slots[3]),
]);
export type Slot = z.infer<typeof slotSchema>;

// Power

export const powerNames = [
  'NULL',
  'INK_RECOVERY_UP',
  'INK_RESISTANCE_UP',
  'INK_SAVER_MAIN',
  'INK_SAVER_SUB',
  'INTENSIFY_ACTION',
  'QUICK_RESPAWN',
  'QUICK_SUPER_JUMP',
  'RUN_SPEED_UP',
  'SPECIAL_CHARGE_UP',
  'SPECIAL_POWER_UP',
  'SPECIAL_SAVER',
  'SUB_POWER_UP',
  'SUB_RESISTANCE_UP',
  'SWIM_SPEED_UP',
  'COMEBACK',
  'LAST_DITCH_EFFORT',
  'OPENING_GAMBIT',
  'TENACITY',
  'ABILITY_DOUBLER',
  'HAUNT',
  'NINJA_SQUID',
  'RESPAWN_PUNISHER',
  'THERMAL_INK',
  'DROP_ROLLER',
  'OBJECT_SHREDDER',
  'STEALTH_JUMP',
] as const;
export const powerNameSchema = z.enum(powerNames);
export type PowerName = z.infer<typeof powerNameSchema>;

export const powerSchema = z.object({
  slot: slotSchema,
  name: powerNameSchema,
});
export type Power = z.infer<typeof powerSchema>;

export const powerImageSources = [
  'icon_null.webp',
  'icon_ink_recovery_up.webp',
  'icon_ink_resistance_up.webp',
  'icon_ink_saver_main.webp',
  'icon_ink_saver_sub.webp',
  'icon_intensify_action.webp',
  'icon_quick_respawn.webp',
  'icon_quick_super_jump.webp',
  'icon_run_speed_up.webp',
  'icon_special_charge_up.webp',
  'icon_special_power_up.webp',
  'icon_special_saver.webp',
  'icon_sub_power_up.webp',
  'icon_sub_resistance_up.webp',
  'icon_swim_speed_up.webp',
  'icon_comeback.webp',
  'icon_last_ditch_effort.webp',
  'icon_opening_gambit.webp',
  'icon_tenacity.webp',
  'icon_ability_doubler.webp',
  'icon_haunt.webp',
  'icon_ninja_squid.webp',
  'icon_respawn_punisher.webp',
  'icon_thermal_ink.webp',
  'icon_drop_roller.webp',
  'icon_object_shredder.webp',
  'icon_stealth_jump.webp',
] as const satisfies Readonly<`icon_${string}.webp`[]>;
export const powerImageSourceSchema = z.enum(powerImageSources);
export type PowerImageSource = z.infer<typeof powerImageSourceSchema>;

export const powerToImageSource = {
  NULL: 'icon_null.webp',
  INK_RECOVERY_UP: 'icon_ink_recovery_up.webp',
  INK_RESISTANCE_UP: 'icon_ink_resistance_up.webp',
  INK_SAVER_MAIN: 'icon_ink_saver_main.webp',
  INK_SAVER_SUB: 'icon_ink_saver_sub.webp',
  INTENSIFY_ACTION: 'icon_intensify_action.webp',
  QUICK_RESPAWN: 'icon_quick_respawn.webp',
  QUICK_SUPER_JUMP: 'icon_quick_super_jump.webp',
  RUN_SPEED_UP: 'icon_run_speed_up.webp',
  SPECIAL_CHARGE_UP: 'icon_special_charge_up.webp',
  SPECIAL_POWER_UP: 'icon_special_power_up.webp',
  SPECIAL_SAVER: 'icon_special_saver.webp',
  SUB_POWER_UP: 'icon_sub_power_up.webp',
  SUB_RESISTANCE_UP: 'icon_sub_resistance_up.webp',
  SWIM_SPEED_UP: 'icon_swim_speed_up.webp',
  COMEBACK: 'icon_comeback.webp',
  LAST_DITCH_EFFORT: 'icon_last_ditch_effort.webp',
  OPENING_GAMBIT: 'icon_opening_gambit.webp',
  TENACITY: 'icon_tenacity.webp',
  ABILITY_DOUBLER: 'icon_ability_doubler.webp',
  HAUNT: 'icon_haunt.webp',
  NINJA_SQUID: 'icon_ninja_squid.webp',
  RESPAWN_PUNISHER: 'icon_respawn_punisher.webp',
  THERMAL_INK: 'icon_thermal_ink.webp',
  DROP_ROLLER: 'icon_drop_roller.webp',
  OBJECT_SHREDDER: 'icon_object_shredder.webp',
  STEALTH_JUMP: 'icon_stealth_jump.webp',
} as const satisfies Record<PowerName, PowerImageSource>;

export const powerToOrderEachGear = {
  NULL: {
    COMMON: 0,
    HEAD: 0,
    CLOTHES: 0,
    SHOES: 0,
  },
  INK_RECOVERY_UP: {
    COMMON: 1,
    HEAD: 1,
    CLOTHES: 1,
    SHOES: 1,
  },
  INK_RESISTANCE_UP: {
    COMMON: 2,
    HEAD: 2,
    CLOTHES: 2,
    SHOES: 2,
  },
  INK_SAVER_MAIN: {
    COMMON: 3,
    HEAD: 3,
    CLOTHES: 3,
    SHOES: 3,
  },
  INK_SAVER_SUB: {
    COMMON: 4,
    HEAD: 4,
    CLOTHES: 4,
    SHOES: 4,
  },
  INTENSIFY_ACTION: {
    COMMON: 5,
    HEAD: 5,
    CLOTHES: 5,
    SHOES: 5,
  },
  QUICK_RESPAWN: {
    COMMON: 6,
    HEAD: 6,
    CLOTHES: 6,
    SHOES: 6,
  },
  QUICK_SUPER_JUMP: {
    COMMON: 7,
    HEAD: 7,
    CLOTHES: 7,
    SHOES: 7,
  },
  RUN_SPEED_UP: {
    COMMON: 8,
    HEAD: 8,
    CLOTHES: 8,
    SHOES: 8,
  },
  SPECIAL_CHARGE_UP: {
    COMMON: 9,
    HEAD: 9,
    CLOTHES: 9,
    SHOES: 9,
  },
  SPECIAL_POWER_UP: {
    COMMON: 10,
    HEAD: 10,
    CLOTHES: 10,
    SHOES: 10,
  },
  SPECIAL_SAVER: {
    COMMON: 11,
    HEAD: 11,
    CLOTHES: 11,
    SHOES: 11,
  },
  SUB_POWER_UP: {
    COMMON: 12,
    HEAD: 12,
    CLOTHES: 12,
    SHOES: 12,
  },
  SUB_RESISTANCE_UP: {
    COMMON: 13,
    HEAD: 13,
    CLOTHES: 13,
    SHOES: 13,
  },
  SWIM_SPEED_UP: {
    COMMON: 14,
    HEAD: 14,
    CLOTHES: 14,
    SHOES: 14,
  },
  COMEBACK: {
    COMMON: null,
    HEAD: 15,
    CLOTHES: null,
    SHOES: null,
  },
  LAST_DITCH_EFFORT: {
    COMMON: null,
    HEAD: 16,
    CLOTHES: null,
    SHOES: null,
  },
  OPENING_GAMBIT: {
    COMMON: null,
    HEAD: 17,
    CLOTHES: null,
    SHOES: null,
  },
  TENACITY: {
    COMMON: null,
    HEAD: 18,
    CLOTHES: null,
    SHOES: null,
  },
  ABILITY_DOUBLER: {
    COMMON: null,
    HEAD: null,
    CLOTHES: 15,
    SHOES: null,
  },
  HAUNT: {
    COMMON: null,
    HEAD: null,
    CLOTHES: 16,
    SHOES: null,
  },
  NINJA_SQUID: {
    COMMON: null,
    HEAD: null,
    CLOTHES: 17,
    SHOES: null,
  },
  RESPAWN_PUNISHER: {
    COMMON: null,
    HEAD: null,
    CLOTHES: 18,
    SHOES: null,
  },
  THERMAL_INK: {
    COMMON: null,
    HEAD: null,
    CLOTHES: 19,
    SHOES: null,
  },
  DROP_ROLLER: {
    COMMON: null,
    HEAD: null,
    CLOTHES: null,
    SHOES: 15,
  },
  OBJECT_SHREDDER: {
    COMMON: null,
    HEAD: null,
    CLOTHES: null,
    SHOES: 16,
  },
  STEALTH_JUMP: {
    COMMON: null,
    HEAD: null,
    CLOTHES: null,
    SHOES: 17,
  },
} as const satisfies Record<PowerName, Record<GearWithCommon, number | null>>;

export const powersOfGearSchema = z.tuple([
  powerSchema,
  powerSchema,
  powerSchema,
  powerSchema,
]);
export type PowersOfGear = z.infer<typeof powersOfGearSchema>;

export const powersOfCoordinateSchema = z.object({
  HEAD: powersOfGearSchema,
  CLOTHES: powersOfGearSchema,
  SHOES: powersOfGearSchema,
} satisfies Record<Gear, typeof powersOfGearSchema>);
export type PowersOfCoordinate = z.infer<typeof powersOfCoordinateSchema>;

export const coordinateFullSchema = coordinateBaseSchema.extend({
  gears: powersOfCoordinateSchema,
});
export type CoordinateFull = z.infer<typeof coordinateFullSchema>;

// Summary

export const summaryNotation = ['NOTATION_57', 'NOTATION_39'] as const;
export const summaryNotationSchema = z.enum(summaryNotation);
export type SummaryNotation = z.infer<typeof summaryNotationSchema>;

export const summaryTotalSchema = z.object({
  NOTATION_57: z.number().min(0).max(57),
  NOTATION_39: z.number().min(0).max(39),
} satisfies Record<SummaryNotation, z.ZodNumber>);
export type SummaryTotal = z.infer<typeof summaryTotalSchema>;

export const summarySchema = z.object({
  power: powerNameSchema,
  main: z.number().int().min(0).max(3),
  sub: z.number().int().min(0).max(9),
  total: summaryTotalSchema,
});
export type Summary = z.infer<typeof summarySchema>;

/* Atom */

// Coordinate

export type CoordinateIdsAtom = CoordinateId[];

export type CoordinateAtom = CoordinateBase;
export type CoordinateAtomParam = { id: CoordinateId };

// Power

export type PowerAtom = Power;
export type PowerAtomParam = { id: CoordinateId; gear: Gear; slot: Slot };

/* State */

// Coordinate

export type CoordinateIdsState = CoordinateId[];

export type CoordinateIdIndexState = number;
export type CoordinateIdIndexStateParam = { id: CoordinateId };

export type CoordinateBaseState = CoordinateBase;
export type CoordinateBaseStateParam = { id: CoordinateId };

export type CoordinateFullState = CoordinateFull;
export type CoordinateFullStateParam = { id: CoordinateId };

export type CoordinateJsonState = string;
export type CoordinateJsonStateParam = { id: CoordinateId };

export type CoordinateAllJsonState = string;

// Power

export type PowerState = Power;
export type PowerStateParam = { id: CoordinateId; gear: Gear; slot: Slot };

// Summary

export type SummariesState = Summary[];
export type SummariesStateParam = { id: CoordinateId };

// Database

export type DatabaseState = string | undefined;
export type DatabaseStateParam = { id: string | undefined };

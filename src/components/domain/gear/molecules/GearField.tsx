import { PowerSelectImage } from '@/components/domain/power/atoms/PowerSelectImage';

import type { CoordinateId, Gear } from '@/stores/coordinate/types';
import { slots } from '@/stores/coordinate/types';

import { useTranslationContext } from '@/providers/I18nProvider';

export type GearFieldPresentationalProps = {
  coordinateId: CoordinateId;
  gear: Gear;
  label: string;
};

export const GearFieldPresentational = ({
  coordinateId,
  gear,
  label,
}: GearFieldPresentationalProps) => {
  return (
    <div>
      <p className="text-xl font-bold">{label}</p>
      <div className="flex items-center justify-center space-x-3">
        {slots.map((slot) => (
          <PowerSelectImage
            key={slot}
            coordinateId={coordinateId}
            gear={gear}
            slot={slot}
          />
        ))}
      </div>
    </div>
  );
};

export type GearFieldProps = {
  coordinateId: CoordinateId;
  gear: Gear;
};

export const GearField = ({ coordinateId, gear }: GearFieldProps) => {
  const t = useTranslationContext();
  const label = t.GEAR[gear];

  return (
    <GearFieldPresentational
      coordinateId={coordinateId}
      gear={gear}
      label={label}
    />
  );
};

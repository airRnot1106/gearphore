import { GearField } from '@/components/domain/gear/molecules/GearField';

import type { CoordinateId } from '@/stores/coordinate/types';
import { gears } from '@/stores/coordinate/types';

export type GearListPresentationalProps = {
  coordinateId: CoordinateId;
};

export const GearListPresentational = ({
  coordinateId,
}: GearListPresentationalProps) => {
  return (
    <div className="space-y-3">
      {gears.map((gear) => (
        <GearField
          key={`${coordinateId}-${gear}`}
          coordinateId={coordinateId}
          gear={gear}
        />
      ))}
    </div>
  );
};

export type GearListProps = {
  coordinateId: CoordinateId;
};

export const GearList = ({ coordinateId }: GearListProps) => {
  return <GearListPresentational coordinateId={coordinateId} />;
};

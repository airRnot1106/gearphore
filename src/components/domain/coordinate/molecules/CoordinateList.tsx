import { useRecoilValue } from 'recoil';

import { CoordinateCard } from '@/components/domain/coordinate/molecules/CoordinateCard';

import { coordinateIdsState } from '@/stores/coordinate/selectors';
import type { CoordinateId } from '@/stores/coordinate/types';

export type CoordinateListPresentationalProps = {
  coordinateIds: CoordinateId[];
};

export const CoordinateListPresentational = ({
  coordinateIds,
}: CoordinateListPresentationalProps) => {
  return (
    <>
      <div className="space-y-3">
        {coordinateIds.map((coordinateId) => (
          <CoordinateCard key={coordinateId} coordinateId={coordinateId} />
        ))}
      </div>
    </>
  );
};

export const CoordinateList = () => {
  const coordinateIds = useRecoilValue(coordinateIdsState);

  return <CoordinateListPresentational coordinateIds={coordinateIds} />;
};

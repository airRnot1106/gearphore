import { useRecoilValue } from 'recoil';

import { CoordinateToggleInput } from '@/components/domain/coordinate/atoms/CoordinateToggleInput';
import { CoordinateDropdown } from '@/components/domain/coordinate/molecules/CoordinateDropdown';
import { GearList } from '@/components/domain/gear/molecules/GearList';
import { SummaryArea } from '@/components/domain/summary/molecules/SummaryArea';

import { animationState } from '@/stores/animation/selectors';
import type { Animation } from '@/stores/animation/types';
import type { CoordinateId } from '@/stores/coordinate/types';

import { useMedia } from '@/hooks/useMedia';

export type CoordinateCardPresentationalProps = {
  coordinateId: CoordinateId;
  animation: Animation;
};

export const CoordinateCardDesktopPresentational = ({
  coordinateId,
  animation,
}: CoordinateCardPresentationalProps) => {
  return (
    <div
      id={`c-${coordinateId}`}
      className={
        'space-y-1 rounded-3xl bg-neutral p-5 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] ' +
        (animation.animations.SLIDE_IN_LEFT ? 'animate-slide-in-left ' : '')
      }
    >
      <div className="flex items-center justify-between">
        <div className="w-[85dvw] overflow-hidden whitespace-nowrap py-1">
          <CoordinateToggleInput coordinateId={coordinateId} />
        </div>
        <div>
          <CoordinateDropdown coordinateId={coordinateId} />
        </div>
      </div>
      <div className="flex items-center">
        <div className="basis-1/2">
          <GearList coordinateId={coordinateId} />
        </div>
        <div className="divider divider-horizontal"></div>
        <div className="basis-1/2 self-stretch">
          <SummaryArea coordinateId={coordinateId} />
        </div>
      </div>
    </div>
  );
};

export type CoordinateCardProps = {
  coordinateId: CoordinateId;
};

export const CoordinateCard = ({ coordinateId }: CoordinateCardProps) => {
  const animation = useRecoilValue(animationState({ id: coordinateId }));

  const { isDesktop } = useMedia();

  return isDesktop ? (
    <CoordinateCardDesktopPresentational
      coordinateId={coordinateId}
      animation={animation}
    />
  ) : (
    <div></div>
  );
};

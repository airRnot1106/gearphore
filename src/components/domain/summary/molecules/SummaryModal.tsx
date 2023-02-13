import { Modal } from '@/components/base/molecules/Modal';
import { SummaryArea } from '@/components/domain/summary/molecules/SummaryArea';

import type { CoordinateId } from '@/stores/coordinate/types';

interface SummaryModalPresentationalProps {
  coordinateId: CoordinateId;
}

export const SummaryModalPresentational = ({
  coordinateId,
}: SummaryModalPresentationalProps) => {
  return (
    <Modal modalId={`m-${coordinateId}`}>
      <SummaryArea coordinateId={coordinateId} />
    </Modal>
  );
};

interface SummaryModalProps {
  coordinateId: CoordinateId;
}

export const SummaryModal = ({ coordinateId }: SummaryModalProps) => {
  return <SummaryModalPresentational coordinateId={coordinateId} />;
};

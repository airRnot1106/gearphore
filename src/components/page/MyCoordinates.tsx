import { CoordinateAddButton } from '@/components/domain/coordinate/atoms/CoordinateAddButton';
import { CoordinateList } from '@/components/domain/coordinate/molecules/CoordinateList';

export const MyCoordinates = () => {
  return (
    <div>
      <CoordinateList />
      <div className="fixed bottom-20 right-8">
        <CoordinateAddButton />
      </div>
    </div>
  );
};

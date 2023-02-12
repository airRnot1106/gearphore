import { Dumbbell } from 'lucide-react';

export type SummaryBuildButtonPresentationalProps = {
  htmlFor: string;
};

export const SummaryBuildButtonPresentational = ({
  htmlFor,
}: SummaryBuildButtonPresentationalProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className="btn-xs btn-circle btn self-end bg-base-200"
    >
      <Dumbbell size={16} />
    </label>
  );
};

export type SummaryBuildButtonProps = {
  coordinateId: string;
};

export const SummaryBuildButton = ({
  coordinateId,
}: SummaryBuildButtonProps) => {
  const htmlFor = `m-${coordinateId}`;

  return <SummaryBuildButtonPresentational htmlFor={htmlFor} />;
};

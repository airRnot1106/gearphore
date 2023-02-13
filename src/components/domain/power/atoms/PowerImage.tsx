import Image from 'next/image';

import type { Power, PowerImageSource } from '@/stores/coordinate/types';
import { powerToImageSource } from '@/stores/coordinate/types';

import { useTranslationContext } from '@/providers/I18nProvider';

import type { ImageSize } from '@/types';

export type PowerImagePresentationalProps = {
  src: PowerImageSource;
  size: ImageSize;
  alt: string;
};

export const PowerImagePresentational = ({
  src,
  size,
  alt,
}: PowerImagePresentationalProps) => {
  const imgSrc = `/gear-power/${src}`;
  const imgSize = size === 'sm' ? 45 : 60;

  return <Image src={imgSrc} width={imgSize} height={imgSize} alt={alt} />;
};

export type PowerImageProps = {
  power: Power;
};

export const PowerImage = ({ power }: PowerImageProps) => {
  const t = useTranslationContext();

  const { slot, name } = power;

  const src = powerToImageSource[name];
  const size = slot === 0 ? 'lg' : 'sm';
  const alt = t.POWER[name];

  return <PowerImagePresentational src={src} size={size} alt={alt} />;
};

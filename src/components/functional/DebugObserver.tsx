/* eslint-disable no-console */
import { useEffect } from 'react';

import { useRecoilSnapshot } from 'recoil';

export const DebugObserver = (): React.ReactElement => {
  const snapshot = useRecoilSnapshot();
  useEffect(() => {
    console.debug('The following atoms were modified:');
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.debug(node.key, snapshot.getLoadable(node));
    }
  }, [snapshot]);

  return <></>;
};

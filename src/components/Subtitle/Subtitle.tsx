import React, { useMemo } from 'react';
import { Subtext } from '../../interfaces/Subtext';
import Word from '../Word/Word';

interface SubtitleProps {
  subtext: Subtext;
  deactivated?: boolean;
}

const Subtitle: React.FC<SubtitleProps> = ({ subtext, deactivated }) => {
  const words = useMemo(() => {
    const duration = Math.ceil((subtext.end - subtext.start) * 1000);
    const words = subtext.text.replaceAll('<br />', ' ').split(' ').filter(Boolean);
    const averageDuration = duration / words.length;
    return words.map((word, index) => ({
      word, activationDelay: deactivated ? undefined : index * averageDuration * 0.90
    }));
  }, [subtext, deactivated]);

  return (
    <p className={deactivated ? 'opacity-60' : undefined}>
      {words.map((word, index) =>
        (<Word key={index} {...word} />)
      )}
    </p>
  );
};

export default Subtitle;

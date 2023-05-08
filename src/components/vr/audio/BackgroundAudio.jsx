import React, { useEffect } from 'react';
import { Howl } from 'howler';

const BackgroundAudio = ({ audioFileUrl }) => {
  useEffect(() => {
    // Create a new Howl instance for streaming the audio
    const sound = new Howl({
      src: [audioFileUrl],
      autoplay: true,
      loop: true,
      volume: 0.3,
      html5: true, // Use the HTML5 Audio API for streaming
      preload: false, // Disable preloading the entire audio file
    });

    // Play the audio
    sound.play();

    // Clean up the Howl instance when the component is unmounted
    return () => {
      sound.unload();
    };
  }, [audioFileUrl]);

  return null;
};

export default BackgroundAudio;
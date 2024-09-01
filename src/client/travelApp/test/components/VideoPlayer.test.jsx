import React from 'react';
import { it, expect, describe } from 'vitest';
import { render } from '@testing-library/react';
import VideoPlayer from '../../src/components/VideoPlayer.jsx';

describe('VideoPlayer Component', () => {
  it('renders the VideoPlayer component with a video source', () => {
    const { container } = render(<VideoPlayer />);

    const videoElement = container.querySelector('video');
    expect(videoElement).toBeInTheDocument();

    const sourceElement = videoElement.querySelector('source');
    expect(sourceElement).toBeInTheDocument();
    expect(sourceElement).toHaveAttribute('src', expect.stringContaining('HeroVideo.mp4'));
  });
});
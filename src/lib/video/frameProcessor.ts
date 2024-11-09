export class FrameProcessor {
  private decoder: VideoDecoder;
  private processor: (frame: VideoFrame) => Promise<void>;
  
  constructor(onFrame: (frame: VideoFrame) => Promise<void>) {
    this.processor = onFrame;
    
    this.decoder = new VideoDecoder({
      output: async (frame) => {
        try {
          await this.processor(frame);
        } finally {
          frame.close();
        }
      },
      error: (error) => {
        console.error('Video decoder error:', error);
      }
    });
  }

  async processVideoFrame(stream: MediaStream) {
    const track = stream.getVideoTracks()[0];
    const processor = new MediaStreamTrackProcessor({ track });
    const reader = processor.readable.getReader();

    while (true) {
      const { value: frame, done } = await reader.read();
      if (done) break;
      
      if (this.decoder.state === 'configured') {
        const keyFrame = new EncodedVideoChunk({
          type: 'key',
          timestamp: frame.timestamp,
          data: new Uint8Array(frame.data)
        });
        this.decoder.decode(keyFrame);
      }
    }
  }

  configure(config: VideoDecoderConfig) {
    this.decoder.configure(config);
  }

  close() {
    this.decoder.close();
  }
}
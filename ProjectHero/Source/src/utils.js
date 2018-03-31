const utils = {
  createFrames(start, end, tag, reverse = false) {
    let frames = [];

    for (let i = start; i <= end; i++) {
      frames.push(`${tag}_${i}.png`);
    }

    if (reverse) {
      for (let i = end - 1; i >= start + 1; i--) {
        frames.push(`${tag}_${i}.png`);
      }
    }

    return frames;
  }

};

export default utils;



export function isWeChat(): boolean {
  return /micromessenger/i.test(window.navigator.userAgent);
}


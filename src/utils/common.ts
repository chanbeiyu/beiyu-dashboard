/**
 * 延迟执行
 *
 * @param {number} ms
 * @returns {Promise<unknown>}
 */
export const delay = (ms: number) =>
   new Promise((resolve) => setTimeout(resolve, ms))

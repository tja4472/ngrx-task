/**
 * @example
 * ```typescript
 * type DataTestIdNames = 'clearButton' | 'searchInput';
 *
 * const dataTestIds: DataTestIds<DataTestIdNames> = {
 *   clearButton: 'clearButton',
 *   searchInput: 'searchInput',
 * } as const;
 * ```
 */
export type DataTestIds<T extends string> = {
  [K in T]: K;
};

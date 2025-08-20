/**
 * @file src/types/index.ts
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * General type definitions / misc random stuff
 */

/**
 * @type Catppuccin
 * @description Defines the structure for the Catppuccin theme context.
 */
export type Catppuccin = {
  flavor: string;
  setFlavor: (flavor: string) => void;
};

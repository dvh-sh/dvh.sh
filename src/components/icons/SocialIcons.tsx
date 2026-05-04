/**
 * @file src/components/icons/SocialIcons.tsx
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * Centralized icon exports to optimize bundle size.
 * Only imports the specific icons used in the app.
 */

import { SiGithub, SiGmail } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

/**
 * @interface IconMap
 * @description Maps icon types to their components.
 */
interface IconMap {
  github: typeof SiGithub;
  email: typeof SiGmail;
  linkedin: typeof FaLinkedin;
}

export const icons: IconMap = {
  github: SiGithub,
  email: SiGmail,
  linkedin: FaLinkedin,
};

/**
 * @function getIcon
 * @description Gets an icon component by type.
 * @param {keyof IconMap} type - The icon type.
 * @returns {IconMap[keyof IconMap]} The icon component.
 */
export const getIcon = (type: keyof IconMap) => icons[type];

export { SiGithub, SiGmail, FaLinkedin };

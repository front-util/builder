import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const ROOT_PATH = path.resolve(__dirname, '../../../..');
export const BASE_BUILD_PATH = `${ROOT_PATH}/dist`;
export const ASSET_DIR_NAME = 'assets';
export const LIBS_PATH = 'node_modules';

export const APP_NAME_CORE = 'frontgm_core';
export const APP_NS_CORE = 'appVTBlk_gm_core';

export const APP_NAME_GM = 'frontgm';
export const APP_NS_GM = 'appVTBlk_gm';

export const APP_NAME_GM_CMS = 'frontgm_cms';
export const APP_NS_GM_CMS = 'appVTBlk_gm_cms';

export const APP_NAME_GM_GUILDS = 'frontgm_guilds';
export const APP_NS_GM_GUILDS = 'appVTBlk_gm_guilds';

export const APP_NAME_COMMON = 'frontgm_common';
export const APP_NS_GM_COMMON = 'appVTBlk_gm_common';
export const browserTargets = {
    chrome: 83,
    safari: 14,
};

export const DEV_PORT_CORE = 5001;
export const DEV_PORT_GAME = 5002;
export const DEV_PORT_CMS = 5003;
export const DEV_PORT_GUILD = 5004;
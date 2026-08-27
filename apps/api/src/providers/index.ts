import {config} from '../config'; import {MockVideoProvider} from './mock'; import {ReplicateVideoProvider} from './replicate'; import {VideoProvider} from './types';
export function getVideoProvider():VideoProvider{return config.videoProvider==='replicate'?new ReplicateVideoProvider():new MockVideoProvider()}

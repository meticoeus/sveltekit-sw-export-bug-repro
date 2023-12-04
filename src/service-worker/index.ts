/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
// This file is in a folder for the above directive tag to give type resolution

declare let self: ServiceWorkerGlobalScope;

import { activateEvent } from './activateEvent';
import { installEvent } from './installEvent';

self.addEventListener('install', installEvent);

self.addEventListener('activate', activateEvent);

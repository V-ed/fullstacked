import { writable } from 'svelte/store';
import { useToggleable } from './toggleable';

export const isDrawerOpen = useToggleable(writable(false), (drawerOpenStore) => drawerOpenStore.update((isOpen) => !isOpen));

export * from './local-storage';
export * from './matchMedia';
export * from './theme';

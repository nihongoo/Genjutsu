import type { ComponentType } from 'react';
import { AboutWindow } from '../components/windows/about-window';
import { ProjectsWindow } from '../components/windows/projects-window';
import { CommandsWindow } from '../components/windows/command-window';
import { ChromeWindow } from '../components/windows/chrome-window';
import { SpotifyWindow } from '../components/windows/spotify-window';
import { SettingsWindow } from '../components/windows/setting-window';

export const WINDOW_COMPONENTS: Record<string, ComponentType> = {
  about: AboutWindow,
  projects: ProjectsWindow,
  chrome: ChromeWindow,
  commands: CommandsWindow,
  spotify: SpotifyWindow,
  settings: SettingsWindow,
};

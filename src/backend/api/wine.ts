import { ipcRenderer } from 'electron'
import { RuntimeName, ToolArgs, WineVersionInfo } from 'common/types'
import { ProgressInfo, State } from 'heroic-wine-downloader'

export const toggleDXVK = async (args: ToolArgs) =>
  ipcRenderer.invoke('toggleDXVK', args)
export const toggleVKD3D = (args: ToolArgs) =>
  ipcRenderer.send('toggleVKD3D', args)
export const isFlatpak = async (): Promise<boolean> =>
  ipcRenderer.invoke('isFlatpak')
export const isRuntimeInstalled = async (
  runtime_name: RuntimeName
): Promise<boolean> => ipcRenderer.invoke('isRuntimeInstalled', runtime_name)
export const downloadRuntime = async (
  runtime_name: RuntimeName
): Promise<boolean> => ipcRenderer.invoke('downloadRuntime', runtime_name)

export const showItemInFolder = (installDir: string) =>
  ipcRenderer.send('showItemInFolder', installDir)
export const installWineVersion = async (
  release: WineVersionInfo
): Promise<'error' | 'abort' | 'success'> =>
  ipcRenderer.invoke('installWineVersion', release)
export const removeWineVersion = async (
  release: WineVersionInfo
): Promise<boolean> => ipcRenderer.invoke('removeWineVersion', release)
export const refreshWineVersionInfo = async (fetch?: boolean): Promise<void> =>
  ipcRenderer.invoke('refreshWineVersionInfo', fetch)

export const handleProgressOfWinetricks = (
  onProgress: (e: Electron.IpcRendererEvent, messages: string[]) => void
): (() => void) => {
  ipcRenderer.on('progressOfWinetricks', onProgress)
  return () => {
    ipcRenderer.removeListener('progressOfWinetricks', onProgress)
  }
}

export const handleProgressOfWineManager = (
  version: string,
  callback: (
    e: Electron.IpcRendererEvent,
    progress: {
      state: State
      progress: ProgressInfo
    }
  ) => void
): (() => void) => {
  ipcRenderer.on('progressOfWineManager' + version, callback)
  return () => {
    ipcRenderer.removeListener('progressOfWineManager' + version, callback)
  }
}

const { dialog } = window.require('electron').remote;

export function ShowPopup(message, title = 'Warning', type = 'warning', buttons = ['OK']) {
  dialog.showMessageBox({
      type,
      buttons,
      title,
      message
  });
};

export function OpenFileBrowser(cb) {
  dialog.showOpenDialog(
    { properties: [ 'openFile' ] },
    filename => cb(filename[0])
  );
}

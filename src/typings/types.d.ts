declare module 'src/assets/js/filetypeConvert.js' {
  function base64ToBlob(urlData: string, type: string): any;
  function saveBlobtoLocalFile(
    blobData: string,
    localFileName: string,
    fileType?: string
  ): any;
  function makeCSV(contents: Array<any>): any;
}

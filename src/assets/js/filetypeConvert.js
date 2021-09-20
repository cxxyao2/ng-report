// The base64 encoded file should be converted to Blob before bing uploaded to server.
function base64ToBlob(urlData, type) {
  let arr = urlData.split(",");
  // * and + are greedy ( the regex engine tried to find your pattern in the string )
  // matched as many characters as possible. We add ?  to make regex not greedy
  let mime = arr[0].match(/:(.*?);/)[1] || type;
  // cut the head data of url ，turn the left data into byte format
  // atob() function decodes a string of data which has been encoded using Base64 encoding. 解码
  // You can use the btoa() method to encode and transmit data which may otherwise cause communication problems,
  // then transmit it and use the atob() method to decode the data again

  let byteCharacters = atob(arr[1]);
  let sliceSize = 512;
  let byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: mime });
  return blob;
}

function saveBlobtoLocalFile(blobData, localFileName, fileType = "jpeg") {
  var file = new File([blobData], { type: fileType });
  // var file = new File(["foo"], "foo.txt", {
  //   type: "text/plain",
  // });

  //const blob = new Blob([output]);
  //  const fileDownloadUrl = URL.createObjectURL(blob);

  const downloadAncher = document.createElement("a");
  downloadAncher.style.display = "none";
  const fileURL = URL.createObjectURL(file);
  downloadAncher.href = fileURL;
  downloadAncher.download = localFileName;
  downloadAncher.click();
  URL.revokeObjectURL(fileURL); // free up storage
}

function makeCSV(contents) {
  let csv = "";
  contents.forEach((value) => {
    value.forEach((item, i) => {
      let innerValue = item === null ? "" : "" + item;
      let result = innerValue.replace(/"/g, '""');
      // " , \n  That anyone of the 3 signs appears means the end of one line
      if (result.search(/("|,|\n)/g) >= 0) {
        result = '"' + result + '"';
      }
      if (i > 0) {
        csv += ",";
      }
      csv += result;
    });
    csv += "\n";
  });
  return csv;
}

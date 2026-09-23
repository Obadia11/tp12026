var inputFolder = Folder.selectDialog("Choisissez un dossier de sources pour débuter"),
outputFolder = Folder.selectDialog("Choisissez un dossier cible pour les images créées"),
imageSizes = [
    ["2880px", "2880px", "w2880"],
    ["1440px", "1440px", "w1440"],
    ["1124px", "1124px", "w1124"],
    ["720px",  "720px",  "w720"],
    ["562px",  "562px",  "w562"],
    ["470px",  "470px",  "w470"],
    ["360px",  "360px",  "w360"],
    ["235px",  "235px",  "w235"]
],
numImageSizes = imageSizes.length;

if (inputFolder != null && outputFolder != null) {  
    var fileList = inputFolder.getFiles(/\.(jpg|jpeg|png|gif)$/i);
    for(var i=0; i<fileList.length; i++) {
        var doc = app.open( fileList[i] );
         for (var j = 0; j < imageSizes.length; j++) {
            var currentImageSize = imageSizes[j],
            currentImageWidth = currentImageSize[0],
            currentImageHeight = currentImageSize[1],
            currentImageVersion = currentImageSize[2],
            fullname = doc.name,
            filename = fullname.substr(0, fullname.lastIndexOf(".")) || fullname,
            extension = fullname.split(".").pop(),
            exportOptionsSaveForWeb = new ExportOptionsSaveForWeb();
            doc.resizeImage(currentImageWidth, currentImageHeight);
            exportOptionsSaveForWeb.includeProfile = true;
            exportOptionsSaveForWeb.optimized = true;
                if (extension == "jpg" || extension == "jpeg") {
                    exportOptionsSaveForWeb.format = SaveDocumentType.JPEG;
                    exportOptionsSaveForWeb.includeProfile = true;
                    exportOptionsSaveForWeb.quality = 100;
                    }
                 if (extension == "png") {
                    exportOptionsSaveForWeb.format = SaveDocumentType.PNG;
                    }        
                 if (extension == "gif") {
                    exportOptionsSaveForWeb.format = SaveDocumentType.GIF;
                    } 
                    var documentPath = decodeURI(outputFolder) + "/" + filename + "_" + currentImageVersion + "." + extension,
                    file = new File(documentPath);
                    doc.exportDocument (file, ExportType.SAVEFORWEB, exportOptionsSaveForWeb);
          }
    doc.close(SaveOptions.DONOTSAVECHANGES);
    }
}
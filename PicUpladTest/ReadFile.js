function readFile(file) {
    var reader = new FileReader();

    reader.onloadend = function() {
        processFile(reader.result, file.type);
    }

    reader.onerror = function() {
        alert('There was an error reading the file!');
    }

    reader.readAsDataURL(file);
}

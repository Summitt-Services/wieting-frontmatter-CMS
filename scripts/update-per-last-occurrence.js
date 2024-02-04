var path = require('path'),
fs = require('fs');

// from https://stackoverflow.com/questions/25460574/find-files-by-extension-html-under-a-folder-in-nodejs
function fromDir(startPath, filter, callback) {

  console.log('Starting from dir: ', startPath);

  if (!fs.existsSync(startPath)) {
    console.log("Starting directory does not exist: ", startPath);
    return;
  }

  var files = fs.readdirSync(startPath);
  for (var i = 0; i < files.length; i++) {
    var filename = path.join(startPath, files[i]);
    var stat = fs.lstatSync(filename);
    if (! /\/\./.test(filename)) {       // skip hidden directories and files      
      if (stat.isDirectory()) {
        fromDir(filename, filter, callback); // recurse
      } else if (filter.test(filename)) callback(filename);
    };
  };
};

// from https://www.tutorialspoint.com/reading-a-text-file-into-an-array-in-node-js
// function to readFileLines given the filename
function readFileLines(filename) {
  // return fs.readFileSync(filename).toString('UTF8').split('\n');
  return fs.readFileSync(filename).toString('UTF8');
};

// from https://stackoverflow.com/questions/62817606/how-to-search-using-regex-in-array-in-javascript
//   and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Groups_and_backreferences
function findFinalOccurrenceDate(lines) {
  let last = '2000-01-01'
  const re = / date: (\d{4}-\d{2}-\d{2}) \d{2}:\d{2}:\d{2}-\d{4}/
  var expr = new RegExp(re, "gi");
  var matches = lines.match(expr);
  if (matches) {
    last = findFinal(matches);
    return last
  } else {
    return false
  }  
}

// inspired by https://stackoverflow.com/questions/53147295/how-to-find-the-most-recent-date-in-an-array-with-key-values-in-javascript
function findFinal(matches) {
  const re = /\d{4}-\d{2}-\d{2}/
  var expr = new RegExp(re, "gi");
  let most_recent = matches.reduce((mostRecent, item) =>
    item > mostRecent 
    ? item
    : mostRecent
  );
  var final = most_recent.match(expr);
  console.log('Final occurrence: ', final[0]); 
  return final[0];
}

// inspired by https://stackoverflow.com/questions/15063670/compare-string-with-todays-date-in-javascript
//   and https://www.w3schools.com/jsref/jsref_replace.asp
function update_path(old_path, final_date) {
  var today = new Date();
  var final = new Date(final_date + " 23:00:00");
  var new_path = old_path

  if (today > final) {           // all occurrences are in the past
    new_path = old_path.replace("/active/", "/past/");
  } else {                       // final occurrence is still active
    new_path = old_path.replace("/past/", "/active/");    // in case final occurrence changed
  }

  // inspried by https://www.geeksforgeeks.org/node-js-fs-rename-method/
  new_path = new_path.replace(/\d{4}-\d{2}-\d{2}/, final_date);
  // new_path = new_path.replace(/undefined/, final_date);
  if (new_path != old_path) {       // Rename the file 
    fs.rename(old_path, new_path, 
      () => {
        console.log("File renamed to: ", new_path);
    });
  }
}

// from https://stackoverflow.com/questions/25460574/find-files-by-extension-html-under-a-folder-in-nodejs
//   and https://www.tutorialspoint.com/reading-a-text-file-into-an-array-in-node-js
fromDir('./content/event', /\.md$/, function(file_path) {
    console.log('-- found: ', file_path);
    txt = readFileLines(file_path);
    final = findFinalOccurrenceDate(txt);
    if (final) { update_path(file_path, final); }
  });

  fromDir('./content/show', /\.md$/, function(file_path) {
    console.log('-- found: ', file_path);
    txt = readFileLines(file_path);
    final = findFinalOccurrenceDate(txt);
    if (final) { update_path(file_path, final); }
  });


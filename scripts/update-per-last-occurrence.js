var path = require('path'),
fs = require('fs');

// from https://stackoverflow.com/questions/25460574/find-files-by-extension-html-under-a-folder-in-nodejs
function fromDir(startPath, filter, callback) {

    // console.log('Starting from dir '+startPath+'/');

    if (!fs.existsSync(startPath)) {
        console.log("Starting directory does not exist: ", startPath);
        return;
    }

    var files = fs.readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
        var filename = path.join(startPath, files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            fromDir(filename, filter, callback); // recurse
        } else if (filter.test(filename)) callback(filename);
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
}

// from https://stackoverflow.com/questions/25460574/find-files-by-extension-html-under-a-folder-in-nodejs
//   and https://www.tutorialspoint.com/reading-a-text-file-into-an-array-in-node-js
fromDir('./content/event', /\.md$/, function(filename) {
    console.log('-- found: ', filename);
    txt = readFileLines(filename);
    final = findFinalOccurrenceDate(txt);
    // // from https://stackoverflow.com/questions/17614123/node-js-how-to-write-an-array-to-file
    // fs.writeFile(
    //   './my.json',
    //   JSON.stringify(arr),
    //   function (err) {
    //       if (err) {
    //           console.error('Crap happens');
    //       }
    //   }
    // );
  });

  fromDir('./content/show', /\.md$/, function(filename) {
    console.log('-- found: ', filename);
    txt = readFileLines(filename);
    final = findFinalOccurrenceDate(txt);
  });


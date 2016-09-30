// (function(){
  // this.wordCounter.splitter();
var sonnetText = "Shall I compare thee to a summer's day? Thou art more lovely and more temperate: Rough winds do shake the darling buds of May, And summer's lease hath all too short a date: Sometime too hot the eye of heaven shines, And often is his gold complexion dimmed, And every fair from fair sometime declines, By chance, or nature's changing course untrimmed:  But thy eternal summer shall not fade, Nor lose possession of that fair thou ow'st, Nor shall death brag thou wand'rest in his shade, When in eternal lines to time thou grow'st, So long as men can breathe or eyes can see,So long lives this, and this gives life to thee.";

var wordCounter = {

    values: {
        splitText: null,
        splitTextReduced: null,
        textCollated: null,
        sortedText: null
    },


    splitter: function() {
        var lowerCase= sonnetText.toLowerCase();
        var splitText = lowerCase.match(/\w+/g);
        this.values.splitText = splitText;
        this.oneCharFilter();
    },

    checkForOne: function(word) {
        return word.length > 1;
    },
    oneCharFilter: function() {
        var splitTextReduced = this.values.splitText.filter(this.checkForOne);
        this.values.splitTextReduced = splitTextReduced;
        this.collator();
    },

    collator: function() {
        var splitTextReduced = this.values.splitTextReduced;
        var textCollated = splitTextReduced.reduce(function(words, uniqueWord) {
            if (words.hasOwnProperty(uniqueWord)) {
                words[uniqueWord] = words[uniqueWord] + 1;
            } else {
                words[uniqueWord] = 1;
            }
            return words;
        }, {});
        this.values.textCollated = textCollated;
        this.sorter(textCollated);
    },

    sorter: function(textCollated){
      var sortedText = [];
      for (var word in textCollated)
        sortedText.push([word, textCollated[word]]);
        sortedText.sort(function(a, b) {
          return b[1] - a[1];
        }
      );
      this.values.sortedText = sortedText;
      
    }
};

wordCounter.splitter();
console.log(wordCounter.values.sortedText);

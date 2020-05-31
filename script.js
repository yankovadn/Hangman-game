
    let $wordList = ["ABRUPTLY", "ABSURD", "ABYSS", "AVENUE", "AWKWARD", "AXIOM", "BANJO", "BEEKEEPER", "BIKINI", "BLITZ",
                     "BLIZZARD", "BUFFALO", "BUZZING", "BUZZWORDS", "CYCLE", "DIZZY", "DWARF", "EMBEZZLE", "EQUIP",
                     "ESPIONAGE", "EXODUS", "FAKE", "FISHHOOK", "FIXABLE", "FJORD", "FLUFFINESS", "FRAZZLE", "FUNNY", "GALAXY",
                    "GALVANIZE", "GNARLY", "GOSSIP", "HAIKU", "HYPHEN", "INJURY", "IVORY", "IVY", "JACKPOT", "JAZZY", "JAYWALK",
                    "JELLY", "JIGSAW", "JOGGING", "JOKING", "JOYFUL", "JUICY", "JUMBO", "KAYAK", "KHAKI", "KIOSK", "LUCKY", "LUXURY",
                     "LYMPH", "MATRIX", "MICROWAVE", "MYSTIFY", "NIGHTCLUB", "NOWADAYS", "ONYX", "OVARY", "OXIDIZE", "OXYGEN", "PAJAMA",
                     "PIXEL", "PNEUMONIA", "POLKA", "PSYCHE", "PUPPY", "PUZZLING", "QUARTZ", "QUEUE", "QUIZ", "RHYTHM", "SCRATCH",
                     "STAFF", "STRENGTH", "STRETCH", "SUBWAY", "SYNDROME", "TRANSCRIPT", "TRANSPLANT", "UNKNOWN", "UNWORTHY", "UNZIP",
                     "VAPORIZE", "VODKA", "WALTZ", "WAVE", "WHISKEY", "WITCHCRAFT", "WIZARD", "WRISTWATCH", "YOKE", "YOUTH", "ZIPPER",
                     "ZOMBIE"];
   
    let $answer = "";
    let $guessedLetters = [];
    let $statusWord = null;
    let $mistakes = 0;

    function pickWord(){
        $answer = $wordList[Math.floor(Math.random()*$wordList.length)]
    }      
    
    function checkLetter(letter){
      $guessedLetters.includes(letter) ? null : $guessedLetters.push(letter);
      $("#" + letter + "").attr("disabled", true).addClass("btn-letter-disabled");

      if ($answer.includes(letter)){
        refreshWord();
        checkIfWon();
      } else {
        $mistakes++;
        updatePicture();    
        checkIfLost();
      }     
    }

    function updatePicture(){
      $("#hangman-img").attr("src", "hangman-"+ $mistakes +".svg");
    }

    function checkIfWon(){
      $statusWord.includes("_") ? null : $("#alphabet-box").html("Well done").addClass("result-msg");
    }

    function checkIfLost(){
      $mistakes > 6 ? $("#alphabet-box").html("Correct answer: "+$answer+". Try again").addClass("result-msg") : null;
    }

    function refreshWord(){
      $statusWord = $answer.split("").map(letter => $guessedLetters.includes(letter) ? letter:"_").join(" ");
      $("#word-box").html($statusWord);
    }

    $(".btn-new-word").on("click", function(){
      pickWord();
      $guessedLetters.length = 0;
      refreshWord();
      generateButtons();
      $mistakes = 0;
      updatePicture();
    })

    function generateButtons() {
      let $buttonsHTML = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter =>
        `<button
            class="btn btn-letter"
            id='` + letter + `'
            onClick="checkLetter('` + letter + `')"
          >
            ` + letter + `
          </button>`);
    
      $("#alphabet-box").html($buttonsHTML).removeClass("result-msg");
    }

    $("#checkbox").click(function(){
      $(":root").toggleClass("light-mode dark-mode");
    });

   
    pickWord();
    refreshWord();
    generateButtons();
  

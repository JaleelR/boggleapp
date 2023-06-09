
let $guessForm = $("#guessform");
let $guess =  $("#guess");
let $h1score = $("#score");
let score = 0;
$(document).ready(function() {
    $("#dialog").dialog({
      autoOpen: false, // Prevent the dialog from opening automatically
      modal: true, // Enable modal behavior (blocks interaction with other elements)
      buttons: {
        OK: function() {
          $(this).dialog("close"); // Close the dialog when OK button is clicked
        }
      }
    });
  });
$(document).ready(function() {
    $("#dialog2").dialog({
      autoOpen: false, // Prevent the dialog from opening automatically
      modal: true, // Enable modal behavior (blocks interaction with other elements)
      buttons: {
        OK: function() {
          $(this).dialog("close"); // Close the dialog when OK button is clicked
        }
      }
    });
  });
$(document).ready(function() {
    $("#dialog3").dialog({
      autoOpen: false, // Prevent the dialog from opening automatically
      modal: true, // Enable modal behavior (blocks interaction with other elements)
      buttons: {
        OK: function() {
          $(this).dialog("close"); // Close the dialog when OK button is clicked
        }
      }
    });
  });




$(document).ready(function(){
    $(document).on('submit', $guessForm, function(event){   
        event.preventDefault();
        let $formData = $guess.val();
        $guess.val("")
        
    axios.post("/checkword", {
    guessdata: $formData 
    })
    .then(response => {
    console.log("success!")
    console.log(response)
    if (response.data.result === "ok"){
        $("#dialog").dialog("open");
        score += $formData.length;
        $h1score.html(score)
    }
        else if (response.data.result === "not-on-board"){
            console.log("not on board forehead")
            $("#dialog2").dialog("open");
        }
            else if (response.data.result === "not-word"){
                console.log("not a word forehead")
                $("#dialog3").dialog("open");
            }
            else if (response.data.result === "word-used"){
                console.log("used word already")
                alert("USED WORD ALREADY")
            }
 }) 
    .catch(error => {
        console.log("try agian ")
    
    })

    }) 
})




$(document).ready(function(){
    setTimeout(function(){  
        console.log("game over! Your total score was " + score)
        $guessForm.remove();

        axios.post("/userdata", {
            highscore: score
        }) .then(response => {
            console.log("another success!")
            console.log(response.data)

        }) .catch(response => {
            console.log("nah check again")
        })
        
    }, 20000)
});
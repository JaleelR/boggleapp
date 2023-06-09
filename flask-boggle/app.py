from flask import Flask, redirect, render_template, request, session, jsonify
from boggle import Boggle
import pdb

app = Flask(__name__)
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config["SECRET_KEY"] = 'naruto'


boggle_game = Boggle()
'''Make an instance of Boggle class'''
wordlist = [] 
'Creates a list for dupes '

@app.route('/')
def board():


   '''
- Making an board with boggles class make_board
- Saving it to sessions 
- Returning html that is displaying the board  
   '''
   board = boggle_game.make_board()
   print(wordlist)
   session["board"] = board
   return render_template("board.html")



@app.route("/checkword", methods = ["POST"])
def check_word():
    ''' 
- Getting the word (guess input value )from get request in js file
- Using the boggle class method check_valid_word to check if the word is a word
      - if it is put it in wordlist
- Checking if word is on board 
- cheking if word is a word 
     '''
    guessword = request.json.get("guessdata")

    if boggle_game.check_valid_word(session["board"], guessword) == "ok":
      
      if guessword in wordlist:
            return jsonify({"result": "word-used"}) 
      else:    
        wordlist.append(guessword) 
        print(wordlist)
        return jsonify({"result": "ok"})
     

    elif boggle_game.check_valid_word(session["board"], guessword) == 'not-on-board':
        return jsonify({"result": "not-on-board"})
   
  
           
    else:
        return jsonify({"result":  "not-word"})



@app.route("/userdata", methods = ["POST"])
def userData():
    ''' 
- Gets the amount of times user has played by incrememnting by one each time game restarts
- gets the highest score of user by getting highscore data from js post request
   - adds highscore to session list and uses .max method to find highest score
- empties wordlist 
- 
    '''
    global wordlist
    session.setdefault("timesplayed", 0) 
    session["timesplayed"] += 1
    scores = request.json.get("highscore")

    if "scores" not in session:
        session['scores'] = []
    session["scores"].append(scores)
    wordlist = []
    
    return jsonify({ "timesplayed": session["timesplayed"] , "highscore": max(session['scores']) })


$(document).ready(function () {

    //event listeners
    $('#remaining-time').hide();
    $('#start').on('click', trivia.startGame);
    $(document).on('click', '.option', trivia.guessChecker);

})

    var qA = {
        correct: 0,
        incorrect: 0,
        unanswered: 0,
        current: 0,
        timer: 40,
        timerOn: false,
        timerId: '',
        
        // questions, options and answers data
        questions: {
            q1: 'In the first episode, King Robert Baratheon says"In my dreams, I kill him every night." To whom is he referring to and why?',
            q2: '',
            q3: '',
            q4: '',
            q5: '',
            q6: ''
        },
        options: {
            q1: ['Ned Stark, because he killed the best swordsman known to all men', 'Tyrion Lannister, because he killed the mother of his wife during childbirth', 'Rhaegar Targaryen, because he kidnapped Lyanna Stark', ''],
            q2: [''],
            q3: [''],
            q4: [''],
            q5: [''],
            q6: ['']
        },
        answers: {
            q1: 'Rhaegar Targaryen, because he kidnapped Lyanna Stark',
            q2: '',
            q3: '',
            q4: '',
            q5: '',
            q6: ''
        },
        // start game
        startGame: function() {
            //reset game
            trivia.correct: 0,
            trivia.incorrect: 0,
            trivia.unanswered: 0,
            trivia.current: 0, 
            clearInterval(trivia.timerId);

            //show game section
            $('#game').show();

            //empty last results
            $('#results').html('');

            //show timer
            $('#timer').text(trivia.timer);

            //remove start button
            $('start').hide();

            $('#remaining-time').show();

            //ask first question
            trivia.nextQuestion();
        },

        // method to loop through and display questions and options
        nextQuestion: function() {

            //set timer to 40 seconds for each question
            trivia.timer = 20;
            $('#timer').removeClass('last-seconds');
            $('#timer').text(trivia.timer);
            
            //to prevent timer speed up
            if(!trivia.timerOn) {
                trivia.timerId = setInterval(trivia.timerRunning, 2000);
            }

            //gets all the questions then indexes the current questions
            var questionContent = object.values(trivia.questions)[trivia.current];
            $('#question').text(questionContent);

            //an array of all the user options for the current question
            var questionOptions = object.values(trivia.options)[trivia.current];
            $.each(questionOptions, function(index, key) {
                $('#options').append($('<button class="options btn btn-info btn-lg">' + key + '</button>'));
            })
            
        },
        //method to decrement counter and count unanswered if their time runs out
        timerRunning: function() {
            //if timer still has time left and there are still questions left to ask
            if(trivia.timer . -1 && trivia.current < Object.key(trivia.questions).length) {
                $('#timer').text(trivia.timer);
                trivia.timer--;
                if(trivia.timer === 4) {
                    $('#timer').addClass('last-seconds');
                }

            }
            // the time has run out and increment unanswered, run result
            else if(trivia.timer === -1) {
                trivia.unanswered++;
                trivia.result = false;
                clearInterval(trivia.timerId);
                resultId = setTimeout(trivia.guessResult, 2000);
                $('#results').html('<h3>Time has run out! Answer: ' + object.values(trivia.answers)[trivia.current] + '</h3>');
            }

            //if all the questions have been shown, end the game and show the results
            else if(trivia.current === Object.keys(trivia.questions).length) {
                //adds results of game (correct, incorrect, unanswered) to the page
                $('#results')
                .html('<h3>Thanks for playing!</h3>' +
                '<p>Correct: ' + trivia.correct + '</p>' +
                '<p>Incorrect: ' + trivia.incorrect + '</p>' +
                '<p>Unanswered: ' + trivia.unanswered + '</p>' +
                '<p>Play again!</p>');

                //hide game section
                $('#game').hide();

                //show start button to begin game
                $('#start').show();
            }
        },
        //method to evaluate the option clicked
        guessChecker: function() {
            //timer ID for gameResult setTimeout
            var resultID;

            //the answer to the current question being asked
            var currentAnswer = Object.values(trivia.answers)[trivia.current];

            //if the tect of the option picked matches the answer of the current question, increment correct
            if($(this).text() === currentAnswer) {
                //turn button green for correct
                $(this).addClass('btn-success').removeClass('btn-info');

                trivia.correct++;
                clearInterval(trivia.timerId);
                resultId = setTimeout(trivia.guessResult, 2000);
                $('#results').html('<h3>Correct Answer!</h3>');
            }
            //else the user picked the wrong option, increment incorrect
            else {
                //turn button clicked red for incorrect
                $(this).addClass('btn-danger').removeClass('btn-info');

                trivia.incorrect++;
                clearInterval(trivia.timerId);
                resultId = setTimeout(trivia.guessResult, 2000);
                $('#results').html('<h3>Wrong Answer!</h3>');
            }
        },
        //method to remove previous questions results and options
        guessResult: function() {
            //increment next question
            trivia.current++;

            //remove the options and results
            $('#option').remove();
            $('#results h3').remove();

            //begin next quesiton
            trivia.nextQuestion();
        }
    }
})
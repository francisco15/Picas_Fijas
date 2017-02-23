// funcion que genera un Array de numeros aleatorios
function generateNumber(len) {
    var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    nums.sort(function(){return Math.random() - 0.5});
    return nums.slice(0, len);
}
// funcion que verifica que no haya numeros repetidos
function hasDuplicates(array) {
    var t = array.concat().sort();
    for (var i = 1; i < t.length; i++) {
        if (t[i] == t[i-1])
        return true;
    }
    return false;
}
// funcion que compara el numero aleatorio con el que ingresa el usuario
// permite saber cuantos de esos numero son picas o fijas
function game(num, guess) {
    var count = {fijas:0, picas:0};
    var g = guess.join('');
    for (var i = 0; i < num.length; i++) {
        var present = g.search(num[i]) != -1;
        if (num[i] == guess[i]) count.fijas++;
        else if (present) count.picas++;
    }
    return count;
}
// genera el numero aleatorio
var num = generateNumber(4);
console.log(num.join(""));
round = 0;
// funcion que permite al usuario jugar
$("#userGuess").keypress(function(e){
    if (e.which == 13) {
        var guess = Array.from($(this).val());
        var arrayOfNumbers = guess.map(Number);
        var play = game(num, arrayOfNumbers);
        round = round + 1;
        if ((!(guess.length == 4)) || hasDuplicates(arrayOfNumbers)) {
        	$(".alert").removeClass("hidden");
        }
        else {
          $(".alert").addClass("hidden");
          $(".table").removeClass("hidden");
          $("tbody").append("<tr><td>"+arrayOfNumbers.join("")+"</td><td>"+play.picas+"</td><td>"+play.fijas+"</td></tr>");
          if (play.fijas == 4) {
            $(".results").prepend("<p class=winner >¡GANASTE EN <span class=numGuesses >"+round+"</span> INTENTOS!</p>");
          }
        }
    }
})

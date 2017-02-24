// funcion que genera un Array de numeros aleatorios
function generateNumber(len) {
    var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    nums.sort(function(){return Math.random() - 0.2});
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

$(document).ready(function(){
  // genera el numero aleatorio
  num = generateNumber(4);
  console.log(num.join(""));
  // reinicio del juego
  $(".button").on("click", function(e){
      $("tbody").empty();
      num = generateNumber(4);
      console.log(num.join(""));
  })

  $('#userGuess').keypress(function(e){
      if (e.which == 13) {
          var guess = Array.from($(this).val());
          $(this).val("");
          var arrayOfNumbers = guess.map(Number);
          var result = game(num, arrayOfNumbers);

          if ((!(guess.length == 4)) || hasDuplicates(arrayOfNumbers) || isNaN(arrayOfNumbers.join("")) == true) {
          	$(".alert").removeClass("hidden");
          }
          else {
            if (result.fijas != 4){
              $(".alert").addClass("hidden");
              $(".table").removeClass("hidden");
              $("tbody").append("<tr><td>"+arrayOfNumbers.join("")+"</td><td>"+result.picas+"</td><td>"+result.fijas+"</td></tr>");
            }
            else{
              $('#modal').modal({
                  show: true
              });
            }
          }
      }
  })
});

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

$("#userGuess").keypress(function(e){
    if (e.which == 13) {
        var guess = Array.from($(this).val());
        var arrayOfNumbers = guess.map(Number);

        if ((!(guess.length == 4)) || hasDuplicates(arrayOfNumbers)) {
        	$(".alert").removeClass("hidden");
        }
        else {
          $(".alert").addClass("hidden");
        }
    }
})
console.log (generateNumber(4));

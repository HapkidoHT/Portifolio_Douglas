$(document).ready(function () {
  $("#menu").click(function () {
    $(this).toggleClass("active");
    $("header").toggleClass("open");
    $(".navbar").toggle(); // Alternar visibilidade do menu
  });

  // Fecha o menu ao clicar fora
  $(document).click(function (event) {
    var target = $(event.target);
    if (
      !target.closest("header").length &&
      !target.closest("#menu").length &&
      $("header").hasClass("open")
    ) {
      $("#menu").removeClass("active");
      $("header").removeClass("open");
      $(".navbar").hide();
    }
  });
});
// Animação das barras de progresso
setTimeout(() => {
  $(".habilidades .progress").each(function () {
    var targetWidth = $(this).data("width"); // Certifique-se de que o atributo data-width está definido
    $(this).css("width", "0").animate(
      {
        width: targetWidth,
      },
      2000
    );
  });
}, 500);

$(document).ready(function () {
  // Funções de interação para o menu
  $("#menu").click(function () {
    $(this).toggleClass("fa-times");
    $("header").toggleClass("toggle");
  });

  $(window).on("scroll load", function () {
    $("#menu").removeClass("fa-times");
    $("header").removeClass("toggle");
  });

  // Inicia a animação das barras de progresso após um breve atraso
  setTimeout(() => {
    $(".habilidades .progress").each(function () {
      var targetWidth = $(this).css("width"); // Captura a largura definida inline
      $(this).css("width", "0").animate(
        {
          width: targetWidth,
        },
        2000 // Duração da animação de 2 segundos
      );
    });
  }, 500); // Atraso de 500ms para garantir que todos os elementos estejam carregados
});

function smoothScroll(sec, duration) {
  const target = document.querySelector(sec);
  const targetPosition = target.getBoundingClientRect().top;
  var startPosition = window.pageYOffset;
  var distance = targetPosition - startPosition;
  var startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    var timeElapsed = currentTime - startTime;
    var run = ease(timeElapsed, startPosition, targetPosition, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;

    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

const sections = ["#home", "#sec1", "#sec2", "#sec3"];
var i = 0;

const aHome = document.querySelector("#aHome");
aHome.addEventListener("click", function() {
  smoothScroll("#home", 1000);
  i = 0;
});

const aSec1 = document.querySelector("#aSec1");
aSec1.addEventListener("click", function() {
  smoothScroll("#sec1", 1000);
  i = 1;
});

const aSec2 = document.querySelector("#aSec2");
aSec2.addEventListener("click", function() {
  smoothScroll("#sec2", 1000);
  i = 2;
});

const aSec3 = document.querySelector("#aSec3");
aSec3.addEventListener("click", function() {
  smoothScroll("#sec3", 1000);
  i = 3;
});

const scrollingBtn = document.querySelector("#scrollingBtn");
scrollingBtn.addEventListener("click", function() {
  if (i === 3) {
    i = 0;
  } else {
    i++;
  }
  smoothScroll(sections[i], "1000");
});

const btn = $("#flechita");
var reachedEnd = false;
$(window).scroll(function() {
  if ($(window).scrollTop() + $(window).height() > $(document).height() - 2) {
    btn.animate({ opacity: "0" }, 1000, function() {
      btn.removeClass("fa-arrow-down").addClass("fa-arrow-up");
    });
    btn.animate({ opacity: "1" }, 1000);
    reachedEnd = true;
  }
  if ($(window).scrollTop() == 0 && reachedEnd == true) {
    btn.animate({ opacity: "0" }, 1000, function() {
      btn.removeClass("fa-arrow-up").addClass("fa-arrow-down");
    });
    btn.animate({ opacity: "1" }, 1000);
    reachedEnd = false;
  }
});

const getData = async (name, email, mensaje) => {
  if (!name.value || !email.value || !mensaje.value)
    window.alert("Complete todos los campos para enviar el mensaje");

  const formData = {
    name: name.value,
    email: email.value,
    mensaje: mensaje.value
  };
  await axios.post("/sendEmail", formData);

  window.confirm("El mensaje fue enviado con exito");

  name.value = "";
  email.value = "";
  mensaje.value = "";
};

ScrollReveal({ distance: "6rem", reset: true, duration: 800, mobile: false });
ScrollReveal().reveal("#tarro", { delay: 500, origin: "top" });
ScrollReveal().reveal("#textoSec1", { delay: 500, origin: "right" });
ScrollReveal().reveal(".section2", { distance: "1rem", delay: 700 });
ScrollReveal().reveal("#sub-sec1", { delay: 500, origin: "left" });
ScrollReveal().reveal("#sub-sec2", { delay: 500, origin: "right" });

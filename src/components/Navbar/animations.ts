export const animateInMenu = () => {
  const circle = document.getElementById("circle");
  if (circle) {
    circle.className += " expand";
  }

  const lines = Array.from(document.getElementsByClassName("line"));

  setTimeout(() => {
    lines.forEach(line => {
      line.classList.toggle("collapse");
    });
  }, 10);

  setTimeout(() => {
    lines[1].classList.toggle("hide");
    lines[0].className += " rotate30";
    lines[2].className += " rotate150";
  }, 80);

  setTimeout(() => {
    lines[0].className += " rotate45";
    lines[2].className += " rotate135";
  }, 130);
};

export const animateOutMenu = () => {
  const circle = document.getElementById("circle");
  if (circle) circle.classList.remove("expand");

  const lines = Array.from(document.getElementsByClassName("line"));

  lines[0].classList.remove("rotate45");
  lines[0].className += " rotate30";

  lines[2].classList.remove("rotate135");
  lines[2].className += " rotate150";

  setTimeout(() => {
    lines[0].classList.remove("rotate30");
    lines[2].classList.remove("rotate150");
  }, 50);

  setTimeout(() => {
    lines[1].classList.remove("hide");
    lines.forEach(line => {
      line.classList.remove("collapse");
    });
  }, 70);
};

const span = document.querySelector("#dot");

const zipPack = document.querySelector(".zipPack");

let newPosX = 0,
  startPosX = 0;

let zipStart, zipEnd;

const snowflake = new SnowflakeJs(
  (frames = 50),
  (count = 500),
  (lifetime = 5000),
  (maxSpeed = 4),
  (maxSize = 25)
);

// when the user clicks down on the element
span.addEventListener("mousedown", function (e) {
  e.preventDefault();

  // get the starting position of the cursor
  startPosX = e.clientX;

  document.addEventListener("mousemove", mouseMove);

  document.addEventListener("mouseup", function () {
    document.removeEventListener("mousemove", mouseMove);
  });
});

function mouseMove(e) {
  zipStart = zipPack.getBoundingClientRect().x;
  zipEnd = zipPack.getBoundingClientRect().x + 600;

  if (e.clientX > zipStart && e.clientX < zipEnd) {
    // calculate the new position
    newPosX = startPosX - e.clientX;

    // with each move we also want to update the start X and Y
    startPosX = e.clientX;

    // set the element's new position:
    span.style.left = span.offsetLeft - newPosX + "px";

    if (e.clientX > zipStart + 300) {
      zipPack.classList.add("fadingRed");

      const element = document.createElement("div");
      document.querySelector(".zipPack").appendChild(element);
      document.querySelector(".zipPack div").textContent = "Super!";
      // document.querySelector(".content").classList.add("fadingOut");

      setTimeout(() => {
        zipPack.style.backgroundColor = "#ce421d";
        zipPack.classList.remove("fadingRed");
        void zipPack.offsetWidth;
        setTimeout(() => {
          zipPack.classList.add("puffOut");
        }, 500);

        setTimeout(() => {
          document.querySelectorAll(".snowflake").forEach((i) => {
            i.style.opacity = "1";
            i.style.zIndex = "0";
            document.querySelector(".after1").classList.add("vanishIn");
            document.querySelector(".after2").style.animationDelay = "0.5s";
            document.querySelector(".after2").classList.add("vanishIn");
            document.querySelector(".after3").style.animationDelay = "1s";
            document.querySelector(".after3").classList.add("vanishIn");
          });
          snowflake.init();
        }, 1500);
      }, 800);
    }
  }
}

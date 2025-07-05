function createGhostLeg() {
  const ghost_leg = document.createElement("div");

  ghost_leg.className = "ghost-leg";

  return ghost_leg;
}

let ghostLeg = null;

document.addEventListener("ghostGameReady", (e) => {
  const ghostLegElem = e.detail;
});

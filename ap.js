AFRAME.registerComponent("click-switch", {
  schema: {
    target: { type: "string" }
  },
  init: function () {
    this.el.addEventListener("click", () => {
      console.log("CLICK OK"); // 👈 test
      document.querySelector("#group-main")
        .setAttribute("visible", "false");

      document.querySelector(this.data.target)
        .setAttribute("visible", "true");
    });
  }
});
window.addEventListener("load", () => {
  const params = new URL(document.location).searchParams;
  const testValue = params.get("testValue");

  document.getElementById("result").innerHTML = testValue;
});

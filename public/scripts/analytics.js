(function () {
  var script = document.currentScript;
  var measurementId = script && script.dataset ? script.dataset.gaMeasurementId : '';
  if (!measurementId || measurementId === 'G-XXXXXXXXXX') {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }

  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', measurementId);
})();

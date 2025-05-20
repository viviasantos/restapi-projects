if (current.priority == 1) {
  var r = new sn_ws.RESTMessageV2('Send Incident to Webhook', 'Post Incident');
  r.setStringParameterNoEscape('number', current.number);
  r.setStringParameterNoEscape('short_description', current.short_description);
  r.setStringParameterNoEscape('priority', current.priority);

  var response = r.execute(); // Send the POST
  gs.info('Webhook POST sent. Response: ' + response.getStatusCode());
}

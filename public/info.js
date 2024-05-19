$(document).ready(function(event) {
  $('button[data-toggle="modal"]').on('click', async function() {
    console.log("generating...");
    
    $('#exampleModal').modal('show');
    const response = await fetch('/temperature-prompt');
    const prompt = await response.text();
    $('.modal-body').text(prompt);
  });
});
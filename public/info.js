$(document).ready(function(event) {
  $('button').on('click', async function() {
    console.log("generating...")
    
    $('#exampleModal').modal('show');
    const response = await fetch('/temperature-prompt');
    const prompt = await response.text();
    $('.modal-body').text(prompt);
  });
});
$(document).ready(function() {
    $('#tempButton').on('click', async function() {
        console.log("generating...")

      $('#exampleModal').modal('show');
    const response = await fetch('/prompt');
    const prompt = await response.text();
    $('.modal-body').text(prompt);
    });
  });
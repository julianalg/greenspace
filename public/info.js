$(document).ready(function(event) {
  $('button[data-toggle="modal"]').on('click', async function() {
    console.log("generating...");
    const id = $(this).attr('id');
    $('#exampleModal').modal('show');
    
    const response = await fetch('/prompt' + id);
    const prompt = await response.text();
    $('.modal-body').text(prompt);
  });

  $('button[data-dismiss="modal"]').on('click', async function() {
    console.log("dismissing modal")
    $('.modal-body').text("Loading...");
  })

});


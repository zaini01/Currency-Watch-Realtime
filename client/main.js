const baseUrl = "http://localhost:3001"

function checkAuth() {
  if(localStorage.access_token) {
    $(`#login-page`).hide()
    $(`#currency-list`).show()
    $(`#btn-logout`).show()
    $(`#navbar`).show()
  } else {
    $(`#login-page`).show()
    $(`#btn-logout`).show()
    $(`#navbar`).hide()
    $(`#currency-list`).hide()
    $(`#currency-list2`).hide()
  }
}

$(document).ready(function(){
  checkAuth()

  //Login button

  $(`#btn-login`).click(function(event) {
    event.preventDefault()
    const email = $(`#input-email`).val()
    const password = $(`#input-password`).val()
    console.log(email,password);
    $.ajax({
      method: 'POST',
      url: `${baseUrl}/login`,
      data: {
        email,
        password
      }
    })
    .done(response => {
      console.log(response,"response");
      localStorage.setItem("access_token",response.access_token)
      checkAuth()
    })
    .fail(err => {
      console.log(err,`err`);
    })
    .always(() => {
      // $(`#input-email`).val('')
      // $(`#input-password`).val('')
    })
  })
  $(`#btn-logout`).click(function() {
    localStorage.clear()
    checkAuth()
  })
});